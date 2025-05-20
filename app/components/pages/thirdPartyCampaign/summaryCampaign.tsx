import React, { useState, useEffect } from "react";
import Sidebar from "@components/organisms/sidebar/sidebar-pro";
import { ButtonFormat, Card, ModalFormat, TableComponent } from "ui-mathilde-web";
import { SiGoogleads } from "react-icons/si";
import { FaMeta } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { BsStack } from 'react-icons/bs';
// import { tableColumns, campaignData } from '@services/paidMediaService';
import { tableColumns } from '@services/paidMediaService';

interface CampaignWithId extends Record<string, any> {
  id: string;
  status: boolean;
  name: string;
  platform: string;
}

const SummaryCampaign: React.FC = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<'all' | 'META' | 'GOOGLE' | 'TIKTOK'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [localData, setLocalData] = useState<CampaignWithId[]>([]);
  
  useEffect(() => {
    let dataCampaign = sessionStorage.getItem('dataCampaign'); 
    const allTransformedCampaigns: any[] = [];

    function getRandomIntInRange(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } 

    const transformMetaCampaign = (dataCampaign: any) => ({
      status: true,
      name: dataCampaign.name || '',
      platform: dataCampaign.platform || '',
      startDate: dataCampaign.start_date || '',
      endDate: dataCampaign.end_date || '',
      budget: dataCampaign.budget || '0',
      spent: getRandomIntInRange(1, 99999),
      impressions: getRandomIntInRange(1, 99999),
      cpm: getRandomIntInRange(1, 99999),
      clicksUrl: getRandomIntInRange(1, 99999),
      ctr: getRandomIntInRange(1, 99999),
      cpc: getRandomIntInRange(1, 99999)
    });

    if (dataCampaign) {
      const parsedData = JSON.parse(dataCampaign);
      const dataEnd = parsedData.body.campaigns; 
      for (let i = 0; i < 6; i++) {
        allTransformedCampaigns.push(transformMetaCampaign(dataEnd[i]));
      }
    }
 
    let initialData: any[] = [];
    const locationData = location.state as { campaignData: any[] } | undefined;
    if (locationData?.campaignData) {
      initialData = locationData.campaignData;
      sessionStorage.setItem('campaignDataResumen', JSON.stringify(initialData));
    } else {
      const stored = sessionStorage.getItem('campaignDataResumen');
      if (stored) {
        initialData = JSON.parse(stored);
      }
    }

    // Combinar los datos transformados con los datos existentes
    const combinedData = [...initialData, ...allTransformedCampaigns];

    // Asignar IDs únicos a cada campaña
    const dataWithIds = combinedData.map((item, index) => ({
      ...item,
      id: `${item.name}-${item.platform}-${index}`
    }));
    setLocalData(dataWithIds);
  }, [location.state]);

  
  const toggleModal = () => setIsModalOpen(prev => !prev);

  const getFilteredData = (): CampaignWithId[] => {
    if (activeFilter === 'all') {
      return localData;
    }
    return localData.filter((item) => item.platform === activeFilter);
  };

  const handleFilterChange = (filter: 'all' | 'META' | 'GOOGLE' | 'TIKTOK') => {
    setActiveFilter(filter);
    setCurrentPage(1); 
  };

  const handleToggleChange = ({ rowId, checked, row, columnKey }: { rowId: string | number; checked: boolean; row: any; columnKey: string }) => {
    console.table({
      rowId,
      field: columnKey,
      oldValue: row[columnKey],
      newValue: checked
    });
    
    setLocalData(prev => {
      const updated = prev.map(item => 
        item.id === rowId
          ? { ...item, [columnKey]: checked }
          : item
      );
      // Guardar en sessionStorage para persistencia
      sessionStorage.setItem('campaignDataResumen', JSON.stringify(updated));
      return updated;
    });
  };

  const formatUSD = (value: any) => {
    const num = Number(String(value).replace(/[^0-9]/g, ""));
    if (isNaN(num)) return value;
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
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
                onClick={() => handleFilterChange('all')}
              >
                <BsStack className={`text-2xl ${activeFilter === 'all' ? 'text-blue-700' : 'text-gray-500'}`}/>
              </button>
              <button 
                type="button" 
                className={`px-3 py-2 text-sm font-medium text-gray-900 bg-white border-r border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeFilter === 'META' ? 'bg-blue-50' : ''}`}
                onClick={() => handleFilterChange('META')}
              >
                <FaMeta className={`text-2xl ${activeFilter === 'META' ? 'text-blue-700' : 'text-gray-500'}`}/>
              </button>
              <button 
                type="button" 
                className={`px-3 py-2 text-sm font-medium text-gray-900 bg-white border-l border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeFilter === 'GOOGLE' ? 'bg-blue-50' : ''}`}
                onClick={() => handleFilterChange('GOOGLE')}
              >
                <SiGoogleads className={`text-2xl ${activeFilter === 'GOOGLE' ? 'text-blue-700' : 'text-gray-500'}`}/>
              </button>
              <button 
                type="button" 
                className={`px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeFilter === 'TIKTOK' ? 'bg-blue-50' : ''}`}
                onClick={() => handleFilterChange('TIKTOK')}
              >
                <FaTiktok className={`text-2xl ${activeFilter === 'TIKTOK' ? 'text-blue-700' : 'text-gray-500'}`}/>
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          <TableComponent 
            key={`${activeFilter}-table`}
            showSearch={true} 
            itemsPerPage={20}
            columns={tableColumns}
            data={getFilteredData().map(item => ({
              ...item,
              budget: formatUSD(item.budget)+' USD'
            }))}
            onToggleChange={handleToggleChange}
          />
        </div>
      </div>

      <ModalFormat width="40%" isOpen={isModalOpen} onClose={toggleModal}>
          <div className='flex flex-col px-10 pb-5'>
            <h2 className='text-center font-bold mb-3'>SELECCIONA UNA OPCIÓN PARA CREAR TU CAMPAÑA</h2>
            <div className='flex'>
              <div className="w-3/6 p-2 flex">
              <Link to="/thirdPartyCampaign">
                <Card imageUrl='https://ftp.mathilde-ads.com/151-605f91d40859d5d52379b6753401b68f.svg' title='Campañas manuales' description=''/>              
              </Link>
              </div>
              <div className="w-3/6 p-2 flex">
              <Link to="/massiveCampaign">
                <Card imageUrl='https://ftp.mathilde-ads.com/151-d41c45a31a82b5e2519657b41a04ae94.svg' title='Campañas masivas' description=''/>
              </Link>
              </div>
            </div>
          </div>
        </ModalFormat>
        
    </div>
  );
};

export default SummaryCampaign;
