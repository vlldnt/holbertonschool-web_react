import './App.css';
import './Notifications.css';
import Notifications from './Notifications.jsx';
import logo from './assets/holberton-logo.jpg';
import { getFooterCopy, getCurrentYear } from './utils';

function App() {

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

        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" />

        <button type="button">OK</button>
      </div>
      <div className="App-footer">
        <p>
          Copyright {getCurrentYear()} - {getFooterCopy()}
        </p>
      </div>
    </div>
  );
}

export default App;
