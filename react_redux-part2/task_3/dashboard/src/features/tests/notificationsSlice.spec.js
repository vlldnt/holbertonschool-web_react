import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
} from '../notifications/notificationsSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    loading: false,
  };

  it('should return the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should fetch and filter unread notifications correctly', async () => {
    const mockApiData = [
      {
        id: '1',
        author: { id: 'a1', name: { first: 'John', last: 'Doe' }, email: 'john@test.com', picture: '', age: 25 },
        context: { guid: 'g1', isRead: false, type: 'default', value: 'New course available' },
      },
      {
        id: '2',
        author: { id: 'a2', name: { first: 'Jane', last: 'Doe' }, email: 'jane@test.com', picture: '', age: 30 },
        context: { guid: 'g2', isRead: true, type: 'urgent', value: 'Already read notification' },
      },
      {
        id: '3',
        author: { id: 'a3', name: { first: 'Bob', last: 'Smith' }, email: 'bob@test.com', picture: '', age: 28 },
        context: { guid: 'g3', isRead: false, type: 'urgent', value: 'New resume available' },
      },
    ];

    const store = configureStore({ reducer: notificationsReducer });
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({ data: mockApiData });

    await promise;

    const state = store.getState();
    expect(state.notifications).toHaveLength(2);
    expect(state.notifications[0]).toEqual({
      id: '1',
      type: 'default',
      isRead: false,
      value: 'New course available',
    });
    expect(state.notifications[1]).toEqual({
      id: '3',
      type: 'urgent',
      isRead: false,
      value: 'New resume available',
    });
  });

  it('should set loading to true when fetch is pending', () => {
    const state = notificationsReducer(initialState, { type: 'notifications/fetchNotifications/pending' });
    expect(state.loading).toBe(true);
  });

  it('should set loading to false when fetch is fulfilled', () => {
    const pendingState = { ...initialState, loading: true };
    const state = notificationsReducer(pendingState, {
      type: 'notifications/fetchNotifications/fulfilled',
      payload: [],
    });
    expect(state.loading).toBe(false);
  });

  it('should set loading to false when fetch is rejected', () => {
    const pendingState = { ...initialState, loading: true };
    const state = notificationsReducer(pendingState, {
      type: 'notifications/fetchNotifications/rejected',
    });
    expect(state.loading).toBe(false);
  });

  it('should remove a notification when markNotificationAsRead is dispatched', () => {
    const stateWithNotifications = {
      ...initialState,
      notifications: [
        { id: '1', type: 'default', isRead: false, value: 'New course available' },
        { id: '2', type: 'urgent', isRead: false, value: 'New resume available' },
      ],
    };

    const state = notificationsReducer(
      stateWithNotifications,
      markNotificationAsRead('2'),
    );

    expect(state.notifications).toHaveLength(1);
    expect(state.notifications.find((n) => n.id === '2')).toBeUndefined();
  });

  it('should not have displayDrawer in state', () => {
    const state = notificationsReducer(undefined, { type: 'unknown' });
    expect(state).not.toHaveProperty('displayDrawer');
  });
});
