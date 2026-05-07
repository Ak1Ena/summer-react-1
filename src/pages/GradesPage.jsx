import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteGrade } from '../features/grades/gradesSlice';
import GradeTable from '../components/GradeTable';
import GradeForm from '../components/GradeForm';

function GradesPage() {
  const grades = useSelector((state) => state.grades.list);
  const students = useSelector((state) => state.students.list);
  const courses = useSelector((state) => state.courses.list);
  const dispatch = useDispatch();
  const [editingGrade, setEditingGrade] = useState(null);

  const handleDeleteGrade = (id) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      dispatch(deleteGrade(id));
      if (editingGrade && editingGrade.id === id) {
        setEditingGrade(null);
      }
    }
  };

  const handleEditGrade = (grade) => {
    setEditingGrade(grade);
  };

  const handleCancelEdit = () => {
    setEditingGrade(null);
  };

  return (
    <div className="page-content">
      <GradeForm 
        editingGrade={editingGrade} 
        onCancel={handleCancelEdit} 
      />
      <GradeTable 
        grades={grades} 
        students={students}
        courses={courses}
        onEdit={handleEditGrade}
        onDelete={handleDeleteGrade}
      />
    </div>
  );
}

export default GradesPage;
