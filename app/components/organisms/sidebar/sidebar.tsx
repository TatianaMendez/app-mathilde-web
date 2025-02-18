import styles from './sidebar.module.css'; 
import { useAuth } from '@domain/services/autenticationService';
import ImageFormat from '../../molecules/image/imageFormat';

const imagesPath = import.meta.env.VITE_MICROFRONENT_URL;

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className={`${styles.sidebar} px-4 py-6 w-1/5`}>
      <div className='flex justify-between mb-10'>
        <div> 
           <ImageFormat classIm='mx-auto' src={`${imagesPath}/assets/images/logo mathilde.png`} alt='Logo Mathilde ads' width={35} height={35}/>
        </div>
        <div> 
           <ImageFormat classIm='mx-auto' src={`${imagesPath}/assets/images/usuario.png`} alt='Logo Mathilde ads' width={35} height={35}/>
        </div>
      </div>
      <div>
        <ul className='block w-full'>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src={`${imagesPath}/assets/images/Campañas.png`} alt='Logo Mathilde ads' width={25}/>
            <a href="#home">Campañas</a></li>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src={`${imagesPath}/assets/images/audiencias.png`} alt='Logo Mathilde ads' width={25}/>
            <a href="#about">Audiencias</a></li>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src={`${imagesPath}/assets/images/reportes.png`} alt='Logo Mathilde ads' width={25}/>
            <a href="#services">Reportes</a></li>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src={`${imagesPath}/assets/images/facturación.png`} alt='Logo Mathilde ads' width={25}/>
            <a href="#contact">Facturación</a></li>
          <li className='p-3 flex'>
             <ImageFormat classIm='mr-2' src={`${imagesPath}/assets/images/configuración.png`} alt='Logo Mathilde ads' width={25}/>
            <a href="#contact">Configuración</a></li>
            <button onClick={logout}>Cerrar sesión</button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
