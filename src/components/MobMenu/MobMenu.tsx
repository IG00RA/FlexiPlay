'use client';

import styles from './MobMenu.module.css';
import Icon from '@/helpers/Icon';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import useLanguageStore from '@/store/useLanguageStore';
import { menuItems } from '@/data/dataMain';
import ButtonWhite from '../Buttons/ButtonWhite';

type MobMenuProps = {
  isMenuOpen: boolean;
  closeMenu: () => void;
};

export default function MobMenu({ isMenuOpen, closeMenu }: MobMenuProps) {
  const t = useTranslations();
  const { query, locale } = useLanguageStore();
  return (
    <div
      onClick={closeMenu}
      className={`${styles.mobile_wrap} ${
        isMenuOpen && styles.mobile_menu_open
      }`}
    >
      <div
        className={styles.burger_menu}
        onClick={event => event.stopPropagation()}
      >
        <Link
          className={styles.logo_wrap}
          onClick={closeMenu}
          href={`/${locale}/${query}`}
        >
          <Icon name="icon-logoMob" width={116} height={35} color={'#fff'} />
        </Link>

        <nav>
          <ul className={styles.nav}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.nav_item}>
                <Link
                  className={styles.nav_link}
                  onClick={closeMenu}
                  href={`/${locale}/${query}${item.href}`}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className={styles.policy}
          href={t('Footer.policyLink')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Footer.policy')}
        </a>
        <ButtonWhite />
      </div>
    </div>
  );
}
