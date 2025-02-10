import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import style from './passwordInput.module.css';

interface PasswordInputProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  value?: string; 
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, onChange, value }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='w-full relative inline-block'>
      <input
        type={showPassword ? 'text' : 'password'}
        value={value} 
        className='w-full pr-10 p-2 border'
        onChange={onChange} 
        placeholder={placeholder}
      />
      <button 
        type="button"
        onClick={togglePasswordVisibility}
        className={style['mth-password']}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
