/* Component testing

Installation (Yarn is needed): npm init playwright@latest -- --ct (You need yarn to be installed globally, why?)
When all else fails: npm run playwright:ct Button.test.tsx -- --project=chromium

*/

import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '../src/Button';

test('Button renders', async ({ mount }) => {
  const button = await mount(<Button label="Testing button" />);
  await expect(button).toContainText('Testing button');
});

test('CLick handler fires', async ({ mount }) => {
  let text: string | null = null;
  const button = await mount(
    <Button
      label="Testing button"
      onClick={() => {
        text = 'clicked';
      }}
    />
  );
  await button.click();
  expect(text).toBe('clicked');
});
