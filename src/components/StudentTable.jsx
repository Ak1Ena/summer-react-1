// src/components/StudentTable.jsx - Session 4 version (Async)
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteStudentAsync,
  updateStudentAsync,
  fetchStudents,
} from "../features/students/studentsThunks";
import { selectAllStudents, selectStudentsStatus, selectStudentsError } from "../features/students/selectors";
import EditModal from "./EditModal";
import ConfirmModal from "./ConfirmModal";

function StudentTable() {
  const dispatch = useDispatch();
  const students = useSelector(selectAllStudents);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);

  // Local UI state
  const [editing, setEditing] = useState(null); // null = modal closed
  const [deletingId, setDeletingId] = useState(null);

  function handleDeleteConfirm() {
    dispatch(deleteStudentAsync(deletingId));
    setDeletingId(null);
  }

  function handleEditSave(updatedData) {
    dispatch(
      updateStudentAsync({
        ...updatedData,
        gpa: parseFloat(updatedData.gpa) || 0,
      })
    );
    setEditing(null); // Close modal after update
  }

  if (status === "loading") {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="error-banner">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchStudents())}>Retry</button>
      </div>
    );
  }

  if (status !== "succeeded") return null;

  if (students.length === 0) {
    return <p className="empty-state">No students yet. Add one above!</p>;
  }

  return (
    <>
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
                <button className="btn-edit" onClick={() => setEditing(student)}>Edit</button>
                <button className="btn-delete" onClick={() => setDeletingId(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <EditModal
          student={editing}
          onSave={handleEditSave}
          onCancel={() => setEditing(null)}
        />
      )}
      {deletingId && (
        <ConfirmModal
          title="Delete Student"
          message="Are you sure you want to delete this student? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </>
  );
}

export default StudentTable;
