import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
import GradesPage from './pages/GradesPage';
import { fetchStudents } from './features/students/studentsThunks';
import { fetchCourses } from './features/courses/coursesThunks';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate — Redux Implementation</h1>
        <nav className="app-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Students
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Courses
          </NavLink>
          <NavLink to="/grades" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Grades
          </NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<StudentsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/grades" element={<GradesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
