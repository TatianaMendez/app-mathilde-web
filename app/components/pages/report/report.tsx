import React, { useState, useEffect } from "react";
import { ButtonFormat, DateRangePicker } from "ui-mathilde-web";
import SidebarMth from "@components/organisms/sidebar/sidebar-pro";
import { getReportData, type ReportResponse, type ReportRequest } from "@services/dashboardService";
import Swal from 'sweetalert2';

const ATTRIBUTE_OPTIONS = [
  "Campaign",
  "Ip filter list",
  "Creative",
];

const METRIC_OPTIONS = [
  "Clicks",
  "Conversions",
  "Impressions",
  "CTR %",
];

const Report: React.FC = () => {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [campaignSearch, setCampaignSearch] = useState("");

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [metricsDropdownOpen, setMetricsDropdownOpen] = useState(false);

  // Nuevo estado para campañas desde sessionStorage
  const [campaignsFromStorage, setCampaignsFromStorage] = useState<{ name: string }[]>([]);

  // Estado para la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Estado para los datos del reporte
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("campaignDataResumen");
    const dataCampaign = sessionStorage.getItem('dataCampaign');
    let combinedData: any[] = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          combinedData = [...combinedData, ...parsed];
        }
      } catch (e) {
        console.error('Error parsing stored data:', e);
      }
    }

    if (dataCampaign) {
      try {
        const parsedData = JSON.parse(dataCampaign);
        const dataEnd = parsedData.body.campaigns;
        if (Array.isArray(dataEnd)) {
          const transformedData = dataEnd.map(campaign => ({
            name: campaign.name || '',
            platform: campaign.platform || '',
            startDate: campaign.start_date || '',
            endDate: campaign.end_date || '',
            budget: campaign.budget || '0'
          }));
          combinedData = [...combinedData, ...transformedData];
        }
      } catch (e) {
        console.error('Error parsing campaign data:', e);
      }
    }

    // Filtrar campañas únicas por nombre
    const uniqueCampaigns = Array.from(new Map(combinedData.map(item => [item.name, item])).values());
    setCampaignsFromStorage(uniqueCampaigns);
  }, []);

  const handleSelect = (option: string) => {
    if (!selectedAttributes.includes(option)) {
      setSelectedAttributes([...selectedAttributes, option]);
    }
    setDropdownOpen(false);
  };

  const handleRemove = (option: string) => {
    setSelectedAttributes(selectedAttributes.filter(attr => attr !== option));
  };

  const handleSelectMetric = (option: string) => {
    if (!selectedMetrics.includes(option)) {
      setSelectedMetrics([...selectedMetrics, option]);
    }
    setMetricsDropdownOpen(false);
  };

  const handleRemoveMetric = (option: string) => {
    setSelectedMetrics(selectedMetrics.filter(metric => metric !== option));
  };

  // Campaigns filtradas por búsqueda y que no estén seleccionadas
  const filteredCampaigns = campaignsFromStorage.filter(
    c =>
      c.name.toLowerCase().includes(campaignSearch.toLowerCase()) &&
      !selectedCampaigns.includes(c.name)
  );

  const handleSelectCampaign = (name: string) => {
    if (!selectedCampaigns.includes(name)) {
      setSelectedCampaigns([...selectedCampaigns, name]);
    }
    setCampaignSearch("");
  };

  const handleRemoveCampaign = (name: string) => {
    setSelectedCampaigns(selectedCampaigns.filter(c => c !== name));
  };

  const availableOptions = ATTRIBUTE_OPTIONS.filter(opt => !selectedAttributes.includes(opt) && (opt !== "Campaign" || selectedCampaigns.length === 0));
  const availableMetrics = METRIC_OPTIONS.filter(opt => !selectedMetrics.includes(opt));

  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      const requestData: ReportRequest = {
        advertiser: "BANCODEBOGOTA",
        start_date: "01-04-2025",
        end_date: "30-04-2025"
      };

      const response = await getReportData(requestData);
      setReportData(response);
      console.log("Respuesta del servicio:", response);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'Error al obtener el reporte',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      <SidebarMth />
      <div className="min-h-screen w-full bg-gray-100 container-space">
        <div className="flex flex-col h-full">
          <h1 className="font-bold mb-3">REPORTES</h1>

          <div className="flex flex-col bg-white p-5 rounded-md mb-4">
            <div className="flex mb-3 items-center">
              <label className="mr-2">Date Range: </label>
              <DateRangePicker />
            </div>
            <hr />
            <div className="flex my-3 items-center">
              <div className="flex flex-col">             
                <label>Attributes: </label>
                <div className="relative">
                  <span
                    className="py-1 cursor-pointer text-sm text-indigo-500"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    + Add Attribute
                  </span>
                  {dropdownOpen && (
                    <div className="absolute left-0 mt-1 w-48 bg-white border rounded shadow z-10">
                      {availableOptions.length === 0 ? (
                        <div className="px-4 py-2 text-gray-400">Sin opciones</div>
                      ) : (
                        availableOptions.map(option => (
                          <div
                            key={option}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSelect(option)}
                          >
                            {option}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Badges de atributos seleccionados */}
              <div className="flex flex-wrap gap-2 ml-4 items-center">
                {selectedAttributes.map(attr => (
                  <span
                    key={attr}
                    className="bg-blue-100 text-blue-700 pl-3 ml-3 flex items-center text-sm" style={{
                      borderRadius: "1.30rem",
                    }}
                  >
                    {attr}
                    <button
                      className="ml-2 text-blue-700 hover:text-blue-900 font-bold"
                      onClick={() => handleRemove(attr)}
                      aria-label={`Eliminar ${attr}`}
                      type="button"
                    >
                      ×

                     </button>
                    {/* Si el atributo es Campaign, mostrar el buscador justo al lado */}
                    {attr === "Campaign" && (
                      <div className="relative ml-4 w-80">
                        {/* Chips de campañas seleccionadas y el input */}
                        <div className="flex flex-wrap items-center border rounded px-4 py-1 ml-2 bg-white min-h-[40px]" 
                        style={{
                          borderTopRightRadius: "1.25rem",
                          borderBottomRightRadius: "1.25rem"
                        }}>
                          {selectedCampaigns.map(name => (
                            <span
                              key={name}
                              className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center text-xs mr-1 mb-1"
                            >
                              {name}
                              <button
                                className="ml-1 text-purple-700 hover:text-purple-900 font-bold"
                                onClick={() => handleRemoveCampaign(name)}
                                aria-label={`Eliminar campaign ${name}`}
                                type="button"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                          <input
                            type="text"
                            className="flex-1 outline-none border-none px-2 py-1 min-w-[100px] text-gray-900 bg-white"
                            placeholder="Buscar campaign..."
                            value={campaignSearch}
                            onChange={e => setCampaignSearch(e.target.value)}
                          />
                        </div>
                        {/* Dropdown de resultados, fuera del flujo de los chips/input */}
                        {(campaignSearch && filteredCampaigns.length > 0) && (
                          <div
                            className="absolute left-0 top-full mt-2 w-full bg-white border rounded shadow z-10 max-h-40 overflow-y-auto"
                          >
                            {filteredCampaigns.map(c => (
                              <div
                                key={c.name}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                onClick={() => handleSelectCampaign(c.name)}
                              >
                                {c.name}
                              </div>
                            ))}
                          </div>
                        )}
                        {campaignSearch && filteredCampaigns.length === 0 && (
                          <div
                            className="absolute left-0 top-full mt-2 w-full bg-white border rounded shadow z-10"
                          >
                            <div className="px-4 py-2 text-gray-400">No hay coincidencias</div>
                          </div>
                        )}
                      </div>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <hr />
            <div className="flex my-3 items-center">
              <div className="flex flex-col">
                <label>Metrics: </label>
                <div className="relative">
                  <span
                  className="py-1 cursor-pointer text-sm text-indigo-500"
                  onClick={() => setMetricsDropdownOpen(!metricsDropdownOpen)}
                >
                  + Add Metric
                </span>
                {metricsDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-56 bg-white border rounded shadow z-10">
                    {availableMetrics.length === 0 ? (
                      <div className="px-4 py-2 text-gray-400">Sin opciones</div>
                    ) : (
                      availableMetrics.map(option => (
                        <div
                          key={option}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => handleSelectMetric(option)}
                        >
                          {option}
                        </div>
                      ))
                    )}
                  </div>
                )}
                </div>
              </div>
              {/* Badges de métricas seleccionadas */}
              <div className="flex flex-wrap gap-2 ml-4">
                {selectedMetrics.map(metric => (
                  <span
                    key={metric}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center text-sm"
                  >
                    {metric}
                    <button
                      className="ml-2 text-green-700 hover:text-green-900 font-bold"
                      onClick={() => handleRemoveMetric(metric)}
                      aria-label={`Eliminar ${metric}`}
                      type="button"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 w-full items-center justify-end">
              <ButtonFormat
                txtBtn={isLoading ? "Cargando..." : "Generar Reporte"}
                typeButton="default"
                full={false}
                type="button"
                onClick={handleGenerateReport}
                disabled={isLoading}
              />
            </div>
                    
          </div>

          {reportData && (
            <div className="flex flex-col bg-white p-5 rounded-md mb-4">
              <h2 className="font-bold mb-2">Resumen</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold">Impresiones</h3>
                  <p className="text-2xl">{reportData.body.impressions.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold">Clics</h3>
                  <p className="text-2xl">{reportData.body.clicks.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold">Conversiones</h3>
                  <p className="text-2xl">{reportData.body.conversions.toLocaleString()}</p>
                </div>
              </div>

              <h2 className="font-bold mb-2">Campañas</h2>
              <table className="min-w-full border border-gray-300 rounded">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Campaña</th>
                    <th className="border px-4 py-2">Plataforma</th>
                    <th className="border px-4 py-2">Meta</th>
                    <th className="border px-4 py-2">Presupuesto</th>
                    <th className="border px-4 py-2">Cumplimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.body.campaigns.map((campaign) => (
                    <tr key={campaign.name}>
                      <td className="border px-4 py-2">{campaign.name}</td>
                      <td className="border px-4 py-2">{campaign.platform}</td>
                      <td className="border px-4 py-2">{campaign.goal}</td>
                      <td className="border px-4 py-2">{campaign.budget.toLocaleString()}</td>
                      <td className="border px-4 py-2">{campaign.compliance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
