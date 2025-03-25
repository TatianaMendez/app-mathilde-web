export interface ValidationListProps {
    validations: {
      hasMinLength: boolean;
      hasNumber: boolean;
      hasUpperCase: boolean;
      hasLowerCase: boolean;
      hasSpecialChar: boolean;
    };
  }