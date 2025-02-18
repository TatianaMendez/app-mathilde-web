import React from 'react';
import VisualStart from '@components/organisms/visualStart';
import '@styles/styleAtoms.css';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '~/components/molecules/input/passwordInput';
import usePasswordValidation from '~/hooks/usePasswordValidation';
import ButtonFormat from '~/components/molecules/button/buttonFormat';

const ResetPass: React.FC = () => {
  const navigate = useNavigate(); 

  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showError,
  } = usePasswordValidation();
  
  const handleClickTo = () => {
    console.log('Botón clickeado!');
    navigate('/'); 
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <div className='w-2/4 border-container'>
        <VisualStart />
      </div>
      <div className="w-2/4">
        <form className="w-3/5 px-10 bg-white mx-auto rounded-lg flex flex-col justify-center h-full">
          <p className="text-2xl text-center mb-6">Crea una nueva contraseña para ingresar a la plataforma.</p>
          <div className='flex w-full mb-5'>
              <PasswordInput 
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div className="flex">
              <PasswordInput 
                placeholder='Confirmar contraseña'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
          </div>
              {
                showError() && (
                  <div className="mth-msg">
                    <label>Las contraseñas no coinciden.</label>
                  </div>
                )
              }
          <div className='flex mt-3'>
            <ButtonFormat txtBtn={'Confirmar'} typeButton={'default'} full={true} type={'button'} onClick={handleClickTo}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
