import { getCurrentYear, getFooterCopy } from '../utils/utils.js';

function Footer({ isIndex }) {
  return (
    <footer className="App-footer flex justify-center border-t-3 border-[var(--main-color)]">
      <p className="italic mt-3 text-xs tablet:text-base">
        Copyright {getCurrentYear()} - {getFooterCopy(isIndex)}
      </p>
    </footer>
  );
}

export default Footer;
