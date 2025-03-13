'use client';

import Link from 'next/link';
import styles from './HeaderMain.module.css';
import Icon from '@/helpers/Icon';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import useLanguageStore from '@/store/useLanguageStore';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import MobMenu from '../MobMenu/MobMenu';
import ButtonHeader from '../Buttons/ButtonHeader';
import { menuItems } from '@/data/dataMain';

export default function HeaderMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, query } = useLanguageStore();
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
      <Link className={styles.logo_wrap} href={`/${locale}/${query}`}>
        <Icon name="icon-logoMob" width={116} height={35} color="#000" />
      </Link>
      <Link className={styles.logo_desk} href={`/${locale}/${query}`}>
        <Icon name="icon-logoDesk" width={220} height={64} color="#000" />
      </Link>

      <nav>
        <ul className={styles.nav}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.nav_item}>
              <Link
                className={styles.nav_link}
                href={`/${locale}/${query}${item.href}`}
              >
                {t(item.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${styles.lang_wrap}`}>
        <LanguageSwitcher />
        <div
          className={`${styles.burger_wrap} ${
            isMenuOpen ? styles.burger_open : ''
          }`}
          onClick={isMenuOpen ? closeMenu : openMenu}
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
        <ButtonHeader />
      </div>

      <MobMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </header>
  );
}
