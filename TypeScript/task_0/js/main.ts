interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: "Hugo",
  lastName: "Chill'aime",
  age: 34,
  location: "Toulouse",
};

const student2: Student = {
  firstName: "Fabien",
  lastName: "Chégévaronet",
  age: 76,
  location: "Toulouse Downtown",
};

const studentsList: Student[] = [student1, student2];

console.log(studentsList);
