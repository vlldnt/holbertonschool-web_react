import React from 'react';

class NotificationItem extends React.Component {
  handleClick = () => {
    const { id, markAsReadOn } = this.props;
    if (markAsReadOn) {
      markAsReadOn(id);
    }
  };

  render() {
    const { type = null, html = null, value = null } = this.props;
    const style = {
      color: type === 'urgent' ? 'red' : 'blue',
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
