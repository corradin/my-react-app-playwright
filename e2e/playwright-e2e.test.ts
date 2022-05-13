import { Page, devices } from 'playwright';
import { expect, test } from '@playwright/test';
import * as fs from 'fs';

test.describe('React app homepage', () => {  
  let page: Page;
  const homeUrl = 'http://localhost:3000';

  test('Should display the correct page title', async ({ page }) => {
    await page.goto(homeUrl);
    expect(await page.title()).toBe('React App');
  });

  test('should display message', async ({ page }) => {
    await page.goto(homeUrl);
    const messageContents = await page.$eval(
      '#root .App-header p',
      (el: HTMLElement) => el.innerText
    );
    expect(messageContents).toBe('Edit src/App.tsx and save to reload.');
  });

  test('should display the full link on mobile', async ({ browser }) => {
    const galaxyS5 = devices['Galaxy S5'];
    const context = await browser.newContext({
      ...galaxyS5,
    });
    page = await context.newPage();

    await page.goto(homeUrl);
    await page.click('#unclickable_link');
  });

  test('should display the current local time', async ({ browser }) => {
    // Emulate locale and time
    const context = await browser.newContext({
      locale: 'en-US',
      timezoneId: 'America/Toronto',
    });
    const page = await context.newPage();
    await page.goto(homeUrl);
  });

  test('should request an image from picsum', async ({ page }) => {
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

  test('should download a random image', async ({ page }) => {
    await page.goto(homeUrl);
    const [response, download] = await Promise.all([
      page.waitForResponse((response: { url: () => string | string[] }) =>
        response.url().includes('https://picsum.photos/200')
      ),
      page.waitForEvent('download'), // <-- start waiting for the download
      page.click('button#download-random-image'),
    ]);

    const responseHeaders = response.headers() as { [key: string]: string };
    const downloadId = responseHeaders.location.split('/')[4];
    const readStream = await download.createReadStream();
    const writeStream = fs.createWriteStream(
      `./e2e/downloads/randomImage_${downloadId}.jpg`
    );
    readStream?.pipe(writeStream);
  });
});
