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
  chapters: ['00 Benchmark', '01 Branding', '02 Scenario', '03 Core experience', '04 Product details · Selling', 'Summary'],

  // benchmark categories, in the order they are presented
  categories: [
    { key: 'brand', name: '品牌定位', color: '#83b81a', desc: '第一屏怎麼介紹 AI 與品牌' },
    { key: 'feature', name: '功能說明', color: '#3b82f6', desc: '功能怎麼被說明、占多少篇幅' },
    { key: 'security', name: '資訊安全', color: '#f59e0b', desc: '是否回應隱私與安全的疑慮' },
    { key: 'hardware', name: '硬體導流', color: '#ef4444', desc: '是否把用戶帶到可以買的硬體' },
    { key: 'seo', name: 'SEO（FAQ）', color: '#8b5cf6', desc: '用 FAQ 補足疑問與搜尋' },
    { key: 'frame', name: '網站框架', color: '#9ca3af', desc: 'Header、Footer 與註解' },
  ],
  frameCategory: 'frame', // this category aligns to its LAST segment (the footer)

  pages: {
    samsung: {
      kind: 'image', src: 'content/screenshot/samsung_ai_html.png', srcLite: 'content/screenshot/samsung_ai_html.lite.png', liteScale: 0.5, w: 1920, h: 11760,
      label: 'Samsung Galaxy AI', url: 'samsung.com/us/galaxy-ai',
      cats: { brand: [[232, 1508]], feature: [[1740, 2220]], security: [[4060, 960]], hardware: [[5040, 640], [5760, 1020]], seo: [[6800, 1650]], frame: [[0, 232], [8450, 3310]] },
      bands: [['Branding', 232, 1508], ['Scenario', 1740, 1250], ['Core experience', 3040, 920], ['Selling', 5040, 1740], ['FAQ', 6800, 1650], ['Footnotes · Footer', 8450, 3310]],
      marks: {
        branding: [[430, 285, 1060, 330], [0, 640, 1920, 1095]],
        scenario: [[440, 1790, 1040, 120], [460, 2020, 1000, 80], [40, 2120, 1840, 880]],
        core: [[90, 3260, 820, 400], [1180, 3160, 520, 650]],
        selling: [[30, 5170, 1860, 480], [640, 5920, 640, 90], [0, 6020, 1920, 740], [0, 6860, 1920, 1600]],
      },
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
      kind: 'frames', w: 1440, h: 4700, label: 'Acer AIS', url: 'acer.com/tw-zh/ai-pc（mockup）',
      defaultFrame: 'business',
      frames: {
        personal: { src: 'content/acer-ai-pc-personal.html', label: '個人化' },
        business: { src: 'content/acer-ai-pc.html', label: '商務' },
        creative: { src: 'content/acer-ai-pc-creative.html', label: '創意' },
        gaming: { src: 'content/acer-ai-pc-gaming.html', label: '遊戲' },
      },
      bands: [['Branding', 109, 696], ['Scenario', 805, 789], ['Core experience', 1594, 618], ['Product details', 2212, 1149], ['Selling', 3361, 862], ['FAQ', 4223, 410]],
      marks: {
        branding: [[42, 178, 412, 232], [460, 168, 980, 490], [42, 560, 412, 58]],
        scenario: [[470, 1002, 500, 64], [136, 1086, 1168, 340], [136, 1430, 1168, 92]],
        scenario2: [[470, 1002, 500, 64], [136, 1086, 1168, 436]], // page 23: two points, cards + their titles in one box
        core: [[90, 1785, 720, 340], [815, 1840, 610, 360]],
        details: [[500, 2408, 440, 58], [136, 2480, 1168, 808], [570, 2490, 246, 788]],
        selling: [[136, 3558, 384, 435], [528, 3558, 776, 435], [136, 4070, 1168, 81]],
      },
    },
  },

  // spot = highlighted block, focus = what the camera frames when zooming in
  regions: {
    samsung: {
      branding: { spot: [0, 232, 1920, 1508], focus: [0, 200, 1920, 1560] },
      scenario: { spot: [0, 1740, 1920, 1250], focus: [0, 1720, 1920, 1300] },
      core: { spot: [0, 3100, 1920, 860], focus: [0, 3060, 1920, 940] }, // assistant only (security block left out)
      selling: { spot: [0, 5040, 1920, 3420], focus: [0, 5000, 1920, 3500] },
    },
    samsungLayout: {
      full: { spot: [0, 20, 1920, 1250], focus: [0, 0, 1920, 1300] }, // = samsung.scenario shifted by -1720
    },
    acer: {
      branding: { spot: [0, 109, 1440, 696], focus: [0, 60, 1440, 760] },
      scenario: { spot: [0, 805, 1440, 789], focus: [0, 860, 1440, 700] },
      core: { spot: [0, 1594, 1440, 618], focus: [0, 1594, 1440, 618] },
      details: { spot: [0, 2212, 1440, 1149], focus: [0, 2380, 1440, 942] },
      selling: { spot: [0, 3361, 1440, 862], focus: [0, 3422, 1440, 764] },
      product: { spot: [0, 2212, 1440, 2011], focus: [0, 2380, 1440, 1806] },
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


    return [
      d.cover({ kicker: 'PROPOSAL · 2026.09', title: 'Acer Intelligence Space', subtitle: 'Landing Page Mockup Proposal',
        chips: [['00', 'Benchmark'], ['01', 'Branding'], ['02', 'Scenario'], ['03', 'Core experience'], ['04', 'Product details · Selling']] }),

      // ===== 00 Benchmark =====
      d.intro(0, { num: '00', title: 'Benchmark for web framework', sub: 'Samsung Galaxy AI x Lenovo AI x ASUS StoryCube',
        p: '<strong>Q：用戶來 Acer 官網的目的通常是什麼？</strong><br>A：想探索新設備或高擴充性需求；已購買設備，想了解設備技術細節。' }),
      ...d.categories(0, BENCH),
      d.lengths(0, BENCH, { metric: 'hardware', label: '硬體導購' }),
      d.panel(0, 150,
        `<h3>三種說故事的方式</h3>` +
        `<div class="grid" style="grid-template-columns:200px 1fr 1fr 1fr">` +
        `<div class="h"></div><div class="h en a">SAMSUNG GALAXY AI</div><div class="h en">LENOVO AI APPS</div><div class="h en">ASUS STORYCUBE</div>` +
        `<div class="k">Target</div><div class="a">Samsung AI solutions landing page*</div><div>Lenovo AI solutions landing page*</div><div>ASUS ProArt product page*</div>` +
        `<div class="k">Goal</div><div class="a">以應用場景導流硬體探索。</div><div>以功能主題導流硬體探索。</div><div>以產品功能推動下載。</div>` +
        `<div class="k">Storytelling</div><div class="a">從使用情境出發，讓用戶在需求中探索適配的硬體，與 Acer AIS 性質最符合。</div><div>從功能套件出發，代價是用戶需要先建立對功能的認知，才有機會帶動後續導購。</div><div>從功能操作出發，但通篇與硬體導購無關。</div>` +
        `<div class="k">Selling part</div>` + BENCH.map((k, i) => `<div${i === 0 ? ' class="a"' : ''}>硬體導購占比 ${d.pct(k, 'hardware')}%<div class="meter"><i style="--w:${d.pct(k, 'hardware')}%"></i></div></div>`).join('') +
        `</div><p class="note">* landing page：目的為導流的叢集頁。　* product page：目的為介紹單一產品的產品頁。</p>` +
        `<p class="conclude">Acer 需要的是「<em>把軟體功能翻譯成購買硬體考量之一</em>」的版面<b>→ 以 Samsung Galaxy AI 為主要參考對象</b></p>`),

      // ===== 01 Branding =====
      d.intro(1, { num: '01', title: 'Branding', sub: '品牌露出', p: '第一屏決定用戶要不要往下看。<br><q>呈現 AIS 真實介面，並提出一句宣言／提問。</q>' }),
      d.overview(1, REF, 'branding', { active: ['Branding'], caption: { k: 'SAMSUNG GALAXY AI', h: '先看 Samsung<br>怎麼開場', p: '整頁 7 個段落，第一屏是品牌露出。' } }),
      d.versus(1, [REF, 'branding'], [SUBJECT, 'branding'], `<h3>從「看新機」到「<em>看見 AI 能做什麼</em>」</h3>` +
        versusTable([['主視覺', '新機產品照', 'AIS 真實介面'], ['宣言形式', '定義型標語', '提問型標語'], ['往下看的理由', '認識這支手機', '想知道電腦能幫我做到什麼']]), { leadA: true }),

      // ===== 02 Scenario =====
      d.intro(2, { num: '02', title: 'Scenario', sub: '使用情境', p: '<q>從用戶的真實需求場景出發，而非功能取向，更能帶動用戶往下閱讀，並代入消費意願。</q>' }),
      d.overview(2, REF, 'scenario', { active: ['Scenario'], caption: { k: 'SAMSUNG GALAXY AI', h: 'Samsung 的情境段落', p: '緊接在品牌露出之後，用分頁切換不同功能。' } }),
      d.zoom(2, REF, 'scenario', { callout: { k: 'SAMSUNG · SCENARIO', h: '以使用情境<br>區分', tag: '需求導向',
        items: [[1, '大標以<strong>提問</strong>帶入'], [2, '分頁以<strong>使用情境</strong>區分'], [3, '每張卡都是<strong>真實需求場景＋介面特寫</strong>']] } }),
      d.zoom(2, REF, 'scenario', { marks: false, callout: { k: 'SCENE REFERENCE · SAMSUNG', h: '從 Samsung 看見的<br>場景設計語言', tag: '場景設計 tips',
        items: [[1, '主題性明確，抓住<strong>一個真實需求</strong>'], [2, '畫面極具沉浸感，讓人想像<strong>「日常能輕鬆一點」</strong>'], [3, '功能呈現清楚、介面選擇<strong>最適體驗</strong>']] } }),
      d.zoom(2, 'samsungLayout', 'full', { marks: false, cycle: ['two', 'three'],
        callout: { k: 'SAMSUNG · LAYOUT', h: '從 Samsung 看見的<br>圖文排版', tag: '排版細節',
          items: [[1, '圖片視覺占比 <strong>35–47%</strong>，一屏就能看完主角'], [2, '圖片皆有約 <strong>3% 的輕量圓角</strong>，畫面乾淨'], [3, '圖片<strong>間距寬度一致</strong>，視覺舒適']] } }),
      d.versus(2, [REF, 'scenario'], [SUBJECT, 'scenario'], `<h3>從「功能能做什麼」到「<em>我的一天用得到什麼</em>」</h3>` +
        versusTable([['情境切分', '使用情境', '使用情境'], ['畫面', '真實需求場景＋介面特寫', '真實需求場景＋介面特寫'], ['接下來', '回到功能說明', '連到「哪一台跑得動」']])),

      // ===== 03 Core experience =====
      d.intro(3, { num: '03', title: 'Core experience', sub: '核心體驗', p: '<q>讓貫穿所有 AI solution 的核心概念具象化，而非需要重新解釋的功能集合。</q>' }),
      d.overview(3, REF, 'core', { active: ['Core experience'], caption: { k: 'SAMSUNG GALAXY AI', h: 'Samsung 的核心體驗', p: '情境之後，分段介紹助理與資料安全。' } }),
      d.versus(3, [REF, 'core'], [SUBJECT, 'core'], `<h3>從「一組功能」到「<em>一個看得見的夥伴</em>」</h3>` +
        versusTable([['呈現方式', '助理＋安全分段說明', '單一角色 Qubi and Qubi Claw'], ['用戶要記住的', '多個功能名稱', '一個核心概念'], ['在頁面中的角色', '功能補充', '串連情境與硬體']]), { messageB: 'qubi', leadA: true }),

      // ===== 04 Product details · Selling =====
      d.intro(4, { num: '04', title: 'Product details · Selling', sub: '產品細節與導購', p: '<q>Galaxy AI 全頁沒有任何規格或機型對照，用戶被留在感受層。</q>' }),
      d.overview(4, REF, 'selling', { active: ['Selling'], caption: { k: 'SAMSUNG GALAXY AI', h: 'Samsung 的導購段落', p: '功能介紹之後，先推 Try Galaxy，再出現機型列表與 FAQ。' } }),
      d.versus(4, [REF, 'selling'], [SUBJECT, 'product'], `<h3>把「AI 能做什麼」翻譯成「<em>哪一台做得到</em>」</h3>` +
        versusTable([['機型資訊', '只有機型列表', '功能 × 機型對照'], ['用戶停在', '感受層', '找到搭檔、點進商城'], ['CTA', 'Learn more', '看規格與購買／看規格／下載']]), { leadA: true }),
      d.zoom(4, SUBJECT, 'details', { thumb: thumb('selling'), callout: { k: 'ACER AIS · PRODUCT DETAILS', h: '功能表：<br>哪一台跑得動', tag: '功能 × 機型',
        items: [[1, '<strong>情境切換</strong>：商務、創意、遊戲'], [2, '<strong>功能 × 機型對照表</strong>＋規格重點，把硬體賣點藏進功能表裡講'], [3, '推薦機型<strong>整欄標示</strong>，一眼看出最適合的一台']] } }),
      d.zoom(4, SUBJECT, 'selling', { thumb: thumb('selling'), callout: { k: 'ACER AIS · SELLING', h: '找到你的<br>AI 搭檔', tag: '每種需求都有 CTA',
        items: [[1, '<strong>首選機型</strong>：綠框＋看規格與購買'], [2, '第二推薦與 CP 值最高，<strong>點擊導往商城</strong>查看細節'], [3, '已有 Acer 電腦 → <strong>下載 Acer Intelligence Space</strong>']] } }),
      d.zoom(4, SUBJECT, 'product', { thumb: thumb('selling'), marks: false, cycle: ['business', 'creative', 'gaming'],
        callout: { k: 'ACER AIS · INTERACTION', h: '切換情境，<br>兩個區塊一起連動', tag: '點擊切換使用場景',
          items: [[1, '點擊切換使用場景，<strong>連動兩區塊</strong>推薦功能列表及適配硬體'], [2, '呈現<strong>適配機型</strong>，讓用戶能夠點擊導往商城查看細節'], [3, '已有 Acer 電腦者<strong>可點擊下載</strong>']] } }),

      // ===== Summary =====
      // summary: the whole Acer mockup on the left, the conclusion on the right
      { chapter: 5,
        wins: { [SUBJECT]: { rect: [100, 100, 330, 900], focus: 'full', frame: 'business' } },
        panel: { top: 250, html:
          `<div style="margin-left:430px">` +
          `<p class="quote">我們把「AI 能做什麼」<br>翻譯成「<em>哪一台做得到</em>」、「<em>找到你的搭檔</em>」。</p>` +
          `<p class="qa" style="margin:34px 0 0;font-size:26px">把硬體賣點藏進功能表裡講，無論用戶有哪一種需求都有 CTA。</p>` +
          `<div class="recap"><span><b>01</b>提問式品牌露出</span><span><b>02</b>需求導向的情境</span><span><b>03</b>具象化的核心體驗</span><span><b>04</b>功能 × 機型導購</span></div>` +
          `</div>` } },
    ];
  },
};
