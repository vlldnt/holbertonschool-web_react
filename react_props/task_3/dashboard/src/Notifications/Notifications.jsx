import closeButton from '../assets/close-button.png';
import './Notifications.css';
import NotificationItem from './NotificationItem.jsx';

function Notifications({ notifications = [] }) {
  return (
    <div className="root-notifications">
      <div className="notification-items">
        <p>Here is the list of notifications</p>
        <ul>
          {notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              type={notif.type}
              value={notif.value}
              html={notif.html}
            />
          ))}
        </ul>
      </div>
      <button
        className="close-button"
        aria-label="Close"
        onClick={() => console.log('Close button has been clicked')}
      >
        <img src={closeButton} alt="close-button" />
      </button>
    </div>
  );
}

export default Notifications;
