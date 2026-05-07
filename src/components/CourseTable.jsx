function CourseTable({ courses, onEdit, onDelete }) {
  if (courses.length === 0) {
    return <p className="empty-state">No courses available.</p>;
  }

  return (
    <div className="section-container">
      <h3>Courses</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Credits</th>
            <th>Department</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.credits}</td>
              <td>{course.dept}</td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button className="btn-edit" onClick={() => onEdit(course)}>Edit</button>
                  <button className="btn-delete" onClick={() => onDelete(course.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
