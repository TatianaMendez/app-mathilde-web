import axios from 'axios';
export interface optionSelect {
  value: string;
  label: string;
}

const API_URL = 'https://mthmocks.pruebasmathilde.com/castlemock/mock/rest/project/nIVSsr/application/YPlsJX/register';

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

