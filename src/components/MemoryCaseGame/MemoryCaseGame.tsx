'use client';

import styles from './MemoryCaseGame.module.css';
import header_ico from '@/img/game/header_ico.webp';
import main_board from '@/img/game/memoryCase/main_board.webp';
import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import ModalComponent from '../Modals/ModalComponent';
import useLanguageStore from '@/store/useLanguageStore';
import { useEffect, useState, useRef } from 'react';
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
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isAuditMenuOpen, setIsAuditMenuOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isInitialAnimationDone, setIsInitialAnimationDone] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);
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

    const figures = selectedShapes.map(shape => {
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
    setVisibleFigures([false, false, false, false]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startTimer = () => {
    let seconds = 0;
    timerRef.current = setInterval(() => {
      seconds++;
      setTimer(formatTime(seconds));
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer('00:00');
  };

  const startTotalTimer = () => {
    if (!totalTimerRef.current) {
      totalTimerRef.current = setInterval(() => {
        setTotalSeconds(prev => {
          const newSeconds = prev + 1;
          const formattedTime = formatTime(newSeconds);
          setTotalTime(formattedTime);
          localStorage.setItem('totalSeconds', newSeconds.toString());
          localStorage.setItem('totalTime', formattedTime);
          return newSeconds;
        });
      }, 1000);
    }
  };

  const pauseTotalTimer = () => {
    if (totalTimerRef.current) {
      clearInterval(totalTimerRef.current);
      totalTimerRef.current = null;
    }
  };

  const showFiguresSequence = () => {
    const newVisible = [false, false, false, false];
    setVisibleFigures(newVisible);

    [0, 1].forEach(index => {
      setTimeout(() => {
        setVisibleFigures(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, index * 5000);
    });

    setTimeout(() => {
      setShowHidden(true);
      startTimer(); // Start the timer when cards are hidden
    }, 10000);
  };

  const handleStart = () => {
    if (!isGameStarted && !isConfirming && isInitialAnimationDone) {
      setIsGameStarted(true);
      generateRandomFigures();
      showFiguresSequence();
    } else if (isGameStarted && !isAuditMenuOpen && !isConfirming) {
      setIsAuditMenuOpen(true);
      stopTimer();
    } else if (isConfirming) {
      handleYes();
    }
  };

  const handleAuditClose = () => {
    setIsAuditMenuOpen(false);
    setShowHidden(false);
    setIsConfirming(true);
  };

  const handleYes = () => {
    setScore(prev => (parseInt(prev) + 1).toString());
    setLastRecord(timer);
    localStorage.setItem('lastRecord', timer);
    resetTimer();
    setIsGameStarted(false);
    setIsConfirming(false);
    generateRandomFigures();
    setShowHidden(false);
    animateFigures(); // Show demonstration cards after game ends
  };

  const handleNo = () => {
    setLastRecord(timer);
    localStorage.setItem('lastRecord', timer);
    resetTimer();
    setIsGameStarted(false);
    setIsConfirming(false);
    generateRandomFigures();
    setShowHidden(false);
    animateFigures(); // Show demonstration cards after game ends
  };

  const animateFigures = () => {
    setVisibleFigures([false, false, false, false]);
    randomFigures.forEach((_, index) => {
      setTimeout(() => {
        setVisibleFigures(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
        if (index === randomFigures.length - 1) {
          setIsInitialAnimationDone(true);
        }
      }, index * 600);
    });
  };

  const modalClick = () => {
    if (!isFirstText) closeMenu();
    setIsFirstText(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    startTotalTimer();
    animateFigures();
  };

  useEffect(() => {
    // Load initial values from localStorage on client-side only
    if (typeof window !== 'undefined') {
      const savedLastRecord = localStorage.getItem('lastRecord') || '00:00';
      const savedTotalSeconds = parseInt(
        localStorage.getItem('totalSeconds') || '0',
        10
      );
      const savedTotalTime = localStorage.getItem('totalTime') || '00:00';

      setLastRecord(savedLastRecord);
      setTotalSeconds(savedTotalSeconds);
      setTotalTime(savedTotalTime);
    }

    // Only call generateRandomFigures on client-side
    if (typeof window !== 'undefined') {
      generateRandomFigures();
    }

    // Handle visibility and cleanup
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseTotalTimer();
      } else if (!isMenuOpen) {
        startTotalTimer();
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'auto';
        document.body.style.touchAction = 'auto';
        stopTimer();
        pauseTotalTimer();
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
      document.body.style.touchAction = isMenuOpen ? 'none' : 'auto';
    }
  }, [isMenuOpen]);

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
                <div
                  className={`${styles.hidden_container} ${
                    showHidden ? styles.visible : ''
                  }`}
                >
                  <span className={styles.hidden_text}>?</span>
                </div>
                <div
                  className={`${styles.image_container_wrap} ${
                    !showHidden && visibleFigures[index] ? styles.visible : ''
                  }`}
                >
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
              </div>
            ))}
          </div>
        </div>
        <div className={styles.btn_box}>
          <div className={styles.timer_wrap}>
            <button className={styles.timer_button} type="button">
              {t('MemoryCaseGame.buttons.timer')} {timer}
            </button>
            <button className={styles.record_button} type="button">
              {t('MemoryCaseGame.buttons.record')} {lastRecord}
            </button>
          </div>
          <div className={styles.control_wrap_main}>
            <div className={styles.control_wrap}>
              <button
                className={styles.start_button}
                type="button"
                onClick={handleStart}
              >
                {!isGameStarted && !isConfirming
                  ? t('MemoryCaseGame.buttons.start')
                  : !isAuditMenuOpen && !isConfirming
                  ? t('MemoryCaseGame.buttons.done')
                  : t('MemoryCaseGame.buttons.yes')}
              </button>
              <button
                className={styles.stop_button}
                type="button"
                onClick={isConfirming || isAuditMenuOpen ? handleNo : undefined}
              >
                {!isGameStarted || (!isAuditMenuOpen && !isConfirming)
                  ? t('MemoryCaseGame.buttons.stop')
                  : t('MemoryCaseGame.buttons.no')}
              </button>
              <button className={styles.score_button} type="button">
                {score}
              </button>
            </div>
            <button className={styles.time_button} type="button">
              {t('MemoryCaseGame.buttons.time')} {totalTime}
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
      <ModalComponent isOpen={isAuditMenuOpen} onClose={handleAuditClose}>
        <div className={styles.modal_wrap}>
          <h3 className={styles.modal_header}>
            {t('MemoryCaseGame.modal.audit.header')}
          </h3>
          <p className={styles.modal_text}>
            {t('MemoryCaseGame.modal.audit.text')}
          </p>
          <button
            className={styles.modal_button}
            onClick={handleAuditClose}
            type="button"
          >
            {t('MemoryCaseGame.modal.buttons.ok')}
          </button>
        </div>
      </ModalComponent>
    </section>
  );
}
