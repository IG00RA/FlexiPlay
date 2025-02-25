'use client';

import styles from './MemoryCaseGame.module.css';
import header_ico from '@/img/game/header_ico.webp';
import main_board from '@/img/game/memoryCase/main_board.webp';
import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import ModalComponent from '../Modals/ModalComponent';
import useLanguageStore from '@/store/useLanguageStore';
import { useEffect, useState } from 'react';
import { shapes } from '@/data/data';

type ShapeType = 'circle' | 'rectangle' | 'square' | 'triangle';

interface Figure {
  src: StaticImageData;
  alt: string;
  shape: string;
  color: string;
}

export default function MemoryCaseGame() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isFirstText, setIsFirstText] = useState(true);
  const [randomFigures, setRandomFigures] = useState<Figure[]>([]);
  const [visibleFigures, setVisibleFigures] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [timer, setTimer] = useState('00:00');
  const [lastRecord, setLastRecord] = useState('00:00');
  const [totalTime, setTotalTime] = useState('00:00');
  const [score, setScore] = useState('0');

  const t = useTranslations();

  const colorMap: { [key: number]: string } = {
    0: 'blue',
    1: 'green',
    2: 'red',
    3: 'yellow',
  };

  const shapeNames: { [key: string]: string } = {
    circle: 'circle',
    rectangle: 'rectangle',
    square: 'square',
    triangle: 'triangle',
  };

  const generateRandomFigures = () => {
    const shapeKeys = Object.keys(shapes) as ShapeType[];
    const shuffledShapes = shapeKeys.sort(() => Math.random() - 0.5);
    const selectedShapes = shuffledShapes.slice(0, 4);

    const figures = selectedShapes.map((shape, index) => {
      const colorVariants = shapes[shape];
      const randomColorIndex = Math.floor(Math.random() * colorVariants.length);
      return {
        src: colorVariants[randomColorIndex],
        alt: `${shape}_${randomColorIndex}`,
        shape: shape,
        color: colorMap[randomColorIndex],
      };
    });

    setRandomFigures(figures);
  };

  useEffect(() => {
    generateRandomFigures();

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

  const animateFigures = () => {
    const newVisible = [false, false, false, false];
    setVisibleFigures(newVisible);

    randomFigures.forEach((_, index) => {
      setTimeout(() => {
        setVisibleFigures(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, index * 600); // 300ms delay between each figure
    });
  };

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
    animateFigures();
  };

  const { locale } = useLanguageStore();

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

          <div className={styles.figures_box}>
            {randomFigures.map((figure, index) => (
              <div
                key={index}
                className={`${styles.figure_container} ${
                  visibleFigures[index] ? styles.visible : ''
                }`}
              >
                <span className={styles.department_label}>
                  {t('MemoryCaseGame.department')} {index + 1}
                </span>
                <Image
                  src={figure.src}
                  className={`${styles.figure} ${
                    shapeNames[figure.shape] === 'rectangle'
                      ? styles.figure_rectangle
                      : ''
                  }`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={figure.alt}
                  priority
                />
                <div className={styles.figure_description_wrap}>
                  <span className={styles.figure_description}>
                    {t(`Colors.${figure.color}`)}
                  </span>
                  <span className={styles.figure_description}>
                    {t(`Figures.${shapeNames[figure.shape]}`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.btn_box}>
          <div className={styles.timer_wrap}>
            <button className={styles.timer_button} type="button">
              {t('MemoryCaseGame.buttons.timer')}
              {timer}
            </button>
            <button className={styles.record_button} type="button">
              {t('MemoryCaseGame.buttons.record')}
              {lastRecord}
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
                {score}
              </button>
            </div>
            <button className={styles.time_button} type="button">
              {t('MemoryCaseGame.buttons.time')}
              {totalTime}
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
