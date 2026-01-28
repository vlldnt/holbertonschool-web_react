import { render, screen } from '@testing-library/react';
import App from './App';

test('"School Dashboard" written in a h1', async () => {
  render(<App />);
  const text = screen.getByRole('heading', {
    level: 1,
    name: /School Dashboard/i,
  });
  expect(text).toBeInTheDocument();
});

test('text content within the 2 p elements', async () => {
  const { container } = render(<App />);
  const appBodyP = container.querySelector('.App-body p');
  const appFooterP = container.querySelector('.App-footer p');

  expect(appBodyP).toBeInTheDocument();
  expect(appBodyP.textContent).toBe('Login to access the full dashboard');

  expect(appFooterP).toBeInTheDocument();
  expect(appFooterP.textContent).toMatch(/Copyright \d{4}/i);
});

test('Is an image rendered', () => {
  render(<App />);
  const image = screen.getAllByRole('img');
  expect(image.length).toBeGreaterThanOrEqual(1);
  const holbertonLogo = image.find(img => (img.getAttribute('alt') || '').toLowerCase() === 'holberton logo');
  expect(holbertonLogo).toBeInTheDocument();
});
