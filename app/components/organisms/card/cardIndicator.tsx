// components/Modal.tsx
import ImageFormat from '~/components/molecules/image/imageFormat';
import type { CardIndicatorProps } from './card.types';
import ProgressBar from '@components/molecules/progressBar/progressBar';

const imagesPath = import.meta.env.VITE_MICROFRONENT_URL;

const CardIndicator: React.FC<CardIndicatorProps> = ({ logo, number, title, start, end, current }) => {
    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('es-ES', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
      <div className='flex flex-col border px-3.5 py-7'>
          <div className='flex justify-end'>
            <ImageFormat src={`${imagesPath}/assets/images/${logo}.svg`} alt='Icon' width={30} height={30}/>
          </div>
          <h2 className='my-3 font-bold title-dashboard'>{title}</h2>
          <small className='text-3xl font-black'>{formatNumber(number)}</small>
          <div className='w-full mt-2'>
            <ProgressBar start={start} end={end} current={current} />
          </div>
      </div>
    );
};

export default CardIndicator;
