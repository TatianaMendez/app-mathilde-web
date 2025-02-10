import React from 'react';
import styles from './button.module.css'; 

interface ButtonFormatProps {
  txtBtn: string;
  typeButton: string;
  full: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
  type: string;
  onClick?: () => void; 
}

const ButtonFormat: React.FC<ButtonFormatProps> = ({ txtBtn, typeButton, full, onClick, disabled, type}) => {
  return (
    <div className={`${full ? styles['mth-btn-full'] : ''}`}>
      <button 
        type={type as "submit" | "reset" | "button"}
        className={`${styles['mth-btn']} ${styles[`mth-btn-${typeButton}`]} ${full ? styles['mth-btn-full'] : ''}`}
        onClick={onClick} 
        disabled={disabled} 
      >
        {txtBtn}
      </button>
    </div>
  );
};

export default ButtonFormat;
