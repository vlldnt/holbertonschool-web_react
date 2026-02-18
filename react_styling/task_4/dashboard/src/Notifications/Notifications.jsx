import React from 'react';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem.jsx';

class Notifications extends React.Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: false,
    markAsRead: () => {},
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
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
    const {
      displayDrawer,
      notifications,
      handleDisplayDrawer,
      handleHideDrawer,
    } = this.props;

    return (
      <>
        <div className="root-notifications w-full absolute flex flex-col items-end z-50">
          <div
            className="notifications-title cursor-pointer tablet:cursor-default"
            onClick={handleDisplayDrawer}
          >
            <p className="mb-1.5 mr-4 text-right text-xs">Your notifications</p>
          </div>

          <div className="hidden tablet:block tablet:w-1/4 border-2 border-dashed border-(--main-color) p-1.5">
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul className="list-disc pl-4">
                  {notifications.map((notif) => (
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
        </div>

        {displayDrawer && (
          <div className="fixed inset-0 z-50 bg-white tablet:hidden">
            <div className="w-full h-full border-2 border-dashed border-(--main-color) p-4 overflow-auto">
              {notifications.length === 0 ? (
                <p className="tablet:text-lg tablet:font-bold mb-4">No new notification for now</p>
              ) : (
                <>
                  <p className="tablet:text-lg tablet:font-bold mb-4">
                    Here is the list of notifications
                  </p>
                  <ul className="tablet:list-disc p-1 tablet:pl-6">
                    {notifications.map((notif) => (
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
              className="close-button fixed top-4 right-4 w-3 h-3 border-0 bg-transparent cursor-pointer z-[1000]"
              aria-label="Close"
              onClick={handleHideDrawer}
            >
              <img
                className="w-full h-full"
                src={closeButton}
                alt="close-button"
              />
            </button>
          </div>
        )}
      </>
    );
  }
}

export default Notifications;
