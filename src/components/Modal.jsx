function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        <button className="modal-close" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}

export default Modal;
