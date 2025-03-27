import React, { useRef, useState, useEffect } from 'react';
import { LayoutOutside, InputForm } from 'ui-mathilde-web';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '@services/codeOTPService'; 
import { useAuth } from '@services/autenticationService';
// import { useAuth } from '~/services/authService';

const ValidationPass: React.FC = () => {
  const { login } = useAuth();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/'); 
  //Timer para reenviar el código
  const [timeLeft, setTimeLeft] = useState(60); 
  const [isActive, setIsActive] = useState(true);

  
  useEffect(() => {
    const currentPath = sessionStorage.getItem('previousPath') || '/';
    console.log('Previous path:', currentPath);
    
    if (currentPath === '/') {
      setRedirectPath('/reset');
    } else if (currentPath === '/register') {
      setRedirectPath('/dashboard');
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeLeft, isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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

  const handleResendCode = () => {
    // Aquí lógica para reenviar el código
    setTimeLeft(60);
    setIsActive(true);
  };

  return (
    <div className="min-h-screen flex w-full">
      <div className='w-2/4 border-container'>
        <LayoutOutside />
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
                  classInclude='mth-input-code text-center'
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

          <div className='flex justify-between'>
            {isActive ? (
              <span className="text-sm underline text-gray-600 cursor-pointer">
                {formatTime(timeLeft)} para solicitar un nuevo código
              </span>
            ) : (
              <button
                onClick={handleResendCode}
                className="text-sm underline text-gray-600 cursor-pointer"
              >
                Reenviar código
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValidationPass;
