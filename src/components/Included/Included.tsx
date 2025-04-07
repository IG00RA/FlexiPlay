'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image, { StaticImageData } from 'next/image';
import {
  slideItems as originalGalleryImages,
  qualityItems,
} from '@/data/dataMain';
import styles from './Included.module.css';
import { includedItems } from '@/data/dataMain';
import Icon from '@/helpers/Icon';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ButtonMain from '../Buttons/ButtonMain';
import ButtonWhite from '../Buttons/ButtonWhite';
import ModalComponent from '../Modals/ModalComponent';
import SwiperCore from 'swiper';

export default function Included() {
  const t = useTranslations();
  const [loadingImages, setLoadingImages] = useState<boolean[]>(
    Array(originalGalleryImages.length).fill(true)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<
    StaticImageData | string | null
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoSrc = '/assets/review.mov';

  const handleImageLoad = (index: number) => {
    setLoadingImages(prev => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleContentClick = (content: StaticImageData | string) => {
    setSelectedContent(content);
    setIsModalOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const playVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Error playing video:', error);
        });
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current && isPlaying) {
      pauseVideo();
    }
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleContentClick(videoSrc);
  };

  const updatePagination = () => {
    if (!swiperRef.current) return;

    const totalSlides = originalGalleryImages.length + 1;
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

  const totalSlides = originalGalleryImages.length + 1;
  const enableLoop = totalSlides >= 2;

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
          loop={enableLoop}
          onSwiper={swiper => {
            swiperRef.current = swiper;
            setTimeout(updatePagination, 0);
          }}
          onSlideChange={() => {
            updatePagination();
            if (!isPlaying) {
              pauseVideo();
            }
          }}
        >
          <SwiperSlide>
            <div className={styles.video_wrapper}>
              <video
                ref={videoRef}
                src={videoSrc}
                className={styles.slider_image}
                muted
                onClick={handleVideoClick}
                style={{ cursor: isPlaying ? 'pointer' : 'default' }}
              />
              {!isPlaying && (
                <div className={styles.image_wrapper}>
                  <div className={styles.play_wrapper} onClick={playVideo}>
                    <Icon name="icon-play" width={136} height={136} />
                  </div>
                  <p className={styles.play_text}>{t('Included.video')}</p>
                </div>
              )}
              <div
                className={styles.expand_logo_wrapper}
                onClick={handleExpandClick}
              >
                <Icon
                  className={styles.expand_logo}
                  color="white"
                  name="icon-expand"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Зображення */}
          {originalGalleryImages.map((image, index) => (
            <SwiperSlide key={index + 1}>
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
                onClick={() => handleContentClick(image)}
                sizes="100vw"
                style={{ cursor: 'pointer' }}
              />
            </SwiperSlide>
          ))}
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
            />
            <p className={styles.container_par}>{t(item.head)}</p>
          </li>
        ))}
      </ul>
      <ButtonMain className={styles.btn} />

      {/* Модалка */}
      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        {selectedContent &&
          (typeof selectedContent === 'string' ? (
            <video
              src={selectedContent}
              controls
              autoPlay
              className={styles.modal_image}
            />
          ) : (
            <Image
              src={selectedContent}
              alt="Збільшене зображення"
              className={styles.modal_image}
              width={0}
              height={0}
              sizes="100vw"
            />
          ))}
      </ModalComponent>
    </section>
  );
}
