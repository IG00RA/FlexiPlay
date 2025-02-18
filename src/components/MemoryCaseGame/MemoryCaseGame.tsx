'use client';

import styles from './MemoryCaseGame.module.css';
import header_ico from '@/img/game/header_ico.webp';
import main_board from '@/img/game/memoryCase/main_board.webp';
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

    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
        document.body.style.touchAction = 'auto';
      }
    };
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
      <h2 className={styles.header}>
        <span className={styles.ico_wrap}>
          <Image
            src={header_ico}
            className={styles.header_ico}
            width={0}
            height={0}
            sizes="100vw"
            alt="Header icon"
            priority
          />
        </span>
        {t('MemoryCaseGame.header')}
      </h2>
      <h3 className={styles.header_text}>{t('MemoryCaseGame.headerText')}</h3>

      <div className={styles.field}>
        <div className={styles.image_wrap}>
          <Image
            src={main_board}
            className={styles.main_board}
            width={0}
            height={0}
            sizes="100vw"
            alt="Main board image"
            priority
          />

          <div className={styles.figures_box}></div>
        </div>
        <div className={styles.btn_box}>
          <div className={styles.timer_wrap}>
            <button className={styles.timer_button} type="button">
              {t('MemoryCaseGame.buttons.timer')}
            </button>
            <button className={styles.record_button} type="button">
              {t('MemoryCaseGame.buttons.record')}
            </button>
          </div>
          <div className={styles.control_wrap_main}>
            <div className={styles.control_wrap}>
              <button className={styles.start_button} type="button">
                {t('MemoryCaseGame.buttons.start')}
              </button>
              <button className={styles.stop_button} type="button">
                {t('MemoryCaseGame.buttons.stop')}
              </button>
              <button className={styles.score_button} type="button">
                0
              </button>
            </div>
            <button className={styles.time_button} type="button">
              {t('MemoryCaseGame.buttons.time')}
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
