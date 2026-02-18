import { getCurrentYear, getFooterCopy } from '../utils/utils.js';

function Footer() {
  return (
    <footer className="App-footer mt-auto flex justify-center border-t-3 border-(--main-color)">
      <p className="italic mt-3">
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  );
}

export default Footer;
