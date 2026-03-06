import { expect, jest, test } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
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

test('handleDisplayDrawer sets displayDrawer to true', () => {
  render(<App />);

  // Close the drawer first by clicking the close button
  const closeButton = screen.getByLabelText(/close/i);
  fireEvent.click(closeButton);

  // The notification panel should be hidden now
  expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();

  // Click "Your notifications" to show drawer
  fireEvent.click(screen.getByText(/Your notifications/i));

  // The notification panel should be visible again
  expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
});

test('handleHideDrawer sets displayDrawer to false', () => {
  render(<App />);

  // Drawer is open by default (displayDrawer starts as true)
  expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();

  // Click close button
  const closeButton = screen.getByLabelText(/close/i);
  fireEvent.click(closeButton);

  // The notification panel should be hidden
  expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
});

test('logIn updates user state with email, password, and isLoggedIn', () => {
  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
  fireEvent.click(screen.getByText(/ok/i));

  // After login, CourseList should be shown
  expect(screen.getByRole('heading', { name: /Course list/i })).toBeInTheDocument();
  // Login form should be gone
  expect(screen.queryByText(/Login to access the full dashboard/i)).not.toBeInTheDocument();
  // Header should show the logged-in user's email
  expect(screen.getByText(/user@test.com/i)).toBeInTheDocument();
});

test('logOut resets user state: isLoggedIn false, email and password cleared', () => {
  render(<App />);

  // Log in first
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
  fireEvent.click(screen.getByText(/ok/i));

  // Verify logged in
  expect(screen.getByRole('heading', { name: /Course list/i })).toBeInTheDocument();

  // Click logout link in header
  fireEvent.click(screen.getByText(/\(logout\)/i));

  // After logout, login form should reappear
  expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  // CourseList should be gone
  expect(screen.queryByRole('heading', { name: /Course list/i })).not.toBeInTheDocument();
});
