import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const pathname = useLocation().pathname;
  const constructorPath = pathname.startsWith('/ingredients/') || pathname === '/' ? pathname : '/';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={constructorPath}
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <BurgerIcon type='primary' />
            <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
          </NavLink>
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <ListIcon type='primary' />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <Logo />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to={userName ? '/profile' : '/login'}
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <ProfileIcon type='primary' />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
