import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  InputForm,
  ButtonFormat,
  ModalFormat,
  PasswordInput,
  LayoutOutside,
} from 'ui-mathilde-web';
import { useAuth } from '@services/autenticationService';
import { Formik, Form } from 'formik';
import { loginValidationSchema, forgotPasswordValidationSchema } from '@schema/loginSchema';

const LoginForm: React.FC = () => {
  const { handleLogin } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values: { username: string; password: string }) => {
    handleLogin(values.username, values.password);
  };

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleClick = () => {
    // Servicio para enviar correo de cambio de contraseña
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
      <div className="w-2/4 border-container">
        <LayoutOutside data-testid="layout-outside" />
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
                <div className="flex justify-between">
                  <div className="w-full">
                    <InputForm
                      name="username"
                      type="email"
                      placeholder="Correo electrónico"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-testid="input-username"
                    />
                    {errors.username && touched.username && (
                      <div className="text-red-500 text-sm my-2">{errors.username}</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-full">
                    <PasswordInput
                      name="password"
                      placeholder="Contraseña"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-testid="password-password"
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm my-2">{errors.password}</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span
                    className="text-sm underline text-gray-600 cursor-pointer"
                    onClick={toggleModal}
                  >
                    Olvidaste la contraseña
                  </span>
                </div>
                <div className="flex justify-end my-3">
                  <ButtonFormat
                    txtBtn={'Continuar'}
                    typeButton={'default'}
                    full={true}
                    type={'submit'}
                    disabled={false}
                    data-testid="button-Continuar"
                  />
                </div>
              </Form>
            )}
          </Formik>

          <div className="flex">
            <p>¿Aún no tienes una cuenta de Mathilde Ads? &nbsp; </p>
            <span className="font-medium text-base cursor-pointer underline">
              <Link to="/register">Regístrate</Link>
            </span>
          </div>
        </div>

        <ModalFormat width="40%" isOpen={isModalOpen} onClose={toggleModal} data-testid="modal">
          <div className="pt-6">
            <p>
              Si deseas cambiar tu contraseña ingresa el <b>correo eléctronico</b> registrado en la
              plataforma.
            </p>
            <Formik
              initialValues={forgotPasswordInitialValues}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={handleForgotPassword}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                  <div className="w-full my-3">
                    <InputForm
                      name="email"
                      type="email"
                      placeholder="Correo electronico"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      data-testid="input-email"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm my-2">{errors.email}</div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <ButtonFormat
                      txtBtn={'Continuar'}
                      typeButton={'default'}
                      full={false}
                      type={'submit'}
                      disabled={false}
                      className={''}
                      data-testid="button-Continuar-modal"
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