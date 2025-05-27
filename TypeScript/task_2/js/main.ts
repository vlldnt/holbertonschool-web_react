interface DirectorInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

interface TeacherInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}

class Director implements DirectorInterface {
  workFromHome() {
    return "Working from home";
  }
  getCoffeeBreak() {
    return "Getting a coffee break";
  }
  workDirectorTasks() {
    return "Getting to director tasks";
  }
}

class Teacher implements TeacherInterface {
  workFromHome() {
    return "Cannot work from home";
  }
  getCoffeeBreak() {
    return "Cannot have a break";
  }
  workTeacherTasks() {
    return "Getting to work";
  }
}

function createEmployee(salary: number | string) {
  if (typeof salary === "number" && salary < 500) {
    return new Teacher();
  } else {
    return new Director();
  }
}

function isDirector(employee: Teacher | Director): employee is Director {
  return employee instanceof Director;
}

function executeWork(employee: Teacher | Director) {
  if (isDirector(employee)) {
    return employee.workDirectorTasks();
  } else {
    return employee.workTeacherTasks();
  }
}

type Subject = "Math" | "History";

function teachClass(todayClass: Subject) {
  if (todayClass === "Math") {
    return "Teaching Math";
  } else {
    return "Teaching History"
  }
}

console.log(createEmployee(499));
console.log(createEmployee(500));
console.log(createEmployee("$499"));
console.log(executeWork(createEmployee(499)));
console.log(executeWork(createEmployee(500)));
console.log(teachClass("Math"));
console.log(teachClass("History"));