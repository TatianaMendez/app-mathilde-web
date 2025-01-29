// selectForm.tsx
import React, { forwardRef } from 'react';
import type { SelectFormProps } from '../../../domain/register-form/model/selectForm';

const SelectForm = forwardRef<HTMLSelectElement, SelectFormProps>(({
  options,
  label,
  error,
  ...rest
}, ref) => {
  return (
    <div className="mb-5">
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      
      <select
        ref={ref}
        className="w-full p-2 border rounded"
        {...rest}
        defaultValue=""
      >
        <option disabled  value="">
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
