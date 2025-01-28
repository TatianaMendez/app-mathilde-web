import React, { useState } from 'react';
import InputForm from '@components/molecules/input/inputForm';
import SelectForm from '@components/molecules/select/selectForm';
import ButtonFormat from '@components/molecules/button/buttonFormat';
import TermsCheckbox from '@components/molecules/checkbox/termsCheckbox';
import VisualStart from '@components/organisms/visualStart';
import { RegisterFormService } from '../../../domain/register-form/RegisterFormService';
import '@styles/styleAtoms.css';
import { Link } from 'react-router-dom';


const RegisterForm: React.FC = () => {
  const { roles } = RegisterFormService;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const isPasswordValid = () => {
      return password.trim() && confirmPassword.trim() && password === confirmPassword;
    };
    
    const showError = () => {
      return !isPasswordValid() && password.trim() && confirmPassword.trim();
    };

  return (
    <div className="min-h-screen flex w-full">
      <div className='w-2/4 border-container'>
        <VisualStart />
      </div>
      <div className="w-2/4">
        <form className="w-9/12 px-10 bg-white mt-28 mx-auto rounded-lg">
          <h2 className="text-2xl mb-6">REGISTRO DE USUARIOS</h2>
          <p className='my-3'>Bienvenido a Mathilde, completa los datos y empieza a transformar tu estrategia digital.</p>
          <div className='flex justify-between'>
            <div className='w-2/4 mr-2'>
              <InputForm type='text' placeholder='Nombres'/>
            </div>
            <div className='w-2/4 ml-2'>
              <InputForm type='text' placeholder='Apellidos' />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='w-2/3 mr-2'>
              <InputForm type='text' placeholder='Empresa' />
            </div>
            <div className='w-2/3 ml-2'>
              <InputForm type='number' placeholder='Celular' />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='w-2/3 mr-2'>
              <SelectForm options={roles} />
            </div>
            <div className='w-2/3 ml-2'>
              <InputForm type='email' placeholder='Correo electronico' />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='w-2/3 mr-2'>
              <InputForm type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña' />
            </div>
            <div className='w-2/3 ml-2'>
              <InputForm type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirmar contraseña' />
            </div>
          </div>
        
              {
                showError() && (
                  <div className="mth-msg">
                    <label>Las contraseñas no coinciden.</label>
                  </div>
                )
              }
          
           <TermsCheckbox />

          <div className='flex justify-end'>
            <Link to="/" className="mr-2 flex items-center" >Cancelar</Link>
            <ButtonFormat txtBtn={'Continuar'} type={'default'} full={false} label={''} 
            disabled={false} className={''} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
