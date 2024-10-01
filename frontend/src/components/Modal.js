import React from 'react';
import './Modal.css'; // Optional: import a CSS file for modal styles

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times; {/* Close button (X) */}
          </button>
        </div>
        <div className="modal-body">
          {children} {/* Content inside the modal */}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-close-footer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
