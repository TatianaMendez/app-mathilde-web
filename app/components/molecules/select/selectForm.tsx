import React, { forwardRef } from 'react';
import type { SelectFormProps } from './selectForm.types';

const SelectForm = forwardRef<HTMLSelectElement, SelectFormProps>(({
  options,
  label,
  error,
  value, 
  onChange,
  ...rest
}, ref) => {
  return (
    <div className="mb-5">
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      
      <select
        ref={ref}
        className="w-full p-2 border rounded"
        value={value} 
        onChange={onChange} 
        {...rest}
      >
        <option disabled value="">
          Seleccione una opción
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

SelectForm.displayName = 'SelectForm';

export default SelectForm;
