import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

describe('Courselisttests', () => {
  test('renders 5 different rows', () => {
    render(<CourseList />);
  });
});
