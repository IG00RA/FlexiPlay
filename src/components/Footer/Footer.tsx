'use client';

import Icon from '@/helpers/Icon';
import styles from './Footer.module.css';
import Link from 'next/link';
import { menuItems } from '@/data/dataMain';
import { useTranslations } from 'next-intl';
import ButtonWhite from '../Buttons/ButtonWhite';
import useLanguageStore from '@/store/useLanguageStore';

export default function Footer() {
  const t = useTranslations();

  const { query, locale } = useLanguageStore();

  return (
    <footer className={styles.section}>
      <div className={styles.container}>
        <div className={styles.fist_wrap}>
          <Link className={styles.logo_wrap} href={`/${locale}/${query}`}>
            <Icon name="icon-logoMob" width={202} height={60} color={'#fff'} />
          </Link>
          <nav className={styles.nav}>
            <p className={styles.nav_title}>FlexiFun Geometry</p>
            <ul className={styles.nav_list}>
              {menuItems.map((item, index) => (
                <li key={index} className={styles.nav_item}>
                  <Link className={styles.nav_link} href={item.href}>
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.second_wrap}>
          <a
            className={styles.policy}
            href={t('Footer.policyLink')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Footer.policy')}
          </a>
          <ButtonWhite className={styles.btn} />
        </div>
      </div>
    </footer>
  );
}
