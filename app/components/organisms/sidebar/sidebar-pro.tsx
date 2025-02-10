import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { useAuth } from '~/hooks/useAutentication';

const SidebarMth = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#483FFF',
          },
        }}
      >
        <Menu>
          <MenuItem> Campañas </MenuItem>
          <MenuItem> Audiencias </MenuItem>
          <MenuItem> Reportes </MenuItem>
          <MenuItem> Facturación </MenuItem>
          <MenuItem> Configuración </MenuItem>
        </Menu>
      </Sidebar>

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default SidebarMth;
