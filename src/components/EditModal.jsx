// src/components/EditModal.jsx - Session 3
import { useState } from 'react';

function EditModal({ student, onSave, onCancel }) {
  // Local copy of student data - what the user edits before saving
  const [form, setForm] = useState({ ...student });

  const onChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancel}>&times;</button>
        <h3>Edit Student</h3>
        <input name="name" value={form.name} onChange={onChange} placeholder="Full Name" />
        <input name="major" value={form.major} onChange={onChange} placeholder="Major" />
        <input name="gpa" value={form.gpa} onChange={onChange} type="number" step="0.01" placeholder="GPA" />
        <div className="modal-actions">
          <button onClick={() => onSave(form)}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
