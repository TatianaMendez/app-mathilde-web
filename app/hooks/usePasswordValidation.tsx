// usePasswordValidation.js
import { useState } from 'react';

const usePasswordValidation = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isPasswordValid = () => {
    return password.trim() && confirmPassword.trim() && password === confirmPassword;
  };

  const showError = () => {
    return !isPasswordValid() && password.trim() && confirmPassword.trim();
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showError,
  };
};

export default usePasswordValidation;
