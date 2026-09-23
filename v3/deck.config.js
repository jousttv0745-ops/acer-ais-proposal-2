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
  categories: [
    { key: 'brand', name: '網頁定位', color: '#83b81a', desc: '兩家第一屏都先立 AI 的角色：Apple 是 Siri，Samsung 是 AI companion' },
    { key: 'feature', name: '功能介紹', color: '#3b82f6', desc: 'Apple 用情境章節拉長篇幅，Samsung 用分頁壓縮在一屏' },
    { key: 'security', name: '資訊安全', color: '#f59e0b', desc: '兩家都在選機前處理隱私疑慮（L1 本版不做此段）' },
    { key: 'hardware', name: '硬體導流', color: '#ef4444', desc: '兩家都依裝置類別選機；Apple 另附相容晶片清單' },
    { key: 'seo', name: 'SEO（FAQ）', color: '#8b5cf6', desc: 'Samsung 用 FAQ 集中免責與長尾；Apple 只有註腳' },
    { key: 'frame', name: '網站框架', color: '#9ca3af', desc: 'Header、Footer 與註解' },
  ],
  frameCategory: 'frame',

  pages: {
    apple: {
      kind: 'image', src: 'content/apple/apple-ai.png', srcLite: 'content/apple/apple-ai.lite.png', liteScale: 0.5, w: 1920, h: 12399,
      label: 'Apple Intelligence', url: 'apple.com/tw/apple-intelligence',
      // cats: brand = Hero + SDK；feature = 精選 + Siri AI + 情境章節 + 更多精彩；security = 隱私；hardware = 選機 + 相容清單；frame = [0, NAV] 與 註腳 · 頁尾
      cats: { brand: [[100, 980], [10630, 630]], feature: [[1080, 6620]],
        security: [[7700, 880]], hardware: [[8580, 2050]], frame: [[0, 100], [11260, 1139]] },
      bands: [['Hero', 100, 980], ['精選', 1080, 920], ['Siri AI', 2000, 1140, 'green'], ['情境章節', 3140, 3940], ['更多精彩', 7080, 620],
        ['隱私', 7700, 880], ['選機', 8580, 1150], ['相容清單', 9730, 900], ['SDK', 10630, 630], ['註腳 · 頁尾', 11260, 1139]],
      marks: {
        hero: [[780, 135, 360, 190], [865, 360, 195, 455]],
        siri: [[255, 2135, 330, 155], [325, 2480, 1165, 570]],
        compat: [[620, 10015, 215, 35]],
      },
    },
    samsung: {
      kind: 'image', src: '../content/screenshot/samsung_ai_html.png', srcLite: '../content/screenshot/samsung_ai_html.lite.png', liteScale: 0.5, w: 1920, h: 11760,
      label: 'Samsung Galaxy AI', url: 'samsung.com/us/galaxy-ai',
      cats: { brand: [[232, 1508]], feature: [[1740, 2220]], security: [[4060, 960]], hardware: [[5040, 640], [5760, 1020]], seo: [[6800, 1650]], frame: [[0, 232], [8450, 3310]] },
      bands: [['Opening', 232, 1508], ['Scenario', 1740, 1250], ['AI Companion', 3040, 920], ['Recommendation', 5040, 1740], ['FAQ', 6800, 1650], ['Footnotes · Footer', 8450, 3310]],
      marks: {
        branding: [[430, 285, 1060, 330], [0, 640, 1920, 1095]],
        scenario: [[440, 1790, 1040, 120], [460, 2020, 1000, 80], [40, 2120, 1840, 880]],
        core: [[90, 3260, 820, 400], [1180, 3160, 520, 650]],
        selling: [[30, 5170, 1860, 480], [640, 5920, 640, 90], [0, 6020, 1920, 740]],
      },
      // the two scenario images of the Personalization tab (screenshot px)
      tints: { scenes: [[47, 2140, 855, 630], [996, 2140, 855, 630]] },
    },
  },

  // spot = highlighted block, focus = what the camera frames when zooming in
  regions: {
    apple: {
      hero: { spot: [0, 100, 1920, 980], focus: [0, 60, 1920, 1060] },
      siri: { spot: [0, 2000, 1920, 1140], focus: [0, 1960, 1920, 1220] },
      scenario: { spot: [0, 3140, 1920, 3940], focus: [0, 3140, 1920, 3940] },
      select: { spot: [0, 8580, 1920, 1150], focus: [0, 8540, 1920, 1230] },
      compat: { spot: [0, 9730, 1920, 900], focus: [0, 9690, 1920, 980] },
    },
    samsung: {
      branding: { spot: [0, 232, 1920, 1508], focus: [0, 200, 1920, 1560] },
      scenario: { spot: [0, 1740, 1920, 1250], focus: [0, 1720, 1920, 1300] },
      core: { spot: [0, 3100, 1920, 860], focus: [0, 3060, 1920, 940] },
      selling: { spot: [0, 5040, 1920, 1740], focus: [0, 5000, 1920, 1820] },
      faq: { spot: [0, 6800, 1920, 1650], focus: [0, 6760, 1920, 1730] },
    },
  },
  cycleMs: 2200,
  steps: d => {
    const S = window.SPEC, R = window.DECK.regions;
    const STYLE = `<style>
      .road{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;align-items:end;margin-top:30px}
      .road div{position:relative;padding:26px 26px 24px;border:1px solid var(--line);border-radius:16px;background:#fff}
      .road div:nth-child(1){height:250px}.road div:nth-child(2){height:330px}.road div:nth-child(3){height:410px}.road div:nth-child(4){height:490px}
      .road b{font:800 44px Montserrat,sans-serif;color:var(--green-d)}
      .road strong{display:block;margin-top:8px;font-size:28px}
      .road span{display:block;margin-top:10px;font-size:20px;line-height:1.55;color:var(--muted)}
      .road i{position:absolute;top:-18px;left:22px;padding:4px 14px;border-radius:999px;font:700 16px 'Noto Sans TC',sans-serif;font-style:normal}
      .road .now i{background:#9ca3af;color:#fff}
      .road .go{background:var(--green);border-color:var(--green)}
      .road .go b,.road .go strong,.road .go span{color:#fff}
      .road .go i{background:#f59e0b;color:#fff}
      .road .dir{border-style:dashed}
      .road .dir i{background:var(--green-soft);color:var(--green-d)}
    </style>`;
    return [
      d.cover({ kicker: 'PROPOSAL v3 · 2026.09', title: 'Acer Intelligence Space', subtitle: 'Landing Page Spec — Level 1',
        chips: [['00', 'Recap'], ['01', 'Roadmap'], ['02', 'Benchmark'], ['03', 'L1 Spec'], ['04', 'L2 · L3']] }),

      // ===== 00 Recap =====
      d.panel(0, 130,
        `<h3>v1 報告後的<em>四個調整</em></h3>` +
        d.table(['回饋', '本版'], [
          ['01', 'Benchmark 改做 Apple Intelligence 與 Samsung，含 assets 與敘事包裝', '02 Benchmark：版面、Assets、敘事，章末附兩家 spec'],
          ['02', '不提 mockup，只出 spec', '03 L1 Spec：每段寫目標、素材、比例、範圍、資產、敘事'],
          ['03', '可落地：L1 分類頁／L2 產品頁／L3 商城', '01 Roadmap：本版定案 L1，L2／L3 寫方向'],
          ['04', '參照 Apple 怎麼擺 Siri', '02 Benchmark：Siri ↔ Qubi 專頁'],
        ], '120px 1fr 1fr') +
        `<p class="note">v1：Benchmark → Opening → Scenario → AI Companion → Recommendation → Recommendation logic（<a href="../" target="_blank" rel="noopener">開啟 v1</a>）</p>`),

      // ===== 01 Roadmap =====
      d.panel(1, 120, STYLE +
        `<h3>我們在哪裡：從 <em>L0</em> 走到 <em>L1</em></h3>` +
        `<div class="road">` +
          `<div class="now"><i>● 現在</i><b>L0</b><strong>AIS 功能介紹頁</strong><span>一頁介紹 app 功能<br>導流終點：下載</span></div>` +
          `<div class="go"><i>▶ 本次定案</i><b>L1</b><strong>AIS 品牌 landing page</strong><span>AIS＋Qubi 一頁講完<br>依裝置類別 → acer.com 分類頁</span></div>` +
          `<div class="dir"><i>方向</i><b>L2</b><strong>產品頁 AIS 區塊</strong><span>這台能用哪些 AIS app<br>導流終點：單一機型</span></div>` +
          `<div class="dir"><i>方向 · v1 已試做</i><b>L3</b><strong>商城情境推薦</strong><span>情境 → 推薦 SKU<br>導流終點：購買</span></div>` +
        `</div>`),
    ];
  },
};
