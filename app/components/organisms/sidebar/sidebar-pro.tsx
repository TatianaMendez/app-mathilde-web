import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { useState } from 'react';
import { ModalFormat, ImageFormat, CardFormat} from 'ui-mathilde-web';

import { useAuth } from '@services/autenticationService';
const imagesPath = import.meta.env.VITE_MICROFRONENT_URL;
import { FaListAlt } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { AiFillPieChart } from "react-icons/ai";
import { BsFillFileTextFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoIosExit } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const SidebarMth = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const navigate = useNavigate();

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
          <div className='mt-5 mb-2'> 
            <Link to="/dashboard">
              <ImageFormat classIm='mx-3' src='https://ftp.mathilde-ads.com/151-5f18f5b0ce0f79b3c7e3ffbd4828ec14.png' alt='Logo Mathilde ads' width={58} height={58}/>
            </Link>
          </div>
          <Menu>
            <MenuItem 
              icon={<FaListAlt className="text-xl" />}
              onClick={() => handleModalToggle('campanas')}
              className="bg-white my-1 mb-2 mx-3 rounded-md hover:bg-opacity-90"
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
            > 
              Campañas 
            </MenuItem>
            <MenuItem 
              icon={<BsFillBoxSeamFill className="text-xl" />}
              onClick={() => window.open('https://ssp.mathilde-ads.com/login', '_blank')}
              className="bg-white my-1 mb-2 mx-3 rounded-md hover:bg-opacity-90"
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
            > 
              Medios 
            </MenuItem>
            <MenuItem 
              icon={<FaUsers className="text-xl" />} 
              onClick={() => window.open('https://dsp.mathilde-ads.com/login', '_blank')}
              className="bg-white my-1 mb-2 mx-3 rounded-md hover:bg-opacity-90"
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
            <MenuItem icon={<AiFillPieChart className="text-xl"/>} onClick={() => handleModalToggle('reportes')} className="bg-white my-1 mb-2 mx-3 rounded-md hover:bg-opacity-90" rootStyles={{
              button: {
                width: collapsed ? 'calc(100% - 0.5rem)' : 'calc(100% - 1rem)',
                margin: collapsed ? '0 0.25rem' : '0 0.5rem',
                color: '#483FFF',
                '&:hover': {
                  color: '#483FFF',
                },
              },
            }}> Reportes </MenuItem>
           <MenuItem 
              icon={<IoSettingsSharp className="text-xl"/>} 
              onClick={() => navigate('/settings')}
              className="bg-white my-1 mb-2 mx-3 rounded-md hover:bg-opacity-90" 
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
            >  
              Configuración 
            </MenuItem>
          </Menu>

          <div className='mt-auto self-end p-4 w-full cursor-pointer'>
            <div className='flex justify-center bg-white rounded-md p-2' onClick={logout}>
              <button className='text-3xl' style={{ color: '#483FFF' }} ><IoIosExit /></button>
          </div>
          </div>
        </Sidebar>

        {/* Modales */}
        <ModalFormat width="40%" isOpen={activeModal === 'campanas'} onClose={() => setActiveModal(null)}>
          <div className='flex flex-col px-10 pb-5'>
            <h2 className='text-center font-bold mb-3'>Selecciona el tipo de campaña que quieres crear</h2>
            <div className='flex'>
              <div className="w-3/6 p-2 flex" onClick={() => window.open('https://dsp.mathilde-ads.com/login', '_blank')}>
                  <CardFormat image={{"type": "image", "name": 'medios-propios'}} title='Medios Propios' description='Crea y administra campañas a los usuarios que ingresan a tus canales.'/>
              </div>
              <div className="w-3/6 p-2 flex">
              <Link to="/summaryCampaign">
                  <CardFormat image={{"type": "image", "name": 'medios-pagos'}}  title='Medios Pagos' description='Activa campañas de Marketing Digital usando inventario de Redes Sociales y Google.'/>
              </Link>
              </div>
            </div>
          </div>
        </ModalFormat>

        <ModalFormat isOpen={activeModal === 'audiencias'} onClose={() => setActiveModal(null)}>
          <h2>Audiencias</h2>
          {/* Contenido del modal de audiencias */}
        </ModalFormat>

        <ModalFormat isOpen={activeModal === 'reportes'} onClose={() => setActiveModal(null)}>
          <h2>Reportes</h2>
          {/* Contenido del modal de reportes */}
        </ModalFormat>
      </div>
    </div>
  );
};

export default SidebarMth;
