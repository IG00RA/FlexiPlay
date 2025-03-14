'use client';

import styles from './About.module.css';
import Icon from '@/helpers/Icon';
import { useTranslations } from 'next-intl';
import ButtonMain from '../Buttons/ButtonMain';
import Image from 'next/image';
import child from '@/img/about/image.webp';
import fastSearch from '@/img/about/fastSearch.webp';
import formSearch from '@/img/about/formSearch.webp';
import figureSet from '@/img/about/figureSet.webp';
import memoryCase from '@/img/about/memoryCase.webp';
import memorySet from '@/img/about/memorySet.webp';

export default function About() {
  const t = useTranslations();

  return (
    <section id="how-works" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.header}>{t('About.header')}</h2>

        <div className={styles.about_wrap}>
          <Image
            src={child}
            alt={`Зацікавлена дитина`}
            className={styles.image}
            width={0}
            height={0}
            sizes="100vw"
          />
          <ul className={styles.list}>
            <li className={styles.item}>
              <Icon
                className={styles.item_icon}
                name="icon-arrow_r"
                width={24}
                height={24}
              />
              <div className={styles.item_text_wrap}>
                <h3 className={styles.item_text_header}>
                  {t('About.items.first.header')}
                </h3>
                <div>
                  <p className={styles.item_text}>
                    {t('About.items.first.textFirst')}
                  </p>
                  <p className={styles.item_text_second}>
                    {t('About.items.first.textFirst')}
                  </p>
                  <p className={styles.item_text_second}>
                    {t('About.items.first.textSecond')}
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.item}>
              <Icon
                className={styles.item_icon}
                name="icon-arrow_r"
                width={24}
                height={24}
              />
              <div className={styles.item_text_wrap}>
                <h3 className={styles.item_text_header}>
                  {t('About.items.second.header')}
                  <span> {t('About.items.second.headerAdd')}</span>
                </h3>
                <div>
                  <p className={styles.item_text}>
                    {t('About.items.second.textMob')}
                  </p>
                  <p className={styles.item_text_second}>
                    {t('About.items.second.textFirst')}
                  </p>
                  <p className={styles.item_text_second}>
                    {t('About.items.second.textSecond')}
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.item}>
              <Icon
                className={styles.item_icon}
                name="icon-arrow_r"
                width={24}
                height={24}
              />
              <div className={styles.item_text_wrap}>
                <h3 className={styles.item_text_header}>
                  {t('About.items.third.header')}{' '}
                  <span> {t('About.items.third.headerAdd')}</span>
                </h3>
                <p className={styles.item_text_desk}>
                  {t('About.items.third.text')}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <h2 className={styles.header_second}>{t('About.secondHeader')}</h2>
        <div className={styles.about_game_wrap}>
          <div className={styles.geometry_container}>
            <h3 className={styles.geometry_container_header}>
              {t('About.containers.geometry')}
            </h3>

            <Image
              src={figureSet}
              alt={`Комплектація набору`}
              className={styles.geometry_img}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div className={styles.memory_container}>
            <h3 className={styles.memory_container_header}>
              {t('About.containers.memory')}
            </h3>

            <Image
              src={memorySet}
              alt={`Гра Memory case`}
              className={styles.memory_img}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
        <div className={styles.game_container}>
          <h3 className={styles.game_container_header}>
            {t('About.containers.game')}
          </h3>
          <div className={styles.game_container_img_wrap}>
            <Image
              src={fastSearch}
              alt={`Гра швидкісний пошук`}
              className={styles.first_game}
              width={0}
              height={0}
              sizes="100vw"
            />
            <Image
              src={memoryCase}
              alt={`Гра Тренування памяті`}
              className={styles.second_game}
              width={0}
              height={0}
              sizes="100vw"
            />
            <Image
              src={formSearch}
              alt={`Гра швидкісний пошук`}
              className={styles.third_game}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
        <ButtonMain className={styles.btn} />
      </div>
    </section>
  );
}
