import axios from 'axios';

const postRequest = async (url: string, data: object) => {
  try {
    const response = await axios.post(url, data);
    return response.data; 
  } catch (error) {
    console.error(`Error en la solicitud a ${url}:`, error);
    throw error; 
  }
};

// Función específica para enviar el OTP
export const sendOtp = async (email: string) => {
  return postRequest('/api/send-otp', { email });
};

// Función específica para verificar el OTP
export const verifyOtp = async (code: number) => {
  return postRequest('http://ec2-54-145-77-26.compute-1.amazonaws.com/castlemock/mock/rest/project/nIVSsr/application/YPlsJX/reset', { code });
};
