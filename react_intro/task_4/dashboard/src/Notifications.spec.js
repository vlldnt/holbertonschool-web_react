import { expect, test, jest } from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import Notifications from './Notifications.jsx';

test('Existence of title', () => {
  render(<Notifications />);

  expect(screen.getByText(/Here is the list of notifications/i));
});

test('existence of button', () => {
  render(<Notifications />);

  expect(screen.getByLabelText(/close/i));
});

test('existence 3 li elements', () => {
  render(<Notifications />);

  expect(screen.getAllByRole('listitem').length).toBe(3);
});

test('logic of button and cosole log', () => {
  const logSpy = jest.spyOn(console, 'log');
  render(<Notifications />);
  const button = screen.getByLabelText(/close/i)
  fireEvent.click(button);

  expect(logSpy).toHaveBeenCalledWith(
    expect.stringMatching(/Close button has been clicked/i),
  );
});
