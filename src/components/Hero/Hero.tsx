'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Hero.module.css';
import { useTranslations } from 'next-intl';
import Icon from '@/helpers/Icon';
import Image from 'next/image';
import {
  heroItems,
  slideItems as originalGalleryImages,
} from '@/data/dataMain';
import { useState } from 'react';
import ButtonHero from '../Buttons/ButtonHero';

export default function Hero() {
  const t = useTranslations();

  const [loadingImages, setLoadingImages] = useState<boolean[]>(
    Array(originalGalleryImages.length).fill(true)
  );

  const handleImageLoad = (index: number) => {
    setLoadingImages(prev => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p className={styles.text}>{t('Hero.text')}</p>
          <h1 className={styles.header}>
            {t('Hero.header')}
            <span>{t('Hero.headerDesk')}</span>
          </h1>
          <div className={styles.swiper_wrapper}>
            <Swiper
              navigation={{
                prevEl: `.${styles.prev}`,
                nextEl: `.${styles.next}`,
              }}
              pagination={{
                clickable: true,
                el: `.${styles.pagination}`,
              }}
              spaceBetween={32}
              slidesPerView={1}
              className={styles.gallery_slider}
              modules={[Navigation, Pagination]}
              loop={true}
            >
              {originalGalleryImages.map((image, index) => (
                <SwiperSlide key={index}>
                  {loadingImages[index] && (
                    <div className={styles.loader}>
                      <Icon
                        name="icon-load"
                        width={55}
                        height={55}
                        color="#88b2ff"
                      />
                    </div>
                  )}
                  <Image
                    src={image}
                    alt={`Фото набору №${index + 1}`}
                    className={styles.slider_image}
                    width={0}
                    height={0}
                    onLoad={() => handleImageLoad(index)}
                    sizes="100vw"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.pagination_wrap}>
              <div className={styles.prev}></div>
              <div className={styles.pagination}></div>
              <div className={styles.next}></div>
            </div>
          </div>
          <p className={styles.par}>{t('Hero.par')}</p>
          <ul className={styles.list}>
            {heroItems.map((item, index) => (
              <li className={styles.item} key={index}>
                <Icon
                  className={styles.item_icon}
                  name="icon-hero"
                  width={24}
                  height={24}
                />
                <p className={styles.item_text}>{t(item)}</p>
              </li>
            ))}
          </ul>
          <div className={styles.button_wrap}>
            <div className={`${styles.price_wrap}`}>
              <span className={styles.styled_price}>{t('Hero.price')}</span>
              <span className={styles.styled_price_second}>
                {t('Hero.priceSecond')}
              </span>
            </div>
            <ButtonHero />
          </div>
        </div>
      </div>
    </section>
  );
}
