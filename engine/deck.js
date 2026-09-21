/*
 * Proposal deck engine.
 * Reads window.DECK (see deck.config.js), builds a 1920×1080 presenter stage and drives it step by step.
 * Nothing in this file is specific to one proposal — change content in deck.config.js only.
 */
(() => {
  const CHROME = 40; // browser-chrome bar height inside each window
  const DEFAULT_LAYOUT = {
    overview: [700, 110, 520, 900],       // single page, whole length
    focus: [80, 120, 1100, 850],          // zoom without a thumbnail
    thumb: [80, 790, 340, 220],           // reference page parked bottom-left
    subjectFocus: [80, 110, 1160, 650],   // zoom while a thumbnail is shown
    left: [80, 110, 860, 500], right: [980, 110, 860, 500], // versus
    calloutFocus: [1250, 190, 590], calloutThumb: [1300, 150, 540],
    captionTopWithThumb: 200,
    benchTop: 180, benchHeight: 720, benchSide: 80, benchGap: 40,
    lengthTop: 120, lengthHeight: 720, lengthWidth: 180, lengthPitch: 270,
    versusPanelTop: 640,
  };

  const cfg = window.DECK;
  const $ = s => document.querySelector(s);
  const fail = msg => { document.body.insertAdjacentHTML('afterbegin', `<div class="deck-error">deck.config.js：${msg}</div>`); throw new Error(msg); };
  if (!cfg) fail('找不到 window.DECK，請確認 deck.config.js 有在 engine/deck.js 之前載入。');

  const L = { ...DEFAULT_LAYOUT, ...(cfg.layout || {}) };
  // lite mode: phones/tablets (or ?lite=1) get half-size screenshots and no permanent GPU layers; ?lite=0 forces full
  const liteParam = new URLSearchParams(location.search).get('lite');
  const LITE = liteParam === '1' || (liteParam !== '0' && cfg.lite !== false &&
    matchMedia('(pointer: coarse)').matches); // phones & tablets; a narrow desktop window keeps full screenshots
  document.documentElement.classList.toggle('lite', LITE);
  const PAGES = { ...(cfg.pages || {}) };
  // page-length thumbnails: a lite-screenshot copy of each image page, always laid out at its lite size
  const LEN_SUFFIX = '__len';
  for (const [k, p] of Object.entries(cfg.pages || {})) {
    if (p.kind === 'image' && p.srcLite) PAGES[k + LEN_SUFFIX] = { ...p, src: p.srcLite, forceLite: true };
  }
  // world factor: in lite mode an image page is laid out at (page px × liteScale) so its CSS size matches the lite image
  const WF = key => (PAGES[key].kind === 'image' && PAGES[key].srcLite && (LITE || PAGES[key].forceLite) ? (PAGES[key].liteScale || 0.5) : 1);
  const CATS = cfg.categories || [];
  const REGIONS = cfg.regions || {};

  for (const [k, v] of Object.entries(cfg.theme || {})) document.documentElement.style.setProperty('--' + k, v);
  document.title = cfg.meta?.title || document.title;
  $('#brand').innerHTML = cfg.meta?.brand || '';
  $('#draft').textContent = cfg.meta?.note || '';

  // ---------- helpers exposed to deck.config.js ----------
  const region = (key, name) => {
    const r = REGIONS[key]?.[name];
    if (!r || !r.spot || !r.focus) fail(`regions.${key}.${name} 需要 { spot:[x,y,w,h], focus:[x,y,w,h] }`);
    return r;
  };
  const thumbWin = t => t ? { [t.page]: { rect: L.thumb, focus: region(t.page, t.region).focus } } : {};
  const benchRects = keys => {
    const w = (1920 - L.benchSide * 2 - L.benchGap * (keys.length - 1)) / keys.length;
    return Object.fromEntries(keys.map((k, i) => [k, [L.benchSide + i * (w + L.benchGap), L.benchTop, w, L.benchHeight]]));
  };
  const lengthRects = keys => {
    const x0 = 960 - ((keys.length - 1) * L.lengthPitch + L.lengthWidth) / 2;
    return Object.fromEntries(keys.map((k, i) => [k, [x0 + i * L.lengthPitch, L.lengthTop, L.lengthWidth, L.lengthHeight]]));
  };

  const d = {
    /** share (%) of a page taken by one category */
    pct: (key, cat) => { const p = PAGES[key]; return Math.round((p.cats?.[cat] || []).reduce((a, [, h]) => a + h, 0) / p.h * 100); },
    px: n => n.toLocaleString('en-US'),
    /** comparison grid; the last column is highlighted */
    table: (head, rows, cols = '220px 1fr 1fr') => `<div class="grid" style="grid-template-columns:${cols}">` +
      `<div class="h"></div>${head.map((h, i) => `<div class="h en${i === head.length - 1 ? ' a' : ''}">${h}</div>`).join('')}` +
      rows.map(([k, ...v]) => `<div class="k">${k}</div>${v.map((x, i) => `<div${i === v.length - 1 ? ' class="a"' : ''}>${x}</div>`).join('')}`).join('') + '</div>',

    cover: o => ({ chapter: -1, cover: o }),
    intro: (chapter, o) => ({ chapter, intro: o }),
    panel: (chapter, top, html, wins) => ({ chapter, panel: { top, html }, wins }),

    /** benchmark: equal-width columns aligned to one category */
    category: (chapter, keys, cat) => {
      const rects = benchRects(keys);
      return { chapter, catHead: cat, chips: { mode: 'category', cat },
        wins: Object.fromEntries(keys.map(k => [k, { rect: rects[k], align: cat, bands: cat }])) };
    },
    categories: (chapter, keys) => CATS.map(c => d.category(chapter, keys, c.key)),
    /** benchmark: whole pages at one common scale, with a metric under each */
    lengths: (chapter, keys, { metric, label, notes }) => {
      const len = k => (PAGES[k + LEN_SUFFIX] ? k + LEN_SUFFIX : k);
      keys = keys.map(len);
      const rects = lengthRects(keys), scale = (L.lengthHeight - CHROME) / Math.max(...keys.map(k => PAGES[k].h));
      return { chapter, chips: { mode: 'length', metric, label },
        notes: notes && notes.map(n => ({ ...n, targets: n.targets.map(len) })),
        wins: Object.fromEntries(keys.map(k => [k, { rect: rects[k], scale, bands: 'all', slim: true }])) };
    },

    /** one page shown whole, one region spotlighted, section labels on the right */
    overview: (chapter, key, name, o = {}) => ({ chapter,
      labels: { page: key, active: o.active || [], plain: o.plain },
      caption: o.caption && { ...o.caption, top: o.thumb ? L.captionTopWithThumb : null },
      wins: { [key]: { rect: L.overview, focus: 'full', spot: o.spot === false ? null : region(key, name).spot }, ...thumbWin(o.thumb) } }),
    /** camera pushes into a region, marks + callout appear */
    zoom: (chapter, key, name, o = {}) => {
      const r = region(key, name), withThumb = !!o.thumb;
      return { chapter,
        wins: { [key]: { rect: withThumb ? L.subjectFocus : L.focus, focus: r.focus, spot: r.spot,
          marks: o.marks === false ? null : (o.marks || name), cycle: o.cycle, frame: o.frame, message: o.message, tint: o.tint }, ...thumbWin(o.thumb) },
        callout: o.callout && { page: key, spot: r.spot, box: o.callout.box || (withThumb ? L.calloutThumb : L.calloutFocus), ...o.callout } };
    },
    /** two pages side by side + a panel underneath */
    versus: (chapter, [ka, ra], [kb, rb], html, o = {}) => ({ chapter, panel: { top: L.versusPanelTop, html },
      // tags: a名 / b名 chips above each window (defaults to the page label)
      tags: o.tags === false ? null : { [ka]: o.tagA || PAGES[ka].label, [kb]: o.tagB || PAGES[kb].label },
      // leadA: arriving from the step before, the left page first zooms into its region straight into its left-hand slot,
      // then the right page and the panel come in
      lead: o.leadA ? { [ka]: { rect: L.left, focus: region(ka, ra).focus, spot: region(ka, ra).spot, marks: o.marksA === false ? null : ra } } : null,
      wins: {
        [ka]: { rect: L.left, focus: region(ka, ra).focus, marks: o.marksA === false ? null : ra },
        [kb]: { rect: L.right, focus: region(kb, rb).focus, marks: o.marksB === false ? null : rb, frame: o.frameB, message: o.messageB },
      } }),
  };

  const STEPS = typeof cfg.steps === 'function' ? cfg.steps(d) : cfg.steps;
  if (!Array.isArray(STEPS) || !STEPS.length) fail('steps 必須回傳一個非空陣列。');

  // ---------- build DOM ----------
  const stage = $('#stage');
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='; // 1×1 placeholder, releases the decoded screenshot
  const winsHost = $('#windows');
  // overlay notes (several small callouts at once); created here so older index.html files work too
  const notesHost = $('#notes') || Object.assign(stage.appendChild(document.createElement('div')), { id: 'notes', className: 'notes' });
  for (const [key, page] of Object.entries(PAGES)) {
    const f = WF(key), q = v => +(v * f).toFixed(2);
    let body;
    if (page.kind === 'frames') {
      body = Object.entries(page.frames).map(([f, fr]) =>
        `<iframe data-f="${f}"${f === page.defaultFrame ? ' class="on"' : ''} data-src="${esc(fr.src)}" src="about:blank" width="${page.w}" height="${page.h}" scrolling="no" tabindex="-1" title="${esc(page.label + ' ' + fr.label)}"></iframe>`).join('');
    } else {
      const src = LITE && page.srcLite ? page.srcLite : page.src;
      body = `<img data-src="${esc(src)}" src="${BLANK}" width="${q(page.w)}" height="${q(page.h)}" style="width:${q(page.w)}px;height:${q(page.h)}px" alt="${esc(page.label)} 整頁截圖" decoding="async">`;
    }
    const bands = page.cats ? `<div class="bands">${CATS.flatMap(c => (page.cats[c.key] || []).map(([y, h], i) =>
      `<div class="band" data-c="${c.key}" style="top:${q(y)}px;height:${q(h)}px;--c:${c.color};--fill:${c.color}24">${i === 0 ? `<span>${c.name}</span>` : ''}</div>`)).join('')}</div>` : '';
    const marks = Object.entries(page.marks || {}).map(([g, list]) => `<div class="marks" data-g="${g}">${list.map(([x, y, w, h], i) =>
      `<div class="mark" style="left:${q(x)}px;top:${q(y)}px;width:${q(w)}px;height:${q(h)}px;transition-delay:${0.9 + i * 0.25}s"><b>${i + 1}</b></div>`).join('')}</div>`).join('');
    // tints: pale green masks over parts of the page (e.g. the images a step talks about), corner radius 3% of their width
    const tints = Object.entries(page.tints || {}).map(([g, list]) => `<div class="tints" data-g="${g}">${list.map(([x, y, w, h]) =>
      `<div class="tint" style="left:${q(x)}px;top:${q(y)}px;width:${q(w)}px;height:${q(h)}px;border-radius:${q(w * 0.03)}px"></div>`).join('')}</div>`).join('');
    const tag = page.kind === 'frames' ? `${page.label} · ${page.frames[page.defaultFrame].label}` : page.label;
    winsHost.insertAdjacentHTML('beforeend',
      `<div class="win hidden" id="win-${key}"><div class="chrome"><i></i><i></i><i></i><span>${esc(page.url || '')}</span><b>${esc(tag)}</b></div>` +
      `<div class="view" data-none="${esc(cfg.meta?.noneLabel || '無此區塊')}"><div class="world" style="width:${q(page.w)}px;height:${q(page.h)}px">${body}${bands}${tints}${marks}<div class="dimset off"><i></i><i></i><i></i><i></i></div><div class="spot off"></div></div></div></div>`);
  }
  const wins = Object.fromEntries(Object.keys(PAGES).map(k => [k, $('#win-' + k)]));

  const chapters = cfg.chapters || [];
  $('#chapters').innerHTML = chapters.map((c, i) => `<button data-ch="${i}">${c}</button>`).join('');
  $('#chapters').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const idx = STEPS.findIndex(s => s.chapter === +b.dataset.ch);
    if (idx >= 0) go(idx);
  });
  $('#bar').innerHTML = STEPS.map(() => '<i></i>').join('');

  // ---------- camera math ----------
  function fit(rect, page, focus) {
    const cw = rect[2], ch = rect[3] - CHROME;
    const [rx, ry, rw, rh] = focus === 'full' ? [0, 0, page.w, page.h] : focus;
    const s = Math.min(cw / rw, ch / rh);
    return { s, tx: (cw - rw * s) / 2 - rx * s, ty: (ch - rh * s) / 2 - ry * s };
  }
  const lastT = {};
  function place(key, c) {
    const page = PAGES[key], cw = c.rect[2], ch = c.rect[3] - CHROME;
    if (c.scale) return { s: c.scale, tx: (cw - page.w * c.scale) / 2, ty: 0 };
    if (c.align) {
      const s = cw / page.w, segs = page.cats?.[c.align];
      if (!segs) return lastT[key] && Math.abs(lastT[key].s - s) < 1e-6 ? lastT[key] : { s, tx: 0, ty: 0 };
      const ry = c.align === (cfg.frameCategory || 'frame') ? segs[segs.length - 1][0] : segs[0][0];
      return { s, tx: 0, ty: Math.min(0, Math.max(-ry * s + 16, ch - page.h * s)) };
    }
    return fit(c.rect, page, c.focus || 'full');
  }

  // ---------- spotlight ----------
  // Four rectangles around the spot. They extend DIM_MARGIN past the page so window margins beside a narrow page dim too.
  const DIM_MARGIN = 6000;
  function placeSpot(spot, dims, rect, page, f = 1) {
    const [x, y, w, h] = rect.map(v => v * f);
    const M = DIM_MARGIN * f, W = page.w * f, H = page.h * f, o = 1; // 1px overlap hides seams
    Object.assign(spot.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
    const rects = [
      [-M, -M, W + 2 * M, y + M + o],                 // above
      [-M, y + h - o, W + 2 * M, H - y - h + M + o],  // below
      [-M, y, x + M + o, h],                          // left
      [x + w - o, y, W - x - w + M + o, h],           // right
    ];
    [...dims.children].forEach((el, n) => { const [l, t, rw, rh] = rects[n]; Object.assign(el.style, { left: l + 'px', top: t + 'px', width: Math.max(0, rw) + 'px', height: Math.max(0, rh) + 'px' }); });
  }

  // ---------- lazy page media ----------
  // Screenshots and iframe pages used by the previous, current and next step stay loaded; the rest are released.
  const mediaFor = s => Object.entries(s?.wins || {}).flatMap(([k, c]) =>
    PAGES[k].kind === 'frames' ? (c.cycle || [c.frame || PAGES[k].defaultFrame]).map(f => k + '/' + f) : [k + '/img']);
  const mediaId = el => el.closest('.win').id.slice(4) + '/' + (el.tagName === 'IMG' ? 'img' : el.dataset.f);
  const mediaNeeded = i => new Set([...mediaFor(STEPS[i - 1]), ...mediaFor(STEPS[i]), ...mediaFor(STEPS[i + 1])]);
  function syncMedia(i) {
    const need = mediaNeeded(i);
    for (const el of document.querySelectorAll('.world iframe, .world img')) {
      if (need.has(mediaId(el)) && el.dataset.loaded !== '1') {
        el.src = el.dataset.src; el.dataset.loaded = '1';
        // decode off the main thread now, so the step that shows it doesn't stall on its first paint
        if (el.tagName === 'IMG' && el.decode) el.decode().catch(() => {});
      }
    }
    // release after the window has faded out, judged against whichever step is current by then,
    // so fast clicking never cancels the clean-up
    setTimeout(() => {
      const keep = mediaNeeded(current);
      for (const el of document.querySelectorAll('.world iframe, .world img')) {
        if (!keep.has(mediaId(el)) && el.dataset.loaded === '1') { el.src = el.tagName === 'IMG' ? BLANK : 'about:blank'; el.dataset.loaded = ''; }
      }
    }, 1200);
  }

  // ---------- step engine ----------
  let current = -1, token = 0, cycleTimer = null;
  function setFrame(key, f) {
    const page = PAGES[key];
    wins[key].querySelectorAll('iframe').forEach(fr => fr.classList.toggle('on', fr.dataset.f === f));
    wins[key].querySelector('.chrome b').textContent = `${page.label} · ${page.frames[f].label}`;
  }

  function go(i) {
    i = Math.max(0, Math.min(STEPS.length - 1, i));
    if (i === current) return;
    const prevStep = STEPS[current];
    current = i; const step = STEPS[i], my = ++token;
    history.replaceState(null, '', '#' + (i + 1));
    $('#count').textContent = `${i + 1} / ${STEPS.length}`;
    document.querySelectorAll('#bar i').forEach((el, n) => el.classList.toggle('on', n <= i));
    document.querySelectorAll('#chapters button').forEach(b => b.classList.toggle('on', +b.dataset.ch === step.chapter));
    clearInterval(cycleTimer);
    syncMedia(i);
    if (step.lead && prevStep && prevStep === STEPS[i - 1]) {
      const leadStep = { chapter: step.chapter, wins: step.lead };
      render(leadStep, prevStep, my);
      setTimeout(() => { if (my === token) render(step, leadStep, my); }, LEAD_MS);
    } else render(step, prevStep, my);
  }

  // how long a lead-in shot holds before the step's own layout takes over
  const LEAD_MS = 1150;
  function render(step, prevStep, my) {
    const cover = $('#cover'), intro = $('#intro');
    if (step.cover) {
      const c = step.cover;
      cover.innerHTML = (c.kicker ? `<small>${c.kicker}</small>` : '') + `<h1>${c.title}</h1>` + (c.subtitle ? `<h2>${c.subtitle}</h2>` : '') +
        (c.lead ? `<p>${c.lead}</p>` : '') + (c.chips ? `<ol>${c.chips.map(([n, t]) => `<li><b>${n}</b>${t}</li>`).join('')}</ol>` : '');
    }
    cover.classList.toggle('off', !step.cover);
    if (step.intro) intro.innerHTML = `<div class="num">${step.intro.num}</div><h1>${step.intro.title}</h1><h2>${step.intro.sub || ''}</h2><p>${step.intro.p || ''}</p>`;
    intro.classList.toggle('off', !step.intro);

    // proxy morph between a big window and its lite "__len" thumbnail (page-length step)
    const prevWins = prevStep?.wins || {}, stepWins = step.wins || {};
    const morphIn = {};  // thumbnail key -> big key: thumbnail starts where the big window is
    const morphOut = {}; // big key -> thumbnail key: thumbnail animates to the big window's target, then hands over
    for (const k of Object.keys(stepWins)) {
      if (k.endsWith(LEN_SUFFIX)) {
        const base = k.slice(0, -LEN_SUFFIX.length);
        if (prevWins[base] && !prevWins[k] && lastT[base]) morphIn[k] = base;
      } else if (PAGES[k + LEN_SUFFIX] && prevWins[k + LEN_SUFFIX] && !stepWins[k + LEN_SUFFIX]) {
        morphOut[k] = k + LEN_SUFFIX;
      }
    }
    // a morph interrupted by fast clicking must not leave windows stuck without transitions
    document.querySelectorAll('.win.noanim').forEach(w => w.classList.remove('noanim'));
    const proxyOf = Object.fromEntries(Object.entries(morphOut).map(([k, lk]) => [lk, k]));
    const hidingForMorph = new Set(Object.values(morphIn));
    // a window taking over another one's exact rect (e.g. an annotated copy of the same shot) swaps in place, no fly-in
    const swapIn = new Set(), swapOut = new Set();
    for (const k of Object.keys(stepWins)) {
      if (prevWins[k] || proxyOf[k] || morphIn[k]) continue;
      const old = Object.keys(prevWins).find(p => !stepWins[p] && String(prevWins[p].rect) === String(stepWins[k].rect));
      if (old) { swapIn.add(k); swapOut.add(old); }
    }

    const applyWin = (key, c) => {
      const el = wins[key];
      const [x, y, w, h] = c.rect;
      Object.assign(el.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
      el.classList.remove('hidden');
      el.classList.toggle('slim', !!c.slim);
      el.classList.toggle('none', !!c.align && !PAGES[key].cats?.[c.align]);
      const t = place(key, c); lastT[key] = t;
      const world = el.querySelector('.world');
      const f = WF(key);
      world.style.transform = `translate(${t.tx}px,${t.ty}px) scale(${t.s / f})`;
      world.style.setProperty('--inv', (f / t.s).toFixed(3));
      const spot = el.querySelector('.spot'), dims = el.querySelector('.dimset');
      if (c.spot) { placeSpot(spot, dims, c.spot, PAGES[key], f); }
      spot.classList.toggle('off', !c.spot);
      dims.classList.toggle('off', !c.spot);
      el.querySelectorAll('.marks').forEach(m => m.classList.toggle('on', m.dataset.g === c.marks));
      el.querySelectorAll('.tints').forEach(m => m.classList.toggle('on', m.dataset.g === c.tint));
      const bands = el.querySelector('.bands');
      if (bands) {
        bands.classList.toggle('on', !!c.bands);
        bands.querySelectorAll('.band').forEach(b => b.classList.toggle('on', c.bands === 'all' || b.dataset.c === c.bands));
      }
      if (PAGES[key].kind === 'frames') {
        if (c.cycle) { let n = 0; setFrame(key, c.cycle[0]); cycleTimer = setInterval(() => setFrame(key, c.cycle[++n % c.cycle.length]), cfg.cycleMs || 2200); }
        else setFrame(key, c.frame || PAGES[key].defaultFrame);
      }
      return t;
    };
    // put a thumbnail exactly where its big window is (same rect, camera and bands), without animating
    const snapToBig = (lk, base) => {
      const src = wins[base], el = wins[lk], t = lastT[base], f = WF(lk);
      el.classList.add('noanim');
      Object.assign(el.style, { left: src.style.left, top: src.style.top, width: src.style.width, height: src.style.height });
      el.classList.remove('hidden');
      el.classList.toggle('slim', src.classList.contains('slim'));
      const world = el.querySelector('.world');
      world.style.transform = `translate(${t.tx}px,${t.ty}px) scale(${t.s / f})`;
      world.style.setProperty('--inv', (f / t.s).toFixed(3));
      const sb = src.querySelector('.bands'), lb = el.querySelector('.bands');
      if (sb && lb) {
        lb.classList.toggle('on', sb.classList.contains('on'));
        const onCats = new Set([...sb.querySelectorAll('.band.on')].map(b => b.dataset.c));
        lb.querySelectorAll('.band').forEach(b => b.classList.toggle('on', onCats.has(b.dataset.c)));
      }
      void el.offsetWidth; // commit the start state
      el.classList.remove('noanim');
    };

    const geo = {};
    for (const key of Object.keys(PAGES)) {
      const el = wins[key];
      const c = proxyOf[key] ? stepWins[proxyOf[key]] : stepWins[key];
      if (!c) {
        if (hidingForMorph.has(key) || swapOut.has(key)) el.classList.add('noanim'); // vanish in the same frame the replacement appears
        el.classList.add('hidden');
        el.querySelector('.spot').classList.add('off');
        el.querySelector('.dimset').classList.add('off');
        el.querySelectorAll('.marks, .tints').forEach(m => m.classList.remove('on'));
        continue;
      }
      if (morphIn[key]) snapToBig(key, morphIn[key]);
      if (morphOut[key]) {
        // the big window jumps to its target while hidden; the thumbnail does the visible motion
        el.classList.add('noanim');
        geo[key] = { rect: c.rect, t: applyWin(key, c) };
        el.classList.add('hidden');
        continue;
      }
      if (swapIn.has(key)) el.classList.add('noanim');
      else if (!prevWins[key] && !morphIn[key] && PAGES[key].kind === 'frames' && c.focus && c.focus !== 'full' && el.classList.contains('hidden')) {
        // appearing mockup page: put it in place showing the top of the page, then let the camera scroll down to the region
        const t0 = place(key, c), f0 = WF(key), world = el.querySelector('.world');
        el.classList.add('noanim');
        Object.assign(el.style, { left: c.rect[0] + 'px', top: c.rect[1] + 'px', width: c.rect[2] + 'px', height: c.rect[3] + 'px' });
        world.style.transform = `translate(${t0.tx}px,0px) scale(${t0.s / f0})`;
        void el.offsetWidth;
        el.classList.remove('noanim');
      }
      const t = applyWin(key, c);
      if (!proxyOf[key]) geo[key] = { rect: c.rect, t };
    }
    if (hidingForMorph.size) setTimeout(() => hidingForMorph.forEach(k => wins[k].classList.remove('noanim')), 60);
    if (swapIn.size) setTimeout(() => [...swapIn, ...swapOut].forEach(k => wins[k].classList.remove('noanim')), 60);
    if (Object.keys(morphOut).length) {
      const dur = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur')) || 1.1) * 1000;
      // hand each big window back once its thumbnail has really arrived (the motion may start late on a busy frame);
      // the fallback timer only covers a transitionend that never fires (e.g. no movement at all)
      for (const [k, lk] of Object.entries(morphOut)) {
        const proxy = wins[lk];
        let done = false, fallback = 0;
        const handOver = () => {
          if (done) return; done = true;
          proxy.removeEventListener('transitionend', onEnd); clearTimeout(fallback);
          if (my !== token) return;
          wins[k].classList.remove('hidden');   // still noanim: appears in place, already rastered
          proxy.classList.add('noanim');
          proxy.classList.add('hidden');
          setTimeout(() => { wins[k].classList.remove('noanim'); proxy.classList.remove('noanim'); }, 60);
        };
        const onEnd = e => { if (e.target === proxy && e.propertyName === 'width') handOver(); };
        proxy.addEventListener('transitionend', onEnd);
        fallback = setTimeout(handOver, dur * 3);
      }
    }

    // overlays hide immediately, reveal after the camera lands
    const tags = $('#tags') || Object.assign(stage.appendChild(document.createElement('div')), { id: 'tags', className: 'tags' });
    const labels = $('#labels'), wire = $('#wire'), caption = $('#caption'), callout = $('#callout'), panel = $('#panel'), cathead = $('#cathead'), chips = $('#chips');
    [labels, wire, caption, callout, panel, cathead, chips, tags].forEach(el => el.classList.remove('show'));
    tags.innerHTML = '';
    notesHost.innerHTML = '';
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // steps with `message` notify their embedded pages: { deck: message, at: 'start' | 'land' }
    const post = at => { for (const [k, c] of Object.entries(stepWins)) if (c.message) wins[k].querySelectorAll('iframe.on').forEach(fr => fr.contentWindow?.postMessage({ deck: c.message, at }, '*')); };
    post('start');
    setTimeout(() => {
      if (my !== token) return;
      post('land'); // the camera has landed: embedded pages can start their animation
      let paths = '';
      labels.innerHTML = '';
      labels.classList.toggle('plain', !!(step.labels && step.labels.plain));
      if (step.labels) {
        const key = step.labels.page, page = PAGES[key], { rect, t } = geo[key];
        const edge = rect[0] + t.tx + page.w * t.s + 8, lx = rect[0] + rect[2] + 70;
        labels.innerHTML = (page.bands || []).map(([name, by, bh], n) => {
          const y = rect[1] + CHROME + t.ty + (by + bh / 2) * t.s, on = step.labels.active.includes(name);
          if (on || step.labels.plain) paths += `<path d="M${edge} ${y}H${lx - 16}" style="--len:${lx - edge}"/>`;
          return `<div class="label${on ? ' on' : ''}" style="left:${lx}px;top:${y}px"><em>${String(n + 1).padStart(2, '0')}</em><span>${name}</span></div>`;
        }).join('');
      }
      if (step.caption) {
        caption.innerHTML = (step.caption.num ? `<div class="cap-num">${step.caption.num}</div>` : '') +
          `<small>${step.caption.k}</small><h3>${step.caption.h}</h3><p>${step.caption.p}</p>`;
        caption.style.top = step.caption.top ? step.caption.top + 'px' : '';
        caption.style.bottom = step.caption.top ? 'auto' : '';
      }
      if (step.callout) {
        const c = step.callout, { rect, t } = geo[c.page], [sx, sy, sw, sh] = c.spot;
        Object.assign(callout.style, { left: c.box[0] + 'px', top: c.box[1] + 'px', width: c.box[2] + 'px' });
        callout.innerHTML = `<small>${c.k}</small><h3>${c.h}</h3><ol>${c.items.map(([n, txt], k) =>
          `<li style="transition-delay:${0.35 + k * 0.15}s"><b class="${n ? '' : 'dim'}">${n || '–'}</b><span>${txt}</span></li>`).join('')}</ol>` +
          (c.tag ? `<span class="tag">${c.tag}</span>` : '');
        const ax = Math.min(rect[0] + t.tx + (sx + sw) * t.s, rect[0] + rect[2]);
        const ay = Math.min(Math.max(rect[1] + CHROME + t.ty + (sy + sh / 2) * t.s, rect[1] + 80), rect[1] + rect[3] - 40);
        const cx = c.box[0], cy = c.box[1] + 60, mid = ax + (cx - ax) / 2;
        paths += `<circle cx="${ax}" cy="${ay}" r="7"/><path d="M${ax} ${ay}H${mid}V${cy}H${cx}" style="--len:${Math.abs(cx - ax) + Math.abs(cy - ay)}"/>`;
      }
      if (step.notes) {
        // each note is a small callout; its wire runs to the facing edge of every target window,
        // hopping over the windows in between along their top edge
        notesHost.innerHTML = step.notes.map(n => `<aside class="callout pin" style="left:${n.box[0]}px;top:${n.box[1]}px;width:${n.box[2]}px">` +
          (n.k ? `<small>${n.k}</small>` : '') + `<h3>${n.h}</h3>` + (n.p ? `<p>${n.p}</p>` : '') + `</aside>`).join('');
        for (const n of step.notes) {
          const leftOf = n.box[0] + n.box[2] / 2 < 960, bx = leftOf ? n.box[0] + n.box[2] : n.box[0], by = n.box[1] + 56;
          n.targets.forEach((k, j) => {
            const g = geo[k]; if (!g) return;
            const [x, y, w, h] = g.rect;
            if (j === 0) {
              const ax = leftOf ? x : x + w, ay = Math.min(Math.max(by, y + 60), y + h - 40);
              paths += `<circle cx="${ax}" cy="${ay}" r="7"/><path d="M${bx} ${by}H${(bx + ax) / 2}V${ay}H${ax}" style="--len:${Math.abs(ax - bx) + Math.abs(ay - by)}"/>`;
            } else {
              const ax = x + w / 2, top = y - 22;
              paths += `<circle cx="${ax}" cy="${y}" r="7"/><path d="M${bx} ${by}H${(bx + (leftOf ? geo[n.targets[0]].rect[0] : x + w)) / 2}V${top}H${ax}V${y}" style="--len:${Math.abs(ax - bx) + Math.abs(top - by) + 22}"/>`;
            }
          });
        }
      }
      Object.values(wins).forEach(w => w.classList.remove('tagged'));
      if (step.tags) {
        tags.innerHTML = Object.entries(step.tags).filter(([k]) => geo[k]).map(([k, v]) => {
          const [x, y, w] = geo[k].rect, { text, tone } = typeof v === 'string' ? { text: v } : v;
          wins[k].classList.add('tagged');
          return `<span class="${tone || ''}" style="left:${x + w - 10}px;top:${y + 3}px">${text}</span>`;
        }).join('');
      }
      if (step.panel) { panel.style.top = step.panel.top + 'px'; panel.innerHTML = step.panel.html; }
      if (step.catHead) {
        const c = CATS.find(x => x.key === step.catHead), n = CATS.indexOf(c) + 1;
        cathead.style.setProperty('--c', c.color);
        cathead.innerHTML = `<i></i><em>${String(n).padStart(2, '0')} / ${String(CATS.length).padStart(2, '0')}</em><strong>${c.name}</strong><span>${c.desc || ''}</span>`;
      }
      chips.innerHTML = '';
      if (step.chips) {
        chips.innerHTML = Object.keys(geo).map(key => {
          const { rect } = geo[key], page = PAGES[key], cx = rect[0] + rect[2] / 2, top = rect[1] + rect[3] + 18;
          if (step.chips.mode === 'length') {
            return `<div class="chip" style="left:${cx}px;top:${top}px"><span class="who">${page.label}</span><b>${d.px(page.h)}</b> px<small>${step.chips.label} ${d.pct(key, step.chips.metric)}%</small></div>`;
          }
          const segs = page.cats?.[step.chips.cat];
          if (!segs) return `<div class="chip none" style="left:${cx}px;top:${top}px"><span class="who">${page.label}</span>${cfg.meta?.noneLabel || '無此區塊'}</div>`;
          const total = segs.reduce((a, [, h]) => a + h, 0);
          return `<div class="chip" style="left:${cx}px;top:${top}px"><span class="who">${page.label}</span><b>${d.px(total)}</b> px<small>占整頁 ${Math.round(total / page.h * 100)}%</small></div>`;
        }).join('');
      }
      wire.innerHTML = paths;
      // short timeout (not rAF) so reveals still fire when the tab is in the background
      setTimeout(() => {
        if (my !== token) return;
        if (step.labels) labels.classList.add('show');
        if (paths) wire.classList.add('show');
        if (step.caption) caption.classList.add('show');
        if (step.callout) callout.classList.add('show');
        notesHost.querySelectorAll('.pin').forEach(n => n.classList.add('show'));
        if (step.tags) tags.classList.add('show');
        if (step.panel) panel.classList.add('show');
        if (step.catHead) cathead.classList.add('show');
        if (step.chips) chips.classList.add('show');
      }, 40);
    }, reduce ? 0 : 950);
  }

  function fitStage() {
    const vv = window.visualViewport;
    const w = vv ? vv.width : innerWidth, h = vv ? vv.height : innerHeight;
    const k = Math.min(w / 1920, h / 1080);
    stage.style.transform = `translate(-50%,-50%) scale(${k})`;
  }
  addEventListener('resize', fitStage);
  addEventListener('orientationchange', () => setTimeout(fitStage, 200));
  window.visualViewport?.addEventListener('resize', fitStage);
  addEventListener('load', fitStage);
  addEventListener('keydown', e => {
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); go(current + 1); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); go(current - 1); }
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(STEPS.length - 1);
    else if (e.key.toLowerCase() === 'f') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); }
  });
  stage.addEventListener('click', e => { if (!e.target.closest('.chapters')) go(current + 1); });

  window.Deck = { go, steps: STEPS, pages: PAGES, helpers: d, lite: LITE, get current() { return current; } };
  fitStage();
  go((parseInt(location.hash.slice(1), 10) || 1) - 1);
})();
