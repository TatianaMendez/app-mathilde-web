import React, { useState, useEffect } from "react";
import Sidebar from "@components/organisms/sidebar/sidebar-pro";
import { ButtonFormat, CardFormat, ModalFormat, TableComponent } from "ui-mathilde-web";
import { SiGoogleads } from "react-icons/si";
import { FaMeta } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BsStack } from 'react-icons/bs';
// import { tableColumns, campaignData } from '@services/paidMediaService';
import { tableColumns } from '@services/paidMediaService';

const summaryCampaign: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [campaignData, setCampaignData] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'META' | 'GOOGLE' | 'TIKTOK'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  useEffect(() => {
    const locationData = location.state as { campaignData: any[] } | undefined;
    const initialData = locationData?.campaignData || [];
    console.log('Inicializando campaignData:', initialData);
    setCampaignData(initialData);
  }, [location.state]);
  
  const toggleModal = () => setIsModalOpen(prev => !prev);

  const getFilteredData = (): Record<string, any>[] => {
    if (activeFilter === 'all') {
      return campaignData;
    }
    return campaignData.filter((item: any) => item.platform === activeFilter);
  };

  // Modificamos la función de filtrado para resetear la página
  const handleFilterChange = (filter: 'all' | 'META' | 'GOOGLE' | 'TIKTOK') => {
    setActiveFilter(filter);
    setCurrentPage(1); 
  };

  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      <div className="min-h-screen w-full container-space">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="font-bold" style={{ marginBottom: '0px !important' }}>CAMPAÑAS</h1>
            <h3>MEDIOS PAGOS</h3>
          </div>
          <div className="flex gap-3">
            <ButtonFormat
              txtBtn={'CREAR CAMPAÑA'}
              typeButton={'default'}
              full={false}
              type={'button'}
              onClick={toggleModal}
            />
                        
            <div className="inline-flex rounded-md shadow-xs" role="group">
              <button 
                type="button" 
                className={`px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeFilter === 'all' ? 'bg-blue-50' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                <BsStack className={`text-2xl ${activeFilter === 'all' ? 'text-blue-700' : 'text-gray-500'}`}/>
              </button>
              <button 
                type="button" 
                className={`px-3 py-2 text-sm font-medium text-gray-900 bg-white border-r border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeFilter === 'META' ? 'bg-blue-50' : ''}`}
                onClick={() => setActiveFilter('META')}
              >
                <FaMeta className={`text-2xl ${activeFilter === 'META' ? 'text-blue-700' : 'text-gray-500'}`}/>
              </button>
              <button 
                type="button" 
                className={`px-3 py-2 text-sm font-medium text-gray-900 bg-white border-l border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeFilter === 'GOOGLE' ? 'bg-blue-50' : ''}`}
                onClick={() => setActiveFilter('GOOGLE')}
              >
                <SiGoogleads className={`text-2xl ${activeFilter === 'GOOGLE' ? 'text-blue-700' : 'text-gray-500'}`}/>
              </button>
              <button 
                type="button" 
                className={`px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeFilter === 'TIKTOK' ? 'bg-blue-50' : ''}`}
                onClick={() => setActiveFilter('TIKTOK')}
              >
                <FaTiktok className={`text-2xl ${activeFilter === 'TIKTOK' ? 'text-blue-700' : 'text-gray-500'}`}/>
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          <TableComponent 
            key={activeFilter}
            showSearch={true} 
            itemsPerPage={4}
            columns={tableColumns}
            data={getFilteredData()}
          />
        </div>
      </div>

      <ModalFormat width="40%" isOpen={isModalOpen} onClose={toggleModal}>
          <div className='flex flex-col px-10 pb-5'>
            <h2 className='text-center font-bold mb-3'>SELECCIONA UNA OPCIÓN PARA CREAR TU CAMPAÑA</h2>
            <div className='flex'>
              <div className="w-3/6 p-2 flex">
              <Link to="/thirdPartyCampaign">
                  <CardFormat image={{"type": "image", "name": 'window'}} title='Campañas manuales' description=''/>
              </Link>
              </div>
              <div className="w-3/6 p-2 flex">
              <Link to="/massiveCampaign">
                  <CardFormat image={{"type": "image", "name": 'robot'}} title='Campañas masivas' description=''/>
              </Link>
              </div>
            </div>
          </div>
        </ModalFormat>
        
    </div>
  );
};

export default summaryCampaign;
