import { chromium, devices, Browser, Page } from 'playwright';

describe('React app homepage', () => {
  let browser: Browser;
  let page: Page;
  const homeUrl = 'http://localhost:3000';

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    
    // Use the below line for desktop testing
    page = await browser.newPage();
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

  it('should display the full link on desktop', async () => {
    await page.goto(homeUrl);
    await page.click('#unclickable_link');
  });

  it('should display the full link on mobile', async () => {
    //With Galaxy S5 The third test will fail
    const galaxyS5 = devices['Galaxy S5'];
    const context = await browser.newContext({
      ...galaxyS5
    });
    page = await context.newPage();
    
    await page.goto(homeUrl);
    await page.click('#unclickable_link');
  });

  it('should display the current local time', async () => {
    // Emulate locale and time
    const context = await browser.newContext({
      locale: 'en-US',
      timezoneId: 'America/Toronto'
    });
    const page = await context.newPage();
    await page.goto(homeUrl);
  });

  afterAll(async () => {
    await browser.close();
  });
});
