import { render, screen } from '@testing-library/react';
import Header from './Header.jsx';

test('If render is well done for the footer', () => {
  render(<Header />);
  const header = screen.getByRole('banner');
  expect(header).toBeInTheDocument();
});
