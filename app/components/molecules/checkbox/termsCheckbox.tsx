import React from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
interface TermsCheckboxProps {
  onOpenModal: () => void;
  checked: boolean;
  onChange: (accepted: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ onOpenModal, checked, onChange }) => {
  const handleCheckboxChange = () => {
    if (!checked) {
      onOpenModal(); 
    }
    onChange(!checked);
  };

/**
 * Checkbox que funciona con React Hook Form, recibiendo onChange, value, etc. vía props.
 */
const TermsCheckbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
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
        {label && <span className="ml-2">{label}</span>}
      </label>
    </div>
  );
};

export default TermsCheckbox;
