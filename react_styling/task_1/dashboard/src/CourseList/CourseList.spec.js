import {render, screen} from '@testing-library/react'
import CourseList from './CourseList.jsx'

test('should render 5 different rows when receiving array of courses', () => {
  const courses = [
    { id: 1, name: 'Alice', credit: 1 },
    { id: 2, name: 'Bob', credit: 2 },
    { id: 3, name: 'Carlos', credit: 4 }
  ]
  render(<CourseList courses={courses} />)
  expect(screen.getAllByRole('row').length).toBe(5)
})

test('should render 1 row when receiving empty array', () => {
  const courses = []
  render(<CourseList courses={courses} />)
  expect(screen.getAllByRole('row').length).toBe(1)
})