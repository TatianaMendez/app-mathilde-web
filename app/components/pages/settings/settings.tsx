import React, { useState } from "react";
import "@styles/styleAtoms.css";
import Sidebar from "@components/organisms/sidebar/sidebar-pro";
import InputForm from "@components/molecules/input/inputForm";
import SelectForm from "@components/molecules/select/selectForm";
import PasswordInput from "@components/molecules/input/passwordInput";
import { RegisterFormService } from "~/services/registerService";
import { Link } from 'react-router-dom';
import ButtonFormat from "~/components/molecules/button/buttonFormat";

const SettingsUser: React.FC = () => {
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
      <div className="min-h-screen w-full container-space">
        <h1 className="font-bold mb-3">CONFIGURACIÓN</h1>
        <div className="flex flex-col h-3/5">
            

          <div className="flex">
            <div className="w-1/5 pr-3 mr-2">
              <h3 className="mt-6">INFORMACIÓN BÁSICA</h3>

              <InputForm
                type="text"
                placeholder="Nombres"
                name="name"
                value={name}
                onChange={(e) =>
                  setformSetting({ ...formSetting, name: e.target.value })
                }
                disabled={!isEditing}
              />

              <InputForm
                type="text"
                placeholder="Apellidos"
                name="firtsName"
                value={firtsName}
                onChange={(e) =>
                  setformSetting({
                    ...formSetting,
                    firtsName: e.target.value,
                  })
                }
                disabled={!isEditing}
              />

              <InputForm
                type="text"
                placeholder="Empresa"
                name="company"
                value={company}
                onChange={(e) =>
                  setformSetting({ ...formSetting, company: e.target.value })
                }
                disabled={!isEditing}
              />

              <SelectForm
                options={roles}
                value={role}
                onChange={(e) =>
                  setformSetting({ ...formSetting, role: e.target.value })
                }
                disabled={!isEditing}
              />

              <h3 className="mt-6">INFORMACIÓN DE CONTACTO</h3>

              <InputForm
                type="number"
                placeholder="Celular"
                name="phone"
                value={phone}
                onChange={(e) =>
                  setformSetting({ ...formSetting, phone: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="w-1/5 ml-2 flex flex-col justify-between">
              <div className="">
                <h3 className="mt-6">INFORMACIÓN CUENTA</h3>
                <InputForm
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setformSetting({ ...formSetting, email: e.target.value })
                  }
                  placeholder="Correo electrónico"
                  disabled={!isEditing}
                />
                <PasswordInput
                  placeholder="Contraseña"
                  disabled
                />
                  <Link to="/reset" className="text-sm mt-8 text-gray-600 cursor-pointer underline" > Actualizar contraseña </Link>
              </div>

            </div>            
          </div>

          <div className="flex">
            <div className="w-2/5">
                  <div className="flex w-full items-center justify-end">
                    {isEditing && (
                      <span onClick={() => setIsEditing(false)} className="mr-3">
                        Cancelar
                      </span>
                    )}
                    <ButtonFormat
                      txtBtn={isEditing ? 'Guardar' : 'Editar'}
                      typeButton={'border'}
                      full={false}
                      type={'button'}
                      disabled={false}
                      className={'ml-3'}
                      onClick={() => setIsEditing(!isEditing)}
                    />
                  </div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default SettingsUser;
