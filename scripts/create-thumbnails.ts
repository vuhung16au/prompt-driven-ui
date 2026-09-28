import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const WEBSITES_DIR_VI = path.join(process.cwd(), 'websites');
const WEBSITES_DIR_EN = path.join(process.cwd(), 'websites-en');
const THUMBS_DIR = path.join(process.cwd(), 'thumbs');

const RESOLUTIONS = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
};

async function createThumbnails() {
  // Ensure thumbs directories exist
  for (const mode of Object.keys(RESOLUTIONS)) {
    const dir = path.join(THUMBS_DIR, mode);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Get list of all website directories
  // Filtering for directories starting with a number (e.g., 01-, 02-)
  const websites = fs.readdirSync(WEBSITES_DIR_VI).filter(name => /^\d{2}-/.test(name));

  console.log(`Found ${websites.length} websites.`);

  const browser = await chromium.launch();

  try {
    for (const siteName of websites) {
      console.log(`Processing ${siteName}...`);

      const viPath = path.join(WEBSITES_DIR_VI, siteName, 'index.html');
      const enPath = path.join(WEBSITES_DIR_EN, siteName, 'index.html');

      const tasks = [
        { lang: 'vi', filePath: viPath },
        { lang: 'en', filePath: enPath }
      ];

      for (const { lang, filePath } of tasks) {
        if (!fs.existsSync(filePath)) {
          console.warn(`File not found: ${filePath}`);
          continue;
        }

        const fileUrl = `file://${filePath}`;

        for (const [mode, { width, height }] of Object.entries(RESOLUTIONS)) {
          const context = await browser.newContext({
            viewport: { width, height },
            deviceScaleFactor: 1,
          });
          const page = await context.newPage();

          try {
            await page.goto(fileUrl, { waitUntil: 'networkidle' });
            
            // Allow some time for animations or fonts to load
            await page.waitForTimeout(1000);

            const savePath = path.join(THUMBS_DIR, mode, `${siteName}-${lang}.png`);
            await page.screenshot({ path: savePath, fullPage: false });
            console.log(`  Saved ${mode} thumbnail for ${lang}: ${savePath}`);
          } catch (err) {
            console.error(`  Failed to capture ${siteName} (${lang}, ${mode}):`, err);
          } finally {
            await context.close();
          }
        }
      }
    }
  } finally {
    await browser.close();
    console.log('Done creating thumbnails!');
  }
}

createThumbnails().catch(console.error);
