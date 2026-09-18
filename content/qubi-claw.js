// Qubi → Qubi Claw banner.
// The source video (images/qubi-claw.mp4, 1408×624) has its own stage background, and Qubi travels left and grows
// while it jumps. Each frame is cut out here (light, low-saturation pixels reachable from the frame edge are stage;
// only character-sized pieces are kept) and drawn over the green banner, with the travel and growth between take-off
// and landing eased out, so Qubi jumps up in place and lands where it started.
// On its own the page plays on load; inside the proposal deck it rewinds on { deck: 'qubi', at: 'start' } and plays
// on { at: 'land' }.
(() => {
  const canvas = document.querySelector('.qubi canvas');
  if (!canvas) return;
  const out = canvas.getContext('2d');
  const video = document.createElement('video');
  video.src = 'images/qubi-claw.mp4'; video.muted = true; video.playsInline = true; video.preload = 'none';

  // frame area that can contain the characters (video px)
  const CX = 300, CY = 0, CW = 820, CH = 624;
  // lighter processing on phones
  const lite = matchMedia('(pointer: coarse)').matches || (() => { try { return parent.document.documentElement.classList.contains('lite'); } catch { return false; } })();
  const K = lite ? 0.5 : 1, W = Math.round(CW * K), H = Math.round(CH * K);
  const work = document.createElement('canvas'); work.width = W; work.height = H;
  const wx = work.getContext('2d', { willReadFrequently: true });

  // Qubi's feet: (947, 503) before the jump, (557, 582) after landing, 1.35× bigger → pin both to the banner spot
  const T1 = 1.25, T2 = 2.9, FROM = [947, 503], TO = [557, 582], GROW = 1.35;
  // banner px (1440×625): the original Qubi's spot, nudged right so the lobster clears the copy.
  // Narrow screens crop the artwork to its middle behind the copy: Qubi stands just right of centre, lobster still in view.
  const place = () => canvas.clientWidth && canvas.clientWidth < 600 ? { SCALE: 1.1, SPOT: [740, 605] } : { SCALE: 1.35, SPOT: [1195, 588] };
  const ease = t => { const u = Math.min(1, Math.max(0, (t - T1) / (T2 - T1))); return u * u * (3 - 2 * u); };

  function cutOut() {
    const img = wx.getImageData(0, 0, W, H), d = img.data, n = W * H;
    const stage = new Uint8Array(n), bg = new Uint8Array(n);
    for (let i = 0, p = 0; i < n; i++, p += 4) {
      const r = d[p], g = d[p + 1], b = d[p + 2];
      stage[i] = 0.3 * r + 0.59 * g + 0.11 * b >= 214 && Math.max(r, g, b) - Math.min(r, g, b) <= 22 ? 1 : 0;
    }
    const stack = [];
    for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
    for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
    while (stack.length) {
      const i = stack.pop();
      if (bg[i] || !stage[i]) continue;
      bg[i] = 1;
      const x = i % W;
      if (x > 0) stack.push(i - 1);
      if (x < W - 1) stack.push(i + 1);
      if (i >= W) stack.push(i - W);
      if (i < n - W) stack.push(i + W);
    }
    // keep character-sized pieces; drop stage lines (thin, wide, or touching the side/bottom edges)
    const label = new Int32Array(n), keep = new Uint8Array(1 << 16);
    let id = 0;
    for (let s = 0; s < n; s++) {
      if (bg[s] || label[s]) continue;
      id = (id + 1) & 0xffff || 1;
      let area = 0, x0 = W, x1 = 0, y0 = H, y1 = 0;
      const q = [s]; label[s] = id;
      while (q.length) {
        const i = q.pop(); area++;
        const x = i % W, y = (i / W) | 0;
        if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
        if (x > 0 && !bg[i - 1] && !label[i - 1]) { label[i - 1] = id; q.push(i - 1); }
        if (x < W - 1 && !bg[i + 1] && !label[i + 1]) { label[i + 1] = id; q.push(i + 1); }
        if (i >= W && !bg[i - W] && !label[i - W]) { label[i - W] = id; q.push(i - W); }
        if (i < n - W && !bg[i + W] && !label[i + W]) { label[i + W] = id; q.push(i + W); }
      }
      const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
      keep[id] = area >= 500 * K * K && bw <= 430 * K && bh <= 470 * K && area / (bw * bh) > 0.12 &&
        x0 > 0 && x1 < W - 1 && y1 < H - 1 ? 1 : 0;
    }
    for (let i = 0, p = 3; i < n; i++, p += 4) {
      if (bg[i] || !keep[label[i]]) { d[p] = 0; continue; }
      // soften the outline a little
      const x = i % W;
      const edge = (x > 0 && bg[i - 1]) || (x < W - 1 && bg[i + 1]) || (i >= W && bg[i - W]) || (i < n - W && bg[i + W]);
      d[p] = edge ? 150 : 255;
    }
    wx.putImageData(img, 0, 0);
  }

  function draw(source, t) {
    wx.clearRect(0, 0, W, H);
    wx.drawImage(source, CX, CY, CW, CH, 0, 0, W, H);
    cutOut();
    const e = ease(t);
    const ax = FROM[0] + (TO[0] - FROM[0]) * e, ay = FROM[1] + (TO[1] - FROM[1]) * e;
    const { SCALE, SPOT } = place();
    const s = SCALE / (1 + (GROW - 1) * e);
    out.setTransform(1, 0, 0, 1, 0, 0);
    out.clearRect(0, 0, canvas.width, canvas.height);
    out.setTransform(s, 0, 0, s, SPOT[0] - ax * s, SPOT[1] - ay * s);
    out.imageSmoothingQuality = 'high';
    out.drawImage(work, CX, CY, CW, CH);
  }

  // first frame before anything plays
  const poster = new Image();
  poster.onload = () => { if (video.paused && !video.currentTime) draw(poster, 0); };
  poster.src = 'images/qubi-claw-poster.jpg';

  let running = false;
  const tick = () => {
    if (!running) return;
    draw(video, video.currentTime);
    if (video.ended) { running = false; return; }
    video.requestVideoFrameCallback ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
  };
  const play = () => {
    video.preload = 'auto';
    video.currentTime = 0;
    video.play().then(() => { if (!running) { running = true; tick(); } }).catch(() => {});
  };
  const rewind = () => {
    running = false;
    video.pause();
    if (poster.complete && poster.naturalWidth) draw(poster, 0);
  };

  if (window.parent === window) play();
  addEventListener('message', e => {
    if (e.source !== window.parent || e.data?.deck !== 'qubi') return;
    if (e.data.at === 'start') rewind(); else play();
  });
})();
