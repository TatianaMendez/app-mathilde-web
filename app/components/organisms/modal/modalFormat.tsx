// components/Modal.tsx
import { forwardRef } from 'react';
import styles from './modal.module.css'; 
import type { ModalProps } from './modal.types';
import { IoIosCloseCircle } from "react-icons/io";

const ModalFormat = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, children, width = 'auto' }, ref) => {
    if (!isOpen) return null;

    return (
      <div className={styles.overlay}>
        <div ref={ref} className={styles.modal} style={{ width }}>
          <button onClick={onClose} className={styles.closeButton}>
            <IoIosCloseCircle />
          </button>
          {/* <div className='mt-6'>{children}</div> */}
          {children}
        </div>
      </div>
    );
  }
);

export default ModalFormat;
