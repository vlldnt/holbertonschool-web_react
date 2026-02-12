import React from 'react';
import '../main.css';

class NotificationItem extends React.PureComponent {
  handleClick = () => {
    const { id, markAsRead } = this.props;
    console.log(`Notification ${id} has been marked as read`);
    if (markAsRead) {
      markAsRead(id);
    }
  };

  render() {
    const { type = 'default', html = null, value = null } = this.props;
    const hasHTML = html && (typeof html === 'object' || typeof html === 'string');

    const colorClass = type === 'default'
      ? 'text-[var(--default-notification-item)]'
      : 'text-[var(--urgent-notification-item)]';

    return (
      <li
        onClick={this.handleClick}
        data-notification-type={type}
        className={colorClass}
        {...(hasHTML ? { dangerouslySetInnerHTML: typeof html === 'object' ? html : { __html: html } } : {})}
      >
        {!hasHTML ? value : null}
      </li>
    );
  }
}

export default NotificationItem;
