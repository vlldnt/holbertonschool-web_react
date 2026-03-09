export const APP_ACTIONS = {
  LOGIN: 'Handles user authentication',
  LOGOUT: 'Manages user logout',
  TOGGLE_DRAWER: 'Controls notification visibility',
  MARK_NOTIFICATION_READ: 'Updates the notification status',
  SET_NOTIFICATIONS: 'Updates the notifications list',
  SET_COURSES: 'Updates the courses list',
};

export const initialState = {
  displayDrawer: true,
  user: { email: '', password: '', isLoggedIn: false },
  notifications: [],
  courses: [],
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_ACTIONS.LOGIN:
      return {
        ...state,
        user: { ...action.payload, isLoggedIn: true },
      };

    case APP_ACTIONS.LOGOUT:
      return {
        ...state,
        user: { email: '', password: '', isLoggedIn: false },
        courses: [],
      };

    case APP_ACTIONS.TOGGLE_DRAWER:
      return {
        ...state,
        displayDrawer: !state.displayDrawer,
      };

    case APP_ACTIONS.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.payload,
        ),
      };

    case APP_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.payload],
      };

    case APP_ACTIONS.SET_COURSES:
      return {
        ...state,
        courses: [...action.payload],
      };

    default:
      return state;
  }
}
