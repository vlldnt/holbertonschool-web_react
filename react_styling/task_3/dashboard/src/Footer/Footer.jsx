import { getCurrentYear, getFooterCopy } from '../utils/utils.js';

function Footer() {
  return (
    <footer className="App-footer flex justify-center border-t-[2px] border-[var(--main-color)]">
      <p className="italic mt-3">
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  );
}

export default Footer;
