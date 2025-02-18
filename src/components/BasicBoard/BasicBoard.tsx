'use client';

import styles from './BasicBoard.module.css';
import find from '@/img/pages/find.webp';
import find_mob from '@/img/pages/find_mob.webp';
import speed from '@/img/pages/speed.webp';
import speed_mob from '@/img/pages/speed_mob.webp';
import useLanguageStore from '@/store/useLanguageStore';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function BasicBoard() {
  const t = useTranslations();
  const { locale } = useLanguageStore();
  return (
    <section>
      <h2 className={styles.header}>{t('BasicBoardPage.header')}</h2>
      <h3 className={styles.header_text}>{t('BasicBoardPage.headerText')}</h3>
      <Link href={`/${locale}/basic-board/game`} className={styles.card}>
        <div className={styles.image_wrap}>
          <Image
            src={find}
            className={styles.img}
            width={0}
            height={0}
            sizes="100vw"
            alt={t('BasicBoardPage.cardHeader')}
            priority
          />
          <Image
            src={find_mob}
            className={styles.img_mob}
            width={0}
            height={0}
            sizes="100vw"
            alt={t('BasicBoardPage.cardHeader')}
            priority
          />
        </div>

        <div className={styles.bottom_wrap}>
          <h3 className={styles.item_header}>
            {t('BasicBoardPage.cardHeader')}
          </h3>
          <div className={styles.text_wrap}>
            <p className={styles.item_description}>
              {t('BasicBoardPage.cardText')}
            </p>
            <p className={styles.time}>
              <span>10-15 </span>
              {t('MainPage.min')}
            </p>
            <Link
              href={`/${locale}/basic-board/game`}
              className={styles.button}
            >
              {t('Buttons.start')}
            </Link>
          </div>
        </div>
      </Link>
      <Link href={`/${locale}/basic-board/game2`} className={styles.card}>
        <div className={styles.image_wrap}>
          <Image
            src={speed}
            className={styles.img}
            width={0}
            height={0}
            sizes="100vw"
            alt={t('BasicBoardPage.secondCardHeader')}
            priority
          />
          <Image
            src={speed_mob}
            className={styles.img_mob}
            width={0}
            height={0}
            sizes="100vw"
            alt={t('BasicBoardPage.secondCardHeader')}
            priority
          />
        </div>

        <div className={styles.bottom_wrap}>
          <h3 className={styles.item_header}>
            {t('BasicBoardPage.secondCardHeader')}
          </h3>
          <div className={styles.text_wrap}>
            <p className={styles.item_description}>
              {t('BasicBoardPage.secondCardText')}
            </p>
            <p className={styles.time}>
              <span>8-12 </span>
              {t('MainPage.min')}
            </p>
            <Link
              href={`/${locale}/basic-board/game2`}
              className={styles.button}
            >
              {t('Buttons.start')}
            </Link>
          </div>
        </div>
      </Link>
    </section>
  );
}
