import { expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('should render title', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /School dashboard/i }),
  ).toBeInTheDocument();
});

test('should render two paragraphs', () => {
  render(<App isLoggedIn={false} />);
  expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Copyright 2026 - holberton School/i)).toBeInTheDocument();
});

test('should render the image', () => {
  render(<App />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test('should render two inputs for login', () => {
  render(<App isLoggedIn={false} />);
  const inputs = screen.getAllByRole('textbox');
  const password = screen.getByLabelText(/password/i);
  expect(password).toBeInTheDocument();
  expect(inputs.length + 1).toBe(2);
});

test('should render two label elements', () => {
  render(<App isLoggedIn={false} />);
  const labels = screen.getAllByText(/email|password/i);
  expect(labels).toHaveLength(2);
});

test('should render one button', () => {
  render(<App isLoggedIn={false} />);
  expect(screen.getByText(/ok/i)).toBeInTheDocument();
});

test('should render the Login form when isLoggedIn is false', () => {
  render(<App isLoggedIn={false} />);
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('should render a CourseList table when isLoggedIn is true', () => {
  render(<App isLoggedIn={true} />);
  expect(screen.getByText(/Available courses/i)).toBeInTheDocument();
  expect(
    screen.queryByText(/Login to access the full dashboard/i),
  ).not.toBeInTheDocument();
});

test('test logout with ctrl + h : logOut() called', () => {
  const logOutMock = jest.fn();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<App logOut={logOutMock} />);
  const event = new KeyboardEvent('keydown', {
    key: 'h',
    ctrlKey: true,
  });
  document.dispatchEvent(event);
  expect(logOutMock).toHaveBeenCalledTimes(1);
});

test('test logout with ctrl + h : alert called', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<App />);
  const event = new KeyboardEvent('keydown', {
    key: 'h',
    ctrlKey: true,
  });
  document.dispatchEvent(event);
  expect(alertMock).toHaveBeenCalledWith('Logging you out');
  alertMock.mockRestore();
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
