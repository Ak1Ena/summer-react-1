import { useSelector, useDispatch } from 'react-redux';
import { addStudent } from './features/students/studentsSlice';
import './App.css';
import StudentTable from './components/StudentTable';
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';

function App() {
  const students = useSelector((state) => state.students.list);
  const dispatch = useDispatch();

  const handleAddStudent = (newStudent) => {
    dispatch(addStudent(newStudent));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate — Redux Implementation</h1>
      </header>
      <main className="app-main">
        <GpaSummary students={students} />
        <AddStudentForm onAddStudent={handleAddStudent} />
        <StudentTable students={students} />
      </main>
    </div>
  );
}

export default App;
