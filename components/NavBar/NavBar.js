import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { useState, useEffect } from 'react';
import { HomeIcon, ListIcon, StatsIcon, AboutIcon } from '../Icons/iconIndex';

const NavBar = () => {
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
      {/* <div className={styles.logo}>
      <Link href="/">
          <Image src="/android-chrome-192x192.png" alt="Job Application Tracker" width={128} height={100} priority={false}/>
      </Link>
      </div> */}
      {isMobile ? (
        <div className={styles['nav-links']}>
          <Link className={styles['nav-link']} href="/"><HomeIcon />
          </Link>
          <Link className={styles['nav-link']} href="/joblist"><ListIcon />
          </Link>
          <Link className={styles['nav-link']} href="/statistics"><StatsIcon />
          </Link>
          <Link className={styles['nav-link']} href="/about"><AboutIcon />
          </Link>
        </div>
      ) : (
        <div className={styles['nav-links']}>
          <Link className={styles['nav-link']} href="/">Home</Link>
          <Link className={styles['nav-link']} href="/joblist">Job List</Link>
          <Link className={styles['nav-link']} href="/statistics">Statistics</Link>
          <Link className={styles['nav-link']} href="/about">About</Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;