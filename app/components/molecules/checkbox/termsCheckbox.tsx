import React from 'react';
import styles from './checkbox.module.css';

interface TermsCheckboxProps {
  onOpenModal: () => void;
  checked: boolean;
  onChange: (accepted: boolean) => void;
  label?: string;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ onOpenModal, checked, onChange, label, ...props }) => {

  const handleCheckboxChange = () => {
    if (!checked) {
      onOpenModal(); 
    }
    onChange(false);
  };


  return (
    <div className="mb-5">
      <label className={styles['checkbox-container']}>
        {/* Pasamos todas las props al input */}
        <input
          type="checkbox"
          {...props}
          checked={checked}
          onChange={handleCheckboxChange}
          required
        />
        <span className={styles['checkmark']}></span>

        {/* Si hay label, la renderizamos (puede ser "Acepto términos", etc.) */}
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

export default TermsCheckbox;
