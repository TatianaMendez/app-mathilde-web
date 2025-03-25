import * as Yup from 'yup';

const updateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  firtsName: Yup.string()
    .required('Los apellidos son obligatorios')
    .min(2, 'Los apellidos deben tener al menos 2 caracteres'),
  company: Yup.string()
    .required('La empresa es obligatoria'),
  role: Yup.string()
    .required('El rol es obligatorio'),
  phone: Yup.number()
    .required('El número de celular es obligatorio')
    .min(10, 'El número debe tener al menos 10 dígitos')
    // .max(10, 'El número no debe exceder 10 dígitos'),
});

export default updateUserSchema;