import React, { useState, useEffect } from "react";
import { ButtonFormat, DateRangePicker } from "ui-mathilde-web";
import SidebarMth from "~/components/organisms/sidebar/sidebar-pro";

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
  const [reportData, setReportData] = useState<{
    date: string;
    attributes: string[];
    campaigns: string[];
    metrics: string[];
  } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("campaign_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Accede a la propiedad campaignData
        if (Array.isArray(parsed.campaignData)) {
          setCampaignsFromStorage(parsed.campaignData.filter((c: any) => c.name));
        } else {
          setCampaignsFromStorage([]);
        }
      } catch (e) {
        setCampaignsFromStorage([]);
      }
    }
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

  return (
    <div className="min-h-screen w-full flex">
      <SidebarMth />
      <div className="min-h-screen w-full  bg-gray-100 container-space">
        <div className="flex flex-col h-full ">
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
                  txtBtn="Show report"
                  typeButton="default"
                  full={false}
                  type="button"
                  onClick={() =>
                    setReportData({
                      date: selectedDate,
                      attributes: selectedAttributes,
                      campaigns: selectedCampaigns,
                      metrics: selectedMetrics,
                    })
                  }
                />
            </div>
                    
          </div>

          <div className="flex flex-col bg-white p-5 rounded-md mb-4">
            {reportData && (
              <div>
                <h2 className="font-bold mb-2">Reporte generado</h2>
                <table className="min-w-full border border-gray-300 rounded">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2">Fecha</th>
                      <th className="border px-4 py-2">Campaña</th>
                      {reportData.metrics.map(metric => (
                        <th key={metric} className="border px-4 py-2">{metric}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.campaigns.length > 0 ? (
                      reportData.campaigns.map((campaign) => (
                        <tr key={campaign}>
                          <td className="border px-4 py-2">{reportData.date || "No seleccionada"}</td>
                          <td className="border px-4 py-2">{campaign}</td>
                          {reportData.metrics.map(metric => (
                            <td key={campaign + metric} className="border px-4 py-2 text-center">0</td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="border px-4 py-2">{reportData.date || "No seleccionada"}</td>
                        <td className="border px-4 py-2" colSpan={1 + reportData.metrics.length}>Ninguna campaña seleccionada</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
