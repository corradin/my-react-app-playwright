import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '../src/Button';

test('Button renders', async ({ mount }) => {
  const button = await mount(<Button label="Testing button" />);
  await expect(button).toContainText('Testing butston');
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
