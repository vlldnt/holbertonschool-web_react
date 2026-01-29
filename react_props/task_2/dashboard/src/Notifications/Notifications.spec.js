import { render, fireEvent, screen } from '@testing-library/react';
import Notifications from './Notifications.jsx';
import { getLatestNotification } from '../utils/utils';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent requirement - complete by EOD', html: getLatestNotification() },
];

test('should render title', () => {
  render(<Notifications notifications={notificationsList} />);
  expect(screen.getByText(/Here is the list of notifications/i));
});

test('should render button in notifications', () => {
  render(<Notifications notifications={notificationsList} />);
  expect(screen.getByLabelText(/close/i));
});

test('should render 3 notification items with appropriate text', () => {
  render(<Notifications notifications={notificationsList} />);
  const items = screen.getAllByRole('listitem');
  expect(items.length).toBe(3);
  expect(screen.getByText('New course available')).toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();
  expect(screen.getByText('Urgent requirement')).toBeInTheDocument();
});

test('should log message when close button is clicked', () => {
  const logSpy = jest.spyOn(console, 'log');
  render(<Notifications notifications={notificationsList} />);
  fireEvent.click(screen.getByLabelText(/close/i));
  expect(logSpy).toHaveBeenCalledWith(
    expect.stringMatching(/Close button has been clicked/i),
  );
});
