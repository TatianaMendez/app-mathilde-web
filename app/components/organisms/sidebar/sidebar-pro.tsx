import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { useState } from 'react';
import ModalFormat from '@components/organisms/modal/modalFormat';
import ImageFormat from '../../molecules/image/imageFormat';
import CardFormat from '../card/cardFormat';
import Logout from '~/components/molecules/button/logout';
const imagesPath = import.meta.env.VITE_MICROFRONENT_URL;
import { FaListAlt } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { AiFillPieChart } from "react-icons/ai";
import { BsFillFileTextFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

const SidebarMth = () => {
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
    <div className="fixed top-0 left-0 h-full z-40"> 
      <div className='flex flex-col' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Sidebar 
          collapsed={collapsed}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#483FFF',
              color: '#483FFF',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Link to="/dashboard">
          <div> 
             <ImageFormat classIm='mx-auto' src={`${imagesPath}/assets/images/logo mathilde.png`} alt='Logo Mathilde ads' width={74} height={74}/>
          </div>
          </Link>
          <Menu>
            <MenuItem 
              icon={<FaListAlt className="text-2xl" />}
              onClick={() => handleModalToggle('campanas')}
              className="bg-white my-1 mx-2 rounded-lg hover:bg-opacity-90"
              rootStyles={{
                button: {
                  width: collapsed ? 'calc(100% - 0.5rem)' : 'calc(100% - 1rem)',
                  margin: collapsed ? '0 0.25rem' : '0 0.5rem',
                  color: '#483FFF',
                  '&:hover': {
                    color: '#483FFF',
                  },
                },
              }}
            > Campañas </MenuItem>
            <MenuItem 
              icon={<BsFillBoxSeamFill className="text-xl" />}
              onClick={() => handleModalToggle('medios')}
              className="bg-white my-1 mx-2 rounded-lg hover:bg-opacity-90"
              rootStyles={{
                button: {
                  width: collapsed ? 'calc(100% - 0.5rem)' : 'calc(100% - 1rem)',
                  margin: collapsed ? '0 0.25rem' : '0 0.5rem',
                  color: '#483FFF',
                  '&:hover': {
                    color: '#483FFF',
                  },
                },
              }}
            > Medios </MenuItem>
            <MenuItem 
              icon={<FaUsers className="text-xl" />} 
              onClick={() => handleModalToggle('audiencias')}
              className="bg-white my-1 mx-2 rounded-lg hover:bg-opacity-90"
              rootStyles={{
                button: {
                  width: collapsed ? 'calc(100% - 0.5rem)' : 'calc(100% - 1rem)',
                  margin: collapsed ? '0 0.25rem' : '0 0.5rem',
                  color: '#483FFF',
                  '&:hover': {
                    color: '#483FFF',
                  },
                },
              }}
            > Audiencias </MenuItem>
            <MenuItem icon={<AiFillPieChart className="text-xl"/>} onClick={() => handleModalToggle('reportes')} className="bg-white my-1 mx-2 rounded-lg hover:bg-opacity-90" rootStyles={{
              button: {
                width: collapsed ? 'calc(100% - 0.5rem)' : 'calc(100% - 1rem)',
                margin: collapsed ? '0 0.25rem' : '0 0.5rem',
                color: '#483FFF',
                '&:hover': {
                  color: '#483FFF',
                },
              },
            }}> Reportes </MenuItem>
            <MenuItem icon={<BsFillFileTextFill className="text-xl"/>} onClick={() => handleModalToggle('facturacion')} className="bg-white my-1 mx-2 rounded-lg hover:bg-opacity-90" rootStyles={{
              button: {
                width: collapsed ? 'calc(100% - 0.5rem)' : 'calc(100% - 1rem)',
                margin: collapsed ? '0 0.25rem' : '0 0.5rem',
                color: '#483FFF',
                '&:hover': {
                  color: '#483FFF',
                },
              },
            }}> Facturación </MenuItem>
           <Link to="/configuration">
           <MenuItem icon={<IoSettingsSharp className="text-xl"/>} className="bg-white my-1 mx-2 rounded-lg hover:bg-opacity-90" rootStyles={{
              button: {
                width: collapsed ? 'calc(100% - 0.5rem)' : 'calc(100% - 1rem)',
                margin: collapsed ? '0 0.25rem' : '0 0.5rem',
                color: '#483FFF',
                '&:hover': {
                  color: '#483FFF',
                },
              },
            }}>  Configuración </MenuItem>
            </Link>
          </Menu>

          <div className='mt-auto self-end p-4'>
            <Logout/>
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
