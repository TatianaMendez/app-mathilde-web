import React from 'react';
import ImageFormat from '../molecules/image/imageFormat';

const imagesPath = import.meta.env.VITE_MICROFRONENT_URL;

if(!imagesPath){
  console.log("no hay variable path de microfronents");
}

const VisualStart = () => {
  return (
      <div>
        <ImageFormat classIm='mx-auto mt-32' src={`${imagesPath}/assets/images/mathilde.png`} alt='Logo Mathilde ads' width={400} height={250}/>
        <div className='m-image-container'>
        <ImageFormat classIm='m-image' src={`${imagesPath}/assets/images/background-mathilde.png`} alt='Logo Mathilde ads' width={400} height={300}/>
        </div>
      </div>
  );
};

export default VisualStart;
