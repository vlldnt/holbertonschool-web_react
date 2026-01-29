function NotificationItem({ type, html, value }) {
  const style = {
    color: type === 'urgent' ? 'red' : 'blue',
  };

  return (
    <li data-notification-type={type} style={style}>
      {html ? (
        <span dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        value
      )}
    </li>
  );
}

export default NotificationItem;
