import { FC } from 'react';
import { SvgDimension } from '../../type/common';
import { FaHeart } from 'react-icons/fa6';

const Logo: FC<SvgDimension> = ({ width, height }) => {
  return (
    <FaHeart
      size={width || 18}
      style={{
        width: width || 18,
        height: height || 18,
        color: '#ff0000',
      }}
    />
  );
};

export default Logo;
