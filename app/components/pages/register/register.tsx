import React, { useState, useRef } from 'react';
import InputForm from '@components/molecules/input/inputForm';
import SelectForm from '@components/molecules/select/selectForm';
import ButtonFormat from '@components/molecules/button/buttonFormat';
import TermsCheckbox from '@components/molecules/checkbox/termsCheckbox';
import VisualStart from '@components/organisms/visualStart';
import { RegisterFormService } from '~/domain/register-form/RegisterFormService';
import '@styles/styleAtoms.css';
import { Link } from 'react-router-dom';
import PasswordInput from '~/components/molecules/input/passwordInput';
import usePasswordValidation from '~/hooks/ usePasswordValidation';
import ModalFormat from '~/components/organisms/modal/modalFormat';

const RegisterForm: React.FC = () => {
  const { roles } = RegisterFormService;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showError,
  } = usePasswordValidation();

  const toggleModal = (forceClose = false ) => {
    setIsModalOpen((_prev)  => {
      if(_prev == true && !forceClose){
        setTermsAccepted(false);
      }
      return !_prev;
    });
  };

  const handleScroll = () => {
    if (modalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !buttonEnabled) {
        setButtonEnabled(true);
      }
    }
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    toggleModal(true); 
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
              <PasswordInput 
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='w-2/3 ml-2'>
              <PasswordInput 
                placeholder='Confirmar contraseña'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        
          {
            showError() && (
              <div className="mth-msg">
                <label>Las contraseñas no coinciden.</label>
              </div>
            )
          }

          <div className='flex mt-5'>
            <TermsCheckbox 
              label={'Acepto los términos y condiciones de la plataforma y la política de privacidad.'}
              checked={termsAccepted} 
              onOpenModal={toggleModal} 
              onChange={setTermsAccepted} 
            />
          </div> 

          <div className='flex justify-end'>
            <Link to="/" className="mr-2 flex items-center" >Cancelar</Link>
            <ButtonFormat txtBtn={'Continuar'} type={'default'} full={false} label={''} 
            disabled={false} className={''} />
          </div>
        </form>

        <ModalFormat isOpen={isModalOpen} onClose={toggleModal}>
          <div ref={modalRef} onScroll={handleScroll} style={{ maxHeight: '70vh', overflowY: 'auto', padding: '20px' }} >
            <h2><b>Términos de Uso de la plataforma Mathilde Ads</b></h2><br/>
            <ul>
              <strong> 1. Definiciones y Alcance General </strong> <br/>
              <ol>
                El uso de los términos "nosotros" y "nos" en este documento significa acciones realizadas
                por Mathilde Ads. El uso del término "Sitio" significa el sitio web mathilde-ads.com. "Cuenta"
                es una cuenta registrada de un anunciante o editor de un sitio web en el sitio Mathilde Ads.
                El uso del término "Términos" significa los términos y condiciones que se describen a continuación.
                "Contenido”: datos, texto, imágenes, sonido, video y otra información y materiales.
                "Información de derechos de autor": el contenido, la organización, los gráficos, el diseño,
                la compilación y otros asuntos relacionados con Mathilde Ads y el Sitio. "Marcas comerciales":
                todas las marcas comerciales, marcas de servicio, logotipos, nombres comerciales y cualquier otra
                designación de propiedad de Mathilde Ads. Mathilde Ads proporcionará a los anunciantes y editores
                de sitios web acceso al Sitio, donde pueden comprar y vender anuncios. Al utilizar el Sitio o al crear
                una Cuenta, acepta cumplir y estar sujeto a estos Términos de uso. Lea estos Términos detenidamente
                antes de registrarse para obtener una cuenta. Si no está de acuerdo con los Términos, no debe
                utilizar este Sitio ni crear una Cuenta. Estos términos están sujetos a cambios en cualquier
                momento con un aviso previo de 7 días hábiles al socio. El usuario es responsable de revisar los términos
                de este Acuerdo de vez en cuando para asegurarse de que continúa aceptando sus términos y cualquier
                cambio aplicable. Su uso continuado del Sitio constituye su aceptación de los nuevos Términos de uso.
              </ol><br/>
              <strong> 2. Cuenta </strong> <br/>
              <ol>
                Tras la ejecución de los términos, todos los anunciantes y editores de sitios web crearán una Cuenta única protegida por contraseña. Al crear una Cuenta, el usuario declara y garantiza que tiene al menos 18 años de edad y que posee el derecho legal y la capacidad de aceptar y estar sujeto a estos Términos. El usuario acepta ser financieramente responsable de su Cuenta y cumplir con sus responsabilidades y obligaciones según se establece en estos Términos y en cualquier política o procedimiento publicado en el Sitio, incluidos, entre otros, los relativos a depósitos de fondos, retiros de cuentas, métodos de pago, y reembolsos. Para registrar una cuenta, se le pedirá que envíe una dirección de correo electrónico y una contraseña y que proporcione información de contacto y facturación. El usuario acepta que no seleccionará ni utilizará a sabiendas la dirección de correo electrónico de otra persona ni se hará pasar por otra parte, ni utilizará una dirección de correo electrónico que Mathilde Ads pueda considerar inapropiada u ofensiva. Mathilde Ads puede negarse a permitirle utilizar un nombre de cuenta o una dirección de correo electrónico específicos por cualquier motivo. El usuario es responsable de salvaguardar y mantener la confidencialidad de la cuenta / información de contacto y la contraseña asociada. El usuario es totalmente responsable de la exactitud de su información y de mantenerla actualizada; El no hacerlo constituirá un incumplimiento de estos Términos y Mathilde Ads se reserva el derecho de cancelar su Cuenta. Debe notificar inmediatamente a Mathilde Ads sobre cualquier uso no autorizado de la Cuenta o cualquier otra violación de seguridad de la que tenga conocimiento. El usuario acepta que será responsable de cualquier actividad realizada por cualquier persona que utilice el Sitio con su Cuenta.
              </ol>
            </ul>
          </div>
          <div className='flex justify-center'>
            <ButtonFormat 
              txtBtn={'Acepto'} 
              type={'default'} 
              full={false} 
              disabled={!buttonEnabled} 
              onClick={handleAcceptTerms} 
            />
          </div>
          </ModalFormat>
      </div>
    </div>
  );
};

export default RegisterForm;
