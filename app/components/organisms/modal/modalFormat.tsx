// components/Modal.tsx
import React from 'react';
import styles from './modal.module.css'; 
import type { ModalProps } from '../../../domain/login/model/modalFormat';

const ModalFormat: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalFormat;
