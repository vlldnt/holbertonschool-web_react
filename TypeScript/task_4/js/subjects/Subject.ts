/// <reference path="Teacher.ts" />

namespace Subjects {
  export class Subject {
    teacher: Teacher | undefined;

    set setTeacher(teacher: Teacher) {
      this.teacher = teacher;
    }
  }
}
