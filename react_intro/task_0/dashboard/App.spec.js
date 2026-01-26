import { render, screen } from '@testing-library/react';
import App from './src/App';

test('"School Dashboard" written in a h1', async () => {
  render(<App />);
  const text = screen.getByRole('heading', {
    level: 1,
    name: /School Dashboard/i,
  });
  expect(text).toBeInTheDocument();
});

test('text content within the 2 p elements', async () => {
  render(<App />);
  const paragraph = screen.getAllByText(/./, { selector: 'p' });
  expect(paragraph.length).toBe(2);
});

test('Is an image rendered', () => {
  render(<App />);
  const image = screen.getAllByRole('img');
  expect(image.length).toBe(1);
  expect(image[0]).toHaveProperty('alt', 'holberton logo');
});
