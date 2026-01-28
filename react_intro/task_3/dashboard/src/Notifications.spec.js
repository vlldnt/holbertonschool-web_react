import Notifications from './Notifications.jsx';
import { render, screen, within, fireEvent } from '@testing-library/react';

describe('Notifications tests', () => {
  test('existence of notifications title', () => {
    render(<Notifications />);
    const title = screen.getByText('Here is the list of notifications');
    expect(title).toBeInTheDocument();
  });

  test('check existence of a button', () => {
    render(<Notifications />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('check existence of 3 elemenst list', () => {
    render(<Notifications />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  test('Testing button and console message', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Notifications />);
    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
  });
});
