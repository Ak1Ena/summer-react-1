function GradeTable({ grades, students, courses, onEdit, onDelete }) {
  if (grades.length === 0) {
    return <p className="empty-state">No grades recorded yet.</p>;
  }

  const getStudentName = (id) => {
    // Use == for loose equality as IDs might be strings from API but numbers in local state
    const student = students.find((s) => s.id == id);
    return student ? student.name : 'Unknown Student';
  };

  const getCourseTitle = (id) => {
    const course = courses.find((c) => c.id == id);
    return course ? `${course.code}: ${course.title}` : 'Unknown Course';
  };

  return (
    <div className="section-container">
      <h3>Grades</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Grade</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td>{getStudentName(grade.studentId)}</td>
              <td>{getCourseTitle(grade.courseId)}</td>
              <td>{grade.grade}</td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button className="btn-edit" onClick={() => onEdit(grade)}>Edit</button>
                  <button className="btn-delete" onClick={() => onDelete(grade.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradeTable;
