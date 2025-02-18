import React from 'react';
import '@styles/styleAtoms.css';
import { Line } from 'react-chartjs-2';
// import Sidebar from '@components/organisms/sidebar/sidebar-pro';
import Sidebar from '@components/organisms/sidebar/sidebar';
import Chart from '~/components/organisms/chart/chart';
import TableComponent from '~/components/organisms/table/table';
import { useAuth } from '@domain/services/autenticationService';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  

  return (
    <div className="min-h-screen w-full">
      <Sidebar />
      <div className="min-h-screen" style={{ marginLeft: '260px', padding: '20px' }}>
        <h1>Bienvenido a Mathilde Ads.</h1>
        <div className='flex h-96'>
          <Chart />
        </div>
        <div className='flex'>
         <div className='w-2/4 p-3'>
          <TableComponent />
         </div>
         <div className='w-2/4 p-3'>
          <TableComponent />
         </div>
        </div>
    </div>
      
    </div>
  );
};

export default Dashboard;
