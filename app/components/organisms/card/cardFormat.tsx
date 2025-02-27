// components/Modal.tsx
import React, { forwardRef } from 'react';
import styles from './card.module.css'; 
import ImageFormat from '~/components/molecules/image/imageFormat';
import type { CardProps } from './card.types';

const imagesPath = import.meta.env.VITE_MICROFRONENT_URL;

const CardFormat = forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const { image, title, description } = props;

    return (
      <div className='border px-3.5 py-7 cursor-pointer' ref={ref}>
          <ImageFormat classIm='mx-auto' src={`${imagesPath}/assets/images/${image}.svg`} alt='Logo Mathilde ads' width={74} height={74}/>
          <h3 className='my-3 font-bold'>{title}</h3>
          <p>{description}</p>
      </div>
    );
  }
);

export default CardFormat;
