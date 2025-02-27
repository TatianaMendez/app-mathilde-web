import React, { useRef, useState, useEffect } from 'react';
import VisualStart from '@components/organisms/visualStart';
import '@styles/styleAtoms.css';
import InputForm from '@components/molecules/input/inputForm';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '~/services/codeOTPService'; 
import { useAuth } from '~/services/autenticationService';

const ValidationPass: React.FC = () => {
  const { login } = useAuth();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/'); 

  
  useEffect(() => {
    const currentPath = sessionStorage.getItem('previousPath') || '/';
    console.log('Previous path:', currentPath);
    
    if (currentPath === '/') {
      setRedirectPath('/reset');
    } else if (currentPath === '/register') {
      setRedirectPath('/dashboard');
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    } else {
      e.target.value = '';
    }

    if (index === inputsRef.current.length - 1 && value) {
      const otp = inputsRef.current.map(input => input?.value).join('');
      console.log('OTP ingresado:', otp);
      handleVerifyOtp(Number(otp));
    }
  };

  const handleVerifyOtp = async (otp: number) => {
    setLoading(true); 
    setErrorMessage(''); 

    try {
      const response = await verifyOtp(otp);  
      if (response.success) {
        if(redirectPath === '/dashboard') {
          const email = sessionStorage.getItem('email');  
          const password = sessionStorage.getItem('password');
          // login(email, password);  
          login('admin@avaldigitallabs.com', '123');
        } else {
          navigate(redirectPath); 
        }
      } else {
        setErrorMessage('El código OTP ingresado es incorrecto. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al verificar OTP:', error);
      setErrorMessage('Ocurrió un error al verificar el OTP. Intenta nuevamente más tarde.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <div className='w-2/4 border-container'>
        <VisualStart />
      </div>
      <div className="w-2/4">
        <form className="w-3/5 px-10 bg-white mx-auto rounded-lg flex flex-col justify-center h-full">
          <p className="text-2xl text-center mb-6">
            Hemos enviado un código OTP al correo electrónico registrado para activar tu cuenta.
          </p>
          <div className='flex w-full justify-evenly'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div className='w-14' key={index}>
                <InputForm
                  type='text'
                  classInclude='mth-input-code'
                  maxLength={1}
                  onChange={(e) => handleInput(e, index)} 
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                />
              </div>
            ))}
          </div>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {loading && <p className="text-blue-500 text-center">Verificando OTP...</p>} 

        </form>
      </div>
    </div>
  );
};

export default ValidationPass;
