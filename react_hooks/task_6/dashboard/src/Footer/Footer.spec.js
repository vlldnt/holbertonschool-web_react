import { render, screen } from '@testing-library/react';
import Footer from './Footer';

const defaultUser = { email: '', password: '', isLoggedIn: false };

describe('Footer component', () => {
  test('should render Copyright with current year and Holberton School', () => {
    render(<Footer user={defaultUser} />);
    const copyright = screen.getByText(/Copyright \d{4} - Holberton School/i);
    expect(copyright).toBeInTheDocument();
  });

  test('should not display "Contact us" link when user is logged out', () => {
    render(<Footer user={defaultUser} />);
    expect(screen.queryByText('Contact us')).not.toBeInTheDocument();
  });

  test('should display "Contact us" link when user is logged in', () => {
    const user = { email: 'test@test.com', password: 'password', isLoggedIn: true };
    render(<Footer user={user} />);
    const contactLink = screen.getByText('Contact us');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toBeInTheDocument();
  });
});
