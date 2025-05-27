/// <reference path="Teacher.ts" />
/// <reference path="Cpp.ts" />
/// <reference path="Java.ts" />
/// <reference path="React.ts" />

namespace Subjects {
  export class Subject {
    teacher: Teacher | undefined;

    set setTeacher(teacher: Teacher) {
      this.teacher = teacher;
    }
  }
}
