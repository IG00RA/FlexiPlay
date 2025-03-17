'use client';

import { useTranslations } from 'next-intl';
import styles from './Confirm.module.css';
export default function Confirm() {
  const t = useTranslations();
  return (
    <section id="confirm" className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.text}>{t('Hero.text')}</h3>
        <h3 className={styles.text_desk}>{t('Confirm.header')}</h3>
        <div className={styles.wrapper}>
          <p className={styles.par}>
            <span>{t('Confirm.header')}</span> <br /> {t('Confirm.text')}
          </p>
        </div>
      </div>
    </section>
  );
}
