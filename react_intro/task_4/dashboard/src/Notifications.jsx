import closeIcon from './assets/close-button.png';
import { getLatestNotifications } from './utils';

function Notifications() {
  function handleClick() {
    console.log('Close button has been clicked');
  }

  return (
    <div className="notifications-items">
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotifications() }}
        ></li>
      </ul>
      <button aria-label="Close" onClick={handleClick}>
        <img src={closeIcon} alt="close button" width="12px" height="12px" />
      </button>
    </div>
  );
}

export default Notifications;
