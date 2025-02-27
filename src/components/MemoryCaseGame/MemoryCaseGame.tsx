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
type LevelConfig = {
  sequences: Sequence[];
  displayTime: number;
  requiredScore: number;
};

type Sequence = {
  departments: number[];
  colors: string[];
};

interface Figure {
  src: StaticImageData;
  alt: string;
  shape: string;
  color: string;
}

const levelConfig: { [key: number]: LevelConfig } = {
  1: {
    sequences: [
      { departments: [0], colors: ['red'] },
      { departments: [1], colors: ['blue'] },
      { departments: [2], colors: ['yellow'] },
      { departments: [3], colors: ['red'] },
    ],
    displayTime: 5000,
    requiredScore: 4,
  },
  2: {
    sequences: [
      { departments: [0, 1, 2], colors: ['red', 'blue', 'yellow'] },
      { departments: [0, 1, 2], colors: ['blue', 'yellow', 'red'] },
      { departments: [0, 1, 2], colors: ['yellow', 'red', 'blue'] },
    ],
    displayTime: 3000,
    requiredScore: 7,
  },
  3: {
    sequences: [
      { departments: [0, 1, 2, 3], colors: ['red', 'blue', 'yellow', 'green'] },
      { departments: [0, 1, 2, 3], colors: ['green', 'yellow', 'red', 'blue'] },
    ],
    displayTime: 2000,
    requiredScore: 9,
  },
  4: {
    sequences: [
      { departments: [0, 1, 2, 3], colors: ['red', 'blue', 'red', 'green'] },
      {
        departments: [0, 1, 2, 3],
        colors: ['blue', 'green', 'blue', 'yellow'],
      },
    ],
    displayTime: 1500,
    requiredScore: 11,
  },
};

