'use client';

import styles from './MainPage.module.css';
import { useState } from 'react';
import { mainPageGeometry, mainPageVideo } from '@/data/data';
import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import ModalComponent from '../Modals/ModalComponent';
import MainVideoModal from '../Modals/MainVideoModal/MainVideoModal';
import Link from 'next/link';
import useStore from '@/store/useLanguageStore';

export interface VideoItem {
  img: StaticImageData;
  imgMob: StaticImageData;
  header: string;
  description: string;
  time: string;
  descriptionFull: string;
  quests: string[];
}

export default function MainPage() {
  const [videoItem, setVideoItem] = useState<VideoItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  const { locale } = useStore();

  const openMenu = (item: VideoItem) => {
    setVideoItem(item);
    setIsMenuOpen(true);

    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setVideoItem(null);

    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.header}>{t('MainPage.trainingText')}</h2>
      <ul className={styles.list}>
        {mainPageGeometry.map((item, index) => (
          <li className={styles.item} key={index}>
            <div className={styles.image_wrap}>
              <Image
                src={item.img}
                className={styles.img}
                width={0}
                height={0}
                sizes="100vw"
                alt={item.header}
                priority
              />
              <Image
                src={item.imgMob}
                className={styles.img_mob}
                width={0}
                height={0}
                sizes="100vw"
                alt={item.header}
                priority
              />
            </div>
            <div className={styles.bottom_wrap}>
              <h3 className={styles.item_header}>{t(item.header)}</h3>
              <div className={styles.text_wrap}>
                <p className={styles.item_description}>{t(item.description)}</p>
                <p className={styles.time}>
                  <span>{item.time}</span>
                  {t('MainPage.min')}
                </p>
                <Link href={`${locale}/${item.link}`} className={styles.button}>
                  {t('Buttons.start')}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h2 className={styles.header}>{t('MainPage.videoText')}</h2>
      <ul className={styles.list}>
        {mainPageVideo.map((item, index) => (
          <li className={styles.item} key={index}>
            <div className={styles.image_wrap}>
              <Image
                src={item.img}
                className={styles.img}
                width={0}
                height={0}
                sizes="100vw"
                alt={item.header}
                priority
              />
              <Image
                src={item.imgMob}
                className={styles.img_mob}
                width={0}
                height={0}
                sizes="100vw"
                alt={item.header}
                priority
              />
            </div>
            <div className={styles.bottom_wrap}>
              <h3 className={styles.item_header}>{t(item.header)}</h3>
              <div className={styles.text_wrap}>
                <p className={styles.item_description}>{t(item.description)}</p>
                <p className={styles.time}>
                  <span>{item.time}</span>
                  {t('MainPage.min')}
                </p>
                <button
                  className={styles.button}
                  onClick={() => openMenu(item)}
                  type="button"
                >
                  {t('Buttons.start')}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ModalComponent isOpen={isMenuOpen} onClose={closeMenu}>
        {videoItem && <MainVideoModal onClose={closeMenu} item={videoItem} />}
      </ModalComponent>
    </section>
  );
}
