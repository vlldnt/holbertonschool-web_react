import { render, screen } from '@testing-library/react';
import App from './App';

test('"School Dashboard" written in a h1', () => {
  render(<App />);
  const text = screen.getByRole('heading', {
    level: 1,
    name: /School Dashboard/i,
  });
  expect(text).toBeInTheDocument();
});

test('text content within the 2 p elements', () => {
  const { container } = render(<App />);
  const appBodyP = container.querySelector('.App-body p');
  const appFooterP = container.querySelector('.App-footer p');

  expect(appBodyP).toBeInTheDocument();
  expect(appBodyP.textContent).toBe('Login to access the full dashboard');

  expect(appFooterP).toBeInTheDocument();
  expect(appFooterP.textContent).toMatch(/Copyright \d{4}/);
});

test('Is an image rendered', () => {
  render(<App />);
  const image = screen.getAllByRole('img');
  expect(image.length).toBe(1);
  const alt = image[0].getAttribute('alt') || '';
  expect(alt.toLowerCase()).toBe('holberton logo');
});

test('renders 2 input elements', () => {
  render(<App />);
  const emailRegex = /e[-\s]*mail[\s:-]*/i;
  const emailInput = screen.getByLabelText(emailRegex);

  const passwordRegex = /password[\s:-]*/i;
  const passwordInput = screen.getByLabelText(passwordRegex);

  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute('type', 'email');

  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');
});
