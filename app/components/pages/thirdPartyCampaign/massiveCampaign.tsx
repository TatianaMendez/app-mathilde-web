import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/organisms/sidebar/sidebar-pro";
import { ButtonFormat, ListFile, Dropzone, Spinner } from "ui-mathilde-web";
import { FaMeta, FaTiktok } from "react-icons/fa6";
import { SiGoogleads } from "react-icons/si";

// Definimos las interfaces
interface FileState {
  files: File[];
}

interface HeaderRelation {
  header: string;
  relation: string;
}

const HEADER_RELATIONS: HeaderRelation[] = [
  { header: "NOMBRE CAMPAÑAS", relation: "name" },
  { header: "PLATAFORMA", relation: "platform" },
  { header: "FECHA INICIAL", relation: "startDate" },
  { header: "FECHA FINAL", relation: "endDate" },
  { header: "PRESUPUESTO", relation: "budget" },
  { header: "GASTO", relation: "spent" },
  { header: "IMPRESIONES", relation: "impressions" },
  { header: "CMP", relation: "cmp" },
  { header: "CLICS URL", relation: "clicksUrl" },
  { header: "CTR", relation: "ctr" },
  { header: "CPC", relation: "cpc" }
];

const massiveCampaigns: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Corregimos el tipo del evento
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleDeleteFile = (fileToDelete: File) => {
    setFiles((prevFiles) => prevFiles.filter(file => file !== fileToDelete));
  };

  const handleSendFiles = async () => {
    if (files.length === 0) return;

    console.log('Iniciando loading...');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 100));

    const file = files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        console.log('Procesando archivo...');
        const csvText = event.target?.result as string;
        
        await new Promise(resolve => setTimeout(resolve, 2000));
      
        const rows = csvText
          .split('\n')
          .map(row => row.trim())
          .filter(row => row.length > 0);
      
        const headers = rows[0].split(',').map(h => h.trim());
        
        const headerRelations = headers.map(header => {
          const relation = HEADER_RELATIONS.find(rel => rel.header === header);
          return relation || { header, relation: header.toLowerCase().replace(/\s+/g, '') };
        });

        const jsonData = rows.slice(1).map((row, rowIndex) => {
          const values = row.split(',').map(v => v.trim());
          const obj: Record<string, string> = {};
      
          headers.forEach((header, index) => {
            // Usamos la relación correspondiente como clave
            const relation = headerRelations[index].relation;
            obj[relation] = values[index] || '';
          });
      
          if (values.length !== headers.length) {
            console.warn(`Fila ${rowIndex + 2} no coincide con los headers`);
          }
      
          return obj;
        });
      
        console.log('JSON Data:', jsonData);
        console.log('Header Relations:', headerRelations);
      
        if (jsonData.length > 1) {
          navigate('/summaryCampaign', {
            state: { 
              campaignData: jsonData,
              headerRelations: headerRelations
            }
          });
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error al procesar:', error);
        setError(true);
      } finally {
        console.log('Finalizando loading...');
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      console.error('Error al leer el archivo');
      setIsLoading(false);
      setError(true);
    };

    reader.readAsText(file);
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen w-full flex items-center justify-center bg-white">
          <div className="text-center">
            <Spinner description="Estamos trabajando en la <br><strong>creación de tus campañas</strong>" />
          </div>
        </div>
      ) : error ? (
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
                    txtBtn={'Plantilla Meta'}
                    leftIcon={FaMeta}
                    typeButton={'border'}
                    full={false}
                    type={'button'}
                    disabled={false}
                    className={''}
                  />
                  <ButtonFormat
                    txtBtn={'Plantilla Google'}
                    leftIcon={SiGoogleads}
                    typeButton={'border'}
                    full={false}
                    type={'button'}
                    disabled={false}
                    className={''}
                  />
                  <ButtonFormat
                    txtBtn={'Plantilla Tiktok'}
                    leftIcon={FaTiktok}
                    typeButton={'border'}
                    full={false}
                    type={'button'}
                    disabled={false}
                    className={''}
                  />
                </div>
              </div>
              {files.length > 0 && (
                <div className="flex flex-col mb-4">
                  <h3 className="my-4 font-bold">ARCHIVOS CARGADOS </h3>
                  <ListFile files={files} onDelete={handleDeleteFile} />
                  <div className="flex gap-3 w-full items-center justify-end">
                    <ButtonFormat
                      txtBtn="Cancelar"
                      typeButton="border"
                      full={false}
                      type="button"
                      onClick={() => {
                        setFiles([]);
                      }}
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
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default massiveCampaigns;
