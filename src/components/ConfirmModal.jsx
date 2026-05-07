function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn-delete">Delete</button>
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
