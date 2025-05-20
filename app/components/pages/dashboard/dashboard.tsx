import React,{ useState, useEffect, useCallback } from "react";
import {
  CardIndicator,
  TableComponent,
  MyDoughnutChart,
  DateRangePicker,
  SelectForm,
} from "ui-mathilde-web";
import Sidebar from "@components/organisms/sidebar/sidebar-pro";
import { dataAdvertiser } from "@services/dashboardService";
import { getReportData, type ReportResponse, type ReportRequest } from "@services/dashboardService";
import Swal from 'sweetalert2';
import { format, parse } from 'date-fns';

interface DateRangePickerProps {
  onChange?: (start: Date, end: Date) => void;
  minData?: Date;
  maxData?: Date;
}

interface DoughnutChartProps {
  data: {
    ordered: number;
    invested: number;
  };
}

const Dashboard: React.FC = () => {
  const [selectedAdvertiser, setSelectedAdvertiser] = useState('BANCODEBOGOTA');
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: parse('01-04-2025', 'dd-MM-yyyy', new Date()),
    endDate: parse('30-04-2025', 'dd-MM-yyyy', new Date())
  });

  const handleDateChange = (start: Date, end: Date) => {
    setDateRange({ startDate: start, endDate: end });
    const formattedStart = format(start, 'dd-MM-yyyy');
    const formattedEnd = format(end, 'dd-MM-yyyy');
    fetchReportData(formattedStart, formattedEnd);
  };

  const fetchReportData = useCallback(async (startDate?: string, endDate?: string) => {
    try {
      setLoading(true);
      const requestData: ReportRequest = {
        advertiser: selectedAdvertiser,
        start_date: startDate || '01-04-2025',
        end_date: endDate || '30-04-2025'
      };

      const response = await getReportData(requestData);
      setReportData(response);
      console.log(response); 
      sessionStorage.setItem('dataCampaign',  JSON.stringify(response));

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'Error al obtener los datos',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [selectedAdvertiser, dateRange]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchReportData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchReportData]);

  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <p>Cargando datos...</p>
        </div>
      );
    }

    if (!reportData?.body) {
      return (
        <div className="flex justify-center items-center h-full">
          <p>No hay datos disponibles</p>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 h-full flex">
        <div className="flex flex-col w-2/5">
          <div className="flex">
            <div className="w-3/6 p-3">
              <CardIndicator
                logo="impresiones"
                number={reportData.body.impressions || 0}
                title="IMPRESIONES"
                start={0}
                end={reportData.body.impressions || 0}
                current={reportData.body.impressions || 0}
              />
            </div>
            <div className="w-3/6 p-3">
              <CardIndicator
                logo="conversiones"
                number={reportData.body.conversions || 0}
                title="CONVERSIONES"
                start={0}
                end={reportData.body.conversions || 0}
                current={reportData.body.conversions || 0}
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-3/6 p-3">
              <CardIndicator
                logo="click"
                number={reportData.body.clicks || 0}
                title="CLICS"
                start={0}
                end={reportData.body.clicks || 0}
                current={reportData.body.clicks || 0}
              />
            </div>
            <div className="w-3/6 p-3">
              <CardIndicator
                logo="porcentaje"
                number={reportData.body.crt || 0}
                title="CTR"
                start={0}
                end={reportData.body.crt || 0}
                current={reportData.body.crt || 0}
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-3/6 p-3">
              <CardIndicator
                logo="vistas"
                number={reportData.body.views || 0}
                title="VIEWS"
                start={0}
                end={reportData.body.views || 0}
                current={reportData.body.views || 0}
              />
            </div>
            <div className="w-3/6 p-3">
              <CardIndicator
                logo="porcentaje"
                number={reportData.body.vrt || 0}
                title="VTR"
                start={0}
                end={reportData.body.vrt || 0}
                current={reportData.body.vrt || 0}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-3/5">
          <div className="flex">
            <div className="w-3/6 p-3">
              <div className="border bg-white p-3 h-full flex flex-col">
                <h2 className="my-3 font-bold">PRESUPUESTO</h2>
                <div className="flex-1 flex items-end w-full">
                  <MyDoughnutChart />
                </div>
              </div>
            </div>
            <div className="w-3/6 p-3">
              <div className="border bg-white p-3">
                <h2 className="my-3 font-bold">RECOMENDACIONES</h2>
                <ul className="list">
                  <li>
                    El presupuesto total planeado es de {reportData.body.budget?.ordered_budget || 0}, pero solo se ha
                    ejecutado {reportData.body.budget?.invested_budget || 0}. Considera aumentar la inversión para
                    alcanzar los objetivos de impresiones y conversiones.
                  </li>
                  <li>
                    Las campañas tienen un CTR (Click Through Rate) de {reportData.body.crt || 0}% y
                    un VTR (View Through Rate) de {reportData.body.vrt || 0}%. Esto sugiere que hay
                    margen de mejora en la segmentación y creatividad de los
                    anuncios.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-full p-3">
              <div className="border bg-white h-full p-3">
                <h2 className="my-3 font-bold">RESUMEN DE CAMPAÑAS</h2>
                <TableComponent
                  columns={[
                    {
                      header: "NOMBRE",
                      relation: "name",
                    },
                    {
                      header: "PLATAFORMA",
                      relation: "platform",
                    },
                    {
                      header: "OBJETIVO",
                      relation: "goal",
                    },
                    {
                      header: "PRESUPUESTO",
                      relation: "budget",
                    },
                    {
                      header: "FECHA INICIO",
                      relation: "start_date",
                    },
                    {
                      header: "FECHA FIN",
                      relation: "end_date",
                    },
                    {
                      header: "CUMPLIMIENTO",
                      relation: "compliance",
                    }
                  ]}
                  data={reportData.body.campaigns?.map(campaign => ({
                    ...campaign,
                    id: campaign.name // Usando el nombre como id temporal
                  })) || []}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      <div className="min-h-screen container-space w-full">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold mb-3">DASHBOARD</h1>
          <div className="flex gap-3">
            <SelectForm
              name="advertiser"
              options={dataAdvertiser.getAdvertiser()}
              value={selectedAdvertiser}
              onChange={(e) => setSelectedAdvertiser(e.target.value)}
            />
            <DateRangePicker 
              onChange={handleDateChange}
            />
          </div>
        </div>
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Dashboard;
