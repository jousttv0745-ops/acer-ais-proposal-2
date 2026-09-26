#!/usr/bin/env node
/* Loads spec-data.js + wireframe.js + deck.config.js the way the browser does and checks:
 * files exist, every page/region referenced by a step exists, rects fit their page,
 * spec rows carry all six dims, every local src/href in step HTML resolves. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const errors = [];
const err = m => errors.push(m);
global.window = {};
for (const f of ['spec-data.js', 'wireframe.js', 'deck.config.js']) vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), { filename: f });
const { SPEC, DECK } = window;
const exists = rel => fs.existsSync(path.join(ROOT, rel.split(/[?#]/)[0]));

// pages
for (const [k, p] of Object.entries(DECK.pages)) {
  if (p.kind === 'frames') for (const [n, fr] of Object.entries(p.frames || {})) if (!exists(fr.src)) err(`page ${k}: frame ${n} missing ${fr.src}`);
  if (p.kind === 'image') {
    for (const s of [p.src, p.srcLite].filter(Boolean)) if (!exists(s)) err(`page ${k}: missing ${s}`);
    for (const [g, list] of Object.entries(p.marks || {})) list.forEach(([x, y, w, h], i) => { if (x < 0 || y < 0 || x + w > p.w || y + h > p.h) err(`page ${k}: mark ${g}[${i}] outside ${p.w}x${p.h}`); });
    for (const [c, segs] of Object.entries(p.cats || {})) segs.forEach(([y, h]) => { if (y < 0 || y + h > p.h) err(`page ${k}: cat ${c} outside height ${p.h}`); });
    for (const [n, y, h] of p.bands || []) if (y < 0 || y + h > p.h) err(`page ${k}: band ${n} outside height ${p.h}`);
  }
}
// regions
for (const [k, rs] of Object.entries(DECK.regions)) {
  const p = DECK.pages[k]; if (!p) { err(`regions.${k}: no such page`); continue; }
  for (const [n, r] of Object.entries(rs)) for (const which of ['spot', 'focus']) {
    const [x, y, w, h] = r[which] || []; if (r[which] === undefined) { err(`regions.${k}.${n}: missing ${which}`); continue; }
    if (x < 0 || y < 0 || x + w > p.w || y + h > p.h) err(`regions.${k}.${n}.${which} outside ${p.w}x${p.h}`);
  }
}
// spec rows: every row object in SPEC arrays that has a `goal` key must have all six dims
const dimKeys = (SPEC.dims || []).map(([k]) => k);
if (dimKeys.length !== 6) err('SPEC.dims must have 6 entries');
const walk = (o, where) => {
  if (Array.isArray(o)) return o.forEach((x, i) => walk(x, `${where}[${i}]`));
  if (o && typeof o === 'object') {
    if ('goal' in o) dimKeys.forEach(d => { if (typeof o[d] !== 'string' || !o[d].trim()) err(`${where}: empty ${d}`); });
    Object.entries(o).forEach(([k, v]) => walk(v, `${where}.${k}`));
  }
};
walk(SPEC, 'SPEC');
if ((SPEC.bench?.apple || []).length !== 6 || (SPEC.bench?.samsung || []).length !== 6) err('SPEC.bench.apple / samsung must have 6 segments');
if ((SPEC.l1 || []).length !== 5) err('SPEC.l1 must have 5 segments');
if ((SPEC.overview || []).length !== 6) err('SPEC.overview must have 6 rows');
if (!(SPEC.assets || []).length) err('SPEC.assets is empty');
for (const s of SPEC.l1 || []) if (!DECK.regions[s.ref?.page]?.[s.ref?.region]) err(`SPEC.l1 ${s.id}: unknown ref ${s.ref?.page}.${s.ref?.region}`);
// wireframe: one segment per L1 segment, boxes inside the page, asset numbers match the asset list both ways
const WF = SPEC.wireframe || { segments: [] }, assetNos = new Set((SPEC.assets || []).map(a => a.no)), drawn = new Set();
if ((SPEC.l1 || []).map(s => s.id).join() !== WF.segments.map(s => s.id).join()) err('SPEC.wireframe segments must match SPEC.l1 ids in order');
for (const seg of WF.segments) seg.boxes.forEach(({ x, y, w, h, a }, i) => {
  if (x < 0 || y < 0 || x + w > WF.width || y + h > seg.h) err(`wireframe ${seg.id}[${i}] outside ${WF.width}x${seg.h}`);
  if (a) { drawn.add(a); if (!assetNos.has(a)) err(`wireframe ${seg.id}[${i}]: unknown asset ${a}`); }
});
for (const no of assetNos) if (!drawn.has(no)) err(`asset ${no} is not placed on the wireframe`);
for (const a of SPEC.assets || []) if (!a.name) err(`asset ${a.no}: missing name`);
// digital-asset sheets: one numbered box on the page per table row
for (const [key, page] of [['apple', 'apple'], ['samsung', 'samsungLive'], ['acer', 'wfStrip']]) {
  const rows = (key === 'acer' ? SPEC.acerSheet : SPEC.benchAssets?.[key])?.rows?.length || 0, boxes = DECK.pages[page]?.marks?.secs?.length || 0;
  if (rows !== boxes) err(`benchAssets.${key}: ${rows} rows but ${page}.marks.secs has ${boxes} boxes`);
}

// steps: stub builder that records page/region references
const refs = [];
const ref = (page, region) => refs.push([page, region]);
const d = {
  pct: (key, cat) => { const p = DECK.pages[key]; return Math.round((p.cats?.[cat] || []).reduce((a, [, h]) => a + h, 0) / p.h * 100); },
  px: n => n.toLocaleString('en-US'),
  table: (head, rows) => head.join('') + rows.flat().join(''),
  cover: o => ({ chapter: -1, cover: o }),
  intro: (chapter, o) => ({ chapter, intro: o }),
  panel: (chapter, top, html, wins) => ({ chapter, panel: { top, html }, wins }),
  category: (chapter, keys, cat) => { keys.forEach(k => ref(k)); return { chapter, catHead: cat }; },
  categories: (chapter, keys) => DECK.categories.map(c => d.category(chapter, keys, c.key)),
  lengths: (chapter, keys) => { keys.forEach(k => ref(k)); return { chapter }; },
  overview: (chapter, key, name, o = {}) => { ref(key, name); if (o.thumb) ref(o.thumb.page, o.thumb.region); return { chapter }; },
  zoom: (chapter, key, name, o = {}) => { ref(key, name); if (o.thumb) ref(o.thumb.page, o.thumb.region); return { chapter }; },
  versus: (chapter, [ka, ra], [kb, rb], html) => { ref(ka, ra); ref(kb, rb); return { chapter, panel: { html } }; },
};
const steps = DECK.steps(d);
steps.forEach((s, i) => {
  if (typeof s.chapter !== 'number') err(`step ${i + 1}: no chapter`);
  for (const k of Object.keys(s.wins || {})) ref(k);
  const html = s.panel?.html || '';
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const u = m[1]; if (/^(https?:|#|mailto:)/.test(u)) continue;
    if (!exists(u)) err(`step ${i + 1}: missing ${u}`);
  }
});
for (const [page, region] of refs) {
  if (!DECK.pages[page]) err(`step references unknown page ${page}`);
  else if (region && !DECK.regions[page]?.[region]) err(`step references unknown region ${page}.${region}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`OK ${steps.length} steps`);
