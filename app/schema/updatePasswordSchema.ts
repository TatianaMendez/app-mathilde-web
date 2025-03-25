import * as Yup from 'yup';

const updatePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('La contraseña actual es obligatoria'),
  password: Yup.string()
    .required('La nueva contraseña es obligatoria')
    .min(8, 'Debe tener al menos 8 caracteres')
    .matches(/\d/, 'Debe contener al menos un número')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una minúscula')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Debe contener al menos un carácter especial'),
  confirmPassword: Yup.string()
    .required('Confirma tu contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
});

export default updatePasswordSchema;