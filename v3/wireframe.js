/* wireframe.js — draws the L1 wireframe from SPEC.wireframe; shared by deck.config.js and spec.html.
 * Boxes are placed in % of the segment, so a segment scales to any width; chips and labels keep a fixed size. */
window.Wireframe = (() => {
  const S = window.SPEC, W = S.wireframe.width;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const pct = (v, of) => (v / of * 100).toFixed(3) + '%';
  const assetName = Object.fromEntries(S.assets.map(a => [a.no, a.name]));
  const seg = id => S.wireframe.segments.find(s => s.id === id);

  const css = `
    .wf{position:relative;background:#fff;border:1px solid #d5d8e0;border-radius:6px;overflow:hidden}
    .wf > div{position:absolute;box-sizing:border-box;display:flex;align-items:center;justify-content:center}
    .wf span{font:500 11px/1.2 'Noto Sans TC',sans-serif;color:#6d7385;white-space:nowrap;overflow:hidden}
    .wf-line{background:#e3e6ec;border-radius:3px}
    .wf-block{background:#f1f2f5;border-radius:4px;justify-content:flex-start !important;padding-left:10px}
    .wf-card{background:#f7f8fa;border:1px solid #e3e6ec;border-radius:8px}
    .wf-tab{background:#eceef2;border-radius:999px}
    .wf-cta{border:1.5px solid #9aa0ad;border-radius:999px}
    .wf-cta.primary{background:#3d4250;border-color:#3d4250}
    .wf-cta.primary span{color:#fff}
    .wf-asset{background:rgba(131,184,26,.12);border:1.5px dashed #83b81a;border-radius:6px}
    .wf b{position:absolute;left:4px;top:4px;z-index:2;padding:2px 6px;border-radius:4px;background:#3f7d0a;color:#fff;
      font:700 11px/1.3 'Noto Sans TC',sans-serif;white-space:nowrap}
    .wf-fill .wf-line.has{background:none}
    .wf-fill .wf-line.has span{color:#1a1d23;font-weight:700;overflow:visible}
    .wf-fill .wf-line.has.left{justify-content:flex-start}
    .wf-fill .wf-block.has span{color:#1a1d23;font-weight:500}
    .wf-fill .wf-asset{align-items:flex-end;padding:0 12px 12px}
    .wf-fill .wf-asset em{font:500 14px/1.45 'Noto Sans TC',sans-serif;font-style:normal;color:#3f7d0a;text-align:center;
      background:rgba(255,255,255,.85);padding:6px 10px;border-radius:8px}
    .wf-fill b{font-size:13px}
  `;

  // one segment at a CSS width; its height follows the segment's aspect ratio
  const segment = (id, width) => {
    const s = seg(id);
    return `<div class="wf" style="width:${width};aspect-ratio:${W}/${s.h}">` + s.boxes.map(b =>
      `<div class="wf-${b.k}${b.primary ? ' primary' : ''}" style="left:${pct(b.x, W)};top:${pct(b.y, s.h)};width:${pct(b.w, W)};height:${pct(b.h, s.h)}">` +
      (b.t ? `<span>${esc(b.t)}</span>` : '') +
      (b.a && !b.quiet ? `<b>${b.a} ${esc(assetName[b.a])}</b>` : '') + `</div>`).join('') + `</div>`;
  };
  // the same segment at a fixed pixel width with the draft copy filled in; asset frames carry their spec
  const assetOf = Object.fromEntries(S.assets.map(a => [a.no, a]));
  const filled = (id, width) => {
    const s = seg(id), k = width / W;
    // text size follows the box height; controls (tabs, buttons, FAQ rows) stay at body size
    const fs = b => b.k === 'line' ? Math.max(12, Math.min(38, Math.round(b.h * k * 0.62))) : Math.max(12, Math.min(19, Math.round(b.h * k * 0.42)));
    return `<div class="wf wf-fill" style="width:${width}px;aspect-ratio:${W}/${s.h}">` + s.boxes.map(b => {
      const pos = `left:${pct(b.x, W)};top:${pct(b.y, s.h)};width:${pct(b.w, W)};height:${pct(b.h, s.h)}`;
      if (b.k === 'asset') {
        const a = assetOf[b.a];
        return `<div class="wf-asset" style="${pos}">` + (b.quiet ? '' : `<b>${b.a} ${esc(a.name)}</b><em>${esc(a.spec)}</em>`) + `</div>`;
      }
      const text = b.fill || b.t, centred = !b.left && Math.abs(b.x + b.w / 2 - W / 2) < 40;
      return `<div class="wf-${b.k}${b.primary ? ' primary' : ''}${b.fill ? ' has' : ''}${centred ? '' : ' left'}" style="${pos}">` +
        (text ? `<span style="font-size:${fs(b)}px">${esc(text)}</span>` : '') + `</div>`;
    }).join('') + `</div>`;
  };
  // widest width (px) at which a segment still fits inside a box
  const fitWidth = (id, maxW, maxH) => Math.min(maxW, Math.floor(maxH * W / seg(id).h));

  // the whole L1 page as one strip: each segment below a label band; y positions in page px (1440 wide)
  const LABEL = 56;
  const stack = () => { let y = 0; return S.wireframe.segments.map(s => { const o = { id: s.id, label: y, y: y + LABEL, h: s.h }; y += LABEL + s.h; return o; }); };
  const stackHeight = () => S.wireframe.segments.reduce((a, s) => a + LABEL + s.h, 0);

  return { css, segment, filled, fitWidth, height: id => seg(id).h, stack, stackHeight, LABEL };
})();
