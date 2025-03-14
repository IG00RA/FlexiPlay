'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import {
  slideItems as originalGalleryImages,
  qualityItems,
} from '@/data/dataMain';
import styles from './Included.module.css';
import { includedItems } from '@/data/dataMain';
import Icon from '@/helpers/Icon';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ButtonMain from '../Buttons/ButtonMain';
import ButtonWhite from '../Buttons/ButtonWhite';

export default function Included() {
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
    <section id="included" className={styles.section}>
      <div className={styles.swiper_container}>
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
                alt={`Слайд №${index + 1}`}
                className={styles.slider_image}
                width={0}
                height={0}
                onLoad={() => handleImageLoad(index)}
                sizes="100vw"
              />
            </SwiperSlide>
          ))}
          <div className={styles.image_wrapper}>
            <div className={styles.play_wrapper}>
              <Icon name="icon-play" width={136} height={136} />
            </div>
          </div>
        </Swiper>
        <div className={styles.par_wrap}>
          <div className={styles.pagination_wrap}>
            <div className={styles.prev}></div>
            <div className={styles.pagination}></div>
            <div className={styles.next}></div>
          </div>
          <h2 className={styles.header}>{t('Included.header')}</h2>
          <p className={styles.text}>{t('Included.text')}</p>
          <ul className={styles.list}>
            {includedItems.map((item, index) => (
              <li className={styles.list_item} key={index}>
                <p className={styles.par}>{t(item)}</p>
              </li>
            ))}
          </ul>
          <ButtonWhite className={styles.btn_white} />
        </div>
      </div>
      <h3 className={styles.container_header}>{t('Quality.header')}</h3>
      <ul className={styles.container_list}>
        {qualityItems.map((item, index) => (
          <li className={styles.container_item} key={index}>
            <Image
              className={styles.container_img}
              src={item.img}
              width={0}
              height={0}
              sizes="100vw"
              alt={item.head}
              priority
            ></Image>

            <p className={styles.container_par}>{t(item.head)}</p>
          </li>
        ))}
      </ul>

      <ButtonMain className={styles.btn} />
    </section>
  );
}
