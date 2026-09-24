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
      kind: 'image', src: 'content/apple/apple-ai.png', srcLite: 'content/apple/apple-ai.lite.png', liteScale: 0.5, w: 1920, h: 12406,
      label: 'Apple Intelligence', url: 'apple.com/tw/apple-intelligence',
      // cats: brand = Hero + SDK；feature = 精選 + Siri AI + 情境章節 + 更多精彩；security = 隱私；hardware = 選機 + 相容清單；frame = [0, NAV] 與 註腳 · 頁尾
      // 2026-09-23 重新擷取（capture-apple.mjs：捲動改 400px/500ms 並在選機分頁停留 3s 讓商品照載入）：全頁 12,406px（原 12,399px），差異僅在頁尾底部留白，其餘內容逐列比對完全一致
      cats: { brand: [[100, 980], [10630, 630]], feature: [[1080, 6620]],
        security: [[7700, 880]], hardware: [[8580, 2050]], frame: [[0, 100], [11260, 1146]] },
      bands: [['Hero', 100, 980], ['精選', 1080, 920], ['Siri AI', 2000, 1140, 'green'], ['情境章節', 3140, 3940], ['更多精彩', 7080, 620],
        ['隱私', 7700, 880], ['選機', 8580, 1150], ['相容清單', 9730, 900], ['SDK', 10630, 630], ['註腳 · 頁尾', 11260, 1146]],
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
    const S = window.SPEC, R = window.DECK.regions, WF = window.Wireframe;
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
      .grid.spec > div{font-size:17px;line-height:1.5;padding:10px 14px}
      .grid.spec .h{font:800 14px Montserrat,'Noto Sans TC',sans-serif;letter-spacing:1px}
      .grid.spec .k{font-size:17px;font-weight:700;color:var(--ink)}
      .grid.spec .none{color:var(--faint);text-align:center;font-size:16px}
      .grid.ov > div{font-size:19px}
      .grid.ov small{display:block;margin-top:4px;font:700 14px 'Noto Sans TC',sans-serif;color:var(--green-d)}
      .grid.ov .q{font:800 34px Montserrat,sans-serif;color:var(--green)}
      .l1{display:grid;grid-template-columns:780px 1fr;gap:40px}
      .l1-ref{padding-top:560px}
      .l1-ref small{font:800 22px Montserrat,sans-serif;letter-spacing:2px;color:var(--green-d)}
      .l1-ref strong{display:block;margin-top:6px;font-size:44px;font-weight:900}
      .l1-ref span{display:block;margin-top:8px;font-size:20px;color:var(--muted)}
      .l1-card{display:grid;grid-template-columns:110px 1fr;border-top:1px solid var(--line)}
      .l1-card > div{padding:16px 18px;border-bottom:1px solid var(--line);font-size:21px;line-height:1.55;color:var(--ink-2)}
      .l1-card .k{font-weight:900;color:var(--green-d);background:var(--green-soft)}
      .wf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px 30px}
      .wf-grid > div{display:flex;flex-direction:column;align-items:flex-start}
      .wf-grid small{margin-bottom:8px;font-size:18px;font-weight:700;color:var(--ink)}
      .wf-grid small i{font-style:normal;font-weight:400;color:var(--muted);margin-left:8px}
      ${WF.css}
    </style>`;
    const BENCH = ['apple', 'samsung'];
    const DIMS = S.dims;
    // one row per segment, one column per dim; rows with `none` print the noneLabel across
    const specTable = (rows, { first = '段落' } = {}) =>
      `<div class="grid spec" style="grid-template-columns:150px repeat(6,1fr)">` +
      `<div class="h">${first}</div>` + DIMS.map(([, l]) => `<div class="h">${l}</div>`).join('') +
      rows.map(r => `<div class="k">${r.seg}</div>` + (r.none
        ? `<div class="none" style="grid-column:span 6">${window.DECK.meta.noneLabel}</div>`
        : DIMS.map(([k]) => `<div>${r[k]}</div>`).join(''))).join('') + `</div>`;
    // fill = false leaves the Acer column as "?"
    const overviewTable = fill =>
      `<div class="grid spec ov" style="grid-template-columns:120px 1fr 1fr 1.2fr">` +
      `<div class="h"></div><div class="h en">APPLE</div><div class="h en">SAMSUNG</div><div class="h en a">ACER L1</div>` +
      S.overview.map(r => `<div class="k">${r.dim}</div><div>${r.apple}</div><div>${r.samsung}</div>` +
        `<div class="a">${fill ? `${r.acer}<small>學 ${r.from}</small>` : '<b class="q">？</b>'}</div>`).join('') + `</div>`;
    // L1 segment: reference page top-left, spec card on the right
    const l1Step = seg => {
      const r = R[seg.ref.page][seg.ref.region];
      return { chapter: 3,
        wins: { [seg.ref.page]: { rect: [80, 150, 780, 470], focus: r.focus, spot: r.spot } },
        tags: { [seg.ref.page]: seg.ref.label },
        panel: { top: 110, html: STYLE +
          `<div class="l1">` +
            `<div class="l1-ref"><small>${seg.id}</small><strong>${seg.seg}</strong><span>參照：${seg.ref.label}</span></div>` +
            `<div class="l1-card">` + DIMS.map(([k, l]) => `<div class="k">${l}</div><div>${seg[k]}</div>`).join('') + `</div>` +
          `</div>` } };
    };
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

      // ===== 02 Benchmark =====
      d.intro(2, { num: '02', title: 'Benchmark', sub: 'Apple Intelligence ・ Samsung Galaxy AI', p: '版面 ・ Assets ・ 敘事包裝' }),
      ...d.categories(2, BENCH),
      d.lengths(2, BENCH, { metric: 'hardware', label: '硬體導購' }),
      d.panel(2, 130, STYLE +
        `<h3>Assets：拿什麼<em>當證據</em></h3>` +
        d.table(['APPLE INTELLIGENCE', 'SAMSUNG GALAXY AI'], [
          ['證據數量', '約 20 張裝置內 UI', '13 個功能 UI 實拍＋去背商品照'],
          ['主要素材', '裝置內 UI 截圖，每張帶一句真實指令', '去背商品照＋UI 合成在生活照'],
          ['首屏圖片占比', '29%', '62%'],
          ['UI 截圖文字', '≈13px，清楚可讀', '≈15px'],
          ['可讀介面占圖片面積', '92%', '29%'],
          ['卡片比例・圓角', '直式 0.83:1・≈24px', '橫式 1.36:1・≈24px'],
          ['影片', '精選卡有影片', '全靜態'],
        ], '260px 1fr 1fr') +
        `<p class="note">面積比例引用 2026-09-23 拆解；像素值為本版 1920px 截圖實測（Apple apple-ai.png 全頁 1×，Samsung v1 截圖）。</p>`),
      d.panel(2, 130, STYLE +
        `<h3>敘事包裝：讀者用<em>什麼視角</em>看這一頁</h3>` +
        d.table(['APPLE INTELLIGENCE', 'SAMSUNG GALAXY AI'], [
          ['一句話', '「這是你的螢幕」', '「它出現在你生活的某個時刻」'],
          ['視角', '第一人稱：像從自己肩膀往下看螢幕', '第三人稱：別人的早午餐、別人的客廳'],
          ['開場', '角色先行：Siri 亮相', '提問先行：Can your phone do that?'],
          ['轉換路徑', '功能 → 信任 → 選機 → 相容晶片清單', '功能 → 信任 → 試用 → 選機'],
          ['讀者被邀請想像', '「我會對它說這句話」', '「上次我也遇過這個情況」'],
        ], '260px 1fr 1fr')),

      // Siri
      d.overview(2, 'apple', 'siri', { active: ['Hero', 'Siri AI'], caption: { k: 'APPLE INTELLIGENCE', h: 'Apple 怎麼擺 Siri' } }),
      d.zoom(2, 'apple', 'hero', { callout: { k: 'APPLE · HERO', h: 'Siri 就是<br>頁面的入口', tag: '角色先行',
        items: [[1, 'Hero 就是<strong>Siri 亮相</strong>，5 張真實 UI 拼貼'], [2, '限制條件<strong>緊貼主標</strong>，不藏在頁尾']] } }),
      d.zoom(2, 'apple', 'siri', { callout: { k: 'APPLE · SIRI 章', h: '第一章<br>也是 Siri', tag: '一句能說的話',
        items: [[1, '<strong>情境小標＋一句主標</strong>，捲動時知道在哪一章'], [2, '每張卡都是<strong>一句指令＋結果畫面</strong>']] } }),
      d.panel(2, 150, STYLE +
        `<h3>AIS 對應 Apple Intelligence，<em>Qubi 對應 Siri</em></h3>` +
        d.table(['APPLE', 'ACER'], [
          ['總稱', 'Apple Intelligence', 'Acer Intelligence Space'],
          ['人格入口', 'Siri', 'Qubi（個人助理）'],
          ['頁面位置', 'Hero＋第一章', 'Hero＋第一章（L1-1、L1-2）'],
          ['其他功能', '視覺／照片／溝通／生產力章節', 'AIS app 情境分頁（L1-3）'],
        ]) +
        `<p class="conclude" style="margin-top:28px">Qubi 當頁面的人格入口，AIS app 當情境章節</p>`),

      // benchmark specs
      d.panel(2, 110, STYLE + `<h3>Apple Intelligence <em>Spec</em></h3>` + specTable(S.bench.apple)),
      d.panel(2, 110, STYLE + `<h3>Samsung Galaxy AI <em>Spec</em></h3>` + specTable(S.bench.samsung)),
      d.panel(2, 130, STYLE + `<h3>L1 要回答的<em>六格</em></h3>` + overviewTable(false)),

      // ===== 03 L1 Spec =====
      d.intro(3, { num: '03', title: 'L1 Spec', sub: 'AIS 品牌 landing page', p: 'Hero → Qubi → 情境功能 → 選機 → 相容門檻 → FAQ' }),
      ...S.l1.map(l1Step),
      // where each asset goes: the six segments as mini wireframes (full-length version in spec.html)
      d.panel(3, 110, STYLE + `<h3>資產<em>放在哪裡</em></h3>` +
        `<div class="wf-grid">` + S.l1.map(s => `<div><small>${s.id} ${s.seg}<i>≈${d.px(WF.height(s.id))}px</i></small>` +
          WF.segment(s.id, WF.fitWidth(s.id, 566, 310) + 'px') + `</div>`).join('') + `</div>` +
        `<p class="note" style="margin-top:14px">綠框＝資產清單編號（A01–A08）；灰色為文字與按鈕位置。以 1440 寬頁面為準，不含全域導覽與頁尾。</p>`),

      // ===== 04 L2 · L3 =====
      d.panel(4, 150, STYLE +
        `<h3>L2 產品頁：<em>這台能用哪些 AI</em></h3>` +
        d.table(['方向'], [
          ['參照', 'Apple 各機型頁中的 Apple Intelligence 區塊'],
          ['內容', '這台可用的 AIS app、Qubi 等級、硬體亮點'],
          ['與 L1 的關係', 'L1 相容門檻的每一列 → 對應 L2 產品頁；L2 回連 L1 看完整功能'],
          ['本版範圍', '只定方向，spec 待 L1 上線後撰寫'],
        ], '260px 1fr')),
      d.panel(4, 150, STYLE +
        `<h3>L3 商城：<em>v1 已試做</em>的情境推薦</h3>` +
        d.table(['方向'], [
          ['內容', '情境 → 關鍵 app → 相容對照表 → 首選／第二推薦／CP 值最高'],
          ['已完成', 'App 規格表、345 台商品相容對照表、三情境推薦試算（v1 第 04、05 章）'],
          ['啟動條件', 'L1、L2 上線後'],
        ], '260px 1fr') +
        `<a class="demo" href="../#22" target="_blank" rel="noopener">看 v1 推薦段落<span aria-hidden="true">↗</span></a>` +
        `<a class="demo" href="../#27" target="_blank" rel="noopener" style="margin-left:16px">看 v1 推薦邏輯<span aria-hidden="true">↗</span></a>`),

      // ===== Summary =====
      d.panel(5, 110, STYLE +
        `<h3>L1 的<em>六格答案</em></h3>` + overviewTable(true) +
        `<a class="demo" href="spec.html" target="_blank" rel="noopener" style="margin-top:22px">附錄：完整 Spec 表<span aria-hidden="true">↗</span></a>`),
    ];
  },
};
