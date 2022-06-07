import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from './Button';

test('Button renders', async () => {
  render(<Button label="Testing button" />);

  expect(screen.getByRole('button')).toHaveTextContent('Testing button');
});

test('CLick handler fires', async () => {
  let text: string | null = null;
  render(
    <Button
      label="Testing button"
      onClick={() => {
        text = 'clicked';
      }}
    />
  );
  fireEvent.click(screen.getByRole('button'));
  expect(text).toBe('clicked');
});
