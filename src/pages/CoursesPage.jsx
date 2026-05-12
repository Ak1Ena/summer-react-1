import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourseAsync, fetchCourses } from '../features/courses/coursesThunks';
import CourseTable from '../components/CourseTable';
import CourseForm from '../components/CourseForm';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';

function CoursesPage() {
  const courses = useSelector((state) => state.courses.list);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);
  const dispatch = useDispatch();
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  const handleDeleteConfirm = () => {
    dispatch(deleteCourseAsync(deletingId));
    setDeletingId(null);
    if (editingCourse && editingCourse.id === deletingId) {
      setEditingCourse(null);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
  };

  if (status === 'loading') {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading courses...</p>
      </div>
  );  }

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
      <CourseForm />
      
      {status === 'succeeded' && (
        <CourseTable 
          courses={courses} 
          onEdit={handleEditCourse}
          onDelete={(id) => setDeletingId(id)}
        />
      )}

      {editingCourse && (
        <Modal title="Edit Course" onClose={handleCancelEdit}>
          <CourseForm 
            editingCourse={editingCourse} 
            onCancel={handleCancelEdit} 
          />
        </Modal>
      )}

      {deletingId && (
        <ConfirmModal
          title="Delete Course"
          message="Are you sure you want to delete this course? This will also affect student enrollments."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}

export default CoursesPage;
