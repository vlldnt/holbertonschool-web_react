import React from 'react';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem.jsx';

class Notifications extends React.Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: true,
    markAsRead: () => {},
  };

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.notifications !== nextProps.notifications ||
      this.props.displayDrawer !== nextProps.displayDrawer
    );
  }

  render() {
    return (
      <div className="root-notifications w-full absolute flex flex-col items-end p-1.5">
        <div className="notification-title">
          <h2 className="m-0 mb-1.5 text-right">Your notifications</h2>
        </div>
        {this.props.displayDrawer && (
          <>
            <div className="notification-items w-1/4 border-2 border-dashed border-(--main-color) p-1.5">
              {this.props.notifications.length === 0 ? (
                <p>no new notification for now</p>
              ) : (
                <>
                  <p>Here is the list of notifications</p>
                  <ul className="list-disc pl-4">
                    {this.props.notifications.map((notif) => (
                      <NotificationItem
                        key={notif.id}
                        id={notif.id}
                        type={notif.type}
                        value={notif.value}
                        html={notif.html}
                        markAsRead={this.markAsRead}
                      />
                    ))}
                  </ul>
                </>
              )}
            </div>
            <button
              className="close-button w-2 h-2 border-0 bg-transparent absolute top-12 right-[1.2rem]"
              aria-label="Close"
              onClick={() => console.log('Close button has been clicked')}
            >
              <img className="w-2 h-2" src={closeButton} alt="close-button" />
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Notifications;
