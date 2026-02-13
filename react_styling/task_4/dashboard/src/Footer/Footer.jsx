import { getCurrentYear, getFooterCopy } from '../utils/utils.js';

function Footer({ isIndex }) {
  return (
    <footer className="App-footer mt-auto flex justify-center border-t-3 border-[var(--main-color)] py-4">
      <p className="italic text-xs tablet:text-sm desktop:text-base">
        Copyright {getCurrentYear()} - {getFooterCopy(isIndex)}
      </p>
    </footer>
  );
}

export default Footer;
