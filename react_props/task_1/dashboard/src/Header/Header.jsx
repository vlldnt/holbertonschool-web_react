import './Header.css';
import logo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header className="App-header">
      <img src={logo} alt="holberton logo" />
      <h1>School dashboard</h1>
    </header>
  );
}

export default Header;
