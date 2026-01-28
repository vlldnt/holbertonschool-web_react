import { render, screen } from '@testing-library/react';
import Login from './Login.jsx';

test('Renders the Login form controls', () => {
  render(<Login />);
  const text = screen.getByText(/Login to access the full dashboard/i);
  expect(text).toBeInTheDocument();
  const email = screen.getByLabelText(/Email:/i);
  expect(email).toBeInTheDocument();
  const password = screen.getByLabelText(/Email:/i);
  expect(password).toBeInTheDocument();
  const button = screen.getByRole('button', { name: /OK/i });
  expect(button).toBeInTheDocument();
});
