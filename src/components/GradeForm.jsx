import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGrade, updateGrade } from '../features/grades/gradesSlice';

function GradeForm({ editingGrade, onCancel }) {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const courses = useSelector((state) => state.courses.list);

  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    grade: ''
  });

  useEffect(() => {
    if (editingGrade) {
      setFormData({
        ...editingGrade,
        studentId: String(editingGrade.studentId),
        courseId: String(editingGrade.courseId),
      });
    } else {
      setFormData({ studentId: '', courseId: '', grade: '' });
    }
  }, [editingGrade]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId || !formData.grade) return;

    const payload = {
      ...formData,
      studentId: formData.studentId, // Keep as string or number based on what was selected
      courseId: formData.courseId,
    };

    if (editingGrade) {
      dispatch(updateGrade(payload));
    } else {
      dispatch(addGrade(payload));
    }
    
    setFormData({ studentId: '', courseId: '', grade: '' });
    if (onCancel) onCancel();
  };

  return (
    <div className="add-form">
      <h3>{editingGrade ? 'Edit Grade' : 'Record New Grade'}</h3>
      <form onSubmit={handleSubmit} className="form-row">
        <select
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        
        <select
          value={formData.courseId}
          onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
        >
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.code} - {c.title}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Grade (e.g., A, B+)"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
        />
        
        <button type="submit" className="btn-primary">
          {editingGrade ? 'Update' : 'Record'}
        </button>
        {editingGrade && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default GradeForm;
