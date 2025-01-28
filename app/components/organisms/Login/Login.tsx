import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '@components/molecules/input/inputForm';
import ButtonFormat from '@components/molecules/button/buttonFormat';
import VisualStart from '@components/organisms/visualStart';
import ModalFormat from '@components/organisms/modal/modalFormat';
import '@styles/styleAtoms.css';
import PasswordInput from '~/components/molecules/input/passwordInput';

const LoginForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleClick = () => {
    console.log('Botón clickeado!');
    navigate('/validation'); 
  };

  return (
    <div className="min-h-screen flex w-full">
      <div className='w-2/4 border-container'>
        <VisualStart />
      </div>
      <div className="w-2/4">
        <form className="w-9/12 px-10 bg-white mt-28 mx-auto rounded-lg">
          <h2 className="text-2xl text-center mb-6">INICIAR SESIÓN</h2>
          <div className='flex justify-between'>
            <div className='w-full'>
              <InputForm type='email' placeholder='Correo electronico' />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='w-full'>
              <PasswordInput placeholder='Contraseña'/>
            </div>
          </div>
          <div className='flex justify-between'>
            <button type="button" className='mt-3' onClick={toggleModal}>Olvide la contraseña</button>
          </div>
          <div className='flex justify-end my-3'>
            <ButtonFormat txtBtn={'Continuar'} type={'default'} full={true} label={''} disabled={false} className={''} />
          </div>
          <div className="flex items-center">
            <hr className="mth-line mr-0.5"/><p> o </p><hr className="mth-line ml-0.5" />
          </div>
          <div className='flex justify-end mt-3'>
            <ButtonFormat txtBtn={'Continuar con Google'} type={'border'} full={true} label={''} disabled={false} className={''} />
          </div>
          <div className='flex justify-end my-3'>
            <ButtonFormat txtBtn={'Continuar con Microsoft'} type={'border'} full={true} label={''} disabled={false} className={''} />
          </div>
          <div className='flex'>
            <p>¿Aún no tienes una cuenta de Mathilde Ads? &nbsp; </p> 
            <p className='font-bold'><Link to="/register">Regístrate</Link></p>
          </div>
        </form>

        <ModalFormat isOpen={isModalOpen} onClose={toggleModal}>
          <p>Si deseas cambiar tu contraseña ingresa el <b>correo eléctronico</b> registrado en la plataforma.</p>
          <div className='w-full my-3'>
            <InputForm type='email' placeholder='Correo electronico' />
          </div>
          <div className='flex justify-end'>
            <ButtonFormat txtBtn={'Continuar'} type={'default'} full={false} onClick={handleClick} label={''} disabled={false} className={''}/>
          </div>
        </ModalFormat>
      </div>
    </div>
  );
};

export default LoginForm;
