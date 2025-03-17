import type { IconType } from "react-icons";

// Actualiza la interfaz para incluir sublistas
export interface MenuItem {
    id: string;
    title: string;
    href: string;
    isActive?: boolean;
    icon?: IconType;
    subItems?: MenuItem[]; // Agregamos subItems para las sublistas
  }
  
  // Define las props del componente
  export interface TableOfContentsProps {
    items: MenuItem[];
  }
  