const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const HTML = 'file://' + path.resolve(__dirname, 'carrossel-descolamento-retina.html');
const OUT = path.resolve(__dirname, 'slides-descolamento-retina');

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 540, height: 540 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto(HTML, { waitUntil: 'networkidle' });

  await page.addStyleTag({ content: `
    html, body { background: transparent !important; }
    .nav, .page-header { display: none !important; }
    .page { padding: 0 !important; gap: 0 !important; background: transparent !important; }
    .slide { box-shadow: none !important; width: 540px !important; max-width: 540px !important; }
  `});

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  for (let i = 1; i <= 9; i++) {
    const el = await page.$('#slide-' + i);
    const file = path.join(OUT, 'slide-' + String(i).padStart(2, '0') + '.jpg');
    await el.screenshot({ path: file, type: 'jpeg', quality: 95 });
    console.log('OK', file);
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
