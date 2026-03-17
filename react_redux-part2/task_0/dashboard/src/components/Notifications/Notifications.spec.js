import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Notifications from './Notifications';
import mockAxios from 'jest-mock-axios';
import { fetchNotifications } from '../../features/notifications/notificationsSlice';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  mockAxios.reset();
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

function createStore(preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [] },
      courses: { courses: [] },
      ...preloadedState,
    },
  });
}

test('Notification items are displayed after fetchNotifications', async () => {
  const store = createStore();

  const promise = store.dispatch(fetchNotifications());

  mockAxios.mockResponse({
    data: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
    },
  });

  await promise;

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getByText('New course available')).toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();
});

test('Clicking "Your notifications" toggles the visible class on the drawer', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  const drawer = screen.getByText(/here is the list of notifications/i).closest('div');

  // Initially hidden (no visible class)
  expect(drawer.classList.length).toBe(1);

  // Click to show
  fireEvent.click(screen.getByText(/your notifications/i));
  expect(drawer.classList.length).toBe(2);

  // Click to hide
  fireEvent.click(screen.getByText(/your notifications/i));
  expect(drawer.classList.length).toBe(1);
});

test('Clicking close button removes the visible class from the drawer', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  // Open the drawer first
  fireEvent.click(screen.getByText(/your notifications/i));

  const drawer = screen.getByText(/here is the list of notifications/i).closest('div');
  expect(drawer.classList.length).toBe(2);

  // Close it
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(drawer.classList.length).toBe(1);
});

test('Marking a notification as read removes it from the list', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(2);

  fireEvent.click(items[0]);

  expect(screen.getAllByRole('listitem')).toHaveLength(1);
  expect(screen.queryByText('New course available')).not.toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();

  consoleSpy.mockRestore();
});
