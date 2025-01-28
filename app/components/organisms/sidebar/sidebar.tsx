import React from 'react';
import styles from './sidebar.module.css'; 

import ImageFormat from '../../molecules/image/imageFormat';

const Sidebar = () => {
  return (
    <div className={`${styles.sidebar} px-4 py-6 w-1/5`}>
      <div className='flex justify-between mb-10'>
        <div> 
           <ImageFormat classIm='mx-auto' src='/assets/images/logo mathilde.png' alt='Logo Mathilde ads' width={35} height={35}/>
        </div>
        <div> 
           <ImageFormat classIm='mx-auto' src='/assets/images/usuario.png' alt='Logo Mathilde ads' width={35} height={35}/>
        </div>
      </div>
      <div>
        <ul className='block w-full'>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src='/assets/images/Campañas.png' alt='Logo Mathilde ads' width={25}/>
            <a href="#home">Campañas</a></li>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src='/assets/images/audiencias.png' alt='Logo Mathilde ads' width={25}/>
            <a href="#about">Audiencias</a></li>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src='/assets/images/reportes.png' alt='Logo Mathilde ads' width={25}/>
            <a href="#services">Reportes</a></li>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src='/assets/images/facturación.png' alt='Logo Mathilde ads' width={25}/>
            <a href="#contact">Facturación</a></li>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src='/assets/images/configuración.png' alt='Logo Mathilde ads' width={25}/>
            <a href="#contact">Configuración</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
