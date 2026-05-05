function StudentTable({ students, onDelete, onEdit }) {
	if (students.length === 0) {
		return <p className="empty-state">No students yet. Add one above!</p>;
	}
	return (
		<table className="student-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Student ID</th>
					<th>Major</th>
					<th>GPA</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{students.map((student, index) => (
					<tr key={student.id} className={student.gpa >= 3.5 ? "high-gpa" : ""}>
						<td>{index + 1}</td>
						<td>{student.name}</td>
						<td>{student.studentId}</td>
						<td>{student.major}</td>
						<td className="gpa-cell">{student.gpa.toFixed(2)}</td>
						<td>
							<button 
								className="btn-edit" 
								onClick={() => onEdit(student)}
								style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}
							>
								Edit
							</button>
							<button 
								className="btn-delete" 
								onClick={() => onDelete(student.id)}
								style={{ padding: '4px 8px', cursor: 'pointer', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px' }}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
export default StudentTable;
