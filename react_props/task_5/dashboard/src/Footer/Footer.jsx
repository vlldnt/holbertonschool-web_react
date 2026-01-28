import './Footer.css';
import { getFooterCopy, getCurrentYear } from '../utils/utils.js';

function Footer() {
  return (
    <footer className="App-footer">
      <p>
        Copyright {getCurrentYear()} {getFooterCopy()}
      </p>
    </footer>
  );
}

export default Footer;
