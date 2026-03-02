import { render, screen } from '@testing-library/react';
import Login from './Login';
import userEvent from '@testing-library/user-event';

describe('Login component', () => {
  test('renders without crashing', () => {
    render(<Login />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
  });

  test('should render two inputs for login', () => {
    render(<Login />);
    const inputs = screen.getAllByRole('textbox');
    const password = screen.getByLabelText(/password/i);
    expect(password);
    expect(inputs.length + 1).toBe(2);
  });

  test('should render two label elements', () => {
    render(<Login />);
    const labels = screen.getAllByText(/email|password/i);
    expect(labels).toHaveLength(2);
  });

  test('should render one button', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });

  test('clicking label focuses the input', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);
    await userEvent.click(emailLabel);
    expect(emailInput).toHaveFocus();
    await userEvent.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });

  test('submit button is disabled by default', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    expect(submitButton).toBeDisabled();
  });

  test('submit button becomes enabled after valid email and password', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    expect(submitButton).toBeDisabled();

    await userEvent.type(emailInput, 'user@test.com');
    await userEvent.type(passwordInput, '12345678');

    expect(submitButton).toBeEnabled();
  });
});
