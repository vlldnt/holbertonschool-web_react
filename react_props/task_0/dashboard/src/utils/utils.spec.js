import { getCurrentYear, getFooterCopy, getLatestNotifications } from './utils';

describe('utils tests', () => {
  test('returns current year', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear());
  });

  test('returns Holberton School when isIndex is true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('returns Holberton School main dashboard when isIndex is false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });

  test('returns expected HTML string', () => {
    expect(getLatestNotifications()).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD',
    );
  });
});
