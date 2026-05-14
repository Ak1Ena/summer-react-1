import { useState } from "react";
import { useAddStudentMutation } from "../features/students/studentsApi";

const EMPTY_FORM = { name: "", studentId: "", major: "", gpa: "" };

function AddStudentForm() {
  const [addStudent, { isLoading }] = useAddStudentMutation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addStudent({ ...form, gpa: parseFloat(form.gpa) || 0 }).unwrap();
      setForm(EMPTY_FORM);
      setError("");
    } catch (err) {
      setError(err?.data?.message || "Failed to add student");
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>
      {error && <p className="form-error">{error}</p>}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            id="studentId"
            name="studentId"
            placeholder="Student ID *"
            value={form.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="major">Major</label>
          <input
            id="major"
            name="major"
            placeholder="Major"
            value={form.major}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gpa">GPA</label>
          <input
            id="gpa"
            name="gpa"
            placeholder="GPA (0.0–4.0)"
            value={form.gpa}
            onChange={handleChange}
            type="number"
            step="0.01"
            min="0"
            max="4"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? "Adding..." : "+ Add Student"}
        </button>
      </div>
    </form>
  );
}

export default AddStudentForm;
