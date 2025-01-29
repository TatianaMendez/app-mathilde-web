import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';

const SidebarMth = () => {
  return (

      <div>
        <Sidebar rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#483FFF',
            }
          }}>
          <Menu>
            <MenuItem> Campañas </MenuItem>
            <MenuItem> Audiencias </MenuItem>
            <MenuItem> Reportes </MenuItem>
            <MenuItem> Facturación </MenuItem>
            <MenuItem> Configuración </MenuItem>
          </Menu>
        </Sidebar>
      </div>
  );
};

export default SidebarMth;