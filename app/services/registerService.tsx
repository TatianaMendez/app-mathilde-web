import axios from 'axios';
import type { optionSelect } from "@components/molecules/select/optionSelect";
// import Swal from 'sweetalert2';

const API_URL = 'http://ec2-54-145-77-26.compute-1.amazonaws.com/castlemock/mock/rest/project/nIVSsr/application/YPlsJX/register';

export const registerUser = async (userData: { formRegister: any }) => {
  console.log(userData); 
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
};


export const RegisterFormService = {
  roles: [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Gestor de campañas', label: 'Gestor de campañas' },
    { value: 'Analista', label: 'Analista' },
    { value: 'Creativo', label: 'Creativo' },
  ] as optionSelect[],

  getRoles() {
    return this.roles;
  }
};

