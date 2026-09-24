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
  `;

  // one segment at a CSS width; its height follows the segment's aspect ratio
  const segment = (id, width) => {
    const s = seg(id);
    return `<div class="wf" style="width:${width};aspect-ratio:${W}/${s.h}">` + s.boxes.map(b =>
      `<div class="wf-${b.k}${b.primary ? ' primary' : ''}" style="left:${pct(b.x, W)};top:${pct(b.y, s.h)};width:${pct(b.w, W)};height:${pct(b.h, s.h)}">` +
      (b.t ? `<span>${esc(b.t)}</span>` : '') +
      (b.a && !b.quiet ? `<b>${b.a} ${esc(assetName[b.a])}</b>` : '') + `</div>`).join('') + `</div>`;
  };
  // widest width (px) at which a segment still fits inside a box
  const fitWidth = (id, maxW, maxH) => Math.min(maxW, Math.floor(maxH * W / seg(id).h));

  return { css, segment, fitWidth, height: id => seg(id).h };
})();
