import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header className="App-header flex flex-col tablet:flex-row items-center gap-2 tablet:gap-4 py-4">
      <img
        className="h-32 w-32 tablet:h-40 tablet:w-40 desktop:h-[250px] desktop:w-[250px]"
        src={holbertonLogo}
        alt="holberton logo"
      />
      <h1 className="text-[var(--main-color)] text-2xl tablet:text-3xl desktop:text-5xl font-bold">
        School dashboard
      </h1>
    </header>
  );
}

export default Header;
