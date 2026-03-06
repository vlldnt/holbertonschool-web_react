import React from 'react';

class NotificationItem extends React.PureComponent {
  static defaultProps = {
    markAsRead: () => {},
    type: "default",
    html: "",
    value: "",
    id: 1,
  };

  handleClick = () => {
    const { id, markAsRead } = this.props;
    markAsRead(id);
  };

  render() {
    const { type , html , value } = this.props;
    const hasHTML =
      html && (typeof html === 'object' || typeof html === 'string');

    const colorClass =
      type === 'default'
        ? 'text-[var(--default-notification-item)]'
        : 'text-[var(--urgent-notification-item)]';

    return (
      <>
        <li
          onClick={this.handleClick}
          data-notification-type={type}
          className={`tablet:text-base text-base ${colorClass}`}
          {...(hasHTML
            ? {
                dangerouslySetInnerHTML:
                  typeof html === 'object' ? html : { __html: html },
              }
            : {})}
        >
          {!hasHTML ? value : null}
        </li>
        <span className="block tablet:hidden h-px w-full -ml-1 bg-black mt-2 mb-2"></span>
      </>
    );
  }
}

export default NotificationItem;
