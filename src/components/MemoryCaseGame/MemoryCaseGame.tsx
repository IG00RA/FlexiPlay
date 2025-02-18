'use client';

import styles from './MemoryCaseGame.module.css';
import memory from '@/img/pages/memory.webp';
import memory_mob from '@/img/pages/memory_mob.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ModalComponent from '../Modals/ModalComponent';
import useLanguageStore from '@/store/useLanguageStore';
import { useEffect, useState } from 'react';

export default function MemoryCaseGame() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isFirstText, setIsFirstText] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  }, []);

  const { locale } = useLanguageStore();

  const openMenu = () => {
    setIsMenuOpen(true);

    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  };

  const modalClick = () => {
    !isFirstText && closeMenu();
    setIsFirstText(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);

    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    }
  };

  return (
    <section>
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
      <ModalComponent isOpen={isMenuOpen} onClose={modalClick}>
        <div className={styles.modal_wrap}>
          <h3 className={styles.modal_header}>
            {t('MemoryCaseGame.modal.tip.header')}
          </h3>
          <p className={styles.modal_text}>
            {isFirstText
              ? t('MemoryCaseGame.modal.tip.text')
              : t('MemoryCaseGame.modal.tip.textLarge')}
          </p>
          <button
            className={styles.modal_button}
            onClick={modalClick}
            type="button"
          >
            {t('MemoryCaseGame.modal.buttons.ok')}
          </button>
        </div>
      </ModalComponent>
    </section>
  );
}
