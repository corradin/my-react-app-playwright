import { test, expect } from '@playwright/test';

test.use({ launchOptions: { slowMo: 1000 } });

test('example test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot();
});
