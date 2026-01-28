import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';

test('Tests if Footer rendering', () => {
  render(<Footer />);
  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();
});
