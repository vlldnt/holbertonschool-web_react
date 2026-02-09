import { render, screen } from '@testing-library/react';
import React from 'react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

test('test the WithLogging HOC render', () => {
  const MockAppWithLogging = WithLogging(MockApp);
  render(<MockAppWithLogging />);
  const text = screen.getByText(/Hello from Mock App Component/i);
  expect(text).toBeInTheDocument();
});
