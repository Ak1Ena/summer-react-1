import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse, updateCourse } from '../features/courses/coursesSlice';

function CourseForm({ editingCourse, onCancel }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    credits: '',
    dept: ''
  });

  useEffect(() => {
    if (editingCourse) {
      setFormData(editingCourse);
    } else {
      setFormData({ code: '', title: '', credits: '', dept: '' });
    }
  }, [editingCourse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.title || !formData.credits || !formData.dept) return;

    if (editingCourse) {
      dispatch(updateCourse(formData));
    } else {
      dispatch(addCourse({ ...formData, id: Date.now() }));
    }
    
    setFormData({ code: '', title: '', credits: '', dept: '' });
    if (onCancel) onCancel();
  };

  return (
    <div className="add-form">
      <h3>{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
      <form onSubmit={handleSubmit} className="form-row">
        <input
          type="text"
          placeholder="Code (e.g. CS101)"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Credits"
          value={formData.credits}
          onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dept"
          value={formData.dept}
          onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
        />
        <button type="submit" className="btn-primary">
          {editingCourse ? 'Update' : 'Add Course'}
        </button>
        {editingCourse && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default CourseForm;
