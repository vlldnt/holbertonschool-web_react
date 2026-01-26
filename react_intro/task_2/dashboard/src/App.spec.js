import { render, screen } from '@testing-library/react';
import App from './App.jsx';

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
  expect(image.length).toBe(2);
  const alt = image[1].getAttribute('alt') || '';
  expect(alt.toLowerCase()).toBe('holberton logo');
});

test('renders 2 input elements', () => {
  render(<App />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('renders 2 label elements with text Email and Password', () => {
  render(<App />);
  const emailLabel = screen.getByLabelText(/email/i);
  const passwordLabel = screen.getByLabelText(/password/i);

  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
});

test('renders one button', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
});
