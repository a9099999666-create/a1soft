import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "qa");
const URL = process.env.QA_URL || "http://127.0.0.1:4317/?visual=static";
const CHROME =
  process.env.CHROME || "/usr/bin/google-chrome-stable";

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--font-render-hinting=none",
  ],
});

async function shot(name, { width, height, dsf = 1, url = URL }) {
  const page = await browser.newPage();
  await page.setViewport({
    width: width + 80,
    height,
    deviceScaleFactor: dsf,
  });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  const sb = await page.evaluate(
    () => window.innerWidth - document.documentElement.clientWidth,
  );
  await page.setViewport({
    width: width + sb,
    height,
    deviceScaleFactor: dsf,
  });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 350));
  const file = path.join(OUT, name);
  await page.screenshot({
    path: file,
    type: "png",
    clip: { x: 0, y: 0, width, height },
  });
  await page.close();
  return file;
}

await shot("actual-1122.png", { width: 1122, height: 1402 });
await shot("actual-1440.png", { width: 1440, height: 900 });
await shot("actual-390.png", { width: 390, height: 844 });
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1402, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.click('.lang button[aria-pressed="false"]');
  const sb = await page.evaluate(
    () => window.innerWidth - document.documentElement.clientWidth,
  );
  await page.setViewport({
    width: 1122 + sb,
    height: 1402,
    deviceScaleFactor: 1,
  });
  await new Promise((r) => setTimeout(r, 250));
  await page.screenshot({
    path: path.join(OUT, "actual-en-1122.png"),
    type: "png",
    clip: { x: 0, y: 0, width: 1122, height: 1402 },
  });
  await page.close();
}

{
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.getElementById("about")?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 200));
  await page.screenshot({
    path: path.join(OUT, "actual-about.png"),
    type: "png",
  });
  await page.evaluate(() => {
    document.getElementById("contact")?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 200));
  await page.screenshot({
    path: path.join(OUT, "actual-contact.png"),
    type: "png",
  });
  await page.close();
}

await writeFile(
  path.join(OUT, "README.txt"),
  "QA screenshots for the 1122×1402 static frame and adaptives.\n",
);

await browser.close();
console.log("wrote", OUT);
