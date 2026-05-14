import { useState } from "react";
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "../features/students/studentsApi";
import EditModal from "./EditModal";
import StudentRow from "./StudentRow";

function StudentTable() {
  const {
    data: students = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetStudentsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [editing, setEditing] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
    }
  };

  const handleEditSave = async (student) => {
    await updateStudent({ ...student, gpa: parseFloat(student.gpa) || 0 });
    setEditing(null);
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-banner">
        <p>Error: {error?.status || "Failed to fetch students"}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return <p className="empty-state">No students found. Add one to the list.</p>;
  }

  return (
    <>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        {isFetching && <span className="badge">↻ Syncing...</span>}
        <button onClick={refetch} className="btn-refresh">↻ Refresh</button>
      </div>
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
            <StudentRow
              key={student.id}
              student={student}
              index={index}
              setEditing={setEditing}
              handleDelete={handleDelete}
            />
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
    </>
  );
}

export default StudentTable;
