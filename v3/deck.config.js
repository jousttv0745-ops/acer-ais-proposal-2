/* deck.config.js — AIS proposal v3 (Level 1 landing page spec). Spec text lives in spec-data.js. */
window.DECK = {
  meta: {
    title: 'AIS Landing Page Spec v3',
    brand: '<b>Acer Intelligence Space</b> · Landing Page Spec',
    note: '說明文字為草稿',
    noneLabel: '無此區塊',
  },
  theme: {},
  chapters: ['00 Recap', '01 Roadmap', '02 Benchmark', '03 L1 Spec', '04 L2 · L3', 'Summary'],
  categories: [],
  frameCategory: 'frame',
  pages: {},
  regions: {},
  cycleMs: 2200,
  steps: d => [
    d.cover({ kicker: 'PROPOSAL v3 · 2026.09', title: 'Acer Intelligence Space', subtitle: 'Landing Page Spec — Level 1',
      chips: [['00', 'Recap'], ['01', 'Roadmap'], ['02', 'Benchmark'], ['03', 'L1 Spec'], ['04', 'L2 · L3']] }),
  ],
};
