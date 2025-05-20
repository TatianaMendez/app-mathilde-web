import { InputForm, ButtonFormat, ModalFormat, PasswordInput, SelectForm, TermsCheckbox, LayoutOutside } from 'ui-mathilde-web';
import {
  RegisterFormService,
  registerUser,
} from "~/services/registerService";
import { Link, useNavigate } from "react-router-dom";
import usePasswordValidation from "@hooks/usePasswordValidation";
import useModal from "@hooks/useModalTerminos";
import Swal from "sweetalert2";
import { Formik, Form,  } from "formik";
import { registerValidationSchema } from "@schema/registerSchema";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const RegisterFormContent: React.FC = () => {
  const { roles } = RegisterFormService;
  const navigate = useNavigate();

  // Hook para validar contraseñas
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showError,
  } = usePasswordValidation();

  // Hook para control de modal de términos y condiciones
  const {
    isModalOpen,
    toggleModal,
    termsAccepted,
    handleAcceptTerms,
    buttonEnabled,
    handleScroll,
    modalRef,
    setTermsAccepted,
  } = useModal();

  const initialValues = {
    name: "",
    firtsName: "",
    company: "",
    phone: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log(values);
    if (!termsAccepted) {
      Swal.fire({
        text: "Debes aceptar los términos y condiciones.",
        icon: "warning",
        showConfirmButton: true,
      });
      setSubmitting(false);
      return;
    }

    const formData = {
      ...values,
      term: termsAccepted,
    };

    try {
      const response = await registerUser({
        formRegister: formData,
      });
      console.log(response);
      sessionStorage.setItem("previousPath", window.location.pathname);
      sessionStorage.setItem("email", values.email);
      sessionStorage.setItem("password", values.password);
      navigate("/validation");
    } catch (err) {
      console.log(err);
      Swal.fire({
        text: err instanceof Error ? err.message : "Ha ocurrido un error.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex w-full">
      <div className="w-2/4 border-container">
        <LayoutOutside />
      </div>
      <div className="w-2/4 flex items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form className="w-9/12 px-10 bg-white mt-28 mx-auto rounded-lg">
              <h2 className="text-2xl mb-6">REGISTRO DE USUARIOS</h2>
              <p className="my-3">
                Bienvenido a Mathilde, completa los datos y empieza a transformar tu
                estrategia digital.
              </p>
              <div className="flex justify-between">
                <div className="w-2/4 mr-2">
                  <InputForm
                    type="text"
                    placeholder="Nombres"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm my-2">{errors.name}</div>
                  )}
                </div>
                <div className="w-2/4 ml-2">
                  <InputForm
                    type="text"
                    placeholder="Apellidos"
                    name="firtsName"
                    value={values.firtsName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.firtsName && touched.firtsName && (
                    <div className="text-red-500 text-sm my-2">{errors.firtsName}</div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-2/3 mr-2">
                  <InputForm
                    type="text"
                    placeholder="Empresa"
                    name="company"
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.company && touched.company && (
                    <div className="text-red-500 text-sm my-2">{errors.company}</div>
                  )}
                </div>
                <div className="w-2/3 ml-2">
                  <InputForm
                    type="number"
                    placeholder="Celular"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-sm my-2">{errors.phone}</div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-2/3 mr-2">
                  <SelectForm
                    name="role"
                    options={roles}
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.role && touched.role && (
                    <div className="text-red-500 text-sm my-2">{errors.role}</div>
                  )}
                </div>
                <div className="w-2/3 ml-2">
                  <InputForm
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Correo electrónico"
                    required
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm my-2">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-2/3 mr-2">
                  <PasswordInput
                    name="password"
                    placeholder="Contraseña"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm my-2">{errors.password}</div>
                  )}
                </div>
                <div className="w-2/3 ml-2">
                  <PasswordInput
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-sm my-2">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>

              {showError() && (
                <div className="mth-msg">
                  <label>Las contraseñas no coinciden.</label>
                </div>
              )}

              <div className="flex mt-5">
                <TermsCheckbox
                  label="Acepto los términos y condiciones de la plataforma y la política de privacidad."
                  checked={termsAccepted}
                  onOpenModal={toggleModal}
                  onChange={setTermsAccepted}
                />
              </div>

              <div className="flex justify-end">
                <Link to="/" className="mr-2 flex items-center">
                  Cancelar
                </Link>
                <ButtonFormat
                  txtBtn="Continuar"
                  typeButton="default"
                  full={false}
                  type="submit"
                  label=""
                  disabled={isSubmitting}
                  className=""
                />
              </div>
            </Form>
          )}
        </Formik>

        <ModalFormat isOpen={isModalOpen} onClose={toggleModal}>
          <div
            ref={modalRef}
            onScroll={handleScroll}
            style={{ maxHeight: "70vh", overflowY: "auto", padding: "25px" }}
          >
            <h2 className="text-center font-bold">
              TÉRMINOS Y CONDICIONES MATHILDE ADS
            </h2>{" "}
            <br />
            <ul>
              <ol className="mb-4">
                <strong>1. Disposiciones generales.</strong> <br />
                <br />
                ADL DIGITAL LAB S.A.S (en adelante ADL) es la sociedad titular
                de la Plataforma Mathilde Ads (en adelante "Plataforma
                Mathilde"), cuyo propósito es poner a disposición de sus
                clientes una plataforma de Pauta Digital, bajo los lineamientos
                y parámetros establecidos en estos términos y condiciones.
              </ol>
              <ol className="mb-4">
                <strong>1.1. Definiciones</strong> <br />
                <br />
                Inventario de Pauta: Es el inventario digital de publicidad que
                incluye sitios web, aplicaciones e inventario de Video y Display
                en Desktop y Mobile. Bloques de Anuncios: Espacio dentro del
                sitio web o la aplicación creada para albergar piezas gráficas
                de publicidad. Transacción programática: Significa el acto de
                compra y/o venta de publicidad programática a través de bloques
                de anuncios y procesamiento de data. Plataforma Mathilde:
                Elementos del Software usado por ADL para la prestación de los
                servicios de marketing tech. Plataforma de Datos Augusta
                ("PDA"): Es la Plataforma corporativa Multicloud de Datos que
                entrega valor y enriquece los procesos de negocio; facilitando
                el acceso, análisis y uso compartido de la información en
                proyectos que apliquen analítica en la nube. Data Management
                Platform ("DMP"): Es la plataforma de datos en donde se albergan
                las audiencias disponibles según el servicio adquirido. Para el
                caso particular es el DMP Bluekai de Oracle que se aloja en
                Augusta. Las audiencias son bases de datos anonimizadas.
                Segmentación: Grupos de audiencias de públicos traídos desde el
                DMP hacia el ecosistema de publicidad. Demand Side Platform
                ("DSP"): Es la plataforma de compra programática en donde se
                realiza la activación de campañas publicitarias. Supply Site
                Platform ("SSP"): Es la plataforma de venta programática que
                dispone los espacios publicitarios de propiedad de terceros.
                Pujas de Anuncios: Intención de compra de un anuncio de
                publicidad por un anunciante desde el DSP. Comprador: Anunciante
                que dispone una publicidad dentro del DSP para la generación de
                campañas publicitarias. Recolección de Data: Recolección de data
                que pasa desde la plataforma de datos corporativa Augusta hacia
                el DSP y el SSP. Smart Owned Media ("SOM"): Corresponde a la
                autopauta o espacios publicitarios que se llenan con información
                referente al mismo dueño del sitio o a marcas autorizadas por el
                sitio para fungir como tal. Smart Paid Media ("SPM"):
                Corresponde a las estrategias de publicidad y marketing digital
                que son ofrecidas por el equipo de Mathilde para cumplir
                objetivos de tráfico, leads, desembolsos, clicks, sesiones y
                demás que se requiera por el tomador del servicio. Costo por mil
                impresiones ("CPM"): Costo asociado a la venta de publicidad
                digital por cada vez que se imprime o renderiza un anuncio en la
                página web, el cual se gestiona por medio de la plataforma
                Mathilde. Costo por clic ("CPC"): Costo asociado al evento de
                clic que se genera al momento de ver un anuncio de publicidad.
                Costo por lead ("CPL"): Costo asociado al llenado exitoso del
                formulario dispuesto en alguna página web del tomador del
                servicio. Costo de adquisición ("CPA"): Costo por generación de
                desembolso en crédito de las entidades. Costo por publicación
                ("CPP"): Costo derivado de que el usuario genere una publicación
                de un vehículo de manera gratuita o paga. Cliente: Se refiere a
                todas las personas naturales o jurídicas o entidades de
                cualquier naturaleza que soliciten o contraten la prestación de
                servicios por parte de ADL de la Plataforma Mathilde. Usuario:
                Son las personas y/o empresas que utilizan los canales digitales
                para consumir contenido, crear contenido, interactuar con marcas
                y completar una transacción en comercios electrónicos, portales
                de contacto etc.
              </ol>
              <ol className="mb-4">
                <strong>1.2. Condiciones Generales </strong> <br />
                <br />
                El presente documento establece las políticas de uso de la
                Plataforma Mathilde y la diversidad de servicios que se prestan
                y/o se activan por medio de esta, así como las condiciones de
                prestación de estos servicios. Es deber del Cliente leer
                cuidadosamente este documento antes consumir cualquiera de los
                servicios que se prestan a través de la Plataforma Mathilde, por
                lo que al acceder previamente se entenderá que entiende, acepta
                y cumplirá con los términos y condiciones, sino está de acuerdo,
                debe abstenerse de ingresar y de usar el servicio de la
                Plataforma Mathilde.
              </ol>
              <ol className="mb-4">
                <strong>1.3. Descripción del Servicio. </strong>
                <br />
                <br />
                Mathilde es una Plataforma tecnológica que le permite a los
                Clientes, crear, administrar, supervisar y gestionar campañas de
                publicidad digital, con las siguientes disponibilidades:
              </ol>
              <ol className="mb-4">
                <strong>1.3.1 Anuncios Dirigidos.</strong>
                <br />
                <br />
                Por medio de la Plataforma Mathilde el Cliente podrá gestionar
                la entrega de anuncios dirigidos, usar diversas interfaces,
                administrar las campañas de publicidad desplegadas y utilizar
                datos anonimizados, los cuales, podrá combinar con la
                información de su público objetivo definido para entregar
                materiales publicitarios específicos y/o inventario en los
                canales utilizados por el público objetivo definido por el
                Cliente
              </ol>
              <ol className="mb-4">
                <strong>1.3.1 Anuncios Dirigidos.</strong>
                <br />
                <br />
                Por medio de la Plataforma Mathilde el Cliente podrá gestionar
                la entrega de anuncios dirigidos, usar diversas interfaces,
                administrar las campañas de publicidad desplegadas y utilizar
                datos anonimizados, los cuales, podrá combinar con la
                información de su público objetivo definido para entregar
                materiales publicitarios específicos y/o inventario en los
                canales utilizados por el público objetivo definido por el
                Cliente.
              </ol>
              <ol className="mb-4">
                <strong>
                  1.3.1.1. Opciones para evitar publicidad dirigida.
                </strong>
                <br />
                <br />
                Tenga en cuenta que, aunque ADL cree que la publicidad dirigida
                es beneficiosa para todas las partes involucradas, no se elude
                ningún dispositivo y el Usuario dispone de mecanismos que le
                permiten dejar de recibir publicidad dirigida, lo cual, puede
                afectar las campañas dirigidas por el Cliente. Tenga en cuenta
                que las diferentes plataformas y dispositivos utilizan
                diferentes identificadores y diferentes tecnologías, y también
                que cada navegador y cada dispositivo tiene su propia
                configuración aplicable. Por lo que, si el Usuario elimina las
                cookies, los bloques de cookies y/o ejecuta el retiro de un
                anuncio específico, no será responsabilidad de ADL el impacto
                que pueda tener en la campaña publicitaria.
              </ol>
              <ol className="mb-4">
                <strong>1.3.2 Información de Comportamientos. </strong>
                <br />
                <br />
                El Cliente podrá acceder por medio de la Plataforma Mathilde a
                la siguiente información del público objetivo que defina: • Der
                talle de campañas implementadas • Impresiones • Clic's •
                Placements • Filtros IP • Fecha, hora, día de la semana de la
                impresión • Conversión de la Campaña • Bid request
              </ol>
              <ol className="mb-4">
                <strong>1.3.2. Gestión de campaña en redes sociales: </strong>
                <br />
                <br />
                Por medio de la Plataforma Mathilde el Cliente por sí mismo o
                por medio de ADL, podrá crear, monitorear y optimizar los
                anuncios en las diferentes plataformas de redes sociales en las
                que la Plataforma Mathilde este conectada.
              </ol>
              <ol className="mb-4">
                <strong>
                  1.3.3. Análisis de Datos y Reporte de Rendimiento
                </strong>
                <br />
                <br />
                Se podrá generar reportes detallados del rendimiento de las
                campañas, lo cual, le brinda al Cliente un análisis en tiempo
                real y recomendaciones basadas en datos que le permitirán
                optimizar las estrategias de marketing.
              </ol>
              <ol className="mb-4">
                <strong>1.3.4. Otros Servicios</strong>
                <br />
                <br />
                ADL podrá prestar servicios, ofrecer productos adicionales o
                accesorios en la Plataforma Mathilde, de forma directa o través
                de un tercero, cuyos términos y condiciones serán los señalados
                al momento en que se tome el servicio. Los servicios ofrecidos
                por terceros serán prestados directamente por el tercero bajo
                los términos y condiciones que él disponga, por lo cual, el
                Usuario o Cliente deberá consultarlos previo adquirir el
                servicio, ADL no asumirá responsabilidad alguna por la
                prestación del servicio que realice el tercero.
              </ol>
              <ol className="mb-4">
                <strong>2. Recopilación de Información del Usuario</strong>
                <br />
                <br />
                ADL recopila información de los anuncios del publico objeto
                definido por el Cliente, los anuncios son diseñados por el
                Cliente y se marcan como preferentes y relevantes, de allí que
                la Plataforma Mathilde se alimente de información recopilada
                utilizando los siguientes estándares (típicos de la industria) y
                tecnologías web:
              </ol>
              <ol className="mb-4">
                2.1.1. Cookies. Las cookies son una tecnología que se basa en
                archivos de datos de pequeño tamaño que contienen una cadena de
                caracteres alfanuméricos que generalmente incluyen un
                identificador único y se colocan en el dispositivo o computadora
                de un visitante. Las cookies generalmente se almacenan en la
                computadora del usuario de forma permanente o temporal (cookies
                persistentes). Usamos cookies en los sitios web de nuestros
                clientes para operar nuestra tecnología y recopilar información
                del usuario y analizar estadísticamente las preferencias
                publicitarias.
              </ol>
              <ol className="mb-4">
                2.1.1. Cookies. Las cookies son una tecnología que se basa en
                archivos de datos de pequeño tamaño que contienen una cadena de
                caracteres alfanuméricos que generalmente incluyen un
                identificador único y se colocan en el dispositivo o computadora
                de un visitante. Las cookies generalmente se almacenan en la
                computadora del usuario de forma permanente o temporal (cookies
                persistentes). Usamos cookies en los sitios web de nuestros
                clientes para operar nuestra tecnología y recopilar información
                del usuario y analizar estadísticamente las preferencias
                publicitarias.
              </ol>
              <ol className="mb-4">
                2.1.2. HTML5 y objetos almacenados localmente. Al igual que las
                cookies, esta tecnología también se basa en fragmentos de código
                conocidos como "objetos almacenados localmente". Los objetos
                almacenados localmente, como el almacenamiento web HTML5, suelen
                contener una mayor cantidad y diferentes tipos de datos que las
                cookies del navegador. La mayoría de las versiones actuales de
                los navegadores web comunes borran estos datos almacenados
                localmente cuando borra o borra su caché de cookies. Por lo
                general, el servicio analiza automáticamente toda la información
                relevante y la recopila.
              </ol>
              <ol className="mb-4">
                2.1.3. Etiquetas y píxeles. Las etiquetas y los píxeles son
                bloques de código que nosotros y nuestros clientes podemos usar
                para rastrear su navegación en Internet: desde recursos hasta
                sitios web o aplicaciones en particular para rastrear su
                comportamiento de navegación. A veces, las balizas web se
                utilizan para estos fines. Suelen ser imágenes gráficas
                transparentes o invisibles, no mayores de 1x1 píxel, se colocan
                en una página o de otro modo, recurso de Internet o se envían
                dentro de un correo electrónico para monitorear el
                comportamiento del usuario que visita el recurso o envía el
                correo electrónico. A menudo se usa en combinación con cookies.
                Creamos y usamos un sistema de sincronización único para
                verificar la calidad de la información que hemos recopilado con
                la información que nuestros clientes recopilaron de forma
                independiente, y luego ayudar a nuestros clientes o terceros que
                pretenden proporcionarle publicidad dirigida.
              </ol>
              <ol className="mb-4">
                2.1.4. Identificadores de dispositivos móviles. Los
                identificadores de dispositivos móviles o ID de dispositivos
                móviles son identificadores únicos que se pueden utilizar para
                identificar un dispositivo móvil. Podemos utilizar
                identificadores de dispositivos estándar para rastrear su uso de
                aplicaciones móviles y determinar si una parte del inventario de
                publicidad se ha entregado a un usuario específico o
                reorientado, o para determinar la frecuencia de cierto
                inventario para un determinado usuario. En última instancia,
                devolver la identificación del dispositivo a los anunciantes nos
                ayuda a nosotros y a nuestros clientes a mejorar la calidad de
                la publicidad y su eficacia.
              </ol>
              <ol className="mb-4">
                2.1.5. Kits de desarrollo de software. Estos son bloques de
                código o algoritmos similares a las etiquetas y los píxeles que
                están incrustados en un recurso digital que nos permite rastrear
                cierta información relacionada con el uso de la aplicación,
                recopilada durante el proceso de utilización de nuestra
                tecnología.
              </ol>
              <ol className="mb-4">
                2.1.6. Otras tecnologías: tenga en cuenta que utilizamos otras
                tecnologías, incluidos los objetos almacenados localmente, para
                recopilar información del usuario con el fin de ayudar a los
                usuarios con la entrega del inventario y proporcionar informes a
                nuestros clientes o para evaluar la calidad de la publicidad.
              </ol>
              <ol className="mb-4">
                2.1.7. Otros proveedores de servicios. Los servicios SSP, DSP y
                DMP se basan en plataformas específicas que se comunican
                activamente con otras plataformas con el fin de complementar las
                funcionalidades de cada una en las plataformas SSP, DSP y DMP.
                Además, utilizamos servicios de varios terceros para analizar
                datos, prevenir fraudes, alojar datos, mantener y respaldar la
                Plataforma Mathilde, y para otros servicios relacionados que
                sean necesarios para proporcionar los servicios. Por lo
                anterior, el Cliente reconoce que ADL, utiliza y procesa la
                información a través de la tecnología empleada, en nombre de los
                anunciantes en línea, editores, socios comerciales y otras
                empresas que utilizan materiales publicitarios y/o inventario o
                servicios de la plataforma Mathilde.
              </ol>
              <ol className="mb-4">
                <strong>
                  2.2. Almacenamiento e intercambio de información del usuario.
                </strong>
                <br />
                <br />
                ADL solo almacena información en caso de necesidad. Por lo
                general, elimina la información derivada de las campañas
                trimestralmente. Tenga en cuenta que ciertas leyes y
                regulaciones pueden obligarnos a almacenar información del
                usuario durante un período de tiempo particular: leyes de lavado
                de dinero, regulaciones de informes financieros, leyes fiscales,
                demandas, denuncias etc. Además, es posible que tengamos que
                cumplir con la decisión de la entidad jurisdiccional
                correspondiente. y mantener la información durante un período
                más largo. ADL, comparte la siguiente información: • información
                con nuestros Clientes. Se comparte con el fin de ayudarlos a
                identificar, comprar publicidad y dirigirse a editores
                específicos. Los Clientes pueden usar esta información junto con
                otra información que hayan recopilado de forma independiente
                para proporcionarle materiales publicitarios específicos.
                También evalúan y analizan campañas publicitarias particulares,
                inventario, etc. • Cambio de control. ADL, podrá compartir
                información del usuario en relación con fusiones, adquisiciones,
                eventos de cambio de control, que incluyen, entre otros, la
                venta o transferencia de todo o parte de nuestro negocio o
                activos. En este caso, se requerirá el consentimiento informado
                del Cliente, en su caso, será otorgado a una nueva entidad de
                acuerdo con el evento de un cambio de control. • Cumplimiento de
                leyes y regulaciones. ADL podrá compartir la información del
                usuario con las autoridades reguladoras, la jurisdicción, civil,
                penal y/o administrativa.
              </ol>

              <ol className="mb-4">
                <strong>
                  2.3. Información recopilada de Usuarios finales o propietarios
                  de datos personales Diferente a los Clientes.
                </strong>
                <br />
                <br />
                ADL en el curso de la prestación de servicios, no recopila
                información que revele el dato personal que conlleve a
                identificar a la persona, ni ejecuta el tratamiento de la
                información personal de los titulares que pudieran llegar a
                tener los Clientes, tales como: nombre, dirección, número de
                teléfono fijo y/o celular etc, el Cliente podrá utilizar los
                servicios de la Plataforma Mathilde para procesar la información
                de navegación que provenga de los Sitios web de los Clientes y
                pueden ser procesados a través de la tecnología de la Plataforma
                Mathilde, sin que ADL conozca el dato personal o tenga acceso o
                el control de los mismos. Por lo que ADL recopila información
                anonimizada y generalizada la cual, no es considerada
                información personal. En algunas otras jurisdicciones en las que
                brindamos servicios a nuestros clientes, en ciertos contextos,
                dicha información, incluidas las direcciones de Protocolo de
                Internet (IP) y otra información, como ciertos identificadores
                de dispositivos únicos que pueden identificar una computadora o
                dispositivo móvil en particular (por ejemplo, en la Unión
                Europea) dicha información se considera información personal.
                Tenga en cuenta que ADL puede trabajar con plataformas o
                aplicaciones de datos de terceros que pueden integrarse
                directamente en nuestra tecnología o utilizarse por separado,
                complementando la tecnología de la Plataforma Mathilde. Los
                Clientes pueden operar utilizando sus etiquetas, píxeles,
                cookies u otras tecnologías similares para sus actividades
                comerciales, bajo el cumplimiento de las disposiciones
                normativas a que haya lugar. ADL no es responsables de que el
                Cliente, utilice información personal o cualquier tipo de
                tecnología de seguimiento, tampoco es responsables de sus
                políticas de privacidad y no tiene el control sobre los mismos.
                Por lo que ADL procederá con la suspensión de la prestación del
                servicio cuando se produzca y/o evidencie una violación del
                tratamiento de los datos personales conforme lo dispone la ley
                1581 de 2012 y demás normas que la complementen, modifiquen o
                sustituyan.
              </ol>

              <ol className="mb-4">
                <strong>2.3.1. Tratamiento de los Datos</strong>
                <br />
                <br />
                ADL en la prestación del servicio no ejecuta el tratamiento de
                datos personales, no interactúa directamente con los titulares
                de la información personal, por lo que por medio de la
                plataforma Mathilde ADS se procesa la información proporcionada
                por los Clientes utilizando diversos software y servicios, y no
                siempre nuestro software a este respecto. Por lo tanto, cuando
                se cargue información de carácter personal a la plataforma es
                obligación del Cliente cuando trate información personal cumplir
                con todas las leyes de la jurisdicción colombiana, en especial
                con la ley 1581 de 2012 y demás normas complementarias, ADL, no
                se dirige directamente a ningún grupo en particular de
                propietarios de información personal por lo que de ocurrir, se
                realizara el tratamiento de la información acatando la política
                de tratamiento de datos de Cliente y el contrato marco de
                transmisión de datos bilateral que previo análisis, de aplicar,
                debe ser constituido entre el Cliente y ADL. Así las cosas, ADL
                no será responsable del incumplimiento legal en el tratamiento
                de los datos personales que el Cliente materialice, en el uso de
                la plataforma Mathilde.
              </ol>

              <ol className="mb-4">
                <strong>2.3.2. De la Transmisión de Datos</strong>
                <br />
                <br />
                En el evento en el que el Cliente comparta datos personales de
                titulares con ADL, se entenderá que se hace bajo la modalidad de
                transmisión de datos personales y, con ocasión a ello, ADL
                asumirá el rol de ENCARGADO sobre los datos personales que le
                sean transmitidos por el Cliente, en su rol de RESPONSABLE y
                ejecutara el tratamiento de la información con base en las
                finalidades de la Política de Tratamiento de Datos del Cliente.
                Las partes en función de los servicios determinaran si es
                procedente la suscripción de un Contrato de transmisión de
                datos.
              </ol>

              <ol className="mb-4">
                <strong>2.3.3. Política hacia los niños.</strong>
                <br />
                <br />
                Los servicios de ADL no están dirigidos a personas menores de 18
                años. Si se da cuenta de que su hijo ha proporcionado
                información personal sin su consentimiento, comuníquese con ADL
                de inmediato. No recopilamos información personal de niños
                menores de 18 años. Si es menor de edad, puede utilizar nuestros
                servicios solo junto con un el acompañamiento y aceptación del
                padre o tutor.
              </ol>

              <ol className="mb-4">
                <strong>3. Obligaciones </strong>
                <br />
                <br />
                <strong>3.1. Obligaciones generales de ADL</strong>
                <br />
                <br />• Poner a disposición del Cliente la Plataforma de
                Mathilde para que las mismas puedan ser utilizadas por éste,
                permitiendo el acceso al uso de estas, siempre que se cumplan
                todas las condiciones establecidas en estos términos y
                condiciones. • Brindar soporte técnico de ser requerido en
                cuanto al uso de la Plataforma Mathilde. • Suministrar la
                información necesaria para el uso de la Plataforma Mathilde. •
                Informar por medio de los términos y condiciones los cambios y/o
                actualizaciones efectuadas en la Plataforma de Mathilde que
                incidan en el servicio prestado. • Informar al Cliente con
                antelación sobre mantenimientos programados o no programados en
                la plataforma Mathilde, que puedan llegar a afectar el uso de
                esta. • Proteger cuando aplique la información personal del
                Cliente que sea conocida por ADL o por los terceros, de acuerdo
                con lo establecido en las leyes colombianas sobre protección de
                datos personales. • Realizar su mejor esfuerzo para que la
                Plataforma Mathilde se encuentre bajo una disponibilidad de
                7*24; esta disponibilidad podrá verse afectada por diferentes
                circunstancias, entre ellas, fallas o errores, indisponibilidad
                de servidores, mantenimientos programados o no programados,
                actualizaciones, entre otros eventos. • ADL no es responsable
                por el funcionamiento de la Plataforma Mathilde derivada de la
                falta de conexión, red inestable o suspensión del servicio de
                conectividad que pueda presentar del Cliente, que genere fallas,
                intermitencia o no funcionalidad de la Plataforma Mathilde.
              </ol>

              <ol className="mb-4">
                <strong>3.2. Obligaciones del Cliente </strong>
                <br />
                <br />• Pagar a ADL, según corresponda, la remuneración
                establecida por el consumo que se ejecute de los servicios
                prestados en la Plataforma Mathilde. • Guardar custodia de las
                credenciales del acceso a la Plataforma Mathilde, las
                credenciales son de uso personal e intransferible, por tanto, no
                está autorizado a compartirla con terceros o comercializarlas.
                Cualquier novedad con las credenciales deberá notificarla de
                manera inmediata a ADL. • El Cliente debe utilizar de manera
                exclusiva la Plataforma de Mathilde y abstenerse de permitir su
                uso por parte de terceros no autorizados. • Atender dentro de
                los 5 días hábiles siguientes los requerimientos de información
                que realice ADL y los requerimientos relacionados con PQR
                presentadas por los usuarios que le sean trasladas por ADL. • No
                publicar contenido que contenga términos engañosos al Usuario •
                Si la publicación del Cliente es dirigida a productos nocivos
                deberá se advertirá claramente al público acerca de su nocividad
                y de la necesidad de consultar las condiciones o indicaciones
                para su uso correcto, así como las contraindicaciones del caso.
                • Abstenerse de operar como intermediario o vender a terceros
                los servicios ofrecidos en la Plataforma de Mathilde, salvo que
                así se haya acordado con ADL. • El Cliente no podrá utilizar sus
                cuentas de acceso o en general los servicios contratados, para
                prestar los mismos servicios a terceras personas, bien sea de
                forma gratuita u onerosa, como un servicio independiente o
                complementario a otras actividades, salvo que así se haya
                pactado y autorizado por ADL. • Ajustar el contenido de sus
                campañas digitales, cumpliendo con lo establecido en el numeral
                4.3. • Abstenerse de sublicenciar o permitir el uso de los
                derechos concedidos mediante este reglamento, a terceros no
                autorizados previa y expresamente por ADL. • Conservar las
                claves, credenciales, software, guías y accesos que ADL le ha
                permitido utilizar, con los debidos estándares de privacidad y
                seguridad según ha sido informado asumiendo toda la
                responsabilidad frente a ADL por cualquier vulneración a sus
                sistemas de seguridad o indebido uso que se haga de la
                Plataforma de Mathilde por parte de sus empleados,
                administradores, contratistas y sus proveedores, y que impliquen
                la configuración de riesgos reputacionales para ADL o las
                Entidades Financieras Aliadas, pérdidas económicas, perjuicios a
                otros, investigaciones o sanciones de autoridades competentes. •
                Conservar la funcionalidad del contenido de la Plataforma de
                Mathilde así como sus características, evitando cualquier
                alteración, filtración, modificación o inhabilitación de las
                mismas. • Garantizar que todo su personal cumpla con los
                lineamientos impartidos por ADL o para el acceso a la
                información y uso de la Plataforma Mathilde cuando por virtud de
                su cargo, deba acceder a la misma. • Asumir la carga tributaria
                que legalmente le corresponda con ocasión a la contratación de
                los servicios adquiridos.
              </ol>

              <ol className="mb-4">
                <strong>4. Uso de la Plataforma Mathilde</strong>
                <br />
                <br />
                <strong>
                  4.1. Deberes del Cliente en el Uso de la Plataforma Mathilde
                </strong>
                <br />
                <br />
                Para que se habilite por parte de ADL el uso de la Plataforma el
                Cliente, deberá: • Cumplir con los términos y condiciones que se
                relacionan por medio del presente documento. • Cumplir con los
                requisitos de vinculación de ADL. • Realizar previo al consumo
                del servicio, la negociación de los servicios a utilizar en la
                plataforma Mathilde. • Consumir el servicio de la Plataforma
                Mathilde, conforme lo acordado con el área comercial, los
                presentes términos y condiciones y lo establecido en el contrato
                de prestación de servicios.
              </ol>

              <ol className="mb-4">
                <strong>4.2. Uso NO Autorizado </strong>
                <br />
                <br />• No podrán usar la Plataforma con el fin de transmitir,
                distribuir, editar, almacenar, modificar, adaptar o de cualquier
                forma transformar el material dispuesto en la Plataforma, de tal
                manera que: (i) Se infrinjan las normas nacionales,
                supranacionales o internacionales sobre derechos de autor,
                propiedad industrial, secretos comerciales o cualquier otro
                derecho de propiedad intelectual de terceros o de manera que
                viole la privacidad, publicidad, derechos personales o
                personalísimos de terceros; (ii) Resulte lesivo, difamatorio,
                amenazante o abusivo a los derechos de terceros, tanto personas
                naturales como jurídicas o cualquier otra forma asociativa. • No
                podrán vulnerar o intentar vulnerar la seguridad de la
                Plataforma Mathilde. • Particularmente se encuentran
                inhabilitados para: o Acceder a información que no esté dirigida
                o autorizada para acceso al Cliente o acceder a los servidores o
                cuentas a los cuales no se encuentre autorizado o Probar o
                intentar probar la vulnerabilidad de cualquiera de los sistemas
                o redes por las cuales opera la Plataforma Mathilde. Esta
                limitación comprende la vulneración de las medidas de seguridad
                o autenticación dispuestas por ADL o Intentar interferir con los
                servicios prestados, incluyendo, pero sin limitarse al uso de
                virus, malware o programas de computador con potencialidad para
                afectar software, sistemas o herramientas. • No podrán incluir o
                suministrar información falsa, errónea, inexacta o que de
                cualquier otra manera no corresponda con la realidad, induciendo
                en error a ADL. • No le está permitido utilizar la Plataforma
                para ejecutar actividades que signifiquen la comisión de
                conductas relacionadas con los delitos de lavado de activos o
                financiación del terrorismo o aquellos conexos con estos. • No
                podrá borrar, editar o transformar de cualquier forma o
                comercializar cualquier material y/o información dispuesta en la
                Plataforma Mathilde. • No podrá usar cualquier elemento, diseño
                o software para interferir o intentar interferir con el
                funcionamiento adecuado de la Plataforma Mathilde o que tenga
                como propósito la modificación de esta. • No podrá intentar
                descifrar, compilar o desensamblar cualquier software o sistema
                que sea utilizado para el funcionamiento de la Plataforma
                Mathilde. • Si tienen credenciales que le permita el acceso a un
                área no pública de la Plataforma Mathilde, no podrá revelar o
                compartir estas credenciales con terceras personas o usar la
                contraseña para propósitos no autorizados. • No podrá permitir
                que personas no autorizadas, accedan o utilicen la Plataforma
                Mathilde o a documentación relativa a estas. • No le está
                permitido comercializar, distribuir, modificar, reproducir,
                copiar o archivar por cualquier medio la información que
                proporcione la Plataforma Mathilde o el contenido inherente a
                esta, las credenciales, o a las herramientas de información que
                hayan sido puestas a su disposición. • Le está prohibido usar la
                Plataforma Mathilde para fines diferentes a los permitidos. • No
                podrá utilizar ningún tipo de tecnología orientada a acceder de
                forma fraudulenta o maliciosa a la Plataforma Mathilde o
                utilizar dicha tecnología para conseguir información cuyo acceso
                no le haya sido permitido. Parágrafo Primero: El Cliente deberá
                reparar los daños y asumir las demás consecuencias de orden
                penal, si llegara a ocurrir, por la ejecución de actos propios o
                de terceros bajo su dirección, en donde se vulnere la seguridad
                de cualquier sistema o red asociada a la Plataforma Mathilde.
                Parágrafo Segundo: ADL podrá iniciar los rastreos,
                investigaciones y cualquier otra forma de indagación sobre las
                personas e instrumentos utilizados para vulnerar la seguridad
                dispuestas en la Plataforma Mathilde. En cualquier evento
                promoverá las denuncias o demandas buscando que se proscriban
                dichas actuaciones, así como la indemnización de los perjuicios
                ocasionados.
              </ol>
              <ol className="mb-4">
                <strong>4.3. Prohibición de Contenido Inapropiado</strong>
                <br />
                <br />
                Los Clientes de la Plataforma Mathilde, se comprometen a no
                crear, cargar, distribuir o promover, a través de la Plataforma,
                contenido publicitario que incluya, promueva o sugiera: •
                Incluir imágenes o información considerada como pornográfica,
                que incluyan material sexual explícito o que sea considerada
                como pornografía infantil en los términos del Decreto 1524 de
                2002 o cualquier otra disposición legal o reglamentaria que
                regule la materia. • Contenido que incite, promueva o perpetue
                la violencia, el odio, la discriminación o la intolerancia hacia
                cualquier individuo basado en su raza, etnia, nacionalidad,
                religión, género, discapacidad, entre otras características
                protegidas • Material difamatorio, obsceno ofensivo o que pueda
                causar daño a la sensibilidad de los usuarios. • Introducir en
                los servidores o cualquier otro sistema donde se encuentre
                alojada la Plataforma Mathilde, malware o programas de
                computador con potencialidad para afectar software, sistemas o
                herramientas. • Incluir material que revele secretos
                industriales o comerciales salvo que sea el legítimo propietario
                de estos o haya obtenido autorización para el efecto. • Incluir
                material que esté protegido por las leyes sobre derechos de
                autor o cualquier otro derecho de propiedad intelectual o
                industrial, a menos que el Cliente sea titular de tales derechos
                y/o se encuentre facultado para comunicar públicamente los
                derechos incorporados en la publicación. ADL presume de buena fe
                que el Usuario o Cliente tiene las facultades necesarias para
                publicar los textos o imágenes. Cualquier persona que acredite
                mejor derecho o pueda sustentar la falta de capacidad del
                Cliente para la comunicación pública, podrá comunicarse en
                cualquier tiempo con ADL a través de los canales de comunicación
                dispuestos para que este lleve a cabo las actuaciones
                pertinentes. Parágrafo: ADL se reserva el derecho de revisa,
                suspender o eliminar cualquier contenido que, a su exclusivo
                criterio, infrinja estas prohibiciones o cualquier otra
                disposición de los presentes términos y condiciones, sin
                necesidad de previo aviso. En caso de incumplimiento de esta
                cláusula, ADL podrá dar por terminado sin previo aviso la cuenta
                del Cliente infractor, por lo que no asumirá responsabilidad
                alguna por las perdidas o daños derivados de la cancelación o
                suspensión que realice.
              </ol>

              <ol className="mb-4">
                <strong>
                  4.3.1. Excepción de responsabilidad por contenido Inapropiado.
                </strong>
                <br />
                <br />
                ADL no será responsable en ningún caso por los contenidos
                generados, subidos, distribuidos, cargados o promocionados por
                los Clientes a través de la Plataforma Mathilde, el Cliente
                acepta y reconoce que es el único responsable del contenido que
                publique, y garantiza que dicho contenido cumple con la
                legislación colombiana incluyéndose pero no limitándose a la ley
                1482 de 2011 contra los actos de discriminación y la ley 679 de
                2001 relacionada con la prevención de la explotación sexual en
                menores y cualquier otra normatividad aplicable. En caso de que
                un tercero presente reclamaciones, demandas o acciones
                judiciales por la publicación de contenido inapropiado, será el
                Cliente el único responsable de los daños y perjuicios
                ocasionados, exonerando a ADL de cualquier responsabilidad
                incluido, pero sin limitarse a costos judiciales, honorarios de
                representación legal, sanciones, multas y/o condenas declaradas
                mediante sentencias judiciales. El uso de la Plataforma Mathilde
                por parte del Cliente implica el reconocimiento de que ADL,
                actúa únicamente como un intermediario tecnológico, y no ejerce
                control ni responsabilidad editorial sobre los contenidos
                generados por los Clientes, por lo anterior ADL queda exonerado
                de toda responsabilidad civil, penal o administrativa derivada
                del uso indebido que ejecute el Cliente de la Plataforma
                Mathilde.
              </ol>

              <ol className="mb-4">
                <strong>5. Registro de Usuarios</strong>
                <br />
                <br />
                Para utilizar la Plataforma Mathilde los Clientes deberán
                gestionar el proceso de vinculación con ADL, quien una vez
                ejecute los tramites de creación de clientes proporcionará la
                activación de la cuenta para su respectivo uso, para lo cual el
                cliente proporcionará información precisa y actualizada. Los
                Clientes son responsables de mantener la confidencialidad de sus
                credenciales de acceso y todas las actividades que ocurran bajo
                su cuenta. El cliente, se obliga a cumplir con todas las
                recomendaciones de seguridad que le proporcione ADL para uso y
                manejo de su cuenta. No se permite la creación de múltiples
                cuentas para una misma persona o entidad sin autorización previa
                de ADL, el Cliente podrá crear su usuario, sin embargo, el mismo
                se activará para uso de la Plataforma Mathilde, una vez se
                cierre la negociación con el área comercial de ADL.
              </ol>
              <ol className="mb-4">
                <strong>6. Cesión del Usuario.</strong>
                <br />
                <br />
                Las cuentas de usuario registradas no podrán ser objeto de
                venta, cesión o cualquier otro título traslaticio sin el
                consentimiento previo y escrito de ADL autorizado para tal fin.
                Tanto el enajenante como el adquirente serán responsables de
                forma exclusiva y excluyente por la transferencia del usuario
                por fuera del procedimiento señalado. ADL no responderá
                económica u operativamente por la transferencia a cualquier
                título de las cuentas de usuario registradas sin su autorización
                previa y escrita. El titular originario (y único titular) será
                el responsable por los contenidos, imágenes, anuncios, ofertas,
                promociones que sean publicadas desde su perfil. ADL presume de
                buena fe que cada una de las cuentas de usuario registradas está
                siendo usada por sus legítimos titulares.
              </ol>
              <ol className="mb-4">
                <strong>6.1.1. Canales de Contacto</strong>
                <br />
                <br />
                Recuerda que en cualquier momento podrás hacer la selección,
                actualización o modificación de tus canales de contacto para
                fines comerciales, de publicidad y de cobranza a través del
                formulario que ha dispuesto ADL en cumplimiento de ley 2300/23,
                el cual podrás encontrar en el siguiente link: ___________. En
                caso de no seleccionar tus canales, entenderemos que nos
                autorizas para seguirte contactando a través de los datos de
                contacto que le has suministrado a ADL y a los canales asociados
                a los mismos, tales como tu correo electrónico, llamada, mensaje
                de texto, whatsapp y/o mensajería web y app. Para cancelar el
                recibimiento de mensajes publicitarios podrás diligenciar el
                siguiente formulario: __________________. O podrás enviar tu
                solicitud al correo _________________________
              </ol>
              <ol className="mb-4">
                <strong>7. Aviso de Privacidad</strong>
                <br />
                <br />A través de este enlace encontrarás la Política de
                Tratamiento de Datos Personales que regirá el Tratamiento de tus
                Datos Personales, la cual aceptas previa y expresamente como
                Cliente de la Plataforma Mathilde para los fines que allí se
                informan de manera previa, expresa e informada. Toda la
                información suministrada por los Clientes que en virtud de la
                Ley 1581 de 2011, su normatividad complementaria o aquella que
                la modifique sea considera como dato personal, se encontrará
                sometida a la Política de Tratamiento de Datos Personales de ADL
                y será tratada para las finalidades dispuestas por esta. El
                procedimiento para la rectificación, actualización, supresión
                podrá ser realizado por los titulares de la misma de conformidad
                con el procedimiento establecido. Las Partes declaran que al
                ejecutar cualquier transacción que implique el tratamiento de
                datos personales. cuentan con las autorizaciones de tratamiento
                de datos, previas y expresas de los Titulares de cuyos datos
                vaya a tratar en el desarrollo del servicio contratado y que
                cuenta con los soportes que así lo acreditan.
              </ol>

              <ol className="mb-4">
                <strong>8. Tarifas</strong>
                <br />
                <br />
                El valor de los servicios prestados por ADL será el informado en
                el momento de su adquisición o el que hayan acordado las partes
                en las respectivas órdenes de compra, contratos o demás
                documentos contractuales que suscriban las partes. Los impuestos
                y demás cargas tributarias serán asumidas por quien corresponda
                según la ley. Todo pago deberá realizarse dentro de los 30 días
                calendario siguientes a la fecha en la que ADL haya radicado la
                factura ante al Cliente.
              </ol>

              <ol className="mb-4">
                <strong>9. Información Confidencial </strong>
                <br />
                <br />
                Revelador: Parte que revele directa o indirectamente información
                a la otra parte Receptor: Quien recibe la información
                Información confidencial: Toda información que el revelador
                revele a la otra parte por cualquier medio, ya sea directa o
                indirectamente. ¿A qué se obliga el Receptor? • Divulgar la
                información estrictamente necesaria únicamente a las personas
                relacionadas con el Contrato. • Deberá dar instrucciones a sus
                empleados y terceros sobre el correcto uso de la información.
                ¿Hasta cuándo debe el Receptor guardar la confidencialidad de la
                información? • Terminación del contrato y 10 años más. • La
                obligación de confidencialidad sobre datos personales será
                indefinida. • A solicitud de devolución presentada por el
                Revelador dentro de los 5 días hábiles posteriores a la
                solicitud, siempre que no haya obligación contractual o legal de
                conservar la información. ¿Cuándo no aplica esta cláusula? •
                Cuando la información sea de dominio público. • Si la
                información la conocía el Receptor con anterioridad a que el
                Revelador la haya entregado. Cuando una autoridad competente
                requiera la información El Receptor deberá: • Informarle al
                revelador • Indicarle a la autoridad que se trata de información
                confidencial.
              </ol>
              <ol className="mb-4">
                <strong>10. Modificación</strong>
                <br />
                <br />
                ADL tiene la facultad unilateral de modificar los términos y
                condiciones en cualquier tiempo, caso en el cual publicará en la
                web los ajustes realizados para facilidad de acceso al público.
                En cualquier momento ADL podrá limitar, adicionar o suprimir
                cualquier de los servicios de Mathilde ADS, las condiciones para
                su acceso, las funcionalidades, características, su valor y en
                general cualquier servicio prestado en la Plataforma Mathilde,
                lo cual será informado por cualquiera de los canales dispuestos
                por ADL. Anunciada una modificación, el Usuario y/o Cliente
                podrá pronunciarse para su aceptación o no, dentro de los diez
                (10) días calendario siguientes; sí el Usuario y/o Cliente no
                está de acuerdo con las modificaciones, podrá dejar de hacer uso
                de la Plataforma Mathilde notificándolo previamente a ADL y
                garantizando el borrado de toda la información de acuerdo con lo
                establecido en estos términos y condiciones. El Usuario y/o
                Cliente tiene la obligación de revisar estos términos y
                condiciones cada vez que haga uso de las herramientas de la
                Plataforma, consulte o consuma los servicios ofrecidos en la
                Plataforma Mathilde y en general, cada vez que solicite la
                prestación de servicios allí expuestos.
              </ol>

              <ol className="mb-4">
                <strong>11. Seguridad</strong>
                <br />
                <br />
                Para evitar el acceso y la divulgación no autorizados, para
                mantener la precisión de los datos y para garantizar el uso
                adecuado de su información, utilizamos procedimientos físicos,
                técnicos y administrativos estándar de la industria para
                salvaguardar cualquier información personal que recopilemos. Sin
                embargo, tenga en cuenta que no se puede garantizar que la
                transmisión o el almacenamiento de información sea completamente
                seguro, aunque tomamos todas las precauciones razonables para
                protegernos contra incidentes de seguridad.
              </ol>

              <ol className="mb-4">
                <strong>12. Disposiciones Finales</strong>
                <br />
                <br />
                ADL tendrá la facultad discrecional de eliminar, borrar,
                corregir, adaptar, cualquier texto o imagen publicados por sus
                Clientes en la Plataforma Mathilde cuando evidencie, por su
                propia cuenta o a través de información de terceros, que la
                publicación contraría en todo o en partes estos Términos y
                Condiciones, derechos de terceros, el ordenamiento jurídico de
                la República de Colombia o cualquier otra norma que en virtud de
                tratados o instrumentos internacionales resulte vinculante. En
                tales situaciones, comunicará al usuario titular de la
                publicación la decisión adoptada y las razones por las cuales se
                procedió. El Cliente podrá oponerse fundadamente a la actuación,
                presentando su queja a través de los canales de comunicación
                dispuestos. La Plataforma se rigen por las leyes vigentes y
                aplicables en la República de Colombia. ADL no asume
                responsabilidad alguna por cualquiera de los textos o imágenes
                que no se encuentre de acuerdo con las leyes de terceros países,
                o tratados o instrumentos internacionales no vinculantes para la
                República de Colombia. ADL no garantiza que las publicaciones,
                textos o imágenes sean accesibles o visibles en países distintos
                al territorio que comprende la República de Colombia, o que tal
                material se encuentre de acuerdo con leyes distintas a las de la
                República de Colombia. El Cliente que acceda a la Plataforma
                Mathilde será individual y exclusivamente responsable del
                cumplimiento de las leyes aplicables a la jurisdicción en la que
                se encuentre. De presentarse decisión judicial que declare la
                nulidad, invalidez o ineficacia de alguna de las disposiciones
                de estos Términos y Condiciones, ello no afectará la
                subsistencia y la producción de efectos jurídicos de las demás
                declaraciones aquí contenidas. ADL no tiene deber legal o
                contractual alguno para inspeccionar las publicaciones, ofertas
                o bienes publicados. Igualmente. La selección y celebración de
                actos o negocios jurídicos por parte de los Clientes solamente
                compromete entre sí las declaraciones de voluntad que estos
                realicen. Cualquier interacción entre Usuarios o Clientes,
                independiente del motivo o finalidad que se hayan propuesto con
                ello, es de exclusiva y excluyente responsabilidad de los
                intervinientes. ADL no será responsable civil o penalmente por
                los hechos que ocasionaren algún perjuicio, moral o patrimonial,
                que tenga como origen las interacciones entre usuarios en la
                Plataforma. Sin perjuicio de ello, en virtud de solicitud de
                autoridad judicial o administrativa, ADL podrá suministrar
                información que se pueda recolectar sobre la presunta comisión
                de conductas punibles o hechos dañosos. Facturación. ADL
                propenderá por emitir la factura de los servicios prestados
                dentro de los tiempos legales y/o contractuales estipulados; sin
                embargo, si por imposibilidades operativas, técnicas o
                administrativas, no se logra generar, emitir o enviar la factura
                dentro del término legal o contractual, ADL se compromete a
                remitirla tan pronto se supere el inconveniente o imposibilidad
                presentada.
              </ol>
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="py-3">
              <ButtonFormat
                txtBtn={"Acepto"}
                typeButton={"default"}
                full={false}
                disabled={!buttonEnabled}
                onClick={handleAcceptTerms}
                type="button"
              />
            </div>
          </div>
        </ModalFormat>
      </div>
    </div>
  );
};

const RegisterForm: React.FC = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <RegisterFormContent />
    </GoogleReCaptchaProvider>
  );
};

export default RegisterForm;
