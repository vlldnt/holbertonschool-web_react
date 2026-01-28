import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login.jsx';

test('Renders the Login form controls', () => {
  render(<Login />);
  const text = screen.getByText(/Login to access the full dashboard/i);
  expect(text).toBeInTheDocument();
  const email = screen.getByLabelText(/Email:/i);
  expect(email).toBeInTheDocument();
  const password = screen.getByLabelText(/Password:/i);
  expect(password).toBeInTheDocument();
  const button = screen.getByRole('button', { name: /OK/i });
  expect(button).toBeInTheDocument();
});

test('Login includes 2 labels, 2 inputs, and 1 button elements', () => {
  const { container } = render(<Login />);
  const labels = container.querySelectorAll('label');
  const inputs = container.querySelectorAll('input');
  const buttons = container.querySelectorAll('button');
  expect(labels.length).toBe(2);
  expect(inputs.length).toBe(2);
  expect(buttons.length).toBe(1);
});

test('Input elements get focused when related label is clicked', async () => {
  const user = userEvent.setup();
  render(<Login />);
  const emailLabel = screen.getByText(/Email:/i);
  const passwordLabel = screen.getByText(/Password:/i);
  const emailInput = screen.getByLabelText(/Email:/i);
  const passwordInput = screen.getByLabelText(/Password:/i);

  await user.click(emailLabel);
  expect(emailInput).toHaveFocus();

  await user.click(passwordLabel);
  expect(passwordInput).toHaveFocus();
});
