'use client';

import styles from './MemoryCaseGame.module.css';
import memory from '@/img/pages/memory.webp';
import memory_mob from '@/img/pages/memory_mob.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function MemoryCaseGame() {
  const t = useTranslations();

  return (
    <section className={styles.section}>
      <h2 className={styles.header}>{t('MemoryCasePage.header')}</h2>
      <h3 className={styles.header_text}>{t('MemoryCasePage.headerText')}</h3>

      <div className={styles.card}>
        <div className={styles.image_wrap}>
          <Image
            src={memory}
            className={styles.img}
            width={0}
            height={0}
            sizes="100vw"
            alt={t('MemoryCasePage.header')}
            priority
          />
          <Image
            src={memory_mob}
            className={styles.img_mob}
            width={0}
            height={0}
            sizes="100vw"
            alt={t('MemoryCasePage.header')}
            priority
          />
        </div>

        <div className={styles.bottom_wrap}>
          <h3 className={styles.item_header}>
            {t('MemoryCasePage.cardHeader')}
          </h3>
          <div className={styles.text_wrap}>
            <p className={styles.item_description}>
              {t('MemoryCasePage.cardText')}
            </p>
            <p className={styles.time}>
              <span>10-15 </span>
              {t('MainPage.min')}
            </p>
            <button className={styles.button} type="button">
              {t('Buttons.start')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
