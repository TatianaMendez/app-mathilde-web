import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '@components/molecules/input/inputForm';
import ButtonFormat from '@components/molecules/button/buttonFormat';
import VisualStart from '@components/organisms/visualStart';
import ModalFormat from '@components/organisms/modal/modalFormat';
import '@styles/styleAtoms.css';
import PasswordInput from '@components/molecules/input/passwordInput';
import { useAuth } from '~/services/autenticationService';
// import { useAuth } from '~/services/authService';
import LoginRedirect from '../dsp';
// import { AuthorizationService } from '~/services/authorizationService';
import { Formik, Form } from 'formik';
import { loginValidationSchema, forgotPasswordValidationSchema } from '~/validations/loginValidations';

const LoginForm: React.FC = () => {

  // useEffect(() => {
  //   const handleLogin = async () => {
  //     const token = await AuthorizationService.authenticate();
  //    if (token) {
  //       if (token.token) {
  //        AuthorizationService.setToken(token.token);
  //       }
  //     } else {
  //       console.error('No se pudo obtener el token');
  //     }
  //   };

  //   handleLogin();
  // }, []);

  const { login } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values.username, values.password);
  };

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleClick = () => {
    // Servicio para enviar correo de cambio de contraseña 
    // alert(email);
    sessionStorage.setItem('previousPath', window.location.pathname);
    navigate('/validation'); 
  };

  const forgotPasswordInitialValues = {
    email: '',
  };

  const handleForgotPassword = (values: { email: string }) => {
    setEmail(values.email);
    handleClick();
  };

  return (
    <div className="min-h-screen flex w-full">
      <div className='w-2/4 border-container'>
        <VisualStart />
      </div>
      <div className="w-2/4 flex items-center ">

        <div className="w-9/12 px-10 bg-white mx-auto rounded-lg flex flex-col item-center">
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                <h2 className="text-2xl text-center font-medium mb-6">INICIAR SESIÓN</h2>
                <div className='flex justify-between'>
                  <div className='w-full'>
                    <InputForm
                      name="username"
                      type="email"
                      placeholder="Correo electrónico"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.username && touched.username && (
                      <div className="text-red-500 text-sm my-2">{errors.username}</div>
                    )}
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='w-full'>
                    <PasswordInput
                      name="password"
                      placeholder="Contraseña"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm my-2">{errors.password}</div>
                    )}
                  </div>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm underline text-gray-600 cursor-pointer' onClick={toggleModal}>
                    Olvidaste la contraseña
                  </span>
                </div>
                <div className='flex justify-end my-3'>
                  <ButtonFormat
                    txtBtn={'Continuar'}
                    typeButton={'default'}
                    full={true}
                    type={'submit'}
                    disabled={false}
                    className={''}
                  />
                </div>
              </Form>
            )}
          </Formik>
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
            <span className='font-medium text-base cursor-pointer underline'><Link to="/register">Regístrate</Link></span>
          </div>
        </div>

        <ModalFormat width="40%" isOpen={isModalOpen} onClose={toggleModal}>
          <div className='pt-6'>
            <p>Si deseas cambiar tu contraseña ingresa el <b>correo eléctronico</b> registrado en la plataforma.</p>
            <Formik
              initialValues={forgotPasswordInitialValues}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={handleForgotPassword}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                  <div className='w-full my-3'>
                    <InputForm
                      name="email"
                      type="email"
                      placeholder="Correo electronico"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm my-2">{errors.email}</div>
                    )}
                  </div>
                  <div className='flex justify-end'>
                    <ButtonFormat
                      txtBtn={'Continuar'}
                      typeButton={'default'}
                      full={false}
                      type={'submit'}
                      disabled={false}
                      className={''}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </ModalFormat>
      </div>
    </div>
  );
};

export default LoginForm;
