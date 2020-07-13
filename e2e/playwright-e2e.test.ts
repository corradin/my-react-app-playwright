import { chromium, Browser, Page, devices } from 'playwright';
import * as fs from 'fs';

describe('React app homepage', () => {
  let browser: Browser;
  let page: Page;
  const homeUrl = 'http://localhost:3000';

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });

    // Use the below line for desktop testing
    page = await browser.newPage({ acceptDownloads: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('Should display the correct page title', async () => {
    await page.goto(homeUrl);
    expect(await page.title()).toBe('React App');
  });

  it('should display message', async () => {
    await page.goto(homeUrl);
    const messageContents = await page.$eval(
      '#root .App-header p',
      (el: HTMLElement) => el.innerText
    );
    expect(messageContents).toBe('Edit src/App.tsx and save to reload.');
  });

  it('should display the full link on mobile', async () => {
    const galaxyS5 = devices['Galaxy S5'];
    const context = await browser.newContext({
      ...galaxyS5,
    });
    page = await context.newPage();

    await page.goto(homeUrl);
    await page.click('#unclickable_link');
  });

  it('should display the current local time', async () => {
    // Emulate locale and time
    const context = await browser.newContext({
      locale: 'en-US',
      timezoneId: 'America/Toronto',
    });
    const page = await context.newPage();
    await page.goto(homeUrl);
  });

  it('should request an image from picsum', async () => {
    await page.goto(homeUrl);
    const [response, download] = await Promise.all([
      page.waitForResponse((response: { url: () => string | string[] }) =>
        response.url().includes('https://picsum.photos/200')
      ),
      page.waitForEvent('download'), // <-- start waiting for the download
      page.click('button#download-random-image'),
    ]);
    const path = await download.path();
    console.log(response);
    console.log(path);
  });

  it('should download a random image', async () => {
    await page.goto(homeUrl);
    const [response, download] = await Promise.all([
      page.waitForResponse((response: { url: () => string | string[] }) =>
        response.url().includes('https://picsum.photos/200')
      ),
      page.waitForEvent('download'), // <-- start waiting for the download
      page.click('button#download-random-image'),
    ]);

    const responseHeaders = response.headers() as { [key: string]: string; };
    const downloadId = responseHeaders.location.split('/')[4];
    const readStream = await download.createReadStream();
    const writeStream = fs.createWriteStream(`./e2e/downloads/randomImage_${downloadId}.jpg`);
    readStream?.pipe(writeStream);
  });
});
