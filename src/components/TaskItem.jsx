import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleEdit() {
    if (isEditing) {
      if (editText.trim() !== "") {
        onEdit(task.id, editText);
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  }

  return (
    <li className={`task-item${task.completed ? " completed" : ""}`}>
      <div className="task-content">
        <label className="task-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          {!isEditing ? (
            <span>{task.text}</span>
          ) : (
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          )}
        </label>
      </div>
      <div className="task-actions">
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? "💾" : "✎"}
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          ✕
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
