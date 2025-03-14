'use client';

import styles from './Important.module.css';
import Image from 'next/image';
import { importantItems, importantTraining } from '@/data/dataMain';
import { useTranslations } from 'next-intl';
import ButtonMain from '../Buttons/ButtonMain';
import Icon from '@/helpers/Icon';

export default function Important() {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <h2 className={styles.header}>{t('Important.header')}</h2>
      <p className={styles.text}>{t('Important.text')}</p>
      <ul className={styles.list}>
        {importantItems.map((item, index) => (
          <li className={styles.item} key={index}>
            <Image
              className={styles.important_img}
              src={item.img}
              width={0}
              height={0}
              sizes="100vw"
              alt={item.head}
              priority
            ></Image>
            <div className={styles.list_wrap}>
              <h3 className={styles.par_head}>{t(item.head)}</h3>
              <ul className={styles.text_list}>
                {item.text.map((item, index) => (
                  <li className={styles.text_item} key={index}>
                    <Icon
                      className={styles.item_icon}
                      name="icon-arrow_r"
                      width={32}
                      height={32}
                    />
                    <p className={styles.par}>{t(item)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.training_container}>
        <h3 className={styles.training_par_head}>
          {t('Important.items.fourth.head')}
        </h3>
        <ul className={styles.training_text_list}>
          {importantTraining.map((item, index) => (
            <li className={styles.training_text_item} key={index}>
              <Icon
                className={styles.item_icon}
                name="icon-arrow_r"
                width={32}
                height={32}
              />
              <p className={styles.training_par}>{t(item)}</p>
            </li>
          ))}
        </ul>
      </div>
      <ButtonMain className={styles.btn} />
    </section>
  );
}
