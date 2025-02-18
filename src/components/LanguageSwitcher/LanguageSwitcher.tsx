'use client';

import { useEffect } from 'react';
import styles from './LanguageSwitcher.module.css';
import { usePathname, useRouter } from 'next/navigation';
import useLanguageStore from '@/store/useLanguageStore';

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { query, setLocale } = useLanguageStore();
  // Функція для визначення локалі з URL
  const getLocaleFromPath = (pathname: string): string => {
    const pathSegments = pathname.split('/');
    return pathSegments[1] || 'uk';
  };

  const locale = getLocaleFromPath(pathname || '');

  // Оновлюємо локаль у глобальному стані
  useEffect(() => {
    setLocale(locale);
  }, [setLocale, locale]);

  const handleLanguageChange = (lang: string) => {
    const path = pathname?.split('/').slice(2).join('/');
    router.push(`/${lang}/${path}?${query}`);
  };
  return (
    <div className={styles.language}>
      <button
        className={`${styles.button} ${
          locale === 'sk' ? styles.buttonActive : styles.buttonUnActive
        }`}
        onClick={() => handleLanguageChange('sk')}
        type="button"
      >
        SK
      </button>
      <button
        className={`${styles.button} ${
          locale === 'uk' ? styles.buttonActive : styles.buttonUnActive
        }`}
        onClick={() => handleLanguageChange('uk')}
        type="button"
      >
        UA
      </button>
    </div>
  );
};

export default LanguageSwitcher;
