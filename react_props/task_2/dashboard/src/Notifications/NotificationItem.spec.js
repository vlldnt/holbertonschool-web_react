import NotificationItem from './NotificationItem';
import { render, screen } from '@testing-library/react';
import { getLatestNotification } from '../utils/utils';

describe('NotificationItem', () => {
  test('renders with correct colors based on type', () => {
    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: getLatestNotification() },
    ];

    render(
      <ul>
        {notificationsList.map((notif) => (
          <NotificationItem
            key={notif.id}
            type={notif.type}
            value={notif.value}
            html={notif.html}
          />
        ))}
      </ul>,
    );
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveStyle({ color: 'blue' });
    expect(items[1]).toHaveStyle({ color: 'red' });
    expect(items[2]).toHaveStyle({ color: 'red' });
  });

  test('default type has blue color', () => {
    render(<NotificationItem type="default" value="Test notification" />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveStyle({ color: 'blue' });
  });

  test('urgent type has red color', () => {
    render(<NotificationItem type="urgent" value="Test notification" />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveStyle({ color: 'red' });
  });

  test('renders HTML when html prop is provided', () => {
    render(
      <NotificationItem type="urgent" html="<strong>Important</strong>" />,
    );
    const strong = screen.getByText('Important');
    expect(strong).toBeInTheDocument();
  });
});
