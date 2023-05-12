import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css';
import { useState, useEffect } from 'react';
import { HomeIcon, ListIcon, StatsIcon, AboutIcon } from '../Icons/iconIndex';

const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  { name: 'List', path: '/joblist', icon: <ListIcon /> },
  { name: 'Stats', path: '/statistics', icon: <StatsIcon /> },
  { name: 'About', path: '/about', icon: <AboutIcon /> },
];

const NavBar = () => {
  const router = useRouter();
  const isActivePage = (pathname) => router.pathname === pathname;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      {isMobile ? (
        <div className={styles['nav-links']}>
          {pages.map(({ path, icon }) => (
            <Link key={path} className={classNames(styles['nav-link'], (isActivePage(path)) ? styles.active : '')} href={path}>{icon}
          </Link>
        ))}
        </div>
      ) : (
        <div className={styles['nav-links']}>
            {pages.map(({ name, path, icon }) => (
              <Link key={path} className={classNames(styles['nav-link'], (isActivePage(path)) ? styles.active : '')} href={path}>{icon} {name}</Link>
            ))}
        </div>
      )}
    </nav>
  );
}

export default NavBar;