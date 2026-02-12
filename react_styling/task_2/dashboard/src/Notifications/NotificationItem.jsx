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
    const { type = null, html = null, value = null } = this.props;
    const style = {
      color:
        type === 'urgent'
          ? 'var(--urgent-notification-item)'
          : 'var(--default-notification-item)',
    };

    if (html) {
      return (
        <li
          onClick={this.handleClick}
          data-notification-type={type}
          style={style}
          dangerouslySetInnerHTML={
            typeof html === 'object' ? html : { __html: html }
          }
        />
      );
    }

    return (
      <li
        onClick={this.handleClick}
        data-notification-type={type}
        style={style}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
