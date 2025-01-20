import React from 'react';
import type { optionSelect } from '../../../domain/register-form/model/optionSelect';

const SelectForm = ({options} : {options:optionSelect[]}) => {
  return (
    <div className="mb-5">
      <select className="w-full p-2 border rounded" defaultValue="">
        <option disabled value="">Seleccione un rol</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
