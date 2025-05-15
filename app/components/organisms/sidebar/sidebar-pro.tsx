import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { useState } from 'react';
import { ModalFormat, ImageFormat, Card} from 'ui-mathilde-web';

import { useAuth } from '@services/autenticationService';
import { FaListAlt } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { AiFillPieChart } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoIosExit } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { FaRobot } from "react-icons/fa6";

const SidebarMth = () => {
  const { handleLogout } = useAuth();
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
              icon={<FaRobot className="text-xl" />}
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://pruebasmathilde.com/chatbot-frontend/';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.click();
              }}
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
              Asistente IA 
            </MenuItem>
            <MenuItem 
              icon={<BsFillBoxSeamFill className="text-xl" />}
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://ssp.mathilde-ads.com/login';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.click();
              }}
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
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://dsp.mathilde-ads.com/login';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.click();
              }}
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
            <MenuItem icon={<AiFillPieChart className="text-xl"/>} 
            onClick={() => navigate('/report')}
            className="bg-white my-1 mb-2 mx-3 rounded-md hover:bg-opacity-90" rootStyles={{
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
            <div className='flex justify-center bg-white rounded-md p-2' onClick={handleLogout}>
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
                  <Card imageUrl='https://ftp.mathilde-ads.com/151-ace94cf43477f7394e72ff6819cc621a.svg' title='Medios Propios' description='Crea y administra campañas a los usuarios que ingresan a tus canales.'/>
              </div>
              <div className="w-3/6 p-2 flex">
                <Link to="/summaryCampaign" onClick={() => setActiveModal(null)} >
                  <Card imageUrl='https://ftp.mathilde-ads.com/151-1625a87e98d0195b779465fd1e699481.svg' title='Medios Pagos' description='Activa campañas de Marketing Digital usando inventario de Redes Sociales y Google.'/>
                </Link>
              </div>
            </div>
          </div>
        </ModalFormat>
      </div>
    </div>
  );
};

export default SidebarMth;
