import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/organisms/sidebar/sidebar-pro";
import { ButtonFormat, ListFile, Dropzone, Spinner } from "ui-mathilde-web";
import { FaMeta, FaTiktok } from "react-icons/fa6";
import { SiGoogleads } from "react-icons/si";

interface Campaign {
  status: string;
  name: string;
  objective: string;
  special_ad_category: string;
}

interface AdSet {
  status: string;
  name: string;
  budget_type: string;
  budget: number;
  spend_limit_max: number;
  spend_limit_min: number;
  start_time: string;
  end_time: string;
  bid_optimization_goal: string;
  bid_optimization_event: string;
  language: string;
  country: string;
  city: string;
  region: string;
  custom_audience_include: string;
  custom_audience_exclude: string;
  carrier: string;
  so: string;
  placement: string;
}

interface Ad {
  status: string;
  name: string;
  facebook_page_id: string;
  instagram_page_id: string;
  creative_media_url: string;
  destination_url: string;
  call_to_action: string;
  message: string;
  headline: string;
  description: string;
  conversion_pixel: string;
}

interface CampaignData {
  campaign: Campaign[];
  ad_set: AdSet[];
  ads: Ad[];
}

const MassiveCampaigns: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [campaignData, setCampaignData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('Campaign');
    if (stored) {
      setCampaignData(JSON.parse(stored));
    }
  }, []);

  const handleFileChange = (files: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDeleteFile = (fileToDelete: File) => {
    setFiles((prevFiles) => prevFiles.filter(file => file !== fileToDelete));
  };

  const processCSVData = (csvContent: string) => {
    console.log('Procesando archivo CSV:', csvContent);
    
    // Pre-procesar el contenido para manejar saltos de línea dentro de campos
    const preprocessedContent = csvContent
      .replace(/;"[^"]*\n[^"]*"/g, (match) => match.replace(/\n/g, '||'))  // Reemplazar saltos de línea dentro de comillas
      .replace(/\r\n/g, '\n')  // Normalizar saltos de línea
      .replace(/\r/g, '\n');   // Normalizar saltos de línea

    // Dividir por líneas y filtrar líneas vacías
    const rows = preprocessedContent
      .split('\n')
      .filter(row => row.trim())
      .map(row => {
        // Procesar cada fila para manejar campos con comillas
        const fields: string[] = [];
        let field = '';
        let inQuotes = false;
        let expectedFields = 34; // Número esperado de campos
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          
          if (char === '"') {
            if (inQuotes && (row[i + 1] === ';' || i === row.length - 1)) {
              // Fin de un campo entrecomillado
              fields.push(field);
              field = '';
              inQuotes = false;
              if (row[i + 1] === ';') i++; // Saltar el punto y coma
            } else {
              inQuotes = !inQuotes;
              if (!inQuotes && field) {
                fields.push(field);
                field = '';
              }
            }
          } else if (char === ';' && !inQuotes) {
            // Separador fuera de comillas
            fields.push(field);
            field = '';
          } else {
            field += char;
          }
        }
        
        // Agregar el último campo si existe
        if (field || fields.length < expectedFields) {
          fields.push(field);
        }

        // Asegurarse de que tengamos exactamente 34 campos
        while (fields.length < expectedFields) {
          fields.push('');
        }
        
        // Limpiar los campos y restaurar saltos de línea
        return fields.map(f => {
          // Eliminar comillas al inicio y final si existen
          let cleaned = f.trim();
          if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
            cleaned = cleaned.slice(1, -1);
          }
          return cleaned.replace(/\|\|/g, '\n');
        });
      });

    console.log('Número de filas:', rows.length);

    if (rows.length < 3) {
      console.warn('El archivo debe tener al menos 3 filas');
      throw new Error('El archivo debe contener al menos los tipos, campos y un registro de datos');
    }

    const types = rows[0].map(type => type.trim().toLowerCase());
    const fields = rows[1].map(field => field.trim().toLowerCase());
       
    console.log('Tipos:', types);
    console.log('Campos:', fields);

    if (types.length !== fields.length) {
        console.warn('El número de tipos no coincide con el número de campos');
        throw new Error('El formato del archivo no es válido');
      }

    // Detectar si es Google por el campo Platform en la primera fila de datos
    const isGoogle = rows[2][0]?.toLowerCase().includes('google');
    if (isGoogle) {
      const googleCampaigns: any[] = [];
      const googleAdSets: any[] = [];
      const googleAds: any[] = [];

      for (let i = 2; i < rows.length; i++) {
        const values = rows[i];
        const campaignObj: any = {};
        const adSetObj: any = {};
        const adObj: any = {};

        fields.forEach((field, idx) => {
          const type = types[idx];
          const value = values[idx];
          if (!field) return;
          if (type === 'campaign') {
            campaignObj[field] = value;
          } else if (type === 'ad set') {
            adSetObj[field] = value;
          } else if (type === 'ads') {
            adObj[field] = value;
          }
        });

        // Solo agrega si hay datos relevantes
        if (Object.keys(campaignObj).length > 0) googleCampaigns.push(campaignObj);
        if (Object.keys(adSetObj).length > 0) googleAdSets.push(adSetObj);
        if (Object.keys(adObj).length > 0) googleAds.push(adObj);
      }

      console.log('Datos procesados:', { campaignData: googleCampaigns, adSetData: googleAdSets, adData: googleAds });
      return { campaignData: googleCampaigns, adSetData: googleAdSets, adData: googleAds };
    }

    const campaignData: Campaign[] = [];
    const adSetData: AdSet[] = [];
    const adData: Ad[] = [];

    // Procesar filas de datos (desde la tercera fila)
    for (let i = 2; i < rows.length; i++) {
      const values = rows[i];
      const campaignObj: Campaign = {} as Campaign;
      const adSetObj: AdSet = {} as AdSet;
      const adObj: Ad = {} as Ad;
      
      console.log(`Procesando fila ${i + 1}:`, values);

      if (values.length !== fields.length) {
        console.warn(`La fila ${i + 1} tiene ${values.length} valores, se esperaban ${fields.length}`);
        continue;
      }

      types.forEach((type, index) => {
        const field = fields[index];
        const value = values[index];

        if (!field || !value) return;

        try {
          // Mapear los nombres de campos del CSV a los nombres de las interfaces
          const mappedField = field
            .replace(/\s+/g, '_')
            .replace('bid_optimization_goal', 'bid_optimization_goal')
            .replace('bid_billing_event', 'bid_optimization_event')
            .replace('creative_media_url', 'creative_media_url')
            .replace('destination_url', 'destination_url')
            .replace('call_to__action', 'call_to_action')
            .replace('convesion_pixel', 'conversion_pixel')
            .replace('special_ad_category', 'special_ad_category')
            .replace('facebook_page_id', 'facebook_page_id')
            .replace('instagram_page_id', 'instagram_page_id')
            .replace('placements', 'placement')
            .replace('budget_type', 'budget_type');

          console.log(`Procesando campo: ${field} -> ${mappedField} = ${value}`);

          // Determinar a qué objeto pertenece el campo basado en el tipo
          const targetType = type.toLowerCase().trim();

          if (targetType === 'campaign') {
            (campaignObj as any)[mappedField] = value;
          } else if (targetType === 'ad set') {
            // Guardar el valor original de las fechas
            if (['start_time', 'end_time'].includes(mappedField)) {
              (adSetObj as any)[mappedField + '_original'] = value;
            }
            if (['budget', 'spend_limit_max', 'spend_limit_min'].includes(mappedField)) {
              (adSetObj as any)[mappedField] = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
            } else if (['start_time', 'end_time'].includes(mappedField)) {
              const [datePart, timePart] = value.split(' ');
              const [day, month, year] = datePart.split('/');
              (adSetObj as any)[mappedField] = `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}:00`;
            } else {
              (adSetObj as any)[mappedField] = value;
            }
          } else if (targetType === 'ads') {
            (adObj as any)[mappedField] = value;
          }
        } catch (error) {
          console.error(`Error procesando campo ${field} en fila ${i + 1}:`, error);
        }
      });

      // Verificar campos requeridos antes de agregar los objetos
      const hasRequiredCampaignFields = ['status', 'name', 'objective', 'special_ad_category']
        .every(field => {
          const hasField = (campaignObj as any)[field] !== undefined && (campaignObj as any)[field] !== '';
          if (!hasField) console.warn(`Campo requerido faltante en Campaign: ${field}`);
          return hasField;
        });
      
      const hasRequiredAdSetFields = ['status', 'name', 'budget_type', 'budget']
        .every(field => {
          const hasField = (adSetObj as any)[field] !== undefined && (adSetObj as any)[field] !== '';
          if (!hasField) console.warn(`Campo requerido faltante en AdSet: ${field}`);
          return hasField;
        });
      
      const hasRequiredAdFields = ['status', 'name', 'facebook_page_id', 'creative_media_url']
        .every(field => {
          const hasField = (adObj as any)[field] !== undefined && (adObj as any)[field] !== '';
          if (!hasField) console.warn(`Campo requerido faltante en Ad: ${field}`);
          return hasField;
        });

      console.log('Campos de Campaign:', Object.keys(campaignObj), campaignObj);
      console.log('Campos de AdSet:', Object.keys(adSetObj), adSetObj);
      console.log('Campos de Ad:', Object.keys(adObj), adObj);

      console.log('¿Tiene campos requeridos?', {
        campaign: hasRequiredCampaignFields,
        adSet: hasRequiredAdSetFields,
        ad: hasRequiredAdFields
      });

      if (hasRequiredCampaignFields) {
        console.log('Agregando Campaign:', campaignObj);
        campaignData.push(campaignObj);
      }
      if (hasRequiredAdSetFields) {
        console.log('Agregando AdSet:', adSetObj);
        adSetData.push(adSetObj);
      }
      if (hasRequiredAdFields) {
        console.log('Agregando Ad:', adObj);
        adData.push(adObj);
      }
    }

    console.log('Datos procesados:', { campaignData, adSetData, adData });
    const Campaign = { campaignData, adSetData, adData };
    setCampaignData(Campaign);
    return { campaignData, adSetData, adData };
  };

  // Función para transformar campañas Meta
  const transformMetaCampaign = (campaign: any, adSet: any) => ({
    status:
      typeof campaign.status === 'string' && campaign.status.trim().toUpperCase() === 'ACTIVE'
        ? true
        : false,
    name: campaign.name,
    platform: 'META', 
    startDate: adSet?.start_time_original || adSet?.start_time || '',
    endDate: adSet?.end_time_original || adSet?.end_time || '',
    budget: adSet?.budget?.toString() || '0',
    spent: '0',
    impressions: '0',
    cpm: '0',
    clicksUrl: '0',
    ctr: '0',
    cpc: '0'
  });

  // Función para transformar campañas Google
  const transformGoogleCampaign = (row: any) => ({
    status:
      typeof row.status === 'string' && row.status.trim().toUpperCase() === 'ACTIVE'
        ? true
        : false,
    name: row.name || row.campaign_name || '',
    platform: 'GOOGLE',
    startDate: row['start date'] || '',
    endDate: row['end date'] || '',
    budget: row['budget']?.toString() || '0',
    spent: '0',
    impressions: '0',
    cpm: '0',
    clicksUrl: '0',
    ctr: '0',
    cpc: '0'
  });

  const handleSendFiles = async () => {
    if (files.length === 0) return;

    setIsLoading(true);
    setError(false);

    try {
      // Procesar todos los archivos y acumular los resultados transformados
      const allTransformedCampaigns: any[] = [];

      for (const file of files) {
        // Delay artificial para UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        const text = await file.text();
        const { campaignData: campaigns, adSetData: adSets, adData: ads } = processCSVData(text);
        if (campaigns.length === 0 && adSets.length === 0 && ads.length === 0) {
          continue;
        }

        // Detectar plataforma por el primer registro
        const platform = ((campaigns[0] && (campaigns[0]["platform"] || campaigns[0]["Platform"])) || '').trim().toUpperCase();
        if (platform === 'META') {
          // Emparejar campañas y ad sets por índice local
          for (let i = 0; i < campaigns.length; i++) {
            allTransformedCampaigns.push(transformMetaCampaign(campaigns[i], adSets[i]));
          }
        } else if (platform === 'GOOGLE') {
          for (const campaign of campaigns) {
            allTransformedCampaigns.push(transformGoogleCampaign(campaign));
          }
        }
      }

      if (allTransformedCampaigns.length === 0) {
        throw new Error('No se encontraron datos válidos en los archivos');
      }

      // Guardar SIEMPRE la data transformada en sessionStorage
      sessionStorage.setItem('campaignDataResumen', JSON.stringify(allTransformedCampaigns));

      // Delay antes de la navegación
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Datos transformados:', allTransformedCampaigns);

      // Navegar a summaryCampaign con los datos transformados
      navigate('/summaryCampaign', { 
        state: { campaignData: allTransformedCampaigns }
      });
    } catch (error) {
      console.error('Error completo:', error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = (platform: string) => {
    const fileUrl = platform === 'meta' 
      ? 'https://d1h7f3ppz16fle.cloudfront.net/RecursosMathilde/Mathilde-web/files/meta_campaign_template.csv'
      : platform === 'google'
      ? 'https://d1h7f3ppz16fle.cloudfront.net/RecursosMathilde/Mathilde-web/files/google_campaign_template.csv'
      : 'tiktok_campaign_template.csv';

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 min-h-screen w-full flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <Spinner description="Estamos trabajando en la <br><strong>creación de tus campañas</strong>" />
          </div>
        </div>
      )}
      {error ? (
        <div className="min-h-screen w-full flex items-center justify-center bg-white">
          <div className="flex flex-col items-center justify-center bg-white text-center">
            <h3 className="text-xl mb-4">Error al procesar el archivo</h3>
            <ButtonFormat
              txtBtn="Volver a intentar"
              typeButton="default"
              full={false}
              type="button"
              onClick={() => {
                setError(false);
                setFiles([]);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full flex">
          <Sidebar />
          <div className="min-h-screen w-full container-space">
            <section className="w-2/3">
              <div className="block">
                <h1 className="font-bold" style={{ marginBottom: '0px !important' }}>CREACIÓN DE CAMPAÑAS</h1>
                <h3 className="font-normal mb-4">MEDIOS PAGOS</h3>
                <h3 className="font-bold mb-4">CREAR CAMPAÑAS DE FORMA MASIVA EN LAS DIFERENTES PLATAFORMAS</h3>
                <div className="mb-4">
                  <Dropzone accept='text/csv' multiple={true} onChange={handleFileChange} />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <h3 className="mb-4">DESCARGA LAS PLANTILLAS DEL FEED DE DATOS</h3>
                <div className="flex gap-3">
                  <ButtonFormat
                    txtBtn="Plantilla Meta"
                    leftIcon={FaMeta}
                    typeButton="border"
                    full={false}
                    type="button"
                    disabled={false}
                    onClick={() => handleDownloadTemplate('meta')}
                  />
                  <ButtonFormat
                    txtBtn="Plantilla Google"
                    leftIcon={SiGoogleads}
                    typeButton="border"
                    full={false}
                    type="button"
                    disabled={false}
                    onClick={() => handleDownloadTemplate('google')}
                  />
                </div>
              </div>
                {
                  files.length === 0 ? (
                    <div className="flex gap-3 w-full items-center justify-end">
                      <ButtonFormat
                        txtBtn="Regresar"
                        typeButton="border"
                        full={false}
                        type="button"
                        onClick={() => navigate('/summaryCampaign')}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col mb-4">
                      <h3 className="my-4 font-bold">ARCHIVOS CARGADOS </h3>
                      <ListFile files={files} onDelete={handleDeleteFile} />
                      <div className="flex gap-3 w-full items-center justify-end">
                        <ButtonFormat
                          txtBtn="Cancelar"
                          typeButton="border"
                          full={false}
                          type="button"
                          onClick={() => setFiles([])}
                        />
                        <ButtonFormat
                          txtBtn="Siguiente"
                          typeButton="default"
                          full={false}
                          type="button"
                          onClick={handleSendFiles}
                        />
                      </div>
                    </div>
                  )
                }
              
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default MassiveCampaigns;
