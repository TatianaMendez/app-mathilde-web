import React from 'react';
import { LayoutOutside, ButtonFormat, ValidationPassword } from 'ui-mathilde-web';
import { useNavigate } from 'react-router-dom';
// QUITAR COMPONENTE VALIDATION PASSWORD
import { Formik, Form } from 'formik';
import resetPasswordSchema from '@schema/passwordSchema';

interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

const ResetPass: React.FC = () => {
  const navigate = useNavigate();   

  const handleSubmit = async (values: ResetPasswordValues) => {
    try {
      console.log('Valores del formulario:', values);
      // Aquí puedes agregar tu lógica para enviar la nueva contraseña al servidor
      navigate('/'); 
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <div className='w-2/4 border-container'>
        <LayoutOutside />
      </div>
      <div className="w-2/4">
        <Formik
          initialValues={{
            password: '',
            confirmPassword: ''
          }}
          validationSchema={resetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="w-3/5 px-10 bg-white mx-auto rounded-lg flex flex-col justify-center h-full">
              <p className="text-2xl text-center mb-6">
                Crea una nueva contraseña para ingresar a la plataforma.
              </p>
              <ValidationPassword formik={formikProps} />
              <div className='flex mt-3'>
                <ButtonFormat 
                  txtBtn={'Confirmar'} 
                  typeButton={'default'} 
                  full={true} 
                  type={'submit'}
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPass;
