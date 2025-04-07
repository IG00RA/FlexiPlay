'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Hero.module.css';
import { useTranslations } from 'next-intl';
import Icon from '@/helpers/Icon';
import Image, { StaticImageData } from 'next/image';
import {
  heroItems,
  slideItems as originalGalleryImages,
} from '@/data/dataMain';
import { useState, useEffect, useRef } from 'react';
import ButtonHero from '../Buttons/ButtonHero';
import ModalComponent from '../Modals/ModalComponent';
import SwiperCore from 'swiper';

export default function Hero() {
  const t = useTranslations();
  const [loadingImages, setLoadingImages] = useState<boolean[]>(
    Array(originalGalleryImages.length).fill(true)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(
    null
  );
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleImageLoad = (index: number) => {
    setLoadingImages(prev => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleImageClick = (image: StaticImageData) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const updatePagination = () => {
    if (!swiperRef.current) return;

    const totalSlides = originalGalleryImages.length;
    const maxBullets = 5;
    const half = Math.floor(maxBullets / 2);
    const activeIndex = swiperRef.current.realIndex || 0;

    let start = activeIndex - half;
    let end = activeIndex + half + 1;

    if (start < 0) {
      start = 0;
      end = maxBullets;
    }
    if (end > totalSlides) {
      end = totalSlides;
      start = totalSlides - maxBullets;
    }
    if (totalSlides < maxBullets) {
      start = 0;
      end = totalSlides;
    }

    const bullets = document.querySelectorAll<HTMLElement>(
      `.${styles.pagination} .swiper-pagination-bullet`
    );
    bullets.forEach((bullet, index) => {
      if (index >= start && index < end) {
        bullet.style.display = 'inline-block';
      } else {
        bullet.style.display = 'none';
      }
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
                type: 'bullets',
                bulletClass: `swiper-pagination-bullet`,
                bulletActiveClass: `swiper-pagination-bullet-active`,
                renderBullet: function (index, className) {
                  return `<span class="${className}"></span>`;
                },
              }}
              spaceBetween={32}
              slidesPerView={1}
              className={styles.gallery_slider}
              modules={[Navigation, Pagination]}
              loop={true}
              onSwiper={swiper => {
                swiperRef.current = swiper;
                setTimeout(updatePagination, 0);
              }}
              onSlideChange={updatePagination}
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
                    onClick={() => handleImageClick(image)}
                    sizes="100vw"
                    style={{ cursor: 'pointer' }}
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

      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Збільшене зображення"
            className={styles.modal_image}
            width={0}
            height={0}
            sizes="100vw"
          />
        )}
      </ModalComponent>
    </section>
  );
}
