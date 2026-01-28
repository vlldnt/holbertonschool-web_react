export function getCurrentYear() {
  return Date().getFullYear();
}

export function getFooterCopy(isIndex) {
  if (isIndex === true) {
    return 'Holberton School';
  } else {
    return 'Holberton School main dashboard';
  }
}

export function getLatestNotifications() {
  return '<strong>Urgent requirement</strong> - complete by EOD';
}
