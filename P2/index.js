/******************************************************
 * OOP PRACTICE – JavaScript (Skeleton Code)
 *
 * Instructions:
 * 1. Fill in all TODO sections.
 * 2. Do NOT modify test code.
 * 3. Run with: node self_check.test.js
 ******************************************************/

/***********************
 * PART 1: Person Class
 ***********************/

class Person {
  constructor(name, age) {
    // TODO 1:
    // Save name and age on the instance
    this.name = name;
    this.age = age;
  }

  greet() {
    // TODO 2:
    // Use template literals
    // Return:
    // "Hi, my name is <name> and I am <age> years old."
    return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
  }


  getBirthYear(currentYear) {
    // TODO 3:
    // Return the birth year using this.age
    return currentYear - this.age;
  }
}

/*************************
 * PART 2: Student Class
 *************************/

// TODO 4:
// Student should inherit from Person
class Student extends Person {
  constructor(name, age, studentId, grades) {
    // TODO 5:
    // - grades is an array of numbers
    // - Call super correctly
    super(name, age);
    this.studentId = studentId;
    this.grades = Array.isArray(grades) ? grades : [];
  }

  averageGrade() {
    // TODO 6:
    // - Return the average grade    
    const validGrades = this.grades.filter(g => typeof g === "number");

    if (validGrades.length === 0) {
      return 0; //  avoding division by zero
    }
    const sum = validGrades.reduce((acc, grade) => acc + grade, 0);
    return sum / validGrades.length;
  }

  greet() {
    // TODO 7:
    // Override greet() from the parent class
    // return "Hi, I'm <name>, my student ID is <studentId>."
    return `Hi, I'm ${this.name}, my student ID is ${this.studentId}.`;
  }
}

/*************************
 * PART 3: Course Class
 *************************/

class Course {

  constructor(title, capacity) {
    // TODO 8:
    // - Save title and capacity
    // - Initialize students as empty array
    this.title = title;
    this.capacity = typeof capacity === "number" && capacity > 0 ? capacity : 0;
    this.students = [];
  }


  addStudent(student) {
    // TODO 9:
    // - Only add if capacity allows
    // - Return true if added, false otherwise
    if (!(student instanceof Student)) return false;

    if (this.students.length < this.capacity) {
      this.students.push(student);
      return true;
    }
    return false;
  }

  getPassingStudents() {
    // TODO 10:
    // - Return students with averageGrade() >= 70
    // - Use filter()
    return this.students.filter(student => student.averageGrade() >= 70);
  }

  findStudentById(studentId) {
    // TODO 11:
    // - Use find()
    // - Return the student or undefined
    return this.students.find(student => student.studentId === studentId);
  }

  getStudentsSortedByName() {
    // TODO 12:
    // - Return a NEW array sorted alphabetically by name
    // - Use sort()
    return [...this.students].sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }
}

/********************************
 * PART 4: this Binding Practice
 ********************************/

const gradeUtils = {
  passingScore: 70,

  isPassing(student) {
    // TODO 13:
    // - Return true if the student's average grade is greater or equal to passingScore, false otherwise
    return student.averageGrade() >= this.passingScore;
  }
};

// TODO 14:
// bind isPassing so it can be used safely as a callback
const boundIsPassing = gradeUtils.isPassing.bind(gradeUtils);


module.exports = {
  Person,
  Student,
  Course,
  gradeUtils,
  boundIsPassing,
};
