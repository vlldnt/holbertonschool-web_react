import CourseListRow from './CourseListRow.jsx';
import WithLogging from '../HOC/WithLogging.jsx';

function CourseList({ courses = [] }) {
  return (
    <div className="courses-container w-4/5 mx-auto mt-30 mb-30 tablet:mb-0">
      <table id="coursesTable" className="w-full border-collapse">
        {courses.length === 0 ? (
          <thead>
            <CourseListRow
              textFirstCell="No course available yet"
              isHeader={true}
            />
          </thead>
        ) : (
          <>
            <thead>
              <CourseListRow
                textFirstCell="Available courses"
                isHeader={true}
              />
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
          </>
        )}
      </table>
    </div>
  );
}

const CourseListWithLogging = WithLogging(CourseList);
export default CourseListWithLogging;
