// self_check.js
// Student self-check tests (15 checkpoints, 1 point each)
// Uses different test data than the hidden tests.
// Run: node self_check.js

const {
  Person,
  Student,
  Course,
  gradeUtils,
  boundIsPassing,
} = require("./index.js");

function safeStringify(x) {
  try {
    return JSON.stringify(x);
  } catch {
    return String(x);
  }
}

function expectEqual(actual, expected, hint = "") {
  if (actual !== expected) {
    throw new Error(
      `${hint}\n  expected: ${safeStringify(expected)}\n  actual:   ${safeStringify(actual)}`
    );
  }
  return true;
}

function expect(condition, hint = "Expectation failed") {
  if (!condition) throw new Error(hint);
  return true;
}

function assert(name, fn) {
  try {
    fn();
    return { name, ok: true, output: "" };
  } catch (e) {
    return {
      name,
      ok: false,
      output: String(e && e.message ? e.message : e),
    };
  }
}

function run() {
  const tests = [];

  // 1. Person constructor sets name/age
  tests.push(
    assert("1. Person constructor sets name/age", () => {
      const p = new Person("Rina", 41);
      expectEqual(p.name, "Rina", "Person.name not set correctly");
      expectEqual(p.age, 41, "Person.age not set correctly");
    })
  );

  // 2. Person.greet uses correct string
  tests.push(
    assert("2. Person.greet uses correct string", () => {
      const p = new Person("Sam", 18);
      const expected = "Hi, my name is Sam and I am 18 years old.";
      expectEqual(p.greet(), expected, "Person.greet() string mismatch");
    })
  );

  // 3. Person.getBirthYear computes correctly
  tests.push(
    assert("3. Person.getBirthYear computes correctly", () => {
      const p = new Person("Tori", 33);
      expectEqual(p.getBirthYear(2030), 1997, "getBirthYear(year) calculation wrong");
    })
  );

  // 4. Student extends Person
  tests.push(
    assert("4. Student extends Person", () => {
      const s = new Student("Uma", 19, "U100", [88, 92]);
      expect(s instanceof Person, "Student should be instanceof Person");
    })
  );

  // 5. Student stores studentId + grades
  tests.push(
    assert("5. Student stores studentId + grades", () => {
      const s = new Student("Vic", 20, "V200", [65, 75, 85]);
      expectEqual(s.studentId, "V200", "Student.studentId not stored correctly");
      expect(Array.isArray(s.grades), "Student.grades should be an array");
      expectEqual(s.grades.length, 3, "Student.grades length incorrect");
    })
  );

  // 6. Student.averageGrade returns exact average
  tests.push(
    assert("6. Student.averageGrade returns exact average", () => {
      const s = new Student("Wen", 21, "W300", [60, 90, 90]);
      // (60 + 90 + 90) / 3 = 80
      expectEqual(s.averageGrade(), 80, "averageGrade() should return exact average");
    })
  );

  // 7. Student.averageGrade handles empty grades
  tests.push(
    assert("7. Student.averageGrade handles empty grades", () => {
      const s = new Student("Xia", 22, "X400", []);
      expectEqual(s.averageGrade(), 0, "averageGrade() should be 0 for empty grades");
    })
  );

  // 8. Student.greet override string
  tests.push(
    assert("8. Student.greet override string", () => {
      const s = new Student("Yuri", 23, "Y500", [100]);
      const expected = "Hi, I'm Yuri, my student ID is Y500.";
      expectEqual(s.greet(), expected, "Student.greet() override string mismatch");
    })
  );

  // 9. Course constructor initializes students array
  tests.push(
    assert("9. Course constructor initializes students array", () => {
      const c = new Course("Physics", 3);
      expectEqual(c.title, "Physics", "Course.title not set");
      expectEqual(c.capacity, 3, "Course.capacity not set");
      expect(Array.isArray(c.students), "Course.students should be an array");
    })
  );

  // 10. Course.addStudent respects capacity
  tests.push(
    assert("10. Course.addStudent respects capacity", () => {
      const c = new Course("WebDev", 2);
      const s1 = new Student("Ari", 18, "A001", [100]);
      const s2 = new Student("Bea", 18, "B002", [100]);
      const s3 = new Student("Cal", 18, "C003", [100]);

      expectEqual(c.addStudent(s1), true, "1st addStudent should return true");
      expectEqual(c.addStudent(s2), true, "2nd addStudent should return true");
      expectEqual(c.addStudent(s3), false, "3rd addStudent should return false (capacity)");
    })
  );

  // 11. Course.getPassingStudents filters by avg>=70
  tests.push(
    assert("11. Course.getPassingStudents filters by avg>=70", () => {
      const c = new Course("Writing", 5);
      c.addStudent(new Student("Dee", 20, "D010", [70])); // pass edge
      c.addStudent(new Student("Eli", 20, "E011", [69.9])); // fail (if you compute exact)
      c.addStudent(new Student("Fay", 20, "F012", [100])); // pass

      const passing = c.getPassingStudents();
      const passingNames = passing.map((s) => s.name).sort();

      expectEqual(passing.length, 2, "Expected exactly 2 passing students");
      expectEqual(passingNames[0], "Dee", "Passing list missing Dee");
      expectEqual(passingNames[1], "Fay", "Passing list missing Fay");
    })
  );

  // 12. Course.findStudentById finds correctly
  tests.push(
    assert("12. Course.findStudentById finds correctly", () => {
      const c = new Course("Chem", 2);
      const s = new Student("Gio", 22, "G900", [81]);
      c.addStudent(s);

      expectEqual(c.findStudentById("G900"), s, "Should return the same object reference");
      expectEqual(c.findStudentById("ZZZ"), undefined, "Unknown ID should return undefined");
    })
  );

  // 13. Course.getStudentsSortedByName returns sorted NEW array
  tests.push(
    assert("13. Course.getStudentsSortedByName returns sorted NEW array", () => {
      const c = new Course("Design", 3);
      c.addStudent(new Student("Mona", 20, "M101", [80]));
      c.addStudent(new Student("Liam", 20, "L102", [80]));
      c.addStudent(new Student("Nia", 20, "N103", [80]));

      const sorted = c.getStudentsSortedByName();
      expect(Array.isArray(sorted), "Should return an array");
      expect(sorted !== c.students, "Must return a NEW array (not the same reference)");

      const names = sorted.map((s) => s.name);
      expectEqual(names.join(","), "Liam,Mona,Nia", "Names not sorted ascending by name");

      // Extra sanity: original should remain in original insertion order
      const originalNames = c.students.map((s) => s.name);
      expectEqual(originalNames.join(","), "Mona,Liam,Nia", "Original students array was mutated");
    })
  );

  // 14. gradeUtils.isPassing uses this.passingScore
  tests.push(
    assert("14. gradeUtils.isPassing uses this.passingScore", () => {
      const s = new Student("Oli", 20, "O777", [74]);

      const old = gradeUtils.passingScore;
      gradeUtils.passingScore = 75; // if isPassing uses `this`, 74 should fail now
      const result = gradeUtils.isPassing(s);
      gradeUtils.passingScore = old;

      expectEqual(result, false, "isPassing should depend on this.passingScore");
    })
  );

  // 15. boundIsPassing works as detached callback
  tests.push(
    assert("15. boundIsPassing works as detached callback", () => {
      const students = [
        new Student("Paz", 20, "P111", [70]), // should pass (>=70) if passingScore is default 70
        new Student("Quin", 20, "Q222", [10]), // fail
        new Student("Rae", 20, "R333", [99]), // pass
      ];

      const passing = students.filter(boundIsPassing);
      const names = passing.map((s) => s.name).sort();

      expectEqual(passing.length, 2, "Expected 2 passing students from filter");
      expectEqual(names.join(","), "Paz,Rae", "Filter result names mismatch");
    })
  );

  return tests;
}

// ---------- Pretty printing ----------
const results = run();
let points = 0;

console.log("\n=== SELF CHECK RESULTS (15 points) ===\n");

for (const r of results) {
  if (r.ok) {
    points += 1;
    console.log(`✅ ${r.name}`);
  } else {
    console.log(`❌ ${r.name}`);
    console.log(`   Debug: ${r.output}`);
  }
}

console.log("\n-------------------------------------");
console.log(`Total: ${points} / ${results.length} points`);
console.log("-------------------------------------\n");

// Helpful note if they can't import:
if (results.length === 0) {
  console.log("No tests ran. Check your require() path to student_exports.js");
}
