import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header className="App-header flex flex-col mobile:flex-row items-center">
      <img
        className="h-40 w-40 mobile:h-[250px] mobile:w-[250px]"
        src={holbertonLogo}
        alt="holberton logo"
      />
      <h1 className="text-[var(--main-color)] text-3xl mobile:text-5xl font-bold">
        School dashboard
      </h1>
    </header>
  );
}

export default Header;
