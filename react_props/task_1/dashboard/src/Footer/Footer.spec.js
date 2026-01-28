import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';
import { getCurrentYear } from '../utils/utils.js';

jest.mock('../utils/utils.js', () => ({
  getCurrentYear: jest.fn(() => new Date().getFullYear()),
  getFooterCopy: jest.fn(() => 'Holberton School'),
}));

test('Tests if Footer rendering', () => {
  render(<Footer />);
  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();
});

test('Footer p element renders correct copyright text when isIndex is true', () => {
  render(<Footer />);
  const currentYear = getCurrentYear();
  const paragraph = screen.getByText(
    `Copyright ${currentYear} Holberton School`,
  );
  expect(paragraph).toBeInTheDocument();
  expect(paragraph.tagName).toBe('P');
});
