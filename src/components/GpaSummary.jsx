import { useSelector } from "react-redux";
import { 
  selectAverageGpa, 
  selectHighAchievers,
  selectStudentCount
} from "../features/students/selectors";
import { useGetStudentsQuery } from "../features/students/studentsApi";

function GpaSummary() {
  // Initiates the query and provides the data to the cache
  useGetStudentsQuery();
  
  const count = useSelector(selectStudentCount);
  const avgGpa = useSelector(selectAverageGpa);
  const highList = useSelector(selectHighAchievers);

  return (
    <div className="gpa-summary">
      <div className="stat-card">
        <span className="stat-label">Total Students</span>
        <span className="stat-value">{count}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Average GPA</span>
        <span className="stat-value">{avgGpa}</span>
      </div>
      <div className="stat-card highlight">
        <span className="stat-label">High Achievers (≥3.5)</span>
        <span className="stat-value">{highList.length}</span>
      </div>
    </div>
  );
}

export default GpaSummary;
