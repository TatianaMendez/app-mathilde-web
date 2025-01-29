import React from 'react';
import VisualStart from '@components/organisms/visualStart';
import '@styles/styleAtoms.css';
import InputForm from '@components/molecules/input/inputForm';
import { Link } from 'react-router';

const ValidationPass: React.FC = () => {

  return (
    <div className="min-h-screen flex w-full">
      <div className='w-2/4 border-container'>
        <VisualStart />
      </div>
      <div className="w-2/4">
        <form className="w-3/5 px-10 bg-white mx-auto rounded-lg flex flex-col justify-center h-full">
          <Link to={"/reset"}>
          <p className="text-2xl text-center mb-6">Hemos enviado un código OTP al correo electrónico registrado para activar tu cuenta.</p>
          </Link>
          <div className='flex w-full justify-evenly'>
            <div className='w-14'>
              <InputForm type='number' classInclude='mth-input-code' min={0} max={9} />
            </div>
            <div className='w-14'>
              <InputForm type='number' classInclude='mth-input-code' min={0} max={9}/>
            </div>
            <div className='w-14'>
              <InputForm type='number' classInclude='mth-input-code' min={0} max={9}/>
            </div>
            <div className='w-14'>
              <InputForm type='number' classInclude='mth-input-code' min={0} max={9}/>
            </div>
            <div className='w-14'>
              <InputForm type='number' classInclude='mth-input-code' min={0} max={9}/>
            </div>
            <div className='w-14'>
              <InputForm type='number' classInclude='mth-input-code' min={0} max={9}/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValidationPass;
