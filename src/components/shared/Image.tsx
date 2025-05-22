import React, { CSSProperties, RefObject } from 'react';
import NotFoundImg from '../../assets/notFoundIcon.png';

interface IImageProps {
  src: string | undefined;
  className?: string;
  alt?: string;
  ref?: RefObject<HTMLImageElement>;
  onMouseOver?: () => void;
  onClick?: () => void;
  onKeyDown?: () => void;
  style?: CSSProperties;
}

const Image: React.FC<IImageProps> = (props) => {
  const { src, style } = props;
  // Image Error Handling Function
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    img.src = NotFoundImg;
  };
  return (
    <picture>
      <img
        {...props}
        src={!src ? NotFoundImg : src}
        onError={handleImageError}
        loading="lazy"
        decoding="async"
        alt={props?.alt ? props?.alt : 'kirja'}
        style={style}
      />
    </picture>
  );
};

export default Image;
