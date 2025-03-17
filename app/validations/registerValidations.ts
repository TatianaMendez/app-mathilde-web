import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  firtsName: Yup.string()
    .required("El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  company: Yup.string()
    .required("La empresa es requerida")
    .min(2, "El nombre de la empresa debe tener al menos 2 caracteres"),
  phone: Yup.string()
    .required("El teléfono es requerido")
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(10, "El teléfono debe tener al menos 10 dígitos"),
  role: Yup.string()
    .required("El rol es requerido"),
  email: Yup.string()
    .required("El correo electrónico es requerido")
    .email("Correo electrónico inválido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: Yup.string()
    .required("Confirmar contraseña es requerido")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
}); 