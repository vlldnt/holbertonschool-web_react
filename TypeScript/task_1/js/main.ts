interface Teacher {
  firstName: string;
  lastName: string;
  fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  location: string;
  [newatt: string]: any;
}

const teacher3: Teacher = {
  firstName: "John",
  fullTimeEmployee: false,
  lastName: "Doe",
  location: "London",
  contract: false,
  Coucou: 12,
};

console.log(teacher3);
