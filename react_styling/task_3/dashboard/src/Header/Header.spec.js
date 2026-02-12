import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
    const title = screen.getByText(/school dashboard/i);
    expect(title).toBeInTheDocument();
  });

  test('should render title', () => {
    render(<Header />);
    expect(screen.getByRole('heading')).toHaveTextContent(/School dashboard/i);
  });
  
  test('should contain a Holberton logo component', () => {
    render(<Header />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });
});
