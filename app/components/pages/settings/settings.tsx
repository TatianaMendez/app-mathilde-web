import React, { useState } from "react";
import "@styles/styleAtoms.css";
import Sidebar from "@components/organisms/sidebar/sidebar-pro";
import InputForm from "@components/molecules/input/inputForm";
import SelectForm from "@components/molecules/select/selectForm";
import PasswordInput from "@components/molecules/input/passwordInput";
import { RegisterFormService } from "~/services/registerService";

const SettingsUser: React.FC = () => {
  const { roles } = RegisterFormService;
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
      <div className="min-h-screen" style={{ padding: "20px 20px 20px 100px" }}>
        <h1 className="font-bold mb-3">CONFIGURACIÓN</h1>
        <div className="flex flex-col">
            

          <div className="flex justify-between">
            <div className="w-2/4 mr-2">
              <h2>INFORMACIÓN BÁSICA</h2>

              <InputForm
                type="text"
                placeholder="Nombres"
                name="name"
                value={name}
                onChange={(e) =>
                  setformSetting({ ...formSetting, name: e.target.value })
                }
                required
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
                required
              />

              <InputForm
                type="text"
                placeholder="Empresa"
                name="company"
                value={company}
                onChange={(e) =>
                  setformSetting({ ...formSetting, company: e.target.value })
                }
                required
              />

              <SelectForm
                options={roles}
                value={role}
                onChange={(e) =>
                  setformSetting({ ...formSetting, role: e.target.value })
                }
              />

              <h2>INFORMACIÓN DE CONTACTO</h2>

              <InputForm
                type="number"
                placeholder="Celular"
                name="phone"
                value={phone}
                onChange={(e) =>
                  setformSetting({ ...formSetting, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="w-2/4 ml-2">
              <h2>INFORMACIÓN CUENTA</h2>

              <InputForm
                type="email"
                value={email}
                onChange={(e) =>
                  setformSetting({ ...formSetting, email: e.target.value })
                }
                placeholder="Correo electrónico"
                required
              />

              <PasswordInput
                placeholder="Contraseña"
              />

            </div>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default SettingsUser;
