import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const calculateGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 75) return "A";
    if (marks >= 60) return "B";
    if (marks >= 40) return "C";
    return "F";
  };

  const getGradeClass = (grade) => {
    switch (grade) {
      case "A+":
      case "A":
        return "grade-a";
      case "B":
        return "grade-b";
      case "C":
        return "grade-c";
      default:
        return "grade-f";
    }
  };

  const addStudent = () => {
    if (!name.trim() || !marks) {
      alert("Please enter all fields");
      return;
    }

    const markValue = Number(marks);

    if (markValue < 0 || markValue > 100) {
      alert("Marks must be between 0 and 100");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      marks: markValue,
      percentage: `${markValue}%`,
      grade: calculateGrade(markValue),
    };

    setStudents([...students, newStudent]);
    setName("");
    setMarks("");
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">
        🎓 Student Result Management System
      </h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Marks (0-100)"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          min="0"
          max="100"
        />

        <button className="add-btn" onClick={addStudent}>
          Add Student
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Marks</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.marks}</td>
                  <td>{student.percentage}</td>
                  <td>
                    <span className={getGradeClass(student.grade)}>
                      {student.grade}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Students Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;