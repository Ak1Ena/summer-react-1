import { useState } from "react";
const EMPTY_FORM = { name: "", studentId: "", major: "", gpa: "" };
function AddStudentForm({ onAddStudent, onUpdateStudent, editingStudent, onCancelEdit }) {
	const [formData, setFormData] = useState(editingStudent ? {
		name: editingStudent.name,
		studentId: editingStudent.studentId,
		major: editingStudent.major,
		gpa: editingStudent.gpa.toString(),
	} : EMPTY_FORM);
	const [error, setError] = useState("");

	// Single handler for ALL inputs via computed property name
	function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}
	function handleSubmit(e) {
		e.preventDefault();
		// Validation
		if (!formData.name.trim() || !formData.studentId.trim()) {
			setError("Name and Student ID are required.");
			return;
		}
		const gpaNum = parseFloat(formData.gpa);
		if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
			setError("GPA must be a number between 0.0 and 4.0.");
			return;
		}

		if (editingStudent) {
			onUpdateStudent({
				...editingStudent,
				name: formData.name.trim(),
				studentId: formData.studentId.trim(),
				major: formData.major.trim() || "Undeclared",
				gpa: gpaNum,
			});
		} else {
			onAddStudent({
				id: Date.now(), // Temporary ID — Session 4 uses API-generated IDs
				name: formData.name.trim(),
				studentId: formData.studentId.trim(),
				major: formData.major.trim() || "Undeclared",
				gpa: gpaNum,
			});
		}
		setFormData(EMPTY_FORM); // Reset form after successful submit
		setError("");
	}
	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>{editingStudent ? "Edit Student" : "Add New Student"}</h3>
			{error && <p className="form-error">{error}</p>}
			<div className="form-row">
				<input
					name="name"
					placeholder="Full Name *"
					value={formData.name}
					onChange={handleChange}
				/>
				<input
					name="studentId"
					placeholder="Student ID *"
					value={formData.studentId}
					onChange={handleChange}
				/>
				<input
					name="major"
					placeholder="Major"
					value={formData.major}
					onChange={handleChange}
				/>
				<input
					name="gpa"
					placeholder="GPA (0.0–4.0)"
					value={formData.gpa}
					onChange={handleChange}
					type="number"
					step="0.01"
					min="0"
					max="4"
				/>
				<button type="submit" className="btn-primary">
					{editingStudent ? "Update Student" : "+ Add Student"}
				</button>
				{editingStudent && (
					<button type="button" className="btn-secondary" onClick={onCancelEdit}>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
}
export default AddStudentForm;
