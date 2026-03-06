import { expect, jest, test } from '@jest/globals';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App.jsx';

test('should render title', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /School dashboard/i }),
  ).toBeInTheDocument();
});

test('should render the Login form by default (user not logged in)', () => {
  render(<App />);
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('should render the image', () => {
  render(<App />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test('should render two inputs for login by default', () => {
  render(<App />);
  const inputs = screen.getAllByRole('textbox');
  const password = screen.getByLabelText(/password/i);
  expect(password).toBeInTheDocument();
  expect(inputs.length + 1).toBe(2);
});

test('should render two label elements by default', () => {
  render(<App />);
  const labels = screen.getAllByText(/email|password/i);
  expect(labels).toHaveLength(2);
});

test('should render one button by default', () => {
  render(<App />);
  expect(screen.getByText(/ok/i)).toBeInTheDocument();
});

test('should render footer copyright', () => {
  render(<App />);
  expect(
    screen.getByText(/Copyright 2026 - holberton School/i),
  ).toBeInTheDocument();
});

test('should handle display and hide drawer functionality', () => {
  render(<App />);

  const notificationTitle = screen.getByText(/Your notifications/i);

  // Initially drawer is hidden, click to show it
  fireEvent.click(notificationTitle);
  expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();

  // Click again to hide it
  fireEvent.click(notificationTitle);
  expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
});

test('should display News section title and default paragraph', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /News from the School/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Holberton School News goes here/i),
  ).toBeInTheDocument();
});

test('should not display CourseList when user is not logged in (default state)', () => {
  render(<App />);
  expect(screen.queryByText(/Course list/i)).not.toBeInTheDocument();
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();
});

test('should display CourseList after logging in via the login form', () => {
  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  const submitButton = screen.getByText(/ok/i);
  fireEvent.click(submitButton);

  expect(
    screen.getByRole('heading', { name: /Course list/i }),
  ).toBeInTheDocument();
  expect(
    screen.queryByText(/Login to access the full dashboard/i),
  ).not.toBeInTheDocument();
});

test('should verify user state mutations in logIn and logOut', () => {
  render(<App />);

  // Initially user is not logged in
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();

  // Log in
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByText(/ok/i));

  // After login, user should be logged in (Course list should be visible)
  expect(
    screen.getByRole('heading', { name: /Course list/i }),
  ).toBeInTheDocument();

  // Verify login state with logoutSection
  expect(document.getElementById('logoutSection')).toBeInTheDocument();
});

test('clicking on a notification item should remove it from the notification list and log the correct message', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<App />);

  const notificationTitle = screen.getByText(/Your notifications/i);
  fireEvent.click(notificationTitle);

  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);

  fireEvent.click(items[0]);

  expect(consoleLogSpy).toHaveBeenCalledWith(
    'Notification 1 has been marked as read',
  );

  fireEvent.click(notificationTitle);
  const remainingItems = screen.queryAllByRole('listitem');
  expect(remainingItems).toHaveLength(2);

  consoleLogSpy.mockRestore();
});
