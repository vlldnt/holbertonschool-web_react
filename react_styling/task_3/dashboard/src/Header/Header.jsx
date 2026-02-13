import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header className="App-header flex items-center">
      <img
        className="h-[250px] w-[250px]"
        src={holbertonLogo}
        alt="holberton logo"
      />
      <h1 className="text-[var(--main-color)] text-5xl font-bold">
        School dashboard
      </h1>
    </header>
  );
}

export default Header;
