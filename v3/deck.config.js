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
    // today's Samsung page (2026-09-24), used only by the digital-asset sheet; other steps keep the v1 capture
    samsungLive: { kind: 'image', src: 'content/samsung/samsung-ai.jpg', srcLite: 'content/samsung/samsung-ai.lite.jpg', liteScale: 0.5, w: 1920, h: 8731,
      label: 'Samsung Galaxy AI', url: 'samsung.com/us/galaxy-ai',
      marks: { secs: [[0, 180, 1920, 1120], [0, 1300, 1920, 990], [0, 2290, 1920, 650], [0, 2940, 1920, 760], [0, 3700, 1920, 540], [0, 4240, 1920, 780], [0, 5020, 1920, 1240]] } },
    // L1-1 / L1-2 banner mockups (live HTML, restart on { deck: 'play' })
    mockHero: { kind: 'frames', w: 1440, h: 810, label: 'L1-1 Hero', url: '畫面提案・示意', defaultFrame: 'main',
      frames: { main: { src: 'content/mockup/hero.html', label: '畫面提案' } } },
    mockBanner: { kind: 'frames', w: 1440, h: 720, label: 'L1-2 Qubi Banner', url: '畫面提案・示意', defaultFrame: 'main',
      frames: { main: { src: 'content/mockup/banner.html', label: '畫面提案' } } },
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
        // one box per section of the digital-asset sheet (benchAssets.apple.rows)
        secs: [[0, 100, 1920, 1026], [0, 1126, 1920, 1022], [0, 2148, 1920, 907], [0, 3055, 1920, 916], [0, 3971, 1920, 981], [0, 4952, 1920, 975], [0, 5927, 1920, 1096], [0, 7023, 1920, 592], [0, 7615, 1920, 950], [0, 8565, 1920, 1099], [0, 9664, 1920, 964], [0, 10628, 1920, 746]],
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
    mockHero: { full: { spot: [0, 0, 1440, 810], focus: [0, 0, 1440, 810] } },
    mockBanner: { full: { spot: [0, 0, 1440, 720], focus: [0, 0, 1440, 720] } },
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
      .road .fade{opacity:.35}
      .ba-head{display:flex;align-items:center;justify-content:space-between;gap:24px;height:64px;margin-bottom:16px}
      .ba-head h3{margin:0}
      .ba-sum{display:flex;gap:10px;padding:10px 16px;border:2px solid var(--ink);border-radius:10px}
      .ba-sum span{display:flex;align-items:baseline;gap:6px;padding:0 8px;font-size:17px;color:var(--ink-2);white-space:nowrap}
      .ba-sum b{font:800 26px Montserrat,sans-serif;color:var(--green-d)}
      .grid.ba > div{padding:0 16px;font-size:17px;line-height:1.4;display:flex;flex-direction:column;justify-content:center;min-width:0}
      .grid.ba .h{font:800 14px 'Noto Sans TC',sans-serif;letter-spacing:1px}
      .grid.ba .k{font-size:17px;font-weight:700;color:var(--ink)}
      .grid.ba .n b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--green);color:#fff;font:800 14px Montserrat,sans-serif}
      .grid.ba strong{display:block;color:var(--ink);font-size:18px}
      .grid.ba small{display:block;font-size:14px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .ba-src{margin:10px 0 0;text-align:right;font-size:13px;color:var(--muted)}
      .ba-lines{position:absolute;left:-80px;top:-100px;width:1920px;height:1080px;overflow:visible;pointer-events:none}
      .ba-lines path{fill:none;stroke:var(--green);stroke-width:1.5;opacity:.75}
      .ba-lines circle{fill:var(--green)}
      .road .go .demo{margin:22px 0 0;padding:10px 24px;font-size:20px;background:#fff;color:var(--green-d)}
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
    // the L0–L3 ladder (01 Roadmap, 04 L2・L3); o[level] overrides { cls, tag, body }
    const LEVELS = [
      ['L0', 'now', '● 現在', 'AIS 功能介紹頁', '一頁介紹 app 功能<br>導流終點：下載'],
      ['L1', 'go', '▶ 本次定案', 'AIS 品牌 landing page', 'AIS＋Qubi 一頁講完<br>依裝置類別 → acer.com 分類頁'],
      ['L2', 'dir', '方向', '產品頁 AIS 區塊', '這台能用哪些 AIS app<br>導流終點：單一機型'],
      ['L3', 'dir', '方向 · v1 已試做', '商城情境推薦', '情境 → 推薦 SKU<br>導流終點：購買'],
    ];
    const road = (o = {}) => `<div class="road">` + LEVELS.map(([lv, cls, tag, title, body]) => {
      const x = { cls, tag, body, ...o[lv] };
      return `<div class="${x.cls}"><i>${x.tag}</i><b>${lv}</b><strong>${title}</strong><span>${x.body}</span>${x.extra || ''}</div>`;
    }).join('') + `</div>`;
    // L1-1 / L1-2 banner mockup: the live page with a callout on how it moves
    const mockStep = (page, callout) => d.zoom(3, page, 'full', { marks: false, message: 'play', callout: { tag: '畫面提案・示意', ...callout } });
    // layout and assets sheet: the page on the left with a dashed box per section, the table on the right,
    // one line from each box to its row. Geometry mirrors the engine's fit() so the lines land on the boxes.
    const SHEET = { rect: [80, 100, 300, 900], left: 410, headH: 64, gap: 16, thH: 35, rowH: { apple: 60, samsung: 88 } };
    const benchAssetStep = (key, page) => {
      const b = S.benchAssets[key], p = window.DECK.pages[page], [rx, ry, rw, rh] = SHEET.rect, rowH = SHEET.rowH[key];
      const s = Math.min(rw / p.w, (rh - 40) / p.h), ox = rx + (rw - p.w * s) / 2, oy = ry + 40 + (rh - 40 - p.h * s) / 2;
      const rowY = i => SHEET.rect[1] + SHEET.headH + SHEET.gap + SHEET.thH + i * rowH + rowH / 2;
      const lines = p.marks.secs.map(([x, y, w, h], i) => { const x1 = ox + (x + w) * s + 3, y1 = oy + (y + h / 2) * s, x2 = SHEET.left + 6, y2 = rowY(i);
        return `<circle cx="${x1}" cy="${y1}" r="4"/><path d="M${x1} ${y1}L${x2} ${y2}"/><circle cx="${x2}" cy="${y2}" r="4"/>`; }).join('');
      const html = `<style>#win-${page} .marks[data-g="secs"] .mark b{display:none}</style>` +
        `<svg class="ba-lines" viewBox="0 0 1920 1080">${lines}</svg>` +
        `<div style="margin-left:${SHEET.left - 80}px"><div class="ba-head"><h3>${b.name} : <em>layout and assets</em></h3><div class="ba-sum">` +
        b.totals.map(([k, n]) => `<span><b>${n}</b>${k}</span>`).join('') + `</div></div>` +
        `<div class="grid ba" style="grid-template-columns:52px 120px 1fr 300px;grid-template-rows:${SHEET.thH}px repeat(${b.rows.length},${rowH}px)">` +
        `<div class="h"></div><div class="h">區塊</div><div class="h">文字文案</div><div class="h">影像檔案</div>` +
        b.rows.map((r, i) => `<div class="n"><b>${i + 1}</b></div><div class="k">${r.seg}</div><div><strong>${r.title}</strong><small>${r.sub}</small></div><div>${r.assets}</div>`).join('') + `</div>` +
        `<p class="ba-src">${b.url}・${S.benchAssets.date} 線上頁面讀取</p></div>`;
      return { chapter: 2, wins: { [page]: { rect: SHEET.rect, focus: 'full', marks: 'secs' } }, panel: { top: SHEET.rect[1], html: STYLE + html } };
    };
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
        `<div class="a">${fill ? r.acer : '<b class="q">？</b>'}</div>`).join('') + `</div>`;
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
        road()),

      // ===== 02 Benchmark =====
      d.intro(2, { num: '02', title: 'Benchmark', sub: 'Apple Intelligence ・ Samsung Galaxy AI', p: '版面 ・ Assets ・ 敘事包裝' }),
      ...d.categories(2, BENCH),
      // each benchmark page section by section: copy and image files
      benchAssetStep('apple', 'apple'),
      benchAssetStep('samsung', 'samsungLive'),

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
      // where each asset goes: the six segments as mini wireframes (full-length version in spec.html)
      d.panel(3, 110, STYLE + `<h3>資產<em>放在哪裡</em></h3>` +
        `<div class="wf-grid">` + S.l1.map(s => `<div><small>${s.id} ${s.seg}<i>≈${d.px(WF.height(s.id))}px</i></small>` +
          WF.segment(s.id, WF.fitWidth(s.id, 566, 310) + 'px') + `</div>`).join('') + `</div>` +
        `<p class="note" style="margin-top:14px">綠框＝資產清單編號（A01–A08）；灰色為文字與按鈕位置。以 1440 寬頁面為準，不含全域導覽與頁尾。</p>`),

      l1Step(S.l1[0]),
      mockStep('mockHero', { k: 'L1-1 · 畫面提案', h: 'Hey Qubi!<br>從筆電探出頭',
        items: [[1, '全白底、<strong>筆電置中</strong>，畫面只有一個主角'], [2, 'Qubi 從螢幕後<strong>探出頭、點頭打招呼</strong>'], [3, '「Hey Qubi!」→ 副標<strong>依序淡入</strong>，約 3 秒完成，不放 CTA']] }),
      l1Step(S.l1[1]),
      mockStep('mockBanner', { k: 'L1-2 · 畫面提案', h: '問什麼，<br>就換什麼場景',
        items: [[1, '<strong>橫式卡片輪播</strong>跟著對話滑到對應場景'], [2, '對話框<strong>壓在卡片上</strong>，底圖同步壓暗'], [3, '人物去背時出現<strong>裁切框與掃描線</strong>，表示處理中']] }),
      ...S.l1.slice(2).map(l1Step),

      // ===== 04 L2 · L3 =====
      d.panel(4, 120, STYLE +
        `<h3>L2・L3：<em>下一步</em>的方向</h3>` +
        road({
          L0: { cls: 'now fade' }, L1: { cls: 'go fade' },
          L2: { cls: 'go', tag: '下一步', body: '這台能用哪些 AIS app、Qubi 等級<br>導流終點：單一機型<br>待 L1 上線後撰寫 spec' },
          L3: { cls: 'go', tag: '方向 · v1 已試做', body: '情境 → 推薦 SKU<br>導流終點：購買<br>待 L1、L2 上線後啟動',
            extra: `<a class="demo" href="../#22" target="_blank" rel="noopener">看 v1 試做 ↗</a>` },
        })),

      // ===== Summary =====
      d.panel(5, 110, STYLE +
        `<h3>L1 的<em>六格答案</em></h3>` + overviewTable(true) +
        `<a class="demo" href="spec.html" target="_blank" rel="noopener" style="margin-top:22px">附錄：完整 Spec 表<span aria-hidden="true">↗</span></a>`),
    ];
  },
};
