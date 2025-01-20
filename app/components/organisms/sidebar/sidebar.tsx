import React from 'react';
import './sidebar.module.css'; // Asegúrate de crear un archivo CSS para estilos

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Mi Sidebar</h2>
      <ul>
        <li><a href="#home">Inicio</a></li>
        <li><a href="#about">Acerca de</a></li>
        <li><a href="#services">Servicios</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
