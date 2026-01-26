import './App.css';
import './Notifications.css'
import Notifications from './Notifications.jsx';
import logo from './assets/holberton-logo.jpg';
import { getFooterCopy } from './utils';

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div className="root-notifications">
        <Notifications />
      </div>
      <div className="App-header">
        <img src={logo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <div className="App-footer">
        <p>
          Copyright {currentYear} {getFooterCopy()}
        </p>
      </div>
    </div>
  );
}

export default App;
