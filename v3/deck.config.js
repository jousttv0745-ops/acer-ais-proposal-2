/* deck.config.js — AIS proposal v3 (Level 1 landing page spec). Spec text lives in spec-data.js. */
window.DECK = {
  meta: {
    title: 'AIS Landing Page Spec v3',
    brand: '<b>Acer Intelligence Space</b> · Landing Page Spec',
    note: '說明文字為草稿',
    noneLabel: '無此區塊',
  },
  theme: {},
  layout: { benchSide: 500, benchGap: 40 }, // category steps: two narrow page columns, notes left and right
  chapters: ['00 Recap', '01 Milestone', '02 Benchmark', '03 Spec', 'Summary', 'Appendix'],
  categories: [
    { key: 'brand', name: '網頁定位', color: '#83b81a', desc: '兩家第一屏都先立 AI 的角色：Apple 是 Siri，Samsung 是 AI companion' },
    { key: 'feature', name: '功能介紹', color: '#3b82f6', desc: 'Apple 用情境章節拉長篇幅，Samsung 用分頁壓縮在一屏' },
    { key: 'security', name: '資訊安全', color: '#f59e0b', desc: '兩家都在選機前處理隱私疑慮（Acer 本版不做此段）' },
    { key: 'hardware', name: '硬體導流', color: '#ef4444', desc: '兩家都依裝置類別選機；Apple 另附相容晶片清單' },
    { key: 'seo', name: 'SEO（FAQ）', color: '#8b5cf6', desc: 'Samsung 用 FAQ 集中免責與長尾；Apple 只有註腳' },
    { key: 'frame', name: '網站框架', color: '#9ca3af', desc: 'Header、Footer 與註解' },
  ],
  frameCategory: 'frame',

  pages: {
    // today's Samsung page (2026-09-24), used only by the digital-asset sheet; other steps keep the v1 capture
    samsungLive: { kind: 'image', src: 'content/samsung/samsung-ai.jpg', srcLite: 'content/samsung/samsung-ai.lite.jpg', liteScale: 0.5, w: 1920, h: 8731,
      label: 'Samsung Galaxy AI', url: 'samsung.com/us/galaxy-ai',
      cats: { brand: [[180, 1120]], feature: [[1300, 1640]], security: [[2940, 760]], hardware: [[3700, 1320]], seo: [[5020, 1240]], frame: [[0, 180], [6260, 2471]] },
      marks: { secs: [[0, 180, 1920, 1120], [0, 1300, 1920, 990], [0, 2290, 1920, 650], [0, 2940, 1920, 760], [0, 3700, 1920, 540], [0, 4240, 1920, 780], [0, 5020, 1920, 1240]] } },
    // L1-1 / L1-2 banner mockups (live HTML, restart on { deck: 'play' })
    // the whole L1 wireframe as one strip; the L1 steps scroll down it one segment at a time
    wfStrip: { kind: 'frames', w: 1440, h: window.Wireframe.stackHeight(), label: 'Wireframe', url: '整頁 1440 寬', defaultFrame: 'main',
      frames: { main: { src: 'content/wireframe.html', label: '整頁' } },
      marks: { secs: window.Wireframe.stack().map(s => [0, s.label, 1440, s.h + 56]) } },
    mockHero: { kind: 'frames', w: 1440, h: 810, label: '01 Hero', url: '畫面提案・示意', defaultFrame: 'main',
      frames: { main: { src: 'content/mockup/hero.html', label: '畫面提案' } } },
    mockBanner: { kind: 'frames', w: 1440, h: 720, label: '02 Qubi Banner', url: '畫面提案・示意', defaultFrame: 'main',
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
    // one region per segment on the strip: spot = the segment, focus = a window of the strip centred on it
    wfStrip: Object.fromEntries(window.Wireframe.stack().map(s => {
      const H = window.Wireframe.stackHeight(), view = 2212, top = Math.max(0, Math.min(H - view, s.label + (s.h + 56) / 2 - view / 2));
      return [s.id, { spot: [0, s.label, 1440, s.h + 56], focus: [0, top, 1440, Math.min(view, H)] }];
    })),
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
      .road{display:grid;grid-template-columns:repeat(3,1fr);gap:48px;align-items:stretch;margin-top:40px}
      .road div{position:relative;padding:26px 26px 24px;border:1px solid var(--line);border-radius:16px;background:#fff}
      .road div{min-height:520px}
      .road div:not(:last-child)::after{content:'';position:absolute;right:-38px;top:50%;width:28px;height:28px;margin-top:-14px;
        background:no-repeat center/28px url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 12h14M12 5l7 7-7 7' fill='none' stroke='%2383b81a' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
      .road b{font:800 30px Montserrat,sans-serif;color:var(--green-d)}
      .road strong{display:block;margin-top:10px;font:800 34px/1.25 Montserrat,'Noto Sans TC',sans-serif}
      .road dl{display:grid;grid-template-columns:auto 1fr;gap:14px 16px;margin:26px 0 0;font-size:24px;line-height:1.45}
      .road dt{font:800 17px Montserrat,sans-serif;letter-spacing:1px;text-transform:uppercase;padding-top:5px;color:var(--muted)}
      .road dd{margin:0;color:var(--ink)}
      .road .go dt{color:#eef7dd}.road .go dd{color:#fff}
      .road span{display:block;margin-top:10px;font-size:20px;line-height:1.55;color:var(--muted)}
      .road i{position:absolute;top:-18px;left:22px;padding:4px 14px;border-radius:999px;font:700 16px 'Noto Sans TC',sans-serif;font-style:normal}
      .road .now i{background:#9ca3af;color:#fff}
      .road .go{background:var(--green);border-color:var(--green)}
      .road .go b,.road .go strong,.road .go span{color:#fff}
      .road .go i{background:#f59e0b;color:#fff}
      .road .dir{border-style:dashed}
      .road .dir i{background:var(--green-soft);color:var(--green-d)}
      .road .fade{opacity:.35}
      .fw-col{position:absolute;top:100px;width:640px}
      .fw-tag{display:inline-block;margin-bottom:12px;padding:6px 16px;border-radius:999px;color:#fff;font:800 18px Montserrat,'Noto Sans TC',sans-serif}
      .fw-tag.ap{background:#1a1d23}.fw-tag.ss{background:#1428a0}
      .fw-group{position:relative;margin:0 0 12px;padding:8px 0 8px 18px;border-left:4px solid var(--green)}
      .fw-group em{display:block;margin-bottom:6px;font-style:normal;font-size:17px;font-weight:900;color:var(--green-d)}
      .fw-row{display:flex;align-items:baseline;gap:14px;padding:5px 0}
      .fw-row b{font:800 20px Montserrat,sans-serif;color:var(--faint)}
      .fw-row strong{display:block;font-size:22px;color:var(--ink)}
      .fw-row small{display:block;font-size:17px;color:var(--muted)}
      .concl{position:absolute;left:0;right:0;margin:0;padding:18px 26px;border-radius:14px;background:var(--green);color:#fff;font-size:26px;font-weight:900}
      .ap-row{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:8px}
      .ap-card{padding:24px;border:1px solid var(--line);border-radius:18px;background:#fff}
      .ap-img{height:390px;display:flex;align-items:center;justify-content:center;background:#f6f7f9;border-radius:12px;overflow:hidden}
      .ap-img img{max-width:100%;max-height:100%;border-radius:10px}
      .ap-card strong{display:block;margin:16px 0 6px;font-size:26px;font-weight:900}
      .fw-two{display:grid;grid-template-columns:1fr 1fr;gap:48px}
      .fw-dia{padding:22px 26px;border:1px solid var(--line);border-radius:18px;background:#fff}
      .fw-order{margin:4px 0 14px;font:800 22px Montserrat,sans-serif;color:var(--ink)}
      .fw-order span{font:900 22px 'Noto Sans TC',sans-serif;color:var(--ink)}
      .fw-blk p{margin:6px 0 0;font-size:18px;line-height:1.45}
      .fw-blk,.fw-ctx{border-radius:14px;padding:14px 18px}
      .fw-blk em,.fw-ctx em{display:flex;align-items:baseline;gap:12px;font:800 24px Montserrat,sans-serif;font-style:normal}
      .fw-blk small,.fw-ctx small{font:700 17px 'Noto Sans TC',sans-serif;opacity:.8}
      .fw-blk.hero{background:#eceef2;color:var(--ink)}
      .fw-blk.assistant{background:var(--green);color:#fff}
      .fw-ctx{background:var(--green-soft);color:var(--green-d)}
      .fw-ctx > div{display:flex;gap:10px;margin-top:10px}
      .fw-ctx.vertical > div{flex-direction:column}
      .fw-ctx span{padding:6px 14px;border-radius:10px;background:#fff;border:1px solid #cfe6a9;color:var(--ink);font-size:18px;font-weight:700}
      .fw-ctx.horizontal span{flex:1;text-align:center;font-size:15px;padding:12px 4px}
      .fw-arrow{display:block;text-align:center;font-style:normal;font-size:22px;line-height:1.4;color:var(--faint)}
      .fw-note{margin:14px 0 0;font-size:21px;font-weight:700;color:var(--ink)}
      .ap-count{display:flex;gap:14px;margin-top:16px;padding-top:14px;border-top:1px solid var(--line)}
      .ap-count span{display:flex;align-items:baseline;gap:6px;font-size:18px;color:var(--ink-2)}
      .ap-count b{font:800 30px Montserrat,sans-serif;color:var(--green-d)}
      .grid.ba .k .ref{display:inline-block;margin-top:6px;padding:2px 10px;border-radius:999px;color:#fff;font:800 13px Montserrat,'Noto Sans TC',sans-serif;width:max-content}
      .grid.ba .k .ref.ap{background:#1a1d23}.grid.ba .k .ref.ss{background:#1428a0}
      .ap-card ul{margin:0;padding-left:22px;font-size:20px;line-height:1.6;color:var(--ink-2)}
      .road .dir .demo{margin:22px 0 0;padding:10px 24px;font-size:20px}
      .ct-head{display:flex;align-items:center;gap:18px;margin-bottom:14px}
      .ct-head h3{margin:0}
      .ct-head h3 em{font-size:30px;color:var(--muted)}
      .ct-ref{padding:6px 16px;border-radius:999px;color:#fff;font:800 17px Montserrat,sans-serif}
      .ct-ref.ap{background:#1a1d23}.ct-ref.ss{background:#1428a0}
      .ct-head i{margin-left:auto;padding:4px 14px;border-radius:999px;background:#fff4df;color:#b45309;font-size:16px;font-style:normal;font-weight:700}
      .grid.ct > div{padding:8px 16px;font-size:19px;line-height:1.4}
      .grid.ct .h{font:800 16px Montserrat,'Noto Sans TC',sans-serif;letter-spacing:1px}
      .grid.ct .k{font-size:20px;font-weight:900;color:var(--ink)}
      .grid.ct .k.cont{border-bottom-color:transparent}
      .grid.ct .it{font-size:17px;font-weight:700;color:var(--green-d)}
      .grid.ct .first{border-top:2px solid var(--ink)}
      .grid.ct .a{color:var(--ink);font-weight:500}
      .grid.ct ul{margin:0;padding-left:22px}
      .grid.ct .as{display:inline-block;padding:3px 12px;border-radius:8px;background:#eef1f5;font-size:17px;font-weight:700;color:var(--ink-2)}
      .grid.ct .a .as{background:#fff;color:var(--green-d)}
      .grid.ct li{margin:2px 0}
      .grid.ct b{display:inline;color:var(--ink);font-size:19px;font-weight:900}
      .grid.ct b.tab{display:block;font-size:21px;color:var(--green-d)}
      .grid.ct i{display:inline-block;margin-left:10px;padding:0 10px;border-radius:999px;background:#eceef2;color:var(--muted);font-size:14px;font-style:normal;font-weight:700;vertical-align:2px}
      .grid.ct b ~ br + *,.grid.ct > div:has(> b:not(.tab)){font-size:17px;line-height:1.45}
      .l1s{margin-left:620px}
      .l1s:not(.mock) .l1s-head{display:flex;align-items:baseline;gap:16px}
      .l1s:not(.mock) .l1s-head strong{margin:0;font-size:42px}
      .l1s-head i{padding:3px 12px;border-radius:999px;background:#fff4df;color:#b45309;font-size:15px;font-style:normal;font-weight:700}
      .l1s-goal{margin:10px 0 16px;font-size:23px;color:var(--ink-2)}
      .l1s-goal b{margin-right:10px;padding:2px 12px;border-radius:6px;background:var(--green-soft);color:var(--green-d);font-size:18px}
      .l1s-mock{margin:0 auto;box-shadow:0 10px 30px rgba(17,24,39,.08);border-radius:8px;overflow:hidden}
      .l1s-head small{display:block;font:800 18px Montserrat,sans-serif;letter-spacing:2px;color:var(--green-d)}
      .l1s-head strong{display:block;margin-top:4px;font-size:40px;font-weight:900}
      .l1s h4{display:flex;align-items:center;gap:10px;margin:26px 0 10px;font-size:18px;font-weight:900;color:var(--muted)}
      .l1s h4 i{padding:2px 10px;border-radius:999px;background:#fff4df;color:#b45309;font-size:13px;font-style:normal}
      .l1s-copy,.l1s-spec{display:grid;grid-template-columns:110px 1fr;border-top:1px solid var(--line)}
      .l1s-copy > div,.l1s-spec > div{padding:10px 14px;border-bottom:1px solid var(--line);font-size:20px;line-height:1.5;color:var(--ink)}
      .l1s-spec > div{font-size:17px;color:var(--ink-2)}
      .l1s-copy .k,.l1s-spec .k{font-size:16px;font-weight:700;color:var(--green-d);background:var(--green-soft)}
      .l1s.mock .l1s-head{display:flex;align-items:baseline;gap:16px}
      .l1s.mock .l1s-head strong{font-size:34px;margin:0}
      .l1s.mock ol{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:12px 0 0;padding:0;list-style:none;counter-reset:n}
      .l1s.mock li{position:relative;padding:0 0 0 44px;font-size:21px;line-height:1.5;color:var(--ink-2);counter-increment:n}
      .l1s.mock li::before{content:counter(n);position:absolute;left:0;top:2px;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:var(--green);color:#fff;font:800 14px Montserrat,sans-serif}
      .cat-note{position:absolute;top:0;width:400px;max-height:700px;overflow:hidden;padding:22px 24px;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:0 10px 30px rgba(17,24,39,.06)}
      .cat-note.apple{left:0}.cat-note.samsung{right:0}
      .cat-note .who{display:inline-block;margin-bottom:8px;padding:6px 16px;border-radius:999px;font:800 18px Montserrat,sans-serif;letter-spacing:.5px;color:#fff}
      .cat-note .who.ap{background:#1a1d23}.cat-note .who.ss{background:#1428a0}
      .tags span.ap{background:#1a1d23}.tags span.ss{background:#1428a0}
      .cat-note h4{margin:16px 0 6px;font-size:18px;font-weight:900;color:var(--muted)}
      .cat-note p{margin:0;font-size:23px;line-height:1.5;color:var(--ink)}
      .cat-note p small{font-size:18px;color:var(--muted)}
      .cat-note p b{color:var(--green-d)}
      .cat-note p.none{margin-top:10px;color:var(--faint)}
      .cat-note ul{margin:0;padding:0 0 0 20px;font-size:19px;line-height:1.5;color:var(--ink-2)}
      .cat-note li{line-height:1.4;margin-bottom:4px}
      .grid.cmp > div{font-size:21px;line-height:1.5;padding:16px 20px}
      .grid.cmp .k{font-weight:700;color:var(--ink)}
      .grid.cmp .h{font:800 16px Montserrat,'Noto Sans TC',sans-serif;letter-spacing:1.5px}
      .grid.cmp .a{font-weight:500}
      .pick{display:inline-block;margin:0 10px 4px 0;padding:2px 12px;border-radius:999px;font:800 14px Montserrat,'Noto Sans TC',sans-serif;font-style:normal;color:#fff}
      .pick.ap{background:#1a1d23}.pick.ss{background:#1428a0}.pick.both{background:var(--green)}
      .ba-head{display:flex;align-items:center;justify-content:space-between;gap:24px;height:64px;margin-bottom:16px}
      .ba-head h3{margin:0}
      .ba-sum{display:flex;gap:10px;padding:10px 16px;border:2px solid var(--ink);border-radius:10px}
      .ba-sum span{display:flex;align-items:baseline;gap:6px;padding:0 8px;font-size:17px;color:var(--ink-2);white-space:nowrap}
      .ba-sum b{font:800 26px Montserrat,sans-serif;color:var(--green-d)}
      .grid.ba > div{padding:0 16px;font-size:20px;line-height:1.4;display:flex;flex-direction:column;justify-content:center;min-width:0}
      .grid.ba .h{font:800 16px 'Noto Sans TC',sans-serif;letter-spacing:1px}
      .grid.ba .k{font-size:20px;font-weight:700;color:var(--ink)}
      .grid.ba .n b{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--green);color:#fff;font:800 16px Montserrat,sans-serif}
      .grid.ba strong{display:block;color:var(--ink);font-size:21px;line-height:1.3}
      .grid.ba small{display:block;margin-top:2px;font-size:16px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .ba-src{margin:10px 0 0;text-align:right;font-size:15px;color:var(--muted)}
      .ba-src a{color:var(--green-d);font-weight:700}
      .ba-lines{position:absolute;left:-80px;top:-100px;width:1920px;height:1080px;overflow:visible;pointer-events:none}
      .ba-lines path{fill:none;stroke:var(--green);stroke-width:1.5;opacity:.75}
      .ba-lines circle{fill:var(--green)}
      .road .go .demo{margin:22px 0 0;padding:10px 24px;font-size:20px;background:#fff;color:var(--green-d)}
      .grid.spec > div{font-size:19px;line-height:1.5;padding:10px 14px}
      .grid.spec .h{font:800 14px Montserrat,'Noto Sans TC',sans-serif;letter-spacing:1px}
      .grid.spec .k{font-size:19px;font-weight:700;color:var(--ink)}
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
      ['M1', 'go', '▶ 本次定案', 'AIS Landing Page Renewal', 'Landing page', 'Guide users to product category pages for more information'],
      ['M2', 'dir', 'Next', 'Recommendations on Product Pages', 'Landing page', 'Guide users to specific product pages for more details'],
      ['M3', 'dir', 'Future・v1 prototype', 'Recommendations on the Online Store', 'Landing page', 'Take users directly to product pages on the online store'],
    ];
    const road = (o = {}) => `<div class="road">` + LEVELS.map(([lv, cls, tag, title, target, goal]) => {
      const x = { cls, tag, ...o[lv] };
      return `<div class="${x.cls}"><i>${x.tag}</i><b>Milestone ${lv.slice(1)}</b><strong>${title}</strong>` +
        `<dl><dt>Target</dt><dd>${target}</dd><dt>Goal</dt><dd>${goal}</dd></dl>${x.extra || ''}</div>`;
    }).join('') + `</div>`;
    // layout and assets sheet: the page on the left with a dashed box per section, the table on the right,
    // one line from each box to its row. Geometry mirrors the engine's fit() so the lines land on the boxes.
    const SHEET = { rect: [80, 100, 300, 900], left: 410, headH: 64, gap: 16, thH: 38, rowH: { apple: 62, samsung: 96, acer: 112 } };
    const benchAssetStep = (key, page) => sheetStep(S.benchAssets[key], key, page, 2, `${S.benchAssets[key].url}・${S.benchAssets.date} 線上頁面讀取`);
    const sheetStep = (b, key, page, chapter, foot) => {
      const p = window.DECK.pages[page], [rx, ry, rw, rh] = SHEET.rect, rowH = SHEET.rowH[key];
      const s = Math.min(rw / p.w, (rh - 40) / p.h), ox = rx + (rw - p.w * s) / 2, oy = ry + 40 + (rh - 40 - p.h * s) / 2;
      const rowY = i => SHEET.rect[1] + SHEET.headH + SHEET.gap + SHEET.thH + i * rowH + rowH / 2;
      const lines = p.marks.secs.map(([x, y, w, h], i) => { const x1 = ox + (x + w) * s + 3, y1 = oy + (y + h / 2) * s, x2 = SHEET.left + 6, y2 = rowY(i);
        return `<circle cx="${x1}" cy="${y1}" r="4"/><path d="M${x1} ${y1}L${x2} ${y2}"/><circle cx="${x2}" cy="${y2}" r="4"/>`; }).join('');
      const html = `<style>#win-${page} .marks[data-g="secs"] .mark b{display:none}</style>` +
        `<svg class="ba-lines" viewBox="0 0 1920 1080">${lines}</svg>` +
        `<div style="margin-left:${SHEET.left - 80}px"><div class="ba-head"><h3>${b.name} : <em>layout and assets</em></h3><div class="ba-sum">` +
        b.totals.map(([k, n]) => `<span><b>${n}</b>${k}</span>`).join('') + `</div></div>` +
        `<div class="grid ba" style="grid-template-columns:52px 150px 1fr 330px;grid-template-rows:${SHEET.thH}px repeat(${b.rows.length},${rowH}px)">` +
        `<div class="h"></div><div class="h">區塊</div><div class="h">文字文案</div><div class="h">影像檔案</div>` +
        b.rows.map((r, i) => `<div class="n"><b>${i + 1}</b></div><div class="k">${r.seg}${r.ref ? `<span class="ref ${r.ref === 'Apple' ? 'ap' : 'ss'}">參考 ${r.ref}</span>` : ''}</div><div><strong>${r.title}</strong><small>${r.sub}</small></div><div>${r.assets}</div>`).join('') + `</div>` +
        (b.conclusion ? `<p class="concl" style="position:static;margin-top:18px">${b.conclusion}</p>` : '') +
        `<p class="ba-src">${foot}</p></div>`;
      return { chapter, wins: { [page]: { rect: SHEET.rect, focus: 'full', marks: 'secs' } }, panel: { top: SHEET.rect[1], html: STYLE + html } };
    };
    // category steps: per brand, which sections sit in this category, their headlines and their image assets
    const CAT_PAGE = { apple: 'apple', samsung: 'samsungLive' };
    const count = rows => { const t = { Image: 0, 商品去背: 0, Video: 0, Icon: 0 };
      rows.forEach(r => Object.keys(t).forEach(k => { const m = r.assets.match(new RegExp(k + ' ×(\\d+)')); if (m) t[k] += +m[1]; }));
      const s = Object.entries(t).filter(([, n]) => n).map(([k, n]) => `${k} <b>${n}</b>`).join('・'); return s || '純文字'; };
    const catNote = (brand, cat) => { const b = S.benchAssets[brand], rows = b.rows.filter(r => r.cat === cat), page = CAT_PAGE[brand];
      const body = cat === 'frame' ? `<p>Header、Footer 與註腳，不列入比較</p>`
        : !rows.length ? `<p class="none">${window.DECK.meta.noneLabel}</p>`
        : `<h4>架構</h4><p>${rows.map(r => r.seg).join('＋')}<br><small>占整頁 ${d.pct(page, cat)}%</small></p>` +
          `<h4>敘事文字</h4><ul>${rows.map(r => `<li>${r.title}</li>`).join('')}</ul>` +
          `<h4>影像資產</h4><p>${count(rows)}</p>`;
      return `<div class="cat-note ${brand}"><small class="who ${brand === 'apple' ? 'ap' : 'ss'}">${b.name}</small>${body}</div>`; };
    const catStep = st => ({ ...st, tags: { apple: { text: 'Apple Intelligence', tone: 'ap' }, samsungLive: { text: 'Samsung Galaxy AI', tone: 'ss' } },
      panel: { top: 180, instant: true, html: STYLE + catNote('apple', st.catHead) + catNote('samsung', st.catHead) } });
    // copy / image comparison with the pick for Acer
    const compareTable = rows => `<div class="grid cmp" style="grid-template-columns:150px 1fr 1fr 1.15fr">` +
      `<div class="h"></div><div class="h en">APPLE</div><div class="h en">SAMSUNG</div><div class="h a">更適合 ACER</div>` +
      rows.map(r => `<div class="k">${r.seg}</div><div>${r.apple}</div><div>${r.samsung}</div>` +
        `<div class="a"><i class="pick ${r.pick === 'Apple' ? 'ap' : r.pick === 'Samsung' ? 'ss' : 'both'}">${r.pick}</i>${r.why}</div>`).join('') + `</div>`;
    // copy table page: groups of S.copyTable, reference brand column next to the Acer draft
    const copyPage = (groups, ref, n) => d.panel(4, 100, STYLE +
      `<div class="ct-head"><h3>Layout and Assets 對照表<em>（${n}）</em></h3><span class="ct-ref ${ref === 'Apple' ? 'ap' : 'ss'}">參照 ${ref}</span><i>Acer 文案為草稿</i></div>` +
      `<div class="grid ct" style="grid-template-columns:200px 170px 1fr 1fr">` +
      `<div class="h">區塊</div><div class="h">項目</div><div class="h en">${ref.toUpperCase()}</div><div class="h a">ACER（草稿）</div>` +
      groups.map(g => S.copyTable[g]).map(g => [...g.rows, ['Assets', `<span class="as">${g.assets[0]}</span>`, `<span class="as">${g.assets[1]}</span>`]].map(([item, refCopy, acer], i) =>
        `<div class="k${i ? ' cont' : ' first'}">${i ? '' : g.seg}</div><div class="it${i ? '' : ' first'}">${item}</div><div class="${i ? '' : 'first'}">${refCopy}</div><div class="a${i ? '' : ' first'}">${acer}</div>`).join('')).join('') +
      `</div>`);
    // layout and framework for Acer: each brand's section order drawn as a structure diagram
    const FW_LABEL = { hero: 'Hero', assistant: 'Assistant', context: 'Context' };
    const fwDiagram = key => { const g = S.framework.diagram[key], name = S.benchAssets[key].name;
      const block = part => {
        if (part === 'context') return `<div class="fw-ctx ${g.layout}"><em>${FW_LABEL.context}<small>情境</small></em><div>` + g.contexts.map(t => `<span>${t}</span>`).join('') + `</div></div>`;
        return `<div class="fw-blk ${part}"><em>${FW_LABEL[part]}<small>${part === 'hero' ? '主視覺' : '助理：' + (key === 'apple' ? 'Siri' : 'Bixby')}</small></em><p>${g.copy[part]}</p></div>`; };
      return `<div class="fw-dia"><span class="fw-tag ${key === 'apple' ? 'ap' : 'ss'}">${name}</span>` +
        `<p class="fw-order">${g.order.map(p => FW_LABEL[p]).join(' → ')}<span>：${g.note}</span></p>` +
        g.order.map(block).join('<i class="fw-arrow">↓</i>') + `</div>`; };
    const frameworkStep = () => d.panel(2, 100, STYLE + `<h3>Layout and framework <em>for Acer</em></h3>` +
      `<div class="fw-two">${fwDiagram('apple')}${fwDiagram('samsung')}</div>` +
      `<p class="concl" style="position:static;margin-top:22px">${S.framework.conclusion}</p>`);
    // assets for Acer: one representative image per brand, side by side
    const assetsStep = () => d.panel(2, 100, STYLE + `<h3>Assets <em>for Acer</em></h3><div class="ap-row">` +
      ['apple', 'samsung'].map(k => { const a = S.assetPick[k];
        return `<div class="ap-card"><span class="fw-tag ${k === 'apple' ? 'ap' : 'ss'}">${S.benchAssets[k].name}</span><div class="ap-img"><img src="${a.src}" alt=""></div>` +
          `<strong>${a.title}</strong><ul>${a.points.map(p => `<li>${p}</li>`).join('')}</ul>` +
          `<div class="ap-count">${a.counts.map(([k, n]) => `<span><b>${n}</b>${k}</span>`).join('')}</div></div>`; }).join('') +
      `</div><p class="concl" style="position:static;margin-top:26px">${S.assetPick.conclusion}</p>`);
    const BENCH = ['apple', 'samsungLive'];
    const DIMS = S.dims;
    // one row per segment, one column per dim; rows with `none` print the noneLabel across
    const specTable = (rows, { first = '段落' } = {}) =>
      `<div class="grid spec" style="grid-template-columns:150px repeat(6,1fr)">` +
      `<div class="h">${first}</div>` + DIMS.map(([, l]) => `<div class="h">${l}</div>`).join('') +
      rows.map(r => `<div class="k">${r.seg}</div>` + (r.none
        ? `<div class="none" style="grid-column:span 6">${window.DECK.meta.noneLabel}</div>`
        : DIMS.map(([k]) => `<div>${r[k]}</div>`).join(''))).join('') + `</div>`;
    // L1 segment: the wireframe strip on the left scrolled to it; on the right its banner mockup
    // (L1-1, L1-2) with how it moves, or the suggested copy and a short spec
    const segNo = id => id.replace(/^L1-/, '0'); // L1-3 → 03 on screen
    const STRIP = [80, 100, 560, 900];
    const MOCK = { mockHero: 810, mockBanner: 720 };
    const l1Scroll = (seg, mock) => {
      const r = R.wfStrip[seg.id], wins = { wfStrip: { rect: STRIP, focus: r.focus, spot: r.spot } };
      let html;
      if (mock) {
        const h = Math.round(1140 * MOCK[mock.page] / 1440) + 40;
        wins[mock.page] = { rect: [700, 100, 1140, h], focus: 'full', message: 'play' };
        html = `<div class="l1s mock" style="margin-top:${h + 24}px"><div class="l1s-head"><small>${segNo(seg.id)}・畫面提案</small><strong>${mock.title}</strong></div><ol>` +
          mock.items.map(t => `<li>${t}</li>`).join('') + `</ol></div>`;
      } else {
        const w = WF.fitWidth(seg.id, 1140, 740);
        html = `<div class="l1s"><div class="l1s-head"><small>${segNo(seg.id)}</small><strong>${seg.seg}</strong><i>建議文案草稿</i></div>` +
          `<p class="l1s-goal"><b>目標</b>${seg.goal}</p>` +
          `<div class="l1s-mock" style="width:${w}px">` + WF.filled(seg.id, w) + `</div></div>`;
      }
      return { chapter: 3, wins, panel: { top: 100, html: STYLE + html } };
    };
    return [
      d.cover({ kicker: 'PROPOSAL v3 · 2026.09', title: 'Acer Intelligence Space', subtitle: 'Landing Page Spec — Level 1',
        chips: [['00', 'Recap'], ['01', 'Milestone'], ['02', 'Benchmark'], ['03', 'Spec'], ['04', 'Summary']] }),

      // ===== 00 Recap =====
      d.panel(0, 130,
        `<h3>v1 報告後的<em>四個調整</em></h3>` +
        d.table(['回饋', '本版'], [
          ['01', 'Benchmark 改做 Apple Intelligence 與 Samsung，含 assets 與敘事包裝', '02 Benchmark'],
          ['02', '不提 mockup，只出 spec', '03 Spec'],
          ['03', '不直接導流 EC，而是可落地執行的版本', '01 Milestone'],
          ['04', '參照 Apple 怎麼擺 Siri', '03 Spec'],
        ], '120px 1fr 1fr') +
        `<p class="note">v1：Benchmark → Opening → Scenario → AI Companion → Recommendation → Recommendation logic（<a href="../" target="_blank" rel="noopener">開啟 v1</a>）</p>`),

      // ===== 01 Roadmap =====
      d.panel(1, 120, STYLE +
        `<h3>本次定案 <em>Milestone 1</em></h3>` +
        road({ M3: { extra: `<a class="demo" href="../#22" target="_blank" rel="noopener">See more ↗</a>` } })),

      // ===== 02 Benchmark =====
      d.intro(2, { num: '02', title: 'Benchmark', sub: 'Apple Intelligence ・ Samsung Galaxy AI', p: '版面 ・ Assets ・ 敘事包裝' }),
      // each benchmark page section by section: copy and image files
      benchAssetStep('apple', 'apple'),
      benchAssetStep('samsung', 'samsungLive'),
      frameworkStep(),
      assetsStep(),

      // ===== 03 Spec =====
      d.intro(3, { num: '03', title: 'Spec', sub: 'AIS 品牌 landing page', p: 'Hero → Qubi → 情境功能 → 選機 → FAQ' }),
      // the whole L1 page: sections, their copy and image assets (the chapter's overview)
      sheetStep(S.acerSheet, 'acer', 'wfStrip', 3,
        `${S.acerSheet.src}・<a href="spec.html" target="_blank" rel="noopener">附錄：完整 Spec 表 ↗</a>`),

      l1Scroll(S.l1[0], { page: 'mockHero', title: 'Acer Qubi 全新亮相!　從筆電探出頭', items: [
        '全白底、<strong>筆電置中</strong>，畫面只有一個主角', 'Qubi 從螢幕後<strong>探出頭、點頭打招呼</strong>', '「Acer Qubi 全新亮相!」→ 副標<strong>依序淡入</strong>，約 3 秒，不放 CTA'] }),
      l1Scroll(S.l1[1], { page: 'mockBanner', title: '問什麼，就換什麼場景', items: [
        '<strong>橫式卡片輪播</strong>跟著對話滑到對應場景', '對話框<strong>壓在卡片上</strong>，底圖同步壓暗', '人物去背時出現<strong>裁切框與掃描線</strong>，表示處理中'] }),
      ...S.l1.slice(2).map(s => l1Scroll(s)),

      // ===== Summary =====
      copyPage([0, 1], 'Apple', '1 / 5'),
      copyPage([2], 'Samsung', '2 / 5'),
      copyPage([3], 'Samsung', '3 / 5'),
      copyPage([4, 5], 'Samsung', '4 / 5'),
      copyPage([6, 7], 'Samsung', '5 / 5'),

      // ===== Appendix =====
      d.intro(5, { num: 'A', title: 'Appendix', sub: 'Benchmark 分類比對', p: '網頁定位・功能介紹・資訊安全・硬體導流・SEO・網站框架' }),
      ...d.categories(5, BENCH).map(catStep),
    ];
  },
};
