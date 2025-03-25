import React from 'react';
import type { ValidationListProps } from './listValidationPassword.types';

const PasswordValidationList: React.FC<ValidationListProps> = ({ validations }) => {
  const ValidationIcon = ({ isValid }: { isValid: boolean }) => (
    <svg 
      className={`w-3.5 h-3.5 me-2 ${
        isValid 
          ? 'text-green-500 dark:text-green-400' 
          : 'text-gray-500 dark:text-gray-400'
      } shrink-0`} 
      aria-hidden="true" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
    </svg>
  );

  const validationRules = [
    { key: 'hasMinLength', text: 'Debe ser minimo de 8 caracteres' },
    { key: 'hasNumber', text: 'Debe tener minimo un numero' },
    { key: 'hasUpperCase', text: 'Debe tener minimo una letra mayuscula' },
    { key: 'hasLowerCase', text: 'Debe tener minimo una letra minuscula' },
    { key: 'hasSpecialChar', text: 'Debe tener minimo un caracter especial' }
  ] as const;

  return (
    <ul className="max-w-md text-sm mb-3 space-y-1 text-gray-500 list-inside dark:text-gray-400">
      {validationRules.map(({ key, text }) => (
        <li key={key} className="flex items-center">
          <ValidationIcon isValid={validations[key]} />
          {text}
        </li>
      ))}
    </ul>
  );
};

export default PasswordValidationList;
