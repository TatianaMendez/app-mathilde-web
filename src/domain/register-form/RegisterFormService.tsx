import type { optionSelect } from "./model/optionSelect";

export const RegisterFormService = {
  roles: [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Anunciante', label: 'Anunciante' },
    { value: 'Account Manager', label: 'Account Manager' },
    { value: 'Diseñador', label: 'Diseñador' },
  ] as optionSelect[],

  getRoles() {
    return this.roles;
  }
};

