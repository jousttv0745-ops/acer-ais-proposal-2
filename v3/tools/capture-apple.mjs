// Usage: node capture-apple.mjs <outDir>   (run from a folder where puppeteer-core and sharp are installed)
// Captures apple.com/tw/apple-intelligence at 1920px wide, scrolling first so lazy images and reveal animations load.
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import path from 'node:path';
const out = process.argv[2];
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new',
  defaultViewport: { width: 1920, height: 1080 } });
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.goto('https://www.apple.com/tw/apple-intelligence/', { waitUntil: 'networkidle2', timeout: 90000 });
const H = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 700) { await page.evaluate(v => window.scrollTo(0, v), y); await new Promise(r => setTimeout(r, 250)); }
await page.evaluate(() => window.scrollTo(0, 0)); await new Promise(r => setTimeout(r, 1500));
// pause videos on their first frame so the capture is stable
await page.evaluate(() => document.querySelectorAll('video').forEach(v => { v.pause(); v.currentTime = 0; }));
const full = path.join(out, 'apple-ai.png');
await page.screenshot({ path: full, fullPage: true, captureBeyondViewport: true });
const meta = await sharp(full).metadata();
await sharp(full).resize({ width: Math.round(meta.width / 2) }).png({ compressionLevel: 9 }).toFile(path.join(out, 'apple-ai.lite.png'));
console.log(`${meta.width}x${meta.height}`);
await browser.close();
