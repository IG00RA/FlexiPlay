'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import Icon from '@/helpers/Icon';
import MobMenu from '../MobMenu/MobMenu';
import { useState } from 'react';
import { navItems } from '@/data/data';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslations } from 'next-intl';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';
  };
  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  return (
    <header className={`${styles.header}`}>
      <Link className={styles.logoWrap} href={`/${locale}`}>
        <Icon name="icon-logoMob" width={116} height={35} color="#000" />
      </Link>
      <Link className={styles.logDesk} href={`/${locale}`}>
        <Icon name="icon-logoDesk" width={220} height={64} color="#000" />
      </Link>

      <nav className={styles.nav}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={`/${locale}${item.href}`}>{t(item.label)}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={`${styles.lang_wrap}`}>
        <LanguageSwitcher />
        <div
          className={`${styles.burgerWrap} ${
            isMenuOpen ? styles.burgerOpen : ''
          }`}
          onClick={isMenuOpen ? closeMenu : openMenu}
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
      </div>

      <MobMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </header>
  );
}
