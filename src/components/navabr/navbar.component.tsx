import React, { FC } from 'react';
import { Button } from '@components';
import { useTheme } from 'src/contexts/theme/theme.context';
import { useTranslation } from 'react-i18next';

import './navbar.style.scss';

const Navbar: FC = () => {
  const { themeType, setCurrentTheme } = useTheme();
  const { t } = useTranslation();
  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className='navbar'>
      <h2>{t('title')}</h2>

      <Button onClick={toggleTheme}> {themeType}</Button>
    </div>
  );
};

export default Navbar;
