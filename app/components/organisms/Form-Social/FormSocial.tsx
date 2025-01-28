import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Podrías hacerlo en tu archivo principal (ej. main.tsx o App.tsx)
import 'sweetalert2/dist/sweetalert2.min.css';

import Swal from 'sweetalert2';

// COMPONENTES CUSTOM
import Button from '@components/molecules/button/buttonFormat';
import Checkbox from '@components/molecules/checkbox/Checkbox';
import Input from '@components/molecules/input/inputForm';
import Select from '@components/molecules/select/selectForm';

// Importa tu módulo de CSS personalizado
import styles from './FormSocial.module.css';
import axios from 'axios';

interface ICampaignForm {
  nameCampaign: string;
  estadoInicial: string;
  objetivoCampaign: string;
  pais: string;
  fechaInicio: string;
  fechaFin: string;
  presupuestoCop: string;
  destino: string;
  websiteUrl?: string;
  pagoPor: string;
  objetivoOptimizacion: string;
  plataformas: string[];
  accepted: boolean;
}

const schema = yup.object().shape({
  nameCampaign: yup.string()
    .required('El nombre de la campaña es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  estadoInicial: yup.string()
    .required('El estado inicial es requerido')
    .oneOf(['PAUSED', 'ACTIVE', 'ARCHIVED'], 'Seleccione un estado válido'),
  objetivoCampaign: yup.string()
    .required('El objetivo de la campaña es requerido')
    .oneOf(['Engagement', 'Traffic', 'Awarness'], 'Seleccione un objetivo válido'),
  pais: yup.string()
    .required('El país es requerido')
    .oneOf(['Colombia', 'Panama', 'Brasil', 'Peru', 'Ecuador'], 'Seleccione un país válido'),
  fechaInicio: yup.string()
    .required('La fecha de inicio es requerida')
    .transform((value) => value || undefined),
  fechaFin: yup.string()
    .required('La fecha de fin es requerida')
    .transform((value) => value || undefined),
  presupuestoCop: yup.string()
    .required('El presupuesto es requerido')
    .test('min', 'El presupuesto debe ser mayor a 0', value => !value || Number(value) > 0),
  destino: yup.string()
    .required('Debe seleccionar un destino')
    .oneOf(['website', 'mobileapp', 'messenger'], 'Seleccione un destino válido'),
  websiteUrl: yup.string()
    .when('destino', {
      is: 'website',
      then: (schema) => schema.required('La URL es requerida para destinos web')
        .matches(/^https?:\/\/.+\..+/, 'Ingrese una URL válida que comience con http:// o https://'),
      otherwise: (schema) => schema.notRequired(),
    }),
  pagoPor: yup.string()
    .required('Debe seleccionar el tipo de pago')
    .oneOf(['1', '2'], 'Seleccione un tipo de pago válido'),
  objetivoOptimizacion: yup.string()
    .required('Debe seleccionar el objetivo de optimización')
    .oneOf(['1', '2', '3'], 'Seleccione un objetivo de optimización válido'),
  plataformas: yup.array().of(yup.string())
    .min(1, 'Debe seleccionar al menos una plataforma')
    .required('Debe seleccionar al menos una plataforma')
}) as yup.ObjectSchema<ICampaignForm>;

// Definir valores por defecto fuera del componente
const defaultFormValues: ICampaignForm = {
  nameCampaign: '',
  estadoInicial: 'PAUSED',
  objetivoCampaign: '',
  pais: '',
  fechaInicio: '',
  fechaFin: '',
  presupuestoCop: '',
  destino: '',
  websiteUrl: '',
  pagoPor: '1',
  objetivoOptimizacion: '1',
  plataformas: [],
};

const CampaignForm: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showWebsiteUrl, setShowWebsiteUrl] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Lista de plataformas disponibles
  const availablePlatforms = ['Facebook', 'TikTok', 'Mathilde'];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    clearErrors,
    formState: { errors, isValid, isDirty, dirtyFields, touchedFields },
  } = useForm<ICampaignForm>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: defaultFormValues,
    shouldFocusError: false,
  });

  // Estado para controlar campos validados
  const [validatedFields, setValidatedFields] = useState<Set<string>>(new Set());

  // Inicializar el formulario
  useEffect(() => {
    const initializeForm = async () => {
      // Limpiar todos los errores
      clearErrors();

      // Establecer valores por defecto
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const defaultFields = {
        estadoInicial: 'PAUSED',
        pagoPor: '1',
        objetivoOptimizacion: '1',
        fechaInicio: now.toISOString().slice(0, 16),
        fechaFin: nextWeek.toISOString().slice(0, 16),
      };

      Object.entries(defaultFields).forEach(([field, value]) => {
        setValue(field as keyof ICampaignForm, value, {
          shouldValidate: false,
          shouldDirty: false,
          shouldTouch: false,
        });
      });

      setIsInitialized(true);
    };

    if (!isInitialized) {
      initializeForm();
    }
  }, [setValue, clearErrors, isInitialized]);

  // Manejar cambios en los campos
  const handleFieldChange = (fieldName: keyof ICampaignForm) => {
    return (e: any) => {
      const value = e.target.value;
      setValue(fieldName, value, { shouldValidate: true });
      if (value) {
        setValidatedFields(prev => new Set([...prev, fieldName]));
      }
    };
  };

  // Manejar cambios en los checkboxes de plataformas
  const handlePlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const currentPlatforms = watch('plataformas') || [];

    let newPlatforms;
    if (checked) {
      newPlatforms = [...currentPlatforms, value];
    } else {
      newPlatforms = currentPlatforms.filter(p => p !== value);
    }

    setValue('plataformas', newPlatforms, { shouldValidate: true });
    setValidatedFields(prev => new Set([...prev, 'plataformas']));
  };

  // Observar cambios en el destino para websiteUrl
  const destino = watch('destino');
  useEffect(() => {
    if (destino !== 'website') {
      clearErrors('websiteUrl');
      setValue('websiteUrl', '', {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
      // Remover websiteUrl de los campos validados cuando no es website
      setValidatedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete('websiteUrl');
        return newSet;
      });
    }
  }, [destino, clearErrors, setValue]);

  // Observar cambios en los campos
  const watchAllFields = watch();
  useEffect(() => {
    // Solo mantener el log del payload
    if (import.meta.env.NODE_ENV === 'development') {
      console.log('Form Data:', watchAllFields);
    }
  }, [watchAllFields]);

  // Mostrar WebsiteUrl si "destino" es "website"
  const destinoValue = watch('destino');
  useEffect(() => {
    setShowWebsiteUrl(destinoValue === 'website');
  }, [destinoValue]);

  // Asignación aleatoria de usuario
  useEffect(() => {
    const userList = ['AvVillas', 'Metro Cuadrado', 'Dale', 'Occidente', 'Popular', 'BBogota'];
    setUser(userList[Math.floor(Math.random() * userList.length)]);
  }, []);

  // Generar ID sencillo
  const generateNumericUUID = (): string => {
    const datePart = Date.now().toString().slice(-5);
    const randomPart = Math.floor(Math.random() * 10000);
    return `${datePart}${randomPart}`;
  };

  // Función para formatear fecha y hora
  const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr.includes(':')) return dateTimeStr;
    const parts = dateTimeStr.split(':');
    if (parts.length === 2) return `${dateTimeStr}:00`;
    return dateTimeStr;
  };

  // SUBMIT
  const onSubmit: SubmitHandler<ICampaignForm> = async (dataForm) => {
    try {
      setIsLoading(true);

      const idCampania = generateNumericUUID();
      const campaignData = {
        products: [{
          id: idCampania,
          Location: dataForm.pais,
          plaftforms: dataForm.plataformas.join(','),
          name: dataForm.nameCampaign,
          status: dataForm.estadoInicial,
          Objective: dataForm.objetivoCampaign,
          StartDate: formatDateTime(dataForm.fechaInicio),
          EndDate: formatDateTime(dataForm.fechaFin),
          'budget.amount': dataForm.presupuestoCop,
          Destination: dataForm.destino === 'website'
            ? 'Web Site'
            : dataForm.destino === 'mobileapp'
              ? 'Mobile app'
              : 'Messenger',
          websiteUrl: dataForm.websiteUrl,
          PaidFor: dataForm.pagoPor === '1' ? 'Impressions' : 'Click(CPC)',
          OptimizationObjective: dataForm.objetivoOptimizacion === '1'
            ? 'Maximize numbers of Link Clicks'
            : dataForm.objetivoOptimizacion === '2'
              ? 'Maximize numbers of Convertions'
              : 'Maximize numbers of Impressions',
        }]
      };



      // Mostrar loading
      Swal.fire({
        title: 'Enviando...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      if (!import.meta.env.VITE_SMARTLY_ENDPOINT_URL || !import.meta.env.VITE_SMARTLY_X_API_KEY) {
        console.log("no tenemos las variables configuradas");
        return;
      }

      // 1) Solicitar token
      const tokenResponse = await axios.get(import.meta.env.VITE_SMARTLY_ENDPOINT_URL, {
        headers: {
          'x-api-key': import.meta.env.SMARTLY_X_API_KEY,
        },
      });

      if (tokenResponse.status !== 200) {
        throw new Error(`Error al enviar la campaña: ${tokenResponse.statusText}`);
      }

      const tokenData = tokenResponse.data;
      const token = tokenData.cognito_token;
      console.log("token", token);

      if (!import.meta.env.VITE_SMARTLY_POST_REQUEST) {
        console.log("post url no estan en variables");
        return;
      }

      // 2) Enviar la campaña 
      const postResponse = await axios.post(
        import.meta.env.VITE_SMARTLY_POST_REQUEST,
        campaignData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (postResponse.status !== 200) {
        throw new Error(`Error al enviar la campaña: ${postResponse.statusText}`);
      }
      console.log("Datos enviados", campaignData);
      // Cerrar loading y mostrar éxito
      Swal.close();
      await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Campaña enviada correctamente',
        confirmButtonText: 'Aceptar'
      });

      // Resetear formulario
      reset(defaultFormValues);
      setValidatedFields(new Set());
      setIsLoading(false);

    } catch (error) {
      console.error('Error:', error);

      // Cerrar loading y mostrar error
      Swal.close();
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Error al enviar la campaña',
        confirmButtonText: 'Entendido'
      });

      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Columna izquierda (Imagen + sombra) */}
      <div className={`hidden md:flex flex-col items-center w-64 ${styles.mth_shadow}`}>
        <img
          className="mt-5 w-32 h-auto"
          src="https://ftp.mathilde-ads.com/132-203328616252f6103ab8de6d71fe3bea.png"
          alt="Mathilde"
        />
      </div>

      {/* Sección derecha (Formulario) */}
      <div className="flex-1 p-5">
        <h2 className="text-2xl font-bold">
          Hola: <span className="text-indigo-600">{user}</span>
        </h2>
        <p className="font-semibold mb-4 mt-4">
          Completa los campos del formulario para crear tu campaña:
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* PLATAFORMAS SUGERIDAS */}
          <div className="border border-dotted border-gray-300 p-4 flex flex-col gap-2">
            <p className="font-semibold">Plataformas sugeridas</p>
            <div className="flex flex-row flex-wrap gap-3">
              {availablePlatforms?.map((plat) => (
                <Checkbox
                  key={plat}
                  label={plat}
                  value={plat}
                  onChange={handlePlatformChange}
                  checked={watch('plataformas')?.includes(plat)}
                />
              ))}
            </div>
            {validatedFields.has('plataformas') && errors.plataformas && (
              <p className="text-red-500 text-sm mt-1">{errors.plataformas.message}</p>
            )}
          </div>

          {/* NOMBRE CAMPAÑA */}
          <Input
            type="text"
            label="Nombre de la campaña"
            placeholder="nombre"
            error={validatedFields.has('nameCampaign') ? errors.nameCampaign?.message : undefined}
            {...register('nameCampaign', {
              onChange: handleFieldChange('nameCampaign')
            })}
          />

          {/* FILA SELECTS: ESTADO, OBJETIVO, PAÍS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Estado Inicial"
              error={validatedFields.has('estadoInicial') ? errors.estadoInicial?.message : undefined}
              {...register('estadoInicial', {
                onChange: handleFieldChange('estadoInicial')
              })}
              options={[
                { label: 'PAUSED', value: 'PAUSED' },
                { label: 'ACTIVE', value: 'ACTIVE' },
                { label: 'ARCHIVED', value: 'ARCHIVED' },
              ]}
            />

            <Select
              label="Objetivo de la campaña"
              error={validatedFields.has('objetivoCampaign') ? errors.objetivoCampaign?.message : undefined}
              {...register('objetivoCampaign', {
                onChange: handleFieldChange('objetivoCampaign')
              })}
              options={[
                { label: 'Engagement', value: 'Engagement' },
                { label: 'Traffic', value: 'Traffic' },
                { label: 'Awarness', value: 'Awarness' },
              ]}
            />

            <Select
              label="Seleccione país"
              error={validatedFields.has('pais') ? errors.pais?.message : undefined}
              {...register('pais', {
                onChange: handleFieldChange('pais')
              })}
              options={[
                { label: 'Colombia', value: 'Colombia' },
                { label: 'Panama', value: 'Panama' },
                { label: 'Brasil', value: 'Brasil' },
                { label: 'Peru', value: 'Peru' },
                { label: 'Ecuador', value: 'Ecuador' },
              ]}
            />
          </div>

          {/* FECHAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Fecha inicio"
              type="datetime-local"
              error={errors.fechaInicio?.message}
              {...register('fechaInicio')}
            />
            <Input
              label="Fecha fin"
              type="datetime-local"
              error={errors.fechaFin?.message}
              {...register('fechaFin')}
            />
          </div>

          {/* PRESUPUESTO */}
          <Input
            label="Presupuesto COP"
            type="number"
            placeholder="Presupuesto COP"
            error={validatedFields.has('presupuestoCop') ? errors.presupuestoCop?.message : undefined}
            {...register('presupuestoCop', {
              onChange: handleFieldChange('presupuestoCop')
            })}
          />

          {/* DESTINO */}
          <div>
            <p className="font-semibold">Destino:</p>
            <div className="flex flex-col gap-1 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="website"
                  {...register('destino', {
                    onChange: (e) => {
                      handleFieldChange('destino')(e);
                      if (e.target.value !== 'website') {
                        clearErrors('websiteUrl');
                        setValidatedFields(prev => {
                          const newSet = new Set(prev);
                          newSet.delete('websiteUrl');
                          return newSet;
                        });
                      }
                    }
                  })}
                />
                Web Site
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="mobileapp"
                  {...register('destino', {
                    onChange: handleFieldChange('destino')
                  })}
                />
                Mobile App
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="messenger"
                  {...register('destino', {
                    onChange: handleFieldChange('destino')
                  })}
                />
                Messenger
              </label>
            </div>
            {validatedFields.has('destino') && errors.destino && (
              <p className="text-red-500 text-sm mt-1">{errors.destino.message}</p>
            )}
          </div>

          {/* WEBSITE URL (CONDICIONAL) */}
          {showWebsiteUrl && (
            <Input
              type="text"
              label="Website URL"
              placeholder="https://tusitio.com"
              error={validatedFields.has('websiteUrl') ? errors.websiteUrl?.message : undefined}
              {...register('websiteUrl', {
                onChange: handleFieldChange('websiteUrl')
              })}
            />
          )}

          {/* PAGO & OBJETIVO DE OPTIMIZACIÓN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Pago por"
              error={errors.pagoPor?.message}
              {...register('pagoPor')}
              options={[
                { label: 'Impressions', value: '1' },
                { label: 'Click(CPC)', value: '2' },
              ]}
            />

            <Select
              label="Objetivo de optimización"
              error={errors.objetivoOptimizacion?.message}
              {...register('objetivoOptimizacion')}
              options={[
                { label: 'Maximize numbers of Link Clicks', value: '1' },
                { label: 'Maximize numbers of Convertions', value: '2' },
                { label: 'Maximize numbers of Impressions', value: '3' },
              ]}
            />
          </div>

          {/* BOTÓN */}
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > validatedFields.size}
              className={`${styles.btnForm} ${isLoading || Object.keys(errors).length > validatedFields.size
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500'
                } text-white px-4 py-2 rounded`}
            >
              {isLoading ? 'Enviando...' : 'Continuar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;