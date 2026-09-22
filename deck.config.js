/*
 * deck.config.js — the only file you edit for a new proposal.
 *
 * Coordinates are in the native pixels of each page:
 *   screenshot pages → the PNG's own pixels (use the width you set in `w`)
 *   live HTML pages  → CSS px at the iframe width `w`
 * Rectangles are [x, y, width, height]; category segments are [y, height].
 * Use tools/region-picker.html to measure them.
 *
 * This example is the Acer Intelligence Space landing page proposal.
 */
window.DECK = {
  meta: {
    title: 'AIS Landing Page 提案',
    brand: '<b>Acer Intelligence Space</b> · Landing Page Mockup',
    note: '說明文字為草稿',
    noneLabel: '無此區塊',
  },

  // optional CSS variable overrides, e.g. { green: '#0071c5', 'green-d': '#004f8a', 'green-soft': '#e8f2fb' }
  theme: {},

  // top-bar chapter buttons; steps refer to them by index (cover uses -1)
  chapters: ['00 Benchmark', '01 Opening', '02 Scenario', '03 AI Companion', '04 Recommendation', '05 Recommendation logic', 'Summary'],

  // benchmark categories, in the order they are presented
  categories: [
    { key: 'brand', name: '網頁定位', color: '#83b81a', desc: '第一屏都在一開場就介紹了自家品牌' },
    { key: 'feature', name: '功能介紹', color: '#3b82f6', desc: 'Samsung 的功能介紹占比最低，而 ASUS StoryCube 高達 80%' },
    { key: 'security', name: '資訊安全', color: '#f59e0b', desc: 'Samsung 獨有的資安說明' },
    { key: 'hardware', name: '硬體導流', color: '#ef4444', desc: 'Samsung、Lenovo 都有導流硬體，而 ASUS StoryCube 完全沒有' },
    { key: 'seo', name: 'SEO（FAQ）', color: '#8b5cf6', desc: 'Samsung 用 FAQ 來達成 SEO 效果' },
    { key: 'frame', name: '網站框架', color: '#9ca3af', desc: 'Header、Footer 與註解' },
  ],
  frameCategory: 'frame', // this category aligns to its LAST segment (the footer)

  pages: {
    // today's Acer Intelligence Space page (captured 2026-09-21, 1440px wide)
    aisNow: { kind: 'image', src: 'content/recommend/ais-now.jpg', srcLite: 'content/recommend/ais-now.lite.jpg', liteScale: 0.5, w: 1440, h: 8060,
      label: 'Acer Intelligence Space', url: 'acer.com/tw-zh/ai/acer-intelligence-space',
      bands: [['Opening (w/ CTA)', 0, 1180], ['Meeting Assistant', 1180, 960, 'green'], ['AI Agent', 2140, 980, 'green'], ['AI Drawing', 3120, 960, 'green'],
        ['Creator Space', 4080, 960, 'green'], ['ProCam', 5040, 960, 'green'], ['Game Assistant', 6000, 980, 'green'], ['Footer', 6980, 1080]] },
    // 05 recommendation logic: source captures, 1440px wide (captured 2026-09-18)
    recJson: { kind: 'image', src: 'content/recommend/json.jpg', srcLite: 'content/recommend/json.lite.jpg', liteScale: 0.5, w: 1440, h: 1902,
      label: 'App-list.json', url: 'global-download.acer.com/…/App-list.json',
      marks: { req: [[12, 1540, 1416, 287]] } },
    recApps: { kind: 'image', src: 'content/recommend/apptable.jpg', srcLite: 'content/recommend/apptable.lite.jpg', liteScale: 0.5, w: 1440, h: 2413,
      label: 'AIS App 規格表', url: 'output 1',
      marks: { qubi: [[521, 252, 398, 360], [919, 252, 250, 360]] } },
    recStore: { kind: 'image', src: 'content/recommend/store.jpg', srcLite: 'content/recommend/store.lite.jpg', liteScale: 0.5, w: 1440, h: 2600,
      label: 'Acer 官方商城', url: 'store.acer.com/zh-tw/laptops',
      marks: { card: [[352, 1268, 256, 132], [352, 1500, 256, 232]] } },
    recCompat: { kind: 'image', src: 'content/recommend/compat.jpg', srcLite: 'content/recommend/compat.lite.jpg', liteScale: 0.5, w: 1440, h: 2600,
      label: 'Qubi × AIS 相容機種', url: 'output 2',
      marks: { rows: [[397, 792, 152, 326], [549, 792, 437, 326]] } },
    samsung: {
      kind: 'image', src: 'content/screenshot/samsung_ai_html.png', srcLite: 'content/screenshot/samsung_ai_html.lite.png', liteScale: 0.5, w: 1920, h: 11760,
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
    lenovo: {
      kind: 'image', src: 'content/lenovo_960.png', srcLite: 'content/lenovo_480.lite.png', liteScale: 0.25, w: 1920, h: 11053,
      label: 'Lenovo AI Apps', url: 'lenovo.com/ai-applications',
      cats: { brand: [[420, 756]], feature: [[1176, 6904]], hardware: [[8140, 1280]], frame: [[0, 420], [9420, 1633]] },
    },
    asus: {
      kind: 'image', src: 'content/asus_960.png', srcLite: 'content/asus_480.lite.png', liteScale: 0.25, w: 1920, h: 15873,
      label: 'ASUS StoryCube', url: 'asus.com/proart/storycube',
      cats: { brand: [[160, 1690]], feature: [[1850, 12630]], frame: [[0, 160], [14480, 1393]] },
    },
    // the samsung screenshot's scenario block (page y 1720–3020), 2-card tab and 3-card tab, annotated
    samsungLayout: {
      kind: 'frames', w: 1920, h: 1300, label: 'Samsung Galaxy AI', url: 'samsung.com/us/galaxy-ai',
      defaultFrame: 'two',
      frames: {
        two: { src: 'content/samsung-scenario/layout.html?n=2', label: '2 張版' },
        three: { src: 'content/samsung-scenario/layout.html?n=3', label: '3 張版' },
      },
    },
    acer: {
      kind: 'frames', w: 1440, h: 4051, label: 'Acer AIS', url: 'acer.com/tw-zh/ai-pc（mockup）',
      defaultFrame: 'business',
      frames: {
        personal: { src: 'content/acer-ai-pc-personal.html', label: '個人化' },
        business: { src: 'content/acer-ai-pc.html', label: '商務' },
        // p22 / p23: the two Qubi copy options still to be decided
        qubiA: { src: 'content/acer-ai-pc.html?qubi=a', label: '商務 · 方案 A' },
        qubiB: { src: 'content/acer-ai-pc.html?qubi=b', label: '商務 · 方案 B' },
        creative: { src: 'content/acer-ai-pc-creative.html', label: '創意' },
        gaming: { src: 'content/acer-ai-pc-gaming.html', label: '遊戲' },
      },
      bands: [['Opening', 109, 696], ['Scenario', 805, 741], ['AI Companion', 1546, 619], ['Recommendation', 2165, 1477], ['FAQ', 3642, 409]],
      marks: {
        branding: [[42, 178, 412, 232], [460, 168, 980, 490], [42, 560, 412, 58]],
        // two points: the scenario tabs, then each card as a whole (image + its copy)
        scenario: [[470, 1002, 500, 64], [176, 1086, 1072, 470]],
        core: [[90, 1737, 720, 340], [815, 1792, 610, 360]],
        // recommendation: product cards first, then the AI app table and the download strip
        selling: [[128, 2432, 384, 529], [520, 2432, 776, 529]],
        details: [[128, 2977, 1168, 481], [128, 3466, 1168, 103]],
              },
    },
  },

  // spot = highlighted block, focus = what the camera frames when zooming in
  regions: {
    aisNow: { hero: { spot: [0, 330, 1440, 850], focus: [0, 0, 1440, 1180] } },
    recJson: { req: { spot: [0, 1535, 1440, 297], focus: [0, 1440, 1440, 480] } },
    recApps: { qubi: { spot: [101, 212, 1238, 404], focus: [101, 212, 1238, 404] } },
    recStore: { card: { spot: [340, 1020, 1090, 760], focus: [340, 1020, 1090, 760] } },
    recCompat: { rows: { spot: [100, 680, 1240, 440], focus: [100, 680, 1240, 440] } },
    samsung: {
      branding: { spot: [0, 232, 1920, 1508], focus: [0, 200, 1920, 1560] },
      scenario: { spot: [0, 1740, 1920, 1250], focus: [0, 1720, 1920, 1300] },
      core: { spot: [0, 3100, 1920, 860], focus: [0, 3060, 1920, 940] }, // assistant only (security block left out)
      selling: { spot: [0, 5040, 1920, 1740], focus: [0, 5000, 1920, 1820] },
    },
    samsungLayout: {
      full: { spot: [0, 20, 1920, 1250], focus: [0, 0, 1920, 1300] }, // = samsung.scenario shifted by -1720
    },
    acer: {
      branding: { spot: [0, 109, 1440, 696], focus: [0, 60, 1440, 760] },
      scenario: { spot: [0, 805, 1440, 741], focus: [0, 860, 1440, 700] },
      core: { spot: [0, 1546, 1440, 619], focus: [0, 1546, 1440, 619] },
      selling: { spot: [0, 2165, 1440, 818], focus: [0, 2225, 1440, 748] },
      details: { spot: [0, 2965, 1440, 677], focus: [0, 2957, 1440, 630] },
      product: { spot: [0, 2165, 1440, 1477], focus: [0, 2225, 1440, 1357] },
    },
  },

  cycleMs: 2200,

  /*
   * The presentation, one entry per key press. Builders (d):
   *   d.cover({ kicker, title, subtitle, lead, chips: [[num, label]] })
   *   d.intro(chapter, { num, title, sub, p })
   *   d.categories(chapter, pageKeys)            one step per category, columns aligned
   *   d.lengths(chapter, pageKeys, { metric, label })
   *   d.panel(chapter, top, html)
   *   d.overview(chapter, page, region, { active: [bandNames], caption: {k,h,p}, thumb: {page, region} })
   *   d.zoom(chapter, page, region, { callout: {k,h,items:[[n, html]],tag}, thumb, marks: false|group, cycle: [frames], frame, message })
   *   d.versus(chapter, [pageA, regionA], [pageB, regionB], html)
   *   d.table(head, rows, cols)   d.pct(page, category)
   */
  steps: d => {
    const BENCH = ['samsung', 'lenovo', 'asus'];
    const REF = 'samsung', SUBJECT = 'acer';
    const thumb = region => ({ page: REF, region });
    const versusTable = rows => d.table(['SAMSUNG', 'ACER AIS'], rows);
    // p22 / p23: comparison title with a small TBD note on the right (Acer side) marking which copy option is shown
    const tbdHead = (opt, title) => `<div style="display:flex;align-items:center;justify-content:space-between;gap:24px;margin-bottom:22px">` +
      `<h3 style="margin:0">${title}</h3>` +
      `<div style="display:flex;align-items:center;gap:14px;padding:10px 18px;border:1.5px dashed var(--green);border-radius:14px;background:#fff;font-size:18px;color:var(--ink-2)">` +
      `<b style="padding:3px 12px;border-radius:999px;background:#f59e0b;color:#fff;font:800 15px Montserrat,sans-serif;letter-spacing:1px">TBD</b>` +
      `<span>Qubi 區塊文案與角色待決定</span>` +
      ['A', 'B'].map(o => `<span style="padding:4px 14px;border-radius:999px;font-weight:700;${o === opt ? 'background:var(--green);color:#fff' : 'background:var(--green-soft);color:var(--green-d)'}">方案 ${o}</span>`).join('') +
      `</div></div>`;
    // 05 recommendation logic: progress strip, one row of the scenario table, shared styles
    const recPick = ([name, sku, img], first) => `<div class="pick${first ? ' a' : ''}"><img src="content/images/product-real-${img}.png" alt=""><strong>${name}</strong><small>${sku}</small></div>`;
    const recRow = (scene, apps, gate, order, a, b, c) =>
      `<div class="k"><strong>${scene}</strong></div><div>${apps}</div><div>${gate}</div><div class="ord">${order}</div>` + recPick(a, true) + recPick(b) + recPick(c);
    const recStyle = `<style>
      .rec-flow{display:flex;align-items:stretch;gap:22px;margin-top:10px;min-height:560px}
      .rec-col{flex:1;display:flex;flex-direction:column;gap:16px}
      .rec-col.wide{flex:1.15}
      .rec-col small{font:800 30px Montserrat,sans-serif;letter-spacing:3px;color:var(--green-d);margin-bottom:2px}
      .rec-box{position:relative;flex:1;padding:26px 26px 22px 76px;border:1px solid var(--line);border-radius:16px;background:#fff;font-size:28px;font-weight:900;line-height:1.35;
        opacity:0;transform:translateY(14px);transition:opacity .5s,transform .5s}
      .panel.show .rec-box{opacity:1;transform:none}
      .rec-box b{position:absolute;left:20px;top:28px;min-width:38px;height:30px;padding:0 6px;border-radius:15px;display:grid;place-items:center;background:var(--green-soft);color:var(--green-d);font:800 14px Montserrat,sans-serif}
      .rec-box span{display:block;margin-top:8px;font-size:20px;font-weight:400;color:var(--muted)}
      .rec-box.out{background:var(--green-soft);border-color:#cfe6a9}
      .rec-box.final{background:var(--green);border-color:var(--green);color:#fff}
      .rec-box.final b{background:#fff}
      .rec-box.final span{color:#eef7dd;font-size:24px;line-height:1.7}
      .rec-col:nth-of-type(1) .rec-box{transition-delay:.5s}
      .rec-col:nth-of-type(2) .rec-box{transition-delay:1.1s}
      .rec-col:nth-of-type(3) .rec-box{transition-delay:1.7s}
      .rec-arrow{align-self:center;font:900 40px Montserrat,sans-serif;font-style:normal;color:var(--green);opacity:0;transition:opacity .4s}
      .panel.show .rec-arrow{opacity:1;transition-delay:.9s}
      .panel.show .rec-arrow:last-of-type{transition-delay:1.5s}
      .rec-grid > div{font-size:19px;line-height:1.5;padding:12px 16px}
      .rec-grid .ord{font-size:17px;color:var(--muted)}
      .rec-grid strong{display:block}
      .rec-grid .pick img{display:block;width:100%;max-width:190px;height:auto;margin:0 0 6px}
      .rec-grid small{display:block;font:600 14px Montserrat,sans-serif;color:var(--muted)}
    </style>`;


    return [
      d.cover({ kicker: 'PROPOSAL · 2026.09', title: 'Acer Intelligence Space', subtitle: 'Landing Page Mockup Proposal',
        chips: [['00', 'Benchmark'], ['01', 'Opening'], ['02', 'Scenario'], ['03', 'AI Companion'], ['04', 'Recommendation'], ['05', 'Recommendation logic']] }),

      d.overview(-1, 'aisNow', 'hero', { plain: true, spot: false,
        caption: { k: 'ACER.COM · 現況', h: '現在的 AIS 頁面' } }),

      // ===== 00 Benchmark =====
      d.intro(0, { num: '00', title: 'Benchmark for web framework', sub: 'Samsung Galaxy AI ・ Lenovo AI ・ ASUS StoryCube' }),
      ...d.categories(0, BENCH),
      d.lengths(0, BENCH, { metric: 'hardware', label: '硬體導購', notes: [
        { targets: ['samsung', 'lenovo'], box: [80, 330, 430], k: 'SAMSUNG · LENOVO', h: '目標是導流硬體探索', p: '硬體畫面都占比至少 10% 以上，且都帶有導流 CTA' },
        { targets: ['asus'], box: [1410, 330, 430], k: 'ASUS STORYCUBE', h: '目標是推動下載', p: '下載點 CTA 在第一屏就出現，網頁中段再提示一次' },
      ] }),
      d.panel(0, 150,
        `<h3>三種說故事的方式</h3>` +
        `<div class="grid" style="grid-template-columns:200px 1fr 1fr 1fr">` +
        `<div class="h"></div><div class="h en a">SAMSUNG GALAXY AI</div><div class="h en">LENOVO AI APPS</div><div class="h en">ASUS STORYCUBE</div>` +
        `<div class="k">Target</div><div class="a">Samsung AI solutions landing page*</div><div>Lenovo AI solutions landing page*</div><div>ASUS ProArt mini-site*</div>` +
        `<div class="k">Goal</div><div class="a">以應用場景導流硬體探索。</div><div>以功能主題導流硬體探索。</div><div>以產品功能推動下載。</div>` +
        `<div class="k">Storytelling</div><div class="a">從使用情境出發，讓用戶在需求中探索適配的硬體，與 Acer AIS 性質最符合。</div><div>從功能套件出發，代價是用戶需要先建立對功能的認知，才有機會帶動後續導購。</div><div>從功能操作出發，但通篇與硬體導購無關。</div>` +
        `<div class="k">Selling part</div>` + BENCH.map((k, i) => `<div${i === 0 ? ' class="a"' : ''}>硬體導購占比 ${d.pct(k, 'hardware')}%<div class="meter"><i style="--w:${d.pct(k, 'hardware')}%"></i></div></div>`).join('') +
        `</div><p class="note">* landing page：目的為導流的叢集頁。</p>` +
        `<p class="bench-qa" style="margin:34px 0 0;font-size:24px;line-height:1.7;color:var(--muted)"><strong style="color:var(--ink)">用戶來 Acer 官網的目的，通常是：</strong>想探索新設備或高擴充性需求；已購買設備，想了解應用操作及技術支援。</p>` +
        `<p class="conclude" style="margin-top:18px">Acer 需要的是「<em>把軟體功能包裝成購買硬體考量之一</em>」的版面<b>→ 以 Samsung Galaxy AI 為主要參考對象</b></p>`),

      // ===== 01 Branding =====
      d.overview(1, REF, 'branding', { active: ['Opening'], caption: { num: '01', k: 'SAMSUNG GALAXY AI', h: '先看 Samsung<br>怎麼開場' } }),
      d.versus(1, [REF, 'branding'], [SUBJECT, 'branding'], `<h3><em>看見 AI 能做什麼</em>，推動用戶向下閱讀</h3>` +
        versusTable([['主視覺', '新機產品照', 'AIS 真實介面'], ['宣言形式', '定義型標語', '提問型標語'], ['往下看的理由', '認識這支手機', '想知道電腦能幫我做到什麼']]), { leadA: true, tagA: 'SAMSUNG Galaxy AI', tagB: 'ACER AIS' }),

      // ===== 02 Scenario =====
      d.overview(2, REF, 'scenario', { active: ['Scenario'], caption: { num: '02', k: 'SAMSUNG GALAXY AI', h: 'Samsung 的情境段落' } }),
      d.zoom(2, REF, 'scenario', { callout: { k: 'SAMSUNG · SCENARIO', h: 'Samsung 的<br>說明結構', tag: '需求導向',
        items: [[1, '大標以<strong>提問</strong>帶入'], [2, '分頁以<strong>使用情境</strong>區分'], [3, '每張卡都是<strong>沉浸式場景＋介面特寫</strong>']] } }),
      d.zoom(2, REF, 'scenario', { marks: false, tint: 'scenes', callout: { k: 'SCENE REFERENCE · SAMSUNG', h: 'Samsung 的<br>場景設計語言', tag: '場景設計 tips',
        items: [[1, '主題性明確，抓住<strong>一個真實需求</strong>'], [2, '畫面極具沉浸感，讓人想像<strong>「日常能輕鬆一點」</strong>'], [3, '功能呈現清楚、介面選擇<strong>最適體驗</strong>']] } }),
      d.zoom(2, 'samsungLayout', 'full', { marks: false, cycle: ['two', 'three'],
        callout: { k: 'SAMSUNG · LAYOUT', h: 'Samsung 的<br>圖文排版', tag: '排版細節',
          items: [[1, '圖片視覺占比 <strong>35–47%</strong>，一屏就能看完主角'], [2, '圖片皆有約 <strong>3% 的輕量圓角</strong>，畫面乾淨'], [3, '圖片<strong>間距寬度一致</strong>，視覺舒適']] } }),
      d.versus(2, [REF, 'scenario'], [SUBJECT, 'scenario'], `<h3>用<em>沉浸式場景</em>，讓使用者投射自我</h3>` +
        versusTable([['情境切分', '使用情境', '使用情境'], ['畫面', '沉浸式場景＋介面特寫', '沉浸式場景＋介面特寫'], ['接下來', '回到功能說明', '連到「哪一台跑得動」']]), { frameB: 'personal', leadA: true, tagA: 'SAMSUNG Galaxy AI', tagB: 'ACER AIS' }),

      // ===== 03 Core experience =====
      d.overview(3, REF, 'core', { active: ['AI Companion'], caption: { num: '03', k: 'SAMSUNG GALAXY AI', h: 'Samsung 的核心體驗' } }),
      d.versus(3, [REF, 'core'], [SUBJECT, 'core'], tbdHead('A', '以<em>個人助理</em>開始你的 AI') +
        versusTable([['呈現方式', '助理', '單一角色 Qubi（個人助理）'], ['用戶要記住的', '一個核心概念：AI 陪伴', '一個核心概念：AI 陪伴'], ['在頁面中的角色', '串聯情境與硬體', '串聯情境與硬體']]), { frameB: 'qubiA', leadA: true, tagA: 'SAMSUNG Galaxy AI', tagB: { text: 'ACER AIS · 方案 A', tone: 'warn' } }),
      d.versus(3, [REF, 'core'], [SUBJECT, 'core'], tbdHead('B', '以<em>人機協作</em>開始你的 AI') +
        versusTable([['呈現方式', '助理', '單一角色 Qubi Claw（數位員工）'], ['用戶要記住的', '一個核心概念：AI 陪伴', '一個核心概念：AI 陪伴'], ['在頁面中的角色', '串聯情境與硬體', '串聯情境與硬體']]), { frameB: 'qubiB', messageB: 'qubi', tagA: 'SAMSUNG Galaxy AI', tagB: { text: 'ACER AIS · 方案 B', tone: 'warn' } }),

      // ===== 04 Recommendation =====
      d.overview(4, REF, 'selling', { active: ['Recommendation'], caption: { num: '04', k: 'SAMSUNG GALAXY AI', h: 'Samsung 的推薦段落' } }),
      d.versus(4, [REF, 'selling'], [SUBJECT, 'product'], `<h3>把「AI 能做什麼」包裝成「<em>哪一台做得到</em>」</h3>` +
        versusTable([['機型資訊', '只有機型列表', '推薦機型＋AI 功能表'], ['用戶停在', '找到機型、點進產品頁', '找到搭檔、點進商城'], ['CTA', 'Learn more', '立即了解／下載 Acer Intelligence Space']]), { leadA: true, tagA: 'SAMSUNG Galaxy AI', tagB: 'ACER AIS' }),
      d.zoom(4, SUBJECT, 'product', { marks: false, cycle: ['business', 'creative', 'gaming'],
        callout: { k: 'ACER AIS · INTERACTION', h: '切換情境，<br>整段一起連動', tag: '點擊切換使用場景',
          items: [[1, '點擊切換使用場景，<strong>推薦機型與 AI 功能表</strong>一起更新'], [2, '呈現<strong>適配機型</strong>，讓用戶能夠點擊導往商城查看細節'], [3, '已有 Acer 電腦者<strong>可點擊下載</strong>']] } }),
      d.zoom(4, SUBJECT, 'selling', { callout: { k: 'ACER AIS · SELLING', h: '找到你的<br>AI 搭檔', tag: '每種需求都有 CTA',
        items: [[1, '<strong>首選機型</strong>：綠框＋立即了解，規格重點直接列在卡片上'], [2, '第二推薦與 CP 值最高，<strong>點擊導往商城</strong>查看細節']] } }),
      d.zoom(4, SUBJECT, 'details', { callout: { k: 'ACER AIS · AI APPS', h: '功能表：<br>用得到哪些 AI 應用程式', tag: '功能 × AI 應用程式',
        items: [[1, '<strong>功能情境 × AI 應用程式</strong>：列出這個情境用得到的 app，「了解更多」向下展開'], [2, '已有 Acer 電腦 → <strong>下載 Acer Intelligence Space</strong>']] } }),

      // ===== 05 推薦邏輯（試作） =====
      d.intro(5, { num: '05', title: 'Recommendation logic', sub: '產品推薦邏輯', p: '此為目前產品推薦邏輯的試做版本，請以最終工程實作為準。' }),
      d.panel(5, 110, recStyle +
        `<h3>情境推薦的機型，是這樣<em>算</em>出來的</h3>` +
        `<div class="rec-flow">` +
        `<div class="rec-col"><small>INPUT</small>` +
          `<div class="rec-box"><b>1-1</b>AIS 設定檔 App-list.json<span>每個 app 的規格需求與安裝檢查</span></div>` +
          `<div class="rec-box"><b>1-2</b>Qubi Claw 官網<span>雲端／內顯本地 AI／RTX 5090 三級需求</span></div>` +
          `<div class="rec-box"><b>2-2</b>Acer 官方商城<span>正在販售的 345 台電腦與完整規格</span></div></div>` +
        `<i class="rec-arrow">→</i>` +
        `<div class="rec-col"><small>OUTPUT</small>` +
          `<div class="rec-box out"><b>1</b>App 規格表<span>9 個 AIS app 各自的硬體條件</span></div>` +
          `<div class="rec-box out"><b>2</b>商品相容對照表<span>345 台 × 9 個 app＋Qubi Claw 等級</span></div></div>` +
        `<i class="rec-arrow">→</i>` +
        `<div class="rec-col wide"><small>FINAL</small>` +
          `<div class="rec-box final"><b>3</b>情境推薦<span>情境功能 → 對應 app → 查對照表 → 定義排序 → 首選／第二推薦／CP 值最高</span></div></div>` +
        `</div>` +
        `<p class="note">資料讀取日 2026-09-18；分級依官方規格，規格未列到的新世代另標「寬判」，不計分。</p>`),
      d.versus(5, ['recJson', 'req'], ['recApps', 'qubi'],
        `<h3>第一步：把設定檔整理成 <em>App 規格表</em></h3>` +
        d.table(['AIS 設定檔（App-list.json）', 'App 規格表（output 1）'], [
          ['給人看的條件', 'RequirementDetails 說明文字', '「規格需求」欄：獨顯／指定 CPU／RAM，多個條件以「或」連接'],
          ['程式的檢查', 'SystemRequirement', '「安裝時檢查」欄：最低 RAM、顯卡型號、黑名單'],
          ['補充來源', 'Qubi Claw 官網需求頁', 'Qubi Claw 不在設定檔內，另依官網分成 0～3 級'],
        ])),
      d.versus(5, ['recStore', 'card'], ['recCompat', 'rows'],
        `<h3>第二步：逐台比對商城商品，得到 <em>相容對照表</em></h3>` +
        d.table(['Acer 官方商城', '商品相容對照表（output 2）'], [
          ['範圍', '正在販售的 345 台（筆電、桌機、AIO、掌機）', '324 台至少能裝一個 AIS app'],
          ['比對', '商品頁規格表：CPU 世代、RAM、顯卡與 VRAM、螢幕', '每台 × 9 個 app：可裝／寬判才可裝／不可裝'],
          ['排序', '—', '先比 Qubi Claw 等級，再比可裝的 AIS app 數'],
        ])),
      d.panel(5, 110, recStyle +
        `<h3>第三步：從情境功能<em>推到三個推薦位置</em></h3>` +
        `<a class="demo" href="https://jousttv0745-ops.github.io/acer-ais-proposal-2/content/acer-ai-pc-personal.html#" target="_blank" rel="noopener">demo<span aria-hidden="true">↗</span></a>` +
        `<div class="grid rec-grid" style="grid-template-columns:130px 1.05fr 1.15fr 1.6fr 1fr 1fr 1fr">` +
        `<div class="h"></div><div class="h">關鍵 app</div><div class="h">篩選門檻</div><div class="h">排序依據</div><div class="h a">首選</div><div class="h">第二推薦</div><div class="h">CP 值最高</div>` +
        recRow('商務', 'Meeting Assistant＋AI Agent', '兩者皆可裝、有庫存筆電 <b>57 台</b>', 'Qubi Claw 等級 → 重量 → 商務配備（Win 11 Pro、指紋）→ 續航 → 價格',
          ['TravelMate P6 14', 'TMP614-54-7518', 'tmp614'], ['Swift Air 14 OLED', 'SFA14-71M-791S', 'sfa14'], ['Aspire Lite 14', 'AL14-56P-79Y2', 'al14']) +
        recRow('創意', 'Drawing Assistant（＋Media）', '依官方規格可裝 Drawing、有庫存 <b>71 台</b>', '獨顯與 VRAM → 32GB → OLED → Qubi Claw 等級 → app 數 → 價格',
          ['Swift X 14', 'SFX14-73G-78HM', 'sfx14'], ['Predator Orion 3000', 'PO3-665', 'po3'], ['Swift Go 14', 'SFG14-75-5948', 'sfg14']) +
        recRow('遊戲', 'Game Assistant＋ProCam（所有機型可裝）', 'AIS 不是差異，改看獨顯：有庫存 <b>24 台</b>', '顯卡等級 → VRAM → 螢幕更新率 → Qubi Claw 等級 → 價格',
          ['Predator Orion 7000', 'PO7-665', 'po7'], ['Predator Helios Neo 16S', 'PHN16S-71-90TD', 'phn16s'], ['Nitro N30', 'N30-100', 'n30']) +
        `</div>` +
        `<p class="note">這三組就是 p27 mockup「找到你的 AI 搭檔」的推薦卡片。規格、價格與庫存為 2026/9/17 商城資料，會變動。</p>`),

      // ===== Summary =====
      // summary: the whole Acer mockup on the left, the conclusion on the right
      { chapter: 6,
        wins: { [SUBJECT]: { rect: [100, 100, 330, 900], focus: 'full', frame: 'business' } },
        panel: { top: 250, html:
          `<div style="margin-left:430px">` +
          `<p class="quote">我們把「AI 能做什麼」<br>包裝成「<em>哪一台做得到</em>」、「<em>找到你的搭檔</em>」。</p>` +
          `<p class="qa" style="margin:34px 0 0;font-size:26px">把硬體賣點放進推薦卡，再用功能表說明用得到的 AI 應用程式，無論用戶有哪一種需求都有 CTA。</p>` +
          `<div class="recap"><span><b>01</b>提問式開場</span><span><b>02</b>需求導向的情境</span><span><b>03</b>AI 陪伴功能</span><span><b>04</b>功能 × 機型推薦</span><span><b>05</b>產品推薦邏輯</span></div>` +
          `</div>` } },
    ];
  },
};
