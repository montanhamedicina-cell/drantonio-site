const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const fileUrl = 'file://' + path.resolve(process.argv[2]);
  const outDir = process.argv[3];
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
    defaultViewport: { width: 1200, height: 1200, deviceScaleFactor: 1 }
  });
  const page = await browser.newPage();

  // Big viewport so each slide can be rendered at 1080 directly
  await page.setViewport({ width: 1280, height: 1280, deviceScaleFactor: 1 });

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });

  // Force the gallery to render at 1080 wide and hide toolbar
  await page.addStyleTag({
    content: `
      .toolbar, .export-status { display: none !important; }
      body { padding: 0 !important; background: #fff !important; }
      .gallery { max-width: 1080px !important; gap: 0 !important; }
      .slide { width: 1080px !important; height: 1080px !important; }
    `
  });

  // Wait for fonts
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 800));

  const slides = await page.$$('.slide');
  console.log('found', slides.length, 'slides');
  for (let i = 0; i < slides.length; i++) {
    const filename = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await slides[i].screenshot({ path: filename, omitBackground: false });
    console.log('wrote', filename);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
