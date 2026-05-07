import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourseAsync, fetchCourses } from '../features/courses/coursesThunks';
import CourseTable from '../components/CourseTable';
import CourseForm from '../components/CourseForm';

function CoursesPage() {
  const courses = useSelector((state) => state.courses.list);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);
  const dispatch = useDispatch();
  const [editingCourse, setEditingCourse] = useState(null);

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      dispatch(deleteCourseAsync(id));
      if (editingCourse && editingCourse.id === id) {
        setEditingCourse(null);
      }
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
  };

  if (status === 'loading') {
    return <div className="spinner">Loading courses...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="error-banner">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchCourses())}>Retry</button>
      </div>
    );
  }

  return (
    <div className="page-content">
      <CourseForm 
        editingCourse={editingCourse} 
        onCancel={handleCancelEdit} 
      />
      {status === 'succeeded' && (
        <CourseTable 
          courses={courses} 
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
        />
      )}
    </div>
  );
}

export default CoursesPage;
