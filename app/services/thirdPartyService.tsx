import { FaFlag, FaFacebook, FaPause } from "react-icons/fa";

import { IoMegaphone } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";

import type { IconType } from 'react-icons';

export interface MenuItem {
  id: string;
  title: string;
  href: string;
  isActive?: boolean;
  icon?: IconType;
  subItems?: MenuItem[];
}


export const dataThirdParty = {
    menuItems: [
        {
          id: '1',
          title: 'NUEVA CAMPAÑA',
          href: '#nueva-campana',
          icon: IoMegaphone,
          subItems: [
            {
              id: '1.1',
              title: 'CONJUNTOS DE ANUNCIOS 1',
              href: '#conjuntos-de-anuncios-1',
              icon: BiSolidDashboard,
              subItems: [
                {
                  id: '1.1.1',
                  title: 'ANUNCIO 1',
                  href: '#anuncio-1',
                  icon: FaFacebook
                },
                {
                  id: '1.1.2',
                  title: 'ANUNCIO 2',
                  href: '#anuncio-2',
                  icon: FaFacebook
                }
              ]
            },
            {
              id: '1.2',
              title: 'CONJUNTOS DE ANUNCIOS 2',
              href: '#conjuntos-de-anuncios-2',
              icon: BiSolidDashboard,
              subItems: [
                {
                  id: '1.1.1',
                  title: 'ANUNCIO 1',
                  href: '#anuncio-1',
                  icon: FaFacebook
                }
              ]
            }
          ]
        }
      ] as MenuItem[],
  
    getMenuItems() {
      return this.menuItems;
    }
};
  