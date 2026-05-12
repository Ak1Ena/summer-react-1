import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteGrade } from '../features/grades/gradesSlice';
import { selectAllStudents } from '../features/students/studentsSlice';
import GradeTable from '../components/GradeTable';
import GradeForm from '../components/GradeForm';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';

function GradesPage() {
  const grades = useSelector((state) => state.grades.list);
  const students = useSelector(selectAllStudents);
  const courses = useSelector((state) => state.courses.list);
  const dispatch = useDispatch();
  const [editingGrade, setEditingGrade] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteConfirm = () => {
    dispatch(deleteGrade(deletingId));
    setDeletingId(null);
    if (editingGrade && editingGrade.id === deletingId) {
      setEditingGrade(null);
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
      <GradeForm />
      
      <GradeTable 
        grades={grades} 
        students={students}
        courses={courses}
        onEdit={handleEditGrade}
        onDelete={(id) => setDeletingId(id)}
      />

      {editingGrade && (
        <Modal title="Edit Grade" onClose={handleCancelEdit}>
          <GradeForm 
            editingGrade={editingGrade} 
            onCancel={handleCancelEdit} 
          />
        </Modal>
      )}

      {deletingId && (
        <ConfirmModal
          title="Delete Grade"
          message="Are you sure you want to delete this grade record?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}

export default GradesPage;
