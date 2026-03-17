import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Notifications from './Notifications';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

function createStore(preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], loading: false },
      courses: { courses: [] },
      ...preloadedState,
    },
  });
}

test('Displays notifications when present in the store', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: '1', type: 'default', isRead: false, value: 'New course available' },
        { id: '2', type: 'urgent', isRead: false, value: 'New resume available' },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getByText('New course available')).toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();
});

test('Displays Loading... when loading is true', () => {
  const store = createStore({
    notifications: {
      notifications: [],
      loading: true,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('Clicking "Your notifications" toggles the visible class on the drawer', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: '1', type: 'default', isRead: false, value: 'Test notification' }],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  const drawer = screen.getByText(/here is the list of notifications/i).closest('div');

  expect(drawer.classList.length).toBe(1);

  fireEvent.click(screen.getByText(/your notifications/i));
  expect(drawer.classList.length).toBe(2);

  fireEvent.click(screen.getByText(/your notifications/i));
  expect(drawer.classList.length).toBe(1);
});

test('Clicking close button removes the visible class from the drawer', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: '1', type: 'default', isRead: false, value: 'Test notification' }],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  fireEvent.click(screen.getByText(/your notifications/i));

  const drawer = screen.getByText(/here is the list of notifications/i).closest('div');
  expect(drawer.classList.length).toBe(2);

  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(drawer.classList.length).toBe(1);
});

test('Marking a notification as read removes it from the list', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const store = createStore({
    notifications: {
      notifications: [
        { id: '1', type: 'default', isRead: false, value: 'New course available' },
        { id: '2', type: 'urgent', isRead: false, value: 'New resume available' },
      ],
      loading: false,
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

test('Filter buttons toggle between urgent and default notifications', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: '1', type: 'default', isRead: false, value: 'Default notification' },
        { id: '2', type: 'urgent', isRead: false, value: 'Urgent notification' },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getByText('Default notification')).toBeInTheDocument();
  expect(screen.getByText('Urgent notification')).toBeInTheDocument();

  // Click urgent filter
  fireEvent.click(screen.getByText('‼️'));
  expect(screen.getByText('Urgent notification')).toBeInTheDocument();
  expect(screen.queryByText('Default notification')).not.toBeInTheDocument();

  // Click urgent again to toggle back to all
  fireEvent.click(screen.getByText('‼️'));
  expect(screen.getByText('Default notification')).toBeInTheDocument();
  expect(screen.getByText('Urgent notification')).toBeInTheDocument();

  // Click default filter
  fireEvent.click(screen.getByText('💬'));
  expect(screen.getByText('Default notification')).toBeInTheDocument();
  expect(screen.queryByText('Urgent notification')).not.toBeInTheDocument();

  // Click default again to toggle back to all
  fireEvent.click(screen.getByText('💬'));
  expect(screen.getByText('Default notification')).toBeInTheDocument();
  expect(screen.getByText('Urgent notification')).toBeInTheDocument();
});
