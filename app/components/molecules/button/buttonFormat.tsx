import React from 'react';
import styles from './button.module.css'; 

interface ButtonFormatProps {
  txtBtn: string;
  type: string;
  full: boolean;
  onClick?: () => void; 
}

const ButtonFormat: React.FC<ButtonFormatProps> = ({ txtBtn, type, full, onClick }) => {
  return (
    <div className={`${full ? styles['mth-btn-full'] : ''}`}>
      <button 
        className={`${styles['mth-btn']} ${styles[`mth-btn-${type}`]} ${full ? styles['mth-btn-full'] : ''}`}
        onClick={onClick} 
        >
        {txtBtn}
      </button>
    </div>
  );
};

export default ButtonFormat;
