'use client';

import styles from './Questions.module.css';
import { questionsItems } from '@/data/dataMain';
import Icon from '@/helpers/Icon';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ButtonMain from '../Buttons/ButtonMain';

export default function Questions() {
  const t = useTranslations();
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleDropdown = (index: number): void => {
    setOpenIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="questions" className={styles.section}>
      <h2 className={styles.header}>{t('Questions.header')}</h2>

      <ul className={styles.list}>
        {questionsItems.map((item, index) => (
          <li
            key={index}
            onClick={() => toggleDropdown(index)}
            className={`${styles.item} ${
              openIndices.includes(index) ? `${styles.open}` : ''
            }`}
          >
            <div className={styles.main_wrap}>
              <div className={styles.par_wrap}>
                <span className={styles.numb_wrap}>{item.numb}</span>

                <h3 className={styles.par_head}>{t(item.head)}</h3>
              </div>
              <button
                type="button"
                className={`${styles.button} ${
                  openIndices.includes(index) ? styles.active : ''
                }`}
              >
                <Icon name="icon-arrrow_quests" width={14} height={26} />
              </button>
            </div>
            <p
              className={`${styles.drop_box} ${
                openIndices.includes(index) ? `${styles.open}` : ''
              }`}
            >
              {t(item.text)}
            </p>
          </li>
        ))}
      </ul>
      <ButtonMain className={styles.btn} />
    </section>
  );
}
