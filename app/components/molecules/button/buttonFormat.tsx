import React from 'react';
import styles from './button.module.css'; 

interface ButtonFormatProps {
  txtBtn: string;
  type: string;
  full: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void; 
}

const ButtonFormat: React.FC<ButtonFormatProps> = ({ txtBtn, type, full, onClick, disabled }) => {
  return (
    <div className={`${full ? styles['mth-btn-full'] : ''}`}>
      <button 
        type="button"
        className={`${styles['mth-btn']} ${styles[`mth-btn-${type}`]} ${full ? styles['mth-btn-full'] : ''}`}
        onClick={onClick} 
        disabled={disabled} 
      >
        {txtBtn}
      </button>
    </div>
  );
};

export default ButtonFormat;
