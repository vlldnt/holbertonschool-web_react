import CourseListRow from "./CourseListRow";

function CourseList({ courses = [] }) {
  return (
    <div className="courses-container w-4/5 mx-auto">
      <table id="coursesTable" className="w-full">
        {courses.length === 0 ? (
          <tbody>
            <CourseListRow
              textFirstCell="No course available yet"
              isHeader={true}
            />
          </tbody>
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

export default CourseList;
