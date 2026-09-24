// Usage: node capture-page.mjs <url> <outDir> <name>   (run where puppeteer-core and sharp are installed)
// Full-page capture at 1920 CSS px, 1×, scrolled through first so lazy images load; writes <name>.jpg and <name>.lite.jpg (0.5×).
// Fixed-position overlays (cookie notices, chat bubbles, dimming layers) are hidden, not clicked, so no consent is given.
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import path from 'node:path';
const [,, url, out, name] = process.argv;
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new',
  defaultViewport: { width: 1920, height: 1080 } });
const page = await browser.newPage();
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36');
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
await new Promise(r => setTimeout(r, 3000));
const H = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 400) { await page.evaluate(v => window.scrollTo(0, v), y); await new Promise(r => setTimeout(r, 500)); }
await page.evaluate(() => window.scrollTo(0, 0)); await new Promise(r => setTimeout(r, 2000));
// hide consent banners, chat buttons and dimming layers only (never click them)
await page.evaluate(() => {
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el); if (cs.position !== 'fixed') continue;
    const tag = (el.id + ' ' + el.className).toLowerCase(), txt = (el.innerText || '').slice(0, 400).toLowerCase();
    if (/cookie|consent|truste|onetrust|chat|fab|dim/.test(tag) || /cookie|consent/.test(txt)) el.style.setProperty('display', 'none', 'important');
  }
  document.documentElement.style.overflow = 'visible'; document.body.style.overflow = 'visible';
});
// scroll once more and wait for every image to finish
for (let y = 0; y < H; y += 400) { await page.evaluate(v => window.scrollTo(0, v), y); await new Promise(r => setTimeout(r, 250)); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.evaluate(() => Promise.all([...document.images].filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 8000); }))));
await new Promise(r => setTimeout(r, 800));
const png = await page.screenshot({ fullPage: true, captureBeyondViewport: true });
const meta = await sharp(png).metadata();
await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(out, name + '.jpg'));
await sharp(png).resize({ width: Math.round(meta.width / 2) }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(out, name + '.lite.jpg'));
console.log(`${meta.width}x${meta.height}`);
await browser.close();
