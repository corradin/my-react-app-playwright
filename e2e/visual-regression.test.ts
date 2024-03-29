// Visual regression testing
// Use npx playwright test e2e/visual-regression.test.ts --reporter=html
// npx playwright test e2e/visual-regression.test.ts --update-snapshots

import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot({
    maxDiffPixelRatio: 0,
    mask: [page.locator('data-test-id=random-game-image')],
  });
});
