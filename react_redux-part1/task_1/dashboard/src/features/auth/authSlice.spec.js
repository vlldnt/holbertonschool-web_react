import authReducer, { login, logout } from './authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  it('should return the correct initial state by default', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should update the state correctly when login is dispatched', () => {
    const payload = { email: 'user@test.com', password: 'secret123' };
    const state = authReducer(initialState, login(payload));

    expect(state.user.email).toBe(payload.email);
    expect(state.user.password).toBe(payload.password);
    expect(state.isLoggedIn).toBe(true);
  });

  it('should reset the state correctly when logout is dispatched', () => {
    const loggedInState = {
      user: { email: 'user@test.com', password: 'secret123' },
      isLoggedIn: true,
    };
    const state = authReducer(loggedInState, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });
});
