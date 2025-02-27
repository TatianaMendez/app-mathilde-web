import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { useAuth } from '~/services/autenticationService';
import { useState } from 'react';
import ModalFormat from '@components/organisms/modal/modalFormat';
import ImageFormat from '../../molecules/image/imageFormat';
import CardFormat from '../card/cardFormat';

const imagesPath = import.meta.env.VITE_MICROFRONENT_URL;

const SidebarMth = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Manejadores para el hover del sidebar
  const handleMouseEnter = () => {
    if (!activeModal) {
      setCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (!activeModal) {
      setCollapsed(true);
    }
  };

  // Manejador para abrir/cerrar modales
  const handleModalToggle = (modalName: string) => {
    setActiveModal(activeModal === modalName ? null : modalName);
  };

  return (
    <div className="fixed top-0 left-0 h-full z-40"> {/* Ajusta el z-index del sidebar */}
      <div className='flex flex-col' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Sidebar 
          collapsed={collapsed}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#483FFF',
              color: 'white',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <div> 
             <ImageFormat classIm='mx-auto' src={`${imagesPath}/assets/images/logo mathilde.png`} alt='Logo Mathilde ads' width={74} height={74}/>
          </div>
          <Menu>
            <MenuItem onClick={() => handleModalToggle('campanas')}> Campañas </MenuItem>
            <MenuItem onClick={() => handleModalToggle('medios')}> Medios </MenuItem>
            <MenuItem onClick={() => handleModalToggle('audiencias')}> Audiencias </MenuItem>
            <MenuItem onClick={() => handleModalToggle('reportes')}> Reportes </MenuItem>
            <MenuItem onClick={() => handleModalToggle('facturacion')}> Facturación </MenuItem>
            <MenuItem onClick={() => handleModalToggle('configuracion')}> Configuración </MenuItem>
          </Menu>

          <div className='mt-auto self-end p-4'>
            <button onClick={logout} className="text-white">Cerrar sesión</button>
          </div>
        </Sidebar>

        {/* Modales */}
        <ModalFormat width="40%" isOpen={activeModal === 'campanas'} onClose={() => setActiveModal(null)}>
          <div className='flex flex-col p-10'>
            <h2 className='text-center font-bold mb-3'>Selecciona el tipo de campaña que quieres crear</h2>
            <div className='flex'>
              <div className="w-3/6 p-2">
                  <CardFormat image='medios-propios' title='Medios Propios' description='Crea y administra campañas a los usuarios que ingresan a tus canales.'/>
              </div>
              <div className="w-3/6 p-2">
                  <CardFormat image='medios-pagos' title='Medios Pagos' description='Activa campañas de Marketing Digital usando inventario de Redes Sociales y Google.'/>
              </div>
            </div>
          </div>
        </ModalFormat>

        <ModalFormat isOpen={activeModal === 'medios'} onClose={() => setActiveModal(null)}>
          <h2>Medios</h2>
          {/* Contenido del modal de medios */}
        </ModalFormat>

        <ModalFormat isOpen={activeModal === 'audiencias'} onClose={() => setActiveModal(null)}>
          <h2>Audiencias</h2>
          {/* Contenido del modal de audiencias */}
        </ModalFormat>

        <ModalFormat isOpen={activeModal === 'reportes'} onClose={() => setActiveModal(null)}>
          <h2>Reportes</h2>
          {/* Contenido del modal de reportes */}
        </ModalFormat>

        <ModalFormat isOpen={activeModal === 'facturacion'} onClose={() => setActiveModal(null)}>
          <h2>Facturación</h2>
          {/* Contenido del modal de facturación */}
        </ModalFormat>

        <ModalFormat isOpen={activeModal === 'configuracion'} onClose={() => setActiveModal(null)}>
          <h2>Configuración</h2>
          {/* Contenido del modal de configuración */}
        </ModalFormat>
      </div>
    </div>
  );
};

export default SidebarMth;
