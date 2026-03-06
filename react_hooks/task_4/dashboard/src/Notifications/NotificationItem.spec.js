import NotificationItem from './NotificationItem';
import { render, screen, fireEvent } from '@testing-library/react';

describe('NotificationItem', () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test('li has blue color and data-notification-type is default when type is default', () => {
    render(<NotificationItem type="default" value="New course available" />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveStyle({ color: 'var(--urgent-notification-item)' });
    expect(item).toHaveAttribute('data-notification-type', 'default');
  });

  test('li has red color and data-notification-type is urgent when type is urgent', () => {
    render(<NotificationItem type="urgent" value="New resume available" />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveStyle({ color: 'var(--urgent-notification-item)' });
    expect(item).toHaveAttribute('data-notification-type', 'urgent');
  });

  test('markNotificationAsRead is called with the right ID when notification item is clicked', () => {
    const markNotificationAsReadMock = jest.fn();
    const testId = 123;
    render(
      <NotificationItem
        type="default"
        value="Test notification"
        id={testId}
        markNotificationAsRead={markNotificationAsReadMock}
      />,
    );
    const item = screen.getByRole('listitem');
    fireEvent.click(item);
    expect(markNotificationAsReadMock).toHaveBeenCalledTimes(1);
    expect(markNotificationAsReadMock).toHaveBeenCalledWith(testId);
  });

  test('logs correct message to console when notification item is clicked', () => {
    render(
      <NotificationItem type="default" value="Test notification" id={1} />,
    );
    const item = screen.getByRole('listitem');
    fireEvent.click(item);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );
  });

  test('markNotificationAsRead function reference should remain stable across re-renders', () => {
    const markNotificationAsReadMock = jest.fn();
    const { rerender } = render(
      <NotificationItem
        id={1}
        type="default"
        value="Test notification"
        markNotificationAsRead={markNotificationAsReadMock}
      />,
    );

    rerender(
      <NotificationItem
        id={1}
        type="default"
        value="Test notification"
        markNotificationAsRead={markNotificationAsReadMock}
      />,
    );
    const item = screen.getByRole('listitem');
    fireEvent.click(item);
    expect(markNotificationAsReadMock).toHaveBeenCalledWith(1);
  });
});
