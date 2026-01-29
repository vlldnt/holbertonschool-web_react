import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('should render Copyright with current year and Holberton School', () => {
    render(<Footer />);
    const copyright = screen.getByText(/Copyright \d{4} - Holberton School/i);
    expect(copyright).toBeInTheDocument();
  });
});
