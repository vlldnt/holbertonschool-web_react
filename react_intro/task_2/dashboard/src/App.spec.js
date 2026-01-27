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
  const image = screen.getByAltText(/holberton logo/i);
  expect(image).toBeInTheDocument();
});

test('renders 2 input elements', () => {
  const { container } = render(<App />);
  const emailInput = container.querySelector('input[type="email"]');
  const passwordInput = container.querySelector('input[type="password"]');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('renders 2 label elements with text Email and Password', () => {
  render(<App />);
  const emailLabel = screen.getByText(/email/i);
  const passwordLabel = screen.getByText(/password/i);

  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
});

test('renders one button', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
});
