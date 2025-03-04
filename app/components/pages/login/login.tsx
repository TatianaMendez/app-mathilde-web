import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '@components/molecules/input/inputForm';
import ButtonFormat from '@components/molecules/button/buttonFormat';
import VisualStart from '@components/organisms/visualStart';
import ModalFormat from '@components/organisms/modal/modalFormat';
import '@styles/styleAtoms.css';
import PasswordInput from '@components/molecules/input/passwordInput';
import { useAuth } from '@services/autenticationService';
import LoginRedirect from '../dsp';

const LoginForm: React.FC = () => {

  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      console.log(username, password);
      login(username, password);
  };


  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleClick = () => {
    // Servicio para enviar correo de cambio de contraseña 
    alert(email);
    sessionStorage.setItem('previousPath', window.location.pathname);
    navigate('/validation'); 
  };

  return (
    <div className="min-h-screen flex w-full">
      <div className='w-2/4 border-container'>
        <VisualStart />
      </div>
      <div className="w-2/4 flex items-center ">

        <div className="w-9/12 px-10 bg-white mx-auto rounded-lg flex flex-col item-center">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl text-center mb-6">INICIAR SESIÓN</h2>
              <div className='flex justify-between'>
                <div className='w-full'>
                  <InputForm type='email' value={username}
                    onChange={(e) => setUsername(e.target.value)} placeholder='Correo electronico' required/>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='w-full'>
                  <PasswordInput value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' required/>
                </div>
              </div>
              <div className='flex justify-between'>
                <span className='mt-3 cursor-pointer' onClick={toggleModal}>Olvidaste la contraseña</span>
              </div>
              <div className='flex justify-end my-3'>
                <ButtonFormat txtBtn={'Continuar'} typeButton={'default'} full={true} type={'submit'} disabled={false} className={''} />
              </div>
            </form>
            {/* <div className="flex items-center">
              <hr className="mth-line mr-0.5"/><p> o </p><hr className="mth-line ml-0.5" />
            </div>
            <div className='flex justify-end mt-3'>
              <ButtonFormat txtBtn={'Continuar con Google'} typeButton={'border'} full={true} type={'button'} disabled={false} className={''} />
            </div>
            <div className='flex justify-end my-3'>
              <ButtonFormat txtBtn={'Continuar con Microsoft'} typeButton={'border'} full={true} type={'button'} disabled={false} className={''} />
            </div> */}
            {/* <LoginRedirect email="tatiana.mendez@avaldigitallabs.com" password="Chocorramo1974." /> */}

            <div className='flex'>
              <p>¿Aún no tienes una cuenta de Mathilde Ads? &nbsp; </p>
              <p className='font-bold'><Link to="/register">Regístrate</Link></p>
            </div>
        </div>

        <ModalFormat width="40%" isOpen={isModalOpen} onClose={toggleModal}>
          <p>Si deseas cambiar tu contraseña ingresa el <b>correo eléctronico</b> registrado en la plataforma.</p>
          <div className='w-full my-3'>
            <InputForm type='email' placeholder='Correo electronico' 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
              />
          </div>
          <div className='flex justify-end'>
            <ButtonFormat txtBtn={'Continuar'} typeButton={'default'} full={false} onClick={handleClick} type={'button'} label={''} disabled={false} className={''}/>
          </div>
        </ModalFormat>
      </div>
    </div>
  );
};

export default LoginForm;
