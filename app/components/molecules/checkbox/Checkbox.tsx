import React from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps {
  label?: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, checked, onChange }) => {
  return (
    <label className={styles['checkbox-container']}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles['checkmark']}></span>
      {label && <span className="ml-2">{label}</span>}
    </label>
  );
};

export default Checkbox; 