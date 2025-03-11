import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import style from './passwordInput.module.css';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  value?: string; 
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, onChange, value, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-5">
      <div className='w-full relative inline-block'>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value} 
          className='w-full pr-10 p-2 border'
          onChange={onChange} 
          placeholder={placeholder}
          {...props} 
        />
        <button 
          type="button"
          onClick={togglePasswordVisibility}
          className={style['mth-password']}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
