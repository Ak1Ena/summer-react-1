import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, updateStudent, deleteStudent } from './features/students/studentsSlice';
import './App.css';
import StudentTable from './components/StudentTable';
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';

function App() {
  const students = useSelector((state) => state.students.list);
  const dispatch = useDispatch();
  const [editingStudent, setEditingStudent] = useState(null);

  const handleAddStudent = (newStudent) => {
    dispatch(addStudent(newStudent));
  };

  const handleUpdateStudent = (updatedStudent) => {
    dispatch(updateStudent(updatedStudent));
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate — Redux Implementation</h1>
      </header>
      <main className="app-main">
        <GpaSummary students={students} />
        <AddStudentForm 
          key={editingStudent ? editingStudent.id : 'new'}
          onAddStudent={handleAddStudent} 
          onUpdateStudent={handleUpdateStudent}
          editingStudent={editingStudent}
          onCancelEdit={handleCancelEdit}
        />
        <StudentTable 
          students={students} 
          onDelete={handleDeleteStudent}
          onEdit={handleEditStudent}
        />
      </main>
    </div>
  );
}

export default App;
