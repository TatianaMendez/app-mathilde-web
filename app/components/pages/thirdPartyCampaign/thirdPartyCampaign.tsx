import React, { useState } from "react";
import "@styles/styleAtoms.css";
import Sidebar from "@components/organisms/sidebar/sidebar-pro";
import InputForm from "@components/molecules/input/inputForm";
import SelectForm from "@components/molecules/select/selectForm";
import PasswordInput from "@components/molecules/input/passwordInput";
import { RegisterFormService } from "~/services/registerService";
import { Link } from 'react-router-dom';
import ButtonFormat from "~/components/molecules/button/buttonFormat";

const thirdPartyCampaignForm: React.FC = () => {
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

  const { name, firtsName, company, phone, role, email } = formSetting;

  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      <div className="min-h-screen w-full" style={{ padding: "20px 20px 20px 100px" }}>
        

        <div className="flex w-3/5 flex-col">
            <section className="w-full">
            <h1 className="font-bold mb-3">CREACIÓN DE CAMPAÑAS</h1>
            <h3>MEDIOS PAGOS</h3>

            <div className="flex">
              <div className="w-1/2">
              
              </div>
              <div className="w-1/2">
              
              </div>
            </div>

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
                        // value={values.role}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                      />
                </div>
                <div className="w-3/5">
                    <SelectForm
                      name="Awareness"
                      options={roles}
                      // value={values.role}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
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
                      // value={values.role}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                    />
              </div>
              </div>
            </section>

            <section className="w-full">
              <h3>ORGANIZACIÓN DEL PRESUPUESTO DE CAMPAÑAS</h3>
                  <div className="flex gap-4">
                      <div className="w-1/2">
                          <h4>TIPO DE PRESUPUESTO</h4>
                          <SelectForm
                            name="Diario"
                            options={roles}
                            // value={values.role}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                          />
                      </div>
                      <div className="w-1/2">
                          <h4>ESTRATEGIA DE PUJA</h4>
                          <SelectForm
                            name="Highest volume"
                            options={roles}
                            // value={values.role}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                          />
                      </div>
                  </div>
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
            </section>

            <section className="w-full">
              <h3>LIMITE DE GASTRO DE CAMPAÑA (OPCIONAL)</h3>
                  <div className="flex gap-4">
                      <div className="w-1/2">
                          <h4>TIPO DE PRESUPUESTO</h4>
                          <SelectForm
                            name="Diario"
                            options={roles}
                            // value={values.role}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                          />
                      </div>
                      <div className="w-1/2">
                          <h4>ESTRATEGIA DE PUJA</h4>
                          <SelectForm
                            name="Highest volume"
                            options={roles}
                            // value={values.role}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                          />
                      </div>
                  </div>
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
            </section>

        </div>   
        <div className="flex w-4/5 flex-col">
          <nav>
            
          </nav>
        </div>
      </div>
    </div>
  );
};

export default thirdPartyCampaignForm;