export default function MemoryCaseGame() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentStage, setCurrentStage] = useState(0);
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
  const [isFirstAudit, setIsFirstAudit] = useState(true);
  const [auditResult, setAuditResult] = useState<'none' | 'yes' | 'no'>('none');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [modalType, setModalType] = useState<'audit' | 'nextLevel' | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
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
    if (currentLevel === 4) {
      const shapeKeys = Object.keys(shapes) as ShapeType[];
      const shuffledShapes = shapeKeys.sort(() => Math.random() - 0.5);

      const sequence =
        levelConfig[currentLevel].sequences[
          currentStage % levelConfig[currentLevel].sequences.length
        ];

      const colorIndices: { [key: string]: number } = {
        red: 2,
        blue: 0,
        green: 1,
        yellow: 3,
      };

      const figures = Array(4)
        .fill(null)
        .map((_, index) => {
          const color = sequence.colors[index];
          const colorIndex = colorIndices[color];

          const shape = shuffledShapes[index % shuffledShapes.length];

          return {
            src: shapes[shape][colorIndex],
            alt: `${shape}_${colorIndex}`,
            shape: shape,
            color: color,
          };
        });

      setRandomFigures(figures);
      setVisibleFigures([false, false, false, false]);
    } else if (currentLevel === 2 || currentLevel === 3) {
      const shapeKeys = Object.keys(shapes) as ShapeType[];
      const shuffledShapes = shapeKeys.sort(() => Math.random() - 0.5);

      const sequence =
        levelConfig[currentLevel].sequences[
          currentStage % levelConfig[currentLevel].sequences.length
        ];

      const colorIndices: { [key: string]: number } = {
        red: 2,
        blue: 0,
        green: 1,
        yellow: 3,
      };

      const figures = Array(4)
        .fill(null)
        .map((_, index) => {
          if (index < sequence.departments.length) {
            const shape = shuffledShapes[index];
            const color = sequence.colors[index];
            const colorIndex = colorIndices[color];

            return {
              src: shapes[shape][colorIndex],
              alt: `${shape}_${colorIndex}`,
              shape: shape,
              color: color,
            };
          } else {
            return {
              src: shapes.circle[0],
              alt: 'placeholder',
              shape: 'circle',
              color: 'blue',
            };
          }
        });

      setRandomFigures(figures);
      setVisibleFigures([false, false, false, false]);
    } else {
      const shapeKeys = Object.keys(shapes) as ShapeType[];
      const shuffledShapes = shapeKeys.sort(() => Math.random() - 0.5);
      const selectedShapes = shuffledShapes.slice(0, 4);

      const figures = selectedShapes.map(shape => {
        const colorVariants = shapes[shape];
        const randomColorIndex = Math.floor(
          Math.random() * colorVariants.length
        );
        return {
          src: colorVariants[randomColorIndex],
          alt: `${shape}_${randomColorIndex}`,
          shape: shape,
          color: colorMap[randomColorIndex],
        };
      });

      setRandomFigures(figures);
      setVisibleFigures([false, false, false, false]);
    }
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
    setIsAnimating(true); // Починаємо анімацію
    const displayTime = levelConfig[currentLevel].displayTime;
    const sequence =
      levelConfig[currentLevel].sequences[
        currentStage % levelConfig[currentLevel].sequences.length
      ];

    // Reset all figures to hidden first
    setVisibleFigures([false, false, false, false]);

    // Special handling for level 4 - show all figures sequentially
    if (currentLevel === 4) {
      sequence.departments.forEach((dept, index) => {
        setTimeout(() => {
          setVisibleFigures(prev => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }, index * displayTime);
      });

      setTimeout(() => {
        setShowHidden(true);
        startTimer();
        setIsAnimating(false); // Завершуємо анімацію
      }, sequence.departments.length * displayTime);
    }
    // Special handling for level 3 - show figures in pairs
    else if (currentLevel === 3) {
      setTimeout(() => {
        setVisibleFigures(prev => {
          const updated = [...prev];
          updated[0] = true;
          updated[1] = true;
          return updated;
        });
      }, 0);

      setTimeout(() => {
        setVisibleFigures(prev => {
          const updated = [...prev];
          updated[0] = true;
          updated[1] = true;
          updated[2] = true;
          updated[3] = true;
          return updated;
        });
      }, displayTime);

      setTimeout(() => {
        setShowHidden(true);
        startTimer();
        setIsAnimating(false); // Завершуємо анімацію
      }, displayTime * 2);
    }
    // Special handling for level 2 with different sequence variants
    else if (currentLevel === 2) {
      const currentVariant =
        currentStage % levelConfig[currentLevel].sequences.length;

      if (currentVariant === 0) {
        sequence.departments.forEach((dept, index) => {
          setTimeout(() => {
            setVisibleFigures(prev => {
              const updated = [...prev];
              updated[dept] = true;
              return updated;
            });
          }, index * displayTime);
        });

        setTimeout(() => {
          setShowHidden(true);
          startTimer();
          setIsAnimating(false); // Завершуємо анімацію
        }, sequence.departments.length * displayTime);
      } else if (currentVariant === 1) {
        setTimeout(() => {
          setVisibleFigures(prev => {
            const updated = [...prev];
            updated[0] = true;
            updated[1] = true;
            return updated;
          });
        }, 0);

        setTimeout(() => {
          setVisibleFigures(prev => {
            const updated = [...prev];
            updated[0] = true;
            updated[1] = true;
            updated[2] = true;
            return updated;
          });
        }, displayTime);

        setTimeout(() => {
          setShowHidden(true);
          startTimer();
          setIsAnimating(false); // Завершуємо анімацію
        }, displayTime * 2);
      } else if (currentVariant === 2) {
        setTimeout(() => {
          setVisibleFigures(prev => {
            const updated = [...prev];
            updated[0] = true;
            return updated;
          });
        }, 0);

        setTimeout(() => {
          setVisibleFigures(prev => {
            const updated = [...prev];
            updated[0] = true;
            updated[1] = true;
            updated[2] = true;
            return updated;
          });
        }, displayTime);

        setTimeout(() => {
          setShowHidden(true);
          startTimer();
          setIsAnimating(false); // Завершуємо анімацію
        }, displayTime * 2);
      }
    } else {
      sequence.departments.forEach((dept, index) => {
        setTimeout(() => {
          setVisibleFigures(prev => {
            const updated = [...prev];
            updated[dept] = true;
            return updated;
          });
        }, index * displayTime);
      });

      setTimeout(() => {
        setShowHidden(true);
        startTimer();
        setIsAnimating(false); // Завершуємо анімацію
      }, sequence.departments.length * displayTime);
    }
  };

  const handleStart = () => {
    if (!isGameStarted && !isConfirming && isInitialAnimationDone) {
      setIsGameStarted(true);
      setIsFirstAudit(true); // Reset isFirstAudit for new round
      setAuditResult('none'); // Reset auditResult for new round
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
    setIsAuditMenuOpen(false); // Закриваємо модальне вікно
    setModalType(null); // Скидаємо тип модального вікна

    if (modalType === 'nextLevel') {
      // Підготовка до нового рівня
      generateRandomFigures();
      animateFigures();
    } else if (isFirstAudit) {
      setIsFirstAudit(false);
      setShowHidden(false);
      setIsConfirming(true);
    } else {
      setShowHidden(false);
      setIsConfirming(false);
      generateRandomFigures();
      animateFigures();
    }
  };

  const handleYes = () => {
    const newScore = parseInt(score) + 1;
    setScore(newScore.toString());

    if (
      newScore >= levelConfig[currentLevel].requiredScore &&
      currentLevel < 4
    ) {
      setCurrentLevel(prev => prev + 1); // Підвищуємо рівень
      setCurrentStage(0); // Скидаємо етап
      setModalType('nextLevel'); // Встановлюємо тип модального вікна
      setIsAuditMenuOpen(true); // Відкриваємо модальне вікно
    } else {
      setCurrentStage(
        prev => (prev + 1) % levelConfig[currentLevel].sequences.length
      ); // Переходимо до наступного етапу
      setModalType('audit'); // Тип для звичайної перевірки
      setAuditResult('yes'); // Результат перевірки
      setIsAuditMenuOpen(true); // Відкриваємо модальне вікно
    }

    setLastRecord(timer);
    localStorage.setItem('lastRecord', timer);
    resetTimer();
    setIsGameStarted(false);
    setIsConfirming(false);
  };

  const handleNo = () => {
    setCurrentStage(prev => prev % levelConfig[currentLevel].sequences.length);
    setLastRecord(timer);
    localStorage.setItem('lastRecord', timer);
    resetTimer();
    setIsGameStarted(false);
    setIsConfirming(false);
    setAuditResult('no');
    setIsAuditMenuOpen(true);
  };

  const animateFigures = () => {
    setIsAnimating(true); // Починаємо анімацію
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
          setIsAnimating(false); // Завершуємо анімацію
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

      generateRandomFigures();
    }

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
                disabled={isAnimating || !isInitialAnimationDone} // Вимикаємо під час анімації або якщо початкова анімація не завершена
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
                disabled={isAnimating || !isGameStarted} // Вимикаємо під час анімації або якщо гра ще не почалася
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
      <ModalComponent key="menuModal" isOpen={isMenuOpen} onClose={modalClick}>
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
      <ModalComponent
        key="auditModal"
        isOpen={isAuditMenuOpen}
        onClose={handleAuditClose}
      >
        <div className={styles.modal_wrap}>
          <h3 className={styles.modal_header}>
            {t('MemoryCaseGame.modal.audit.header')}
          </h3>
          <p className={styles.modal_text}>
            {modalType === 'nextLevel'
              ? t('MemoryCaseGame.modal.audit.nextLevel') // Текст для нового рівня
              : isFirstAudit
              ? t('MemoryCaseGame.modal.audit.text') // Текст для першої перевірки
              : auditResult === 'yes'
              ? t('MemoryCaseGame.modal.audit.takePoint') // Текст для правильної відповіді
              : t('MemoryCaseGame.modal.audit.tryAgain')}
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
