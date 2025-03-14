'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { feedbackItems as originalGalleryImages } from '@/data/dataMain';
import styles from './Feedback.module.css';
import { useEffect, useState } from 'react';
import Icon from '@/helpers/Icon';
import { useTranslations } from 'next-intl';
import ButtonMain from '../Buttons/ButtonMain';

interface FeedbackItem {
  img: string;
  span: string;
  head: string;
  text: string;
}

export default function Feedback() {
  const t = useTranslations();
  const [groupedItems, setGroupedItems] = useState<FeedbackItem[][]>([]);
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

  const groupItems = (
    items: FeedbackItem[],
    groupSize: number
  ): FeedbackItem[][] => {
    const grouped: FeedbackItem[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };

  useEffect(() => {
    const updateGroups = () => {
      const screenWidth = window.innerWidth;
      const groupSize = screenWidth >= 768 && screenWidth < 1250 ? 4 : 3;
      setGroupedItems(groupItems(originalGalleryImages, groupSize));
    };
    updateGroups();

    window.addEventListener('resize', updateGroups);

    return () => {
      window.removeEventListener('resize', updateGroups);
    };
  }, []);
  return (
    <section id="feedback" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.header}>{t('Feedback.header')}</h2>
        <div className={styles.pagination_wrap}>
          <div className={styles.prev}></div>
          <div className={styles.pagination}></div>
          <div className={styles.next}></div>
        </div>
        <Swiper
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          pagination={{
            clickable: true,
            el: `.${styles.pagination}`,
          }}
          spaceBetween={16}
          className={styles.gallery_slider}
          modules={[Navigation, Pagination]}
          loop={true}
        >
          {groupedItems.map((group, index) => (
            <SwiperSlide key={index} className={styles.gallery_item}>
              {group.map((item, subIndex) => (
                <div key={subIndex} className={styles.card}>
                  <div className={styles.img_wrap}>
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
                      src={item.img}
                      alt={t(item.head)}
                      className={styles.slider_image}
                      onLoad={() => handleImageLoad(index)}
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                  <div className={styles.card_footer}>
                    <span className={styles.card_span}>{t(item.span)}</span>
                    <h4 className={styles.card_span}>{t(item.head)}</h4>
                  </div>
                  <p className={styles.card_text}>{t(item.text)}</p>
                </div>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>

        <ButtonMain className={styles.btn} />
      </div>
    </section>
  );
}
