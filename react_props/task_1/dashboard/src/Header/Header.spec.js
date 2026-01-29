import { render, screen } from '@testing-library/react';
import Header from './Header.jsx';

test('If render is well done for the header', () => {
  render(<Header />);
  const header = screen.getByRole('banner');
  expect(header).toBeInTheDocument();
});

test('Header component contains the Holberton logo', () => {
  render(<Header />);
  const logo = screen.getByAltText(/holberton logo/i);
  expect(logo).toBeInTheDocument();
  expect(logo.tagName).toBe('IMG');
});

test('Header component contains h1 element with correct text', () => {
  render(<Header />);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(/School dashboard/i);
});
