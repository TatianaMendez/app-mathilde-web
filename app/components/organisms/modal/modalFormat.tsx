// components/Modal.tsx
import React, { forwardRef } from 'react';
import styles from './modal.module.css'; 
import type { ModalProps } from '../../../domain/login/model/modalFormat';

const ModalFormat = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, children }, ref) => {
    if (!isOpen) return null;

    return (
      <div className={styles.overlay}>
        <div ref={ref} className={styles.modal}>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  }
);

export default ModalFormat;
