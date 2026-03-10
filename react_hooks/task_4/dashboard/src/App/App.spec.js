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

test('handleDisplayDrawer sets displayDrawer to true', () => {
  render(<App />);

  // displayDrawer starts as true, close it first
  const closeButton = screen.getByLabelText(/close/i);
  fireEvent.click(closeButton);

  // Notification panel should be hidden
  expect(
    screen.queryByText(/Here is the list of notifications/i),
  ).not.toBeInTheDocument();

  // Click on "Your notifications" to show the drawer
  fireEvent.click(screen.getByText(/Your notifications/i));

  // Notification panel should be visible again
  expect(
    screen.getByText(/Here is the list of notifications/i),
  ).toBeInTheDocument();
});

test('handleHideDrawer sets displayDrawer to false', () => {
  render(<App />);

  // displayDrawer starts as true, panel should be visible
  expect(
    screen.getByText(/Here is the list of notifications/i),
  ).toBeInTheDocument();

  // Click close button
  const closeButton = screen.getByLabelText(/close/i);
  fireEvent.click(closeButton);

  // Notification panel should be hidden
  expect(
    screen.queryByText(/Here is the list of notifications/i),
  ).not.toBeInTheDocument();
});

test('logIn updates user state with email, password, and isLoggedIn', () => {
  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByText(/ok/i));

  // After login, CourseList should be displayed and logoutSection visible
  expect(
    screen.getByRole('heading', { name: /Course list/i }),
  ).toBeInTheDocument();
  expect(document.getElementById('logoutSection')).toBeInTheDocument();
  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('logOut resets user state (isLoggedIn false, email and password cleared)', () => {
  render(<App />);

  // Log in first
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(screen.getByText(/ok/i));

  expect(document.getElementById('logoutSection')).toBeInTheDocument();

  // Log out by clicking the logout link
  fireEvent.click(screen.getByText(/\(logout\)/i));

  // After logout, login form should be back and logoutSection gone
  expect(document.getElementById('logoutSection')).toBeNull();
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();
});

test('clicking on a notification item should remove it from the notification list and log the correct message', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<App />);

  // displayDrawer is true by default, so notifications are visible
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);

  fireEvent.click(items[0]);

  expect(consoleLogSpy).toHaveBeenCalledWith(
    'Notification 1 has been marked as read',
  );

  const remainingItems = screen.queryAllByRole('listitem');
  expect(remainingItems).toHaveLength(2);

  consoleLogSpy.mockRestore();
});
