import { useSelector } from "react-redux";
import {
  selectStudentCount,
  selectAverageGpa,
  selectHighAchievers,
} from "../features/students/selectors";

function GpaSummary() {
  // Each useSelector is independent - only re-renders if its value changes
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
