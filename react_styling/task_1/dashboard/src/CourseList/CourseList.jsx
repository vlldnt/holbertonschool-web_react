import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div className="courses-container w-[80%] mx-auto">
        <table id="noCourse" className="w-full">
          <tbody>
            <CourseListRow
              textFirstCell="No course available yet"
              isHeader={true}
            />
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="courses-container flex justify-center w-[80%] mx-auto">
      <table id="coursesTable" className="w-full">
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow
            textFirstCell="Course name"
            textSecondCell="Credit"
            isHeader={true}
          />
        </thead>
        <tbody>
          {courses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit}
              isHeader={false}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
