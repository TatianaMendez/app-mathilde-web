import type { optionSelect } from "./model/optionSelect";

export const RegisterFormService = {
  roles: [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Gestor de campañas', label: 'Gestor de campañas' },
    { value: 'Analista', label: 'Analista' },
    { value: 'Creativo', label: 'Creativo' },
  ] as optionSelect[],

  getRoles() {
    return this.roles;
  }
};

