  import React, { useState } from "react";
  import "@styles/styleAtoms.css";
  import Sidebar from "@components/organisms/sidebar/sidebar-pro";
  import InputForm from "@components/molecules/input/inputForm";
  import SelectForm from "@components/molecules/select/selectForm";
  import { RegisterFormService } from "~/services/registerService";
  import ButtonFormat from "~/components/molecules/button/buttonFormat";
  // Icons buttons
  import { FaTiktok } from "react-icons/fa";
  import { FaMeta } from "react-icons/fa6";
  import { SiGoogleads } from "react-icons/si";
  // Menu de navegación
  import TableOfContents from "@components/organisms/table/tableOfContens";
  import { dataThirdParty } from "~/services/thirdPartyService";


  const thirdPartyCampaignForm: React.FC = () => {
    const menuItems = dataThirdParty.getMenuItems();
    const { roles } = RegisterFormService;
    const [isEditing, setIsEditing] = useState(false);
    const [formSetting, setformSetting] = useState({
      name: "",
      firtsName: "",
      company: "",
      phone: "",
      role: "",
      email: "",
    });
    const [isChecked, setIsChecked] = useState(true);
    const [isCheckedOrganizacion, setIsCheckedOrganizacion] = useState(true);
    const [isCheckedLimiteGasto, setIsCheckedLimiteGasto] = useState(true);
    const { name, firtsName, company, phone, role, email } = formSetting;

    return (
      <div className="min-h-screen w-full flex">
        <Sidebar />
        <div className="min-h-screen w-full flex" style={{ padding: "0px 20px 20px 120px" }}>
          <div className="flex w-3/5 flex-col pr-5 container-space-top">
              
              <h1 className="font-bold mb-3">CREACIÓN DE CAMPAÑAS</h1>
              <h3>MEDIOS PAGOS</h3>

              <div className="flex">
                <div className="w-1/2 mb-3">
                  <h3>¿DÓNDE QUIERES PAUTAR?</h3>
                  <div className="inline-flex rounded-md shadow-xs" role="group">
                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                      <FaMeta className="text-blue-700 text-2xl"/>
                    </button>
                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                      <SiGoogleads className="text-blue-700 text-2xl"/>
                    </button>
                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                      <FaTiktok className="text-blue-700 text-2xl"/>
                    </button>
                  </div>
                </div>
                <div className="w-1/2 flex justify-end">
                <label className="inline-flex items-center cursor-pointer">
                  <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                    CAMPAÑAS MASIVAS
                  </span>
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                </label>
                </div>
              </div>
              {isChecked && (
                <>
                  <h3>INFORMACIÓN DE CAMPAÑAS</h3>
                  <div className="block"> 
                    <InputForm
                      type="text"
                      placeholder="Nombre de campaña"
                      name="name"
                      value={name}
                      onChange={(e) =>
                        setformSetting({ ...formSetting, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex w-full gap-4">
                    <div className="w-2/5">
                      <SelectForm
                        name="Estado Inicial"
                        options={roles}
                      />
                    </div>
                    <div className="w-3/5">
                      <SelectForm
                        name="Awareness"
                        options={roles}
                      />
                    </div>
                  </div>
                  <div className="flex w-full gap-4">
                    <div className="w-1/2">
                      <InputForm
                        type="text"
                        placeholder="Selecciona tu cuenta"
                        name="name"
                        value={name}
                        onChange={(e) =>
                          setformSetting({ ...formSetting, name: e.target.value })
                        }
                      />
                    </div>
                  
                  <div className="w-1/2">
                      <SelectForm
                          name="Categoría de anuncio especial"
                          options={roles}
                      />
                  </div>
                  </div>
                </>
              )}

              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3>ORGANIZACIÓN DEL PRESUPUESTO DE CAMPAÑAS</h3>
                </div>
                <div className="w-1/2 flex justify-end">
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isCheckedOrganizacion}
                    onChange={(e) => setIsCheckedOrganizacion(e.target.checked)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                </label>
                </div>
              </div>
              {isCheckedOrganizacion && (
              <section id="organizacion" className="w-full">
                
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <h4>TIPO DE PRESUPUESTO</h4>
                            <SelectForm
                              name="Diario"
                              options={roles}
                            />
                        </div>
                        <div className="w-1/2">
                            <h4>ESTRATEGIA DE PUJA</h4>
                            <SelectForm
                              name="Highest volume"
                              options={roles}
                            />
                        </div>
                    </div>
                    <div className="block"> 
                    <InputForm
                        type="text"
                        placeholder="Presupuesto"
                        name="name"
                        value={name}
                        onChange={(e) =>
                          setformSetting({ ...formSetting, name: e.target.value })
                        }
                      />
                  </div>
              </section>
              )}

              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3>LIMITE DE GASTRO DE CAMPAÑA (OPCIONAL)</h3>
                </div>
                <div className="w-1/2 flex justify-end">
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isCheckedLimiteGasto}
                    onChange={(e) => setIsCheckedLimiteGasto(e.target.checked)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                </label>
                </div>
              </div>
              {isCheckedLimiteGasto && (
              <section className="w-full">
                    <div className="block"> 
                      <h4>CANTIDAD LIMITE</h4>
                      <InputForm
                        type="text"
                        placeholder="Presupuesto"
                        name="name"
                        value={name}
                        onChange={(e) =>
                          setformSetting({ ...formSetting, name: e.target.value })
                        }
                      />
                  </div>
              </section>
              )}

          </div>   
          <div className="flex w-2/5 flex-col pl-5 bg-gray-100 container-space-top">
              <TableOfContents items={menuItems} />
          </div>
        </div>
      </div>
    );
  };

  export default thirdPartyCampaignForm;
