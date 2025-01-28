import React from 'react';

const ImageFormat = ({src, alt, width, height, classIm }: { src:string, alt:string, width:number, height:number, classIm:string}) => {
    return (
          <img
            className={classIm}
            src={src}
            alt={alt}
            width={width}
            height={height}
          />
    );
};

export default ImageFormat;
