import React from "react";
import { useAuth } from "~/services/autenticationService";
import {
  CardIndicator,
  TableComponent,
  MyDoughnutChart,
} from "ui-mathilde-web";
import Sidebar from "@components/organisms/sidebar/sidebar-pro";

// import CardIndicator from "~/components/organisms/card/cardIndicator";
// import { useAuth } from "~/services/authService";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      <div className="min-h-screen container-space">
        <h1 className="font-bold mb-3">DASHBOARD</h1>

        <div className="bg-gray-50 h-full flex">
          <div className="flex flex-col w-2/5">
            <div className="flex">
              <div className="w-3/6 p-3">
                <CardIndicator
                  logo="impresiones"
                  number={80000}
                  title="IMPRESIONES"
                  start={0}
                  end={8000}
                  current={52456}
                />
              </div>
              <div className="w-3/6 p-3">
                <CardIndicator
                  logo="conversiones"
                  number={342}
                  title="CONVERSIONES"
                  start={0}
                  end={342}
                  current={306}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-3/6 p-3">
                <CardIndicator
                  logo="click"
                  number={1236}
                  title="CLICS"
                  start={0}
                  end={1236}
                  current={613}
                />
              </div>
              <div className="w-3/6 p-3">
                <CardIndicator
                  logo="porcentaje"
                  number={2.4}
                  title="CTR"
                  start={0}
                  end={2.4}
                  current={1.03}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-3/6 p-3">
                <CardIndicator
                  logo="vistas"
                  number={236}
                  title="VIEWS"
                  start={0}
                  end={236}
                  current={46}
                />
              </div>
              <div className="w-3/6 p-3">
                <CardIndicator
                  logo="porcentaje"
                  number={1.4}
                  title="VTR"
                  start={0}
                  end={1.4}
                  current={0.94}
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
                      El presupuesto total planeado es de 26.3M, pero solo se ha
                      ejecutado una parte. Considera aumentar la inversión para
                      alcanzar los objetivos de impresiones y conversiones.
                    </li>
                    <li>
                      Las campañas tienen un CTR (Click Through Rate) de 2.4% y
                      un VTR (View Through Rate) de 1.4%. Esto sugiere que hay
                      margen de mejora en la segmentación y creatividad de los
                      anuncios. Realiza pruebas A/B con diferentes creatividades
                      y mensajes para mejorar el rendimiento.
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
                        header: "OBJETIVO",
                        relation: "objective",
                      },
                      {
                        header: "PRESUPUESTO",
                        relation: "budget",
                      },
                      {
                        header: "FECHA INICIO",
                        relation: "startDate",
                      },
                      {
                        header: "FECHA FIN",
                        relation: "endDate",
                      },
                    ]}
                    data={[
                      {
                        name: "CAMPAÑA_BDB_TC",
                        objective: "CONVERSIÓN",
                        budget: "$2.350.000",
                        startDate: "01/02/2025",
                        endDate: "30/03/2025",
                      },
                      {
                        name: "CAMPAÑA_BDB_CLI",
                        objective: "IMPRESIONES",
                        budget: "$720.000",
                        startDate: "10/02/2025",
                        endDate: "15/02/2025",
                      },
                      {
                        name: "CAMPAÑA_BDB_REFERIDOS",
                        objective: "IMPRESIONES",
                        budget: "$480.000",
                        startDate: "10/02/2025",
                        endDate: "15/02/2025",
                      },
                      {
                        name: "CAMPAÑA_BDB_PREENROLADOS",
                        objective: "CONVERSIÓN",
                        budget: "$1.150.000",
                        startDate: "05/02/2025",
                        endDate: "18/02/2025",
                      },
                      {
                        name: "CAMPAÑA_BDB_ALIADOS_TU_PLUS",
                        objective: "IMPRESIONES",
                        budget: "$560.000",
                        startDate: "01/02/2025",
                        endDate: "30/03/2025",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
