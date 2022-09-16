import { Libs } from '@typings/charts';
import React, { FC, useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';

import './logo.style.scss';

export type LogoProps = {
  libType: Libs;
};

const Logo: FC<LogoProps> = ({ libType }) => {
  const [logoType, setLogoType] = useState<string>('');

  useEffect(() => {
    if (libType) {
      console.log(libType.toString());
      const src = `/images/${libType}.jpg`;
      setLogoType(src);
    }
  }, [libType]);

  return (
    <div className='logo'>
      <Image src={logoType} />
    </div>
  );
};

export default Logo;
