import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
  password: Yup.string()
    .required('La contraseña es requerida'),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
}); 