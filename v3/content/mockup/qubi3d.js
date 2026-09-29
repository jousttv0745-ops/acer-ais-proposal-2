// Qubi as a real-time 3D character (three.js), modelled on the Acer Qubi in qubi-claw-poster.jpg (before the lobster
// suit): a big rounded white head with two antennae, a grey glass visor with pale cyan arch eyes, headphone ear pods
// with glowing cyan rings, a barrel body with the black "ai" badge, jointed arms with little grippers, stubby legs.
// It renders on a transparent canvas laid over the page, in page pixels (orthographic camera, y down), so a hero
// page can place it next to photos and type. Every action returns a promise, so a page scripts a scene with await.
//
//   const stage = createStage(canvas);                  // 1440×810 by default
//   const q = stage.add({ x: 700, y: 620, size: 260 }); // feet at (700, 620) page px, 260 px tall incl. antennae
//   await q.walkTo(900); await q.wave(); q.jumpTo(1000, 600);
import * as THREE from 'three';

import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// inside the deck (?deck) the pages drop their direction tag
if (new URLSearchParams(location.search).has('deck')) document.documentElement.classList.add('deck');

const CYAN = 0xc8faf4, RING = 0x6fe0dc;
const H_MODEL = 1.44;                       // model height in units, feet to antenna tips
const ease = {
  linear: t => t,
  inOut: t => t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2,
  out: t => 1 - (1 - t) ** 3,
  in: t => t * t * t,
  back: t => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2,   // gentle overshoot
};
const lerp = (a, b, t) => a + (b - a) * t;

// the black "ai" badge on the chest
function badgeTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#1b1d21'; x.beginPath(); x.arc(128, 128, 122, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#fff'; x.font = '700 150px Montserrat, Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText('ai', 122, 140);
  x.beginPath(); x.moveTo(178, 52); x.lineTo(186, 70); x.lineTo(204, 78); x.lineTo(186, 86); x.lineTo(178, 104);   // sparkle over the i
  x.lineTo(170, 86); x.lineTo(152, 78); x.lineTo(170, 70); x.closePath(); x.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
function glowTexture(rgb) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, `rgba(${rgb},.9)`); g.addColorStop(.35, `rgba(${rgb},.35)`); g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
// eye: a rectangle with a rounded top, flat-ish bottom
function eyeGeometry(w = .16, h = .19) {
  const s = new THREE.Shape(), r = w * .42, b = .02, x0 = -w / 2, y0 = -h / 2;
  s.moveTo(x0 + b, y0); s.lineTo(-x0 - b, y0); s.quadraticCurveTo(-x0, y0, -x0, y0 + b);
  s.lineTo(-x0, -y0 - r); s.quadraticCurveTo(-x0, -y0, -x0 - r, -y0); s.lineTo(x0 + r, -y0);
  s.quadraticCurveTo(x0, -y0, x0, -y0 - r); s.lineTo(x0, y0 + b); s.quadraticCurveTo(x0, y0, x0 + b, y0);
  return new THREE.ShapeGeometry(s, 12);
}

class Qubi {
  constructor(stage, { x = 0, y = 0, size = 260, yaw = 0 } = {}) {
    this.stage = stage; this.tw = []; this.time = 0;
    this.walkAmt = 0; this.walking = false; this.phase = 0; this.nextBlink = 1.2;
    const white = new THREE.MeshPhysicalMaterial({ color: 0xf4f5f6, roughness: .28, clearcoat: 1, clearcoatRoughness: .1 });
    const joint = new THREE.MeshPhysicalMaterial({ color: 0xc9ced4, roughness: .35, clearcoat: .6 });
    const dark = new THREE.MeshPhysicalMaterial({ color: 0x2b2f35, roughness: .3, clearcoat: .8 });
    const visorMat = new THREE.MeshPhysicalMaterial({ color: 0x565c64, roughness: .16, clearcoat: 1, clearcoatRoughness: .05 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: CYAN, toneMapped: false });
    const ringMat = new THREE.MeshBasicMaterial({ color: RING, toneMapped: false });
    const G = () => new THREE.Group();

    // root: ground position (page px) + scale; lift: jump height; yawG: facing; tiltG: slight top-down view; squash
    this.root = G(); this.lift = G(); this.yawG = G(); this.tiltG = G(); this.squash = G();
    this.root.add(this.lift); this.lift.add(this.yawG); this.yawG.add(this.tiltG); this.tiltG.add(this.squash);
    this.tiltG.rotation.x = .14;
    this.setSize(size); this.place(x, y); this.yawG.rotation.y = yaw;

    // soft contact shadow, stays on the ground
    this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: glowTexture('0,0,0'), transparent: true, opacity: .32, depthWrite: false }));
    this.shadow.scale.set(.95, .15, 1); this.shadow.position.set(0, .01, -.6); this.root.add(this.shadow);

    // legs: short and round, dark soles
    this.legs = [-1, 1].map(s => {
      const hip = G(); hip.position.set(s * .1, .15, 0);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(.075, .08, .1, 24), white); leg.position.y = -.05;
      const foot = new THREE.Mesh(new THREE.SphereGeometry(.095, 24, 16), white); foot.scale.set(1, .55, 1.2); foot.position.set(0, -.1, .02);
      const sole = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, .02, 24), dark); sole.scale.z = 1.2; sole.position.set(0, -.14, .02);
      hip.add(leg, foot, sole); this.squash.add(hip); return hip;
    });

    // body: a rounded barrel with the "ai" badge
    const prof = [[0, .1], [.16, .1], [.2, .12], [.215, .17], [.22, .27], [.21, .37], [.18, .43], [.12, .465], [0, .47]]
      .map(([r, y]) => new THREE.Vector2(r, y));
    const body = new THREE.Mesh(new THREE.LatheGeometry(new THREE.SplineCurve(prof).getPoints(40), 64), white);
    this.body = G(); this.body.add(body); this.squash.add(this.body);
    const badge = new THREE.Mesh(new THREE.CylinderGeometry(.226, .227, .24, 48, 1, true, -.56, 1.12),
      new THREE.MeshPhysicalMaterial({ map: badgeTexture(), transparent: true, roughness: .2, clearcoat: 1, depthWrite: false }));
    badge.position.y = .27; this.body.add(badge);

    // arms: shoulder joint, upper arm out to the side, elbow, forearm down, a two-finger gripper
    this.arms = [-1, 1].map(s => {
      const sh = G(); sh.position.set(s * .2, .4, 0); sh.rotation.z = s * .7; sh.userData.rest = s * .7;
      const ball = new THREE.Mesh(new THREE.SphereGeometry(.05, 20, 14), joint);
      const upper = new THREE.Mesh(new THREE.CapsuleGeometry(.048, .07, 6, 16), white); upper.position.y = -.07;
      const el = G(); el.position.y = -.14; el.rotation.z = -s * .75; sh.userData.el = el;
      const elBall = new THREE.Mesh(new THREE.SphereGeometry(.042, 20, 14), joint);
      const fore = new THREE.Mesh(new THREE.CapsuleGeometry(.05, .06, 6, 16), white); fore.position.y = -.07;
      const hand = G(); hand.position.y = -.14;
      [-1, 1].forEach(f => {
        const finger = new THREE.Mesh(new THREE.CapsuleGeometry(.02, .05, 4, 10), white);
        finger.position.set(f * .025, -.03, 0); finger.rotation.z = f * .35; hand.add(finger);
      });
      el.add(elBall, fore, hand); sh.add(ball, upper, el); this.body.add(sh); return sh;
    });

    // head
    this.neck = G(); this.neck.position.y = .46; this.squash.add(this.neck);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(.08, .1, .06, 24), joint); neck.position.y = .01; this.neck.add(neck);
    this.head = G(); this.neck.add(this.head);
    const skullGeo = new RoundedBoxGeometry(1, .82, .86, 12, .38), skull = new THREE.Mesh(skullGeo, white); skull.position.y = .42; this.head.add(skull);
    // the visor is a shrunken copy of the skull pushed forward, so it follows the head's curve and sinks in at the edges
    const visor = new THREE.Mesh(skullGeo, visorMat); visor.scale.set(.9, .66, 1); visor.position.set(0, .41, .09); this.head.add(visor);
    this.eyes = [-1, 1].map(s => {
      const e = G(); e.position.set(s * .17, .41, .55); e.rotation.y = s * .1;
      e.add(new THREE.Mesh(eyeGeometry(), eyeMat));
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('150,240,235'), transparent: true, opacity: .45, depthWrite: false, blending: THREE.AdditiveBlending }));
      glow.scale.set(.34, .36, 1); glow.position.z = .07; e.add(glow);
      this.head.add(e); return e;
    });
    // headphone ear pods: dark shell, glowing cyan rings
    [-1, 1].forEach(s => {
      const turn = G(); turn.position.set(s * .47, .4, -.02); turn.rotation.y = -s * .38; this.head.add(turn);
      const pod = G(); pod.position.x = s * .03; pod.rotation.z = -s * Math.PI / 2; turn.add(pod);
      pod.add(new THREE.Mesh(new THREE.CylinderGeometry(.175, .185, .12, 48), dark));
      const face = new THREE.Mesh(new THREE.CylinderGeometry(.14, .14, .02, 48), new THREE.MeshPhysicalMaterial({ color: 0xe8fbf9, roughness: .2, clearcoat: 1 }));
      face.position.y = .065; pod.add(face);
      [.125, .085].forEach(r => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(r, .014, 12, 48), ringMat); ring.rotation.x = Math.PI / 2; ring.position.y = .078; pod.add(ring);
      });
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .03, 32), joint); hub.position.y = .08; pod.add(hub);
    });
    // antennae
    [-1, 1].forEach(s => {
      const a = G(); a.position.set(s * .16, .8, .02); a.rotation.z = -s * .12; this.head.add(a);
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(.011, .014, .16, 10), joint); rod.position.y = .08;
      const tip = new THREE.Mesh(new THREE.SphereGeometry(.024, 14, 10), joint); tip.position.y = .165;
      a.add(rod, tip);
    });
    stage.scene.add(this.root);
  }

  setSize(px) { this.size = px; this.k = px / H_MODEL; this.root.scale.setScalar(this.k); }
  place(x, y) { this.x = x; this.y = y; this.root.position.set(x, -y, 0); }

  // ---- tweening ----
  tween(dur, fn, e = ease.inOut) {
    return new Promise(res => this.tw.push({ t: 0, dur: Math.max(dur, .001), fn, e, res }));
  }
  wait(s) { return this.tween(s, () => {}); }
  stop() { this.tw.length = 0; this.walking = false; }
  // back to the neutral standing pose at (x, y)
  reset(x = this.x, y = this.y, yaw = 0) {
    this.stop(); this.walkAmt = 0; this.place(x, y); this.lift.position.y = 0; this.yawG.rotation.y = yaw;
    this.squash.scale.set(1, 1, 1); this.head.rotation.set(0, 0, 0); this.neck.rotation.set(0, 0, 0);
    this.arms.forEach((a, i) => { a.rotation.set(0, 0, a.userData.rest); a.userData.el.rotation.z = (i ? -1 : 1) * .75; }); this.legs.forEach(l => l.rotation.set(0, 0, 0));
    this.eyes.forEach(e => e.scale.set(1, 1, 1)); this.root.visible = true;
  }

  // ---- actions ----
  face(yaw, dur = .35) { const a = this.yawG.rotation.y; return this.tween(dur, t => { this.yawG.rotation.y = lerp(a, yaw, t); }); }
  moveTo(x, y, dur = 1, e = ease.inOut) {
    const x0 = this.x, y0 = this.y; return this.tween(dur, t => this.place(lerp(x0, x, t), lerp(y0, y, t)), e);
  }
  async walkTo(x, { speed = 240, y = this.y, turnBack = true } = {}) {
    const dx = x - this.x; if (Math.abs(dx) < 1) return;
    await this.face(Math.sign(dx) * .95, .3);
    this.walking = true;
    const x0 = this.x, y0 = this.y;
    await this.tween(Math.hypot(dx, y - y0) / speed, t => this.place(lerp(x0, x, t), lerp(y0, y, t)), ease.linear);
    this.walking = false;
    if (turnBack) await this.face(0, .35);
  }
  async jumpTo(x = this.x, y = this.y, { height = 160, dur = .75 } = {}) {
    const sq = this.squash.scale;
    await this.tween(.14, t => sq.set(lerp(1, 1.08, t), lerp(1, .86, t), lerp(1, 1.08, t)));          // crouch
    const x0 = this.x, y0 = this.y, arms = this.arms.map(a => a.rotation.z);
    await this.tween(dur, u => {
      this.place(lerp(x0, x, u), lerp(y0, y, u));
      this.lift.position.y = height * 4 * u * (1 - u) / this.k;
      const s = Math.sin(Math.PI * u); sq.set(lerp(.96, 1, 1 - s), lerp(1.08, 1, 1 - s), 1);         // stretch in the air
      this.arms.forEach((a, i) => { a.rotation.z = lerp(arms[i], (i ? 1 : -1) * 1.9, s); });
    }, ease.linear);
    this.lift.position.y = 0;
    await this.tween(.1, t => sq.set(lerp(1, 1.12, t), lerp(1, .82, t), lerp(1, 1.12, t)));            // land
    await this.tween(.35, t => {
      sq.set(lerp(1.12, 1, t), lerp(.82, 1, t), lerp(1.12, 1, t));
      this.arms.forEach(a => { a.rotation.z = lerp(a.rotation.z, a.userData.rest, t); });
    }, ease.back);
  }
  hop(height = 60) { return this.jumpTo(this.x, this.y, { height, dur: .45 }); }
  // rise or sink along y without walking (peeking out from behind something)
  rise(y, dur = .9) { return this.moveTo(this.x, y, dur, ease.back); }
  async wave(times = 3, side = 1) {
    const a = this.arms[side > 0 ? 1 : 0], el = a.userData.el, rest = a.userData.rest, up = side * 1.5;
    const bent = -side * .75, open = side * .95;                    // the forearm swings up for the wave
    this.tween(.3, t => { this.head.rotation.z = lerp(0, -side * .12, t); });
    await this.tween(.3, t => { a.rotation.z = lerp(rest, up, t); el.rotation.z = lerp(bent, open, t); }, ease.out);
    await this.tween(.34 * times, t => { el.rotation.z = open + side * .45 * Math.sin(t * times * Math.PI * 2); }, ease.linear);
    this.tween(.3, t => { this.head.rotation.z = lerp(-side * .12, 0, t); });
    await this.tween(.35, t => { a.rotation.z = lerp(up, rest, t); el.rotation.z = lerp(open, bent, t); });
  }
  async nod(times = 2) {
    await this.tween(.32 * times, t => { this.head.rotation.x = .22 * Math.sin(t * times * Math.PI) ** 2; }, ease.linear);
  }
  async tilt(dir = 1, hold = .6) {
    await this.tween(.3, t => { this.head.rotation.z = lerp(0, dir * .22, t); }, ease.out);
    await this.wait(hold);
    await this.tween(.3, t => { this.head.rotation.z = lerp(dir * .22, 0, t); });
  }
  async lookAround() {
    const h = this.head.rotation;
    await this.tween(.4, t => { h.y = lerp(0, -.55, t); });
    await this.wait(.25);
    await this.tween(.6, t => { h.y = lerp(-.55, .55, t); });
    await this.wait(.25);
    await this.tween(.4, t => { h.y = lerp(.55, 0, t); });
  }
  lookAt(yaw, pitch = 0, dur = .4) {
    const h = this.head.rotation, y0 = h.y, p0 = h.x;
    return this.tween(dur, t => { h.y = lerp(y0, yaw, t); h.x = lerp(p0, pitch, t); });
  }
  async point(side = 1) {
    const a = this.arms[side > 0 ? 1 : 0], rest = a.userData.rest;
    this.lookAt(side * .45, 0, .3);
    await this.tween(.3, t => { a.rotation.z = lerp(rest, side * 1.5, t); }, ease.out);
    await this.wait(.8);
    this.lookAt(0, 0, .3);
    await this.tween(.3, t => { a.rotation.z = lerp(side * 1.5, rest, t); });
  }
  blink() {
    return this.tween(.16, t => { const s = 1 - .9 * Math.sin(Math.PI * t); this.eyes.forEach(e => { e.scale.y = s; }); }, ease.linear);
  }
  async dance(beats = 4) {
    await this.tween(.42 * beats, t => {
      const p = t * beats * Math.PI;
      this.squash.rotation.z = .12 * Math.sin(p); this.head.rotation.z = -.1 * Math.sin(p);
      this.lift.position.y = Math.abs(Math.sin(p)) * 26 / this.k;
      this.arms[0].rotation.z = -1.2 - .5 * Math.sin(p); this.arms[1].rotation.z = 1.2 - .5 * Math.sin(p);
    }, ease.linear);
    this.squash.rotation.z = 0; this.head.rotation.z = 0; this.lift.position.y = 0;
    const a0 = this.arms.map(a => a.rotation.z);
    await this.tween(.3, t => this.arms.forEach((a, i) => { a.rotation.z = lerp(a0[i], a.userData.rest, t); }));
  }

  update(dt) {
    this.time += dt;
    for (const w of [...this.tw]) {
      w.t += dt; const u = Math.min(1, w.t / w.dur); w.fn(w.e(u));
      if (u >= 1) { this.tw.splice(this.tw.indexOf(w), 1); w.res(); }
    }
    // walk cycle, blended in and out
    this.walkAmt += ((this.walking ? 1 : 0) - this.walkAmt) * Math.min(1, dt * 10);
    const w = this.walkAmt;
    if (w > .001) {
      this.phase += dt * 11;
      const s = Math.sin(this.phase);
      this.legs[0].rotation.x = .7 * s * w; this.legs[1].rotation.x = -.7 * s * w;
      this.arms[0].rotation.x = -.6 * s * w; this.arms[1].rotation.x = .6 * s * w;
      this.squash.position.y = Math.abs(Math.cos(this.phase)) * .035 * w;
      this.squash.rotation.z = .05 * s * w; this.neck.rotation.z = -.04 * s * w;
    } else {
      this.legs.forEach(l => { l.rotation.x = 0; }); this.arms.forEach(a => { a.rotation.x = 0; });
      this.squash.position.y = 0; this.neck.rotation.z = 0;
    }
    // idle: breathing and blinking
    this.body.scale.y = 1 + .012 * Math.sin(this.time * 2.4);
    this.neck.position.y = .46 + .006 * Math.sin(this.time * 2.4 - .6);
    if ((this.nextBlink -= dt) <= 0) { this.nextBlink = 2.2 + Math.random() * 2.6; this.blink(); }
    // shadow shrinks as Qubi leaves the ground
    const h = this.lift.position.y; this.shadow.material.opacity = .32 / (1 + h * 2.5); this.shadow.scale.x = .95 / (1 + h * .8);
  }
}

export function createStage(canvas, { width = 1440, height = 810 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  const key = new THREE.DirectionalLight(0xffffff, 1.3); key.position.set(-.6, 1, 1.2); scene.add(key);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xdfe3e8, .5));
  // page px: x right, y down (world y = -page y)
  const camera = new THREE.OrthographicCamera(0, width, 0, -height, -4000, 4000); camera.position.z = 2000;
  const actors = [];
  const stage = {
    scene, renderer, camera, actors,
    add(opts) { const q = new Qubi(stage, opts); actors.push(q); return q; },
  };
  let last = performance.now();
  const frame = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    actors.forEach(a => a.update(dt)); renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  return stage;
}

// Loop a scripted scene: `reset()` restores the start state, `scene(wait, live)` runs it with awaits.
// Replays every `loopMs`, or when the deck posts { deck: 'play', at: 'land' }.
export function loopScene(reset, scene, loopMs) {
  let gen = 0, timer;
  const play = () => {
    const g = ++gen; clearTimeout(timer); reset();
    const wait = ms => new Promise(r => setTimeout(() => { if (g === gen) r(); }, ms));
    scene(wait, () => g === gen);
    timer = setTimeout(play, loopMs);
  };
  addEventListener('message', e => {
    if (!e.data) return;
    if (e.data.deck === 'play' && e.data.at === 'land') play();
    if (e.data.deck === 'reset') { gen++; clearTimeout(timer); reset(); }   // back to the first frame, paused
  });
  // inside the deck (?deck) the scene waits at its first frame until the player says play, so it starts only once
  if (new URLSearchParams(location.search).has('deck')) { reset(); parent.postMessage({ deck: 'ready' }, '*'); }
  else play();
}
export { ease };
