import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header className="App-header flex flex-col tablet:flex-row items-center gap-2 tablet:gap-4 py-4">
      <img
        className="h-52 w-52 tablet:h-40 tablet:w-40 desktop:h-63 desktop:w-63"
        src={holbertonLogo}
        alt="holberton logo"
      />
      <h1 className="text-[var(--main-color)] text-3xl tablet:text-3xl desktop:text-5xl font-bold">
        School Dashboard
      </h1>
    </header>
  );
}

export default Header;
