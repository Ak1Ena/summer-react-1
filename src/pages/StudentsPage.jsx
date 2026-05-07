import StudentTable from '../components/StudentTable';
import GpaSummary from '../components/GpaSummary';
import AddStudentForm from '../components/AddStudentForm';

function StudentsPage() {
  // No hooks here - each component reads Redux directly with useSelector
  return (
    <div className="page-content">
      <GpaSummary />
      <AddStudentForm />
      <StudentTable />
    </div>
  );
}

export default StudentsPage;
