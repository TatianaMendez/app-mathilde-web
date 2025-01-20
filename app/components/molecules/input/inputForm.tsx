import React from 'react';
import type { InputFormProps } from '../../../domain/register-form/model/inputForm';

const InputForm: React.FC<InputFormProps> = ({ placeholder, type, value, onChange, classInclude, min, max }) => {
  return (
    <div className="mb-5">
      <input 
        type={type} 
        value={value}
        onChange={onChange} 
        className={`${classInclude ? classInclude : ''} w-full p-2 border rounded`} 
        placeholder={placeholder} 
        required 
        {...(type === 'number' ? { min, max } : {})} 
      />
    </div>
  );
};

export default InputForm;
