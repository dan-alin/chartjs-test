import React, { FC } from 'react';
// import { Button } from '@components';
// import { useTheme } from 'src/contexts/theme/theme.context';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import './navbar.style.scss';

const Navbar: FC = () => {
  // const { themeType, setCurrentTheme } = useTheme();
  const { t } = useTranslation();
  // const toggleTheme = () => {
  //   setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  // };

  return (
    <div className='navbar'>
      <NavLink to={'/'}>
        <h2>{t('title')}</h2>
      </NavLink>

      {/* <NavLink to={'/amcharts'}>AMCharts</NavLink> */}
      <NavLink to={'/flourish'}>Flourish</NavLink>

      {/* <Button onClick={toggleTheme}> {themeType}</Button> */}
    </div>
  );
};

export default Navbar;
