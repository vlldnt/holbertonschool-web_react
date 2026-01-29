import { render, screen } from '@testing-library/react';
import Header from './Header.jsx';

test('If render is well done for the header', () => {
  render(<Header />);
  const header = screen.getByRole('banner');
  expect(header).toBeInTheDocument();
});

test('should render the image', () => {
  render(<Header />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test('should render title', () => {
  render(<Header />);
  expect(screen.getByRole('heading')).toHaveTextContent(/School dashboard/i);
});
