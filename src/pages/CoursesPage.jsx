import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse } from '../features/courses/coursesSlice';
import CourseTable from '../components/CourseTable';
import CourseForm from '../components/CourseForm';

function CoursesPage() {
  const courses = useSelector((state) => state.courses.list);
  const dispatch = useDispatch();
  const [editingCourse, setEditingCourse] = useState(null);

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      dispatch(deleteCourse(id));
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

  return (
    <div className="page-content">
      <CourseForm 
        editingCourse={editingCourse} 
        onCancel={handleCancelEdit} 
      />
      <CourseTable 
        courses={courses} 
        onEdit={handleEditCourse}
        onDelete={handleDeleteCourse}
      />
    </div>
  );
}

export default CoursesPage;
