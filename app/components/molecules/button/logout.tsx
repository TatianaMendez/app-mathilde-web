import React from 'react';
import { useAuth } from '@services/autenticationService';
// import { useAuth } from '~/services/authService';
import { IoIosExit } from "react-icons/io";

const Logout: React.FC = () => {
    const { logout } = useAuth();

    return (
        <div className='flex justify-center bg-white rounded-lg p-2' onClick={logout}>
            <button className='text-3xl' style={{ color: '#483FFF' }} ><IoIosExit /></button>
        </div>
    );
};

export default Logout;
