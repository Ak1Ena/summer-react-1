import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse } from '../features/courses/coursesSlice';
import CourseTable from '../components/CourseTable';
import CourseForm from '../components/CourseForm';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';

function CoursesPage() {
  const courses = useSelector((state) => state.courses.list);
  const dispatch = useDispatch();
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteConfirm = () => {
    dispatch(deleteCourse(deletingId));
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

  return (
    <div className="page-content">
      <CourseForm />
      
      <CourseTable 
        courses={courses} 
        onEdit={handleEditCourse}
        onDelete={(id) => setDeletingId(id)}
      />

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
