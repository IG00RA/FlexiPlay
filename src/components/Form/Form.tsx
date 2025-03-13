'use client';

import ReactDOM from 'react-dom';
import styles from './Form.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { sendMessage, sendToGoogleScript } from '@/api/sendData';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Icon from '@/helpers/Icon';
import useLanguageStore from '@/store/useLanguageStore';
import { useTranslations } from 'next-intl';

interface FormProps {
  toggleForm: () => void;
  isFormOpen: boolean;
}
export default function Form({ toggleForm, isFormOpen }: FormProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { locale, query } = useLanguageStore();
  const t = useTranslations();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nickname: '',
    email: '',
    quantity: 0,
    communication: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    nickname: '',
    communication: '',
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleQuantityChange = (value: number): void => {
    const newQuantity = Math.max(0, formData.quantity + value);
    setFormData({ ...formData, quantity: newQuantity });
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, communication: e.target.id });
  };

  const validateForm = (): boolean => {
    const newErrors = { name: '', phone: '', nickname: '', communication: '' };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = t('Form.errors.nameRequired');
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = t('Form.errors.phoneRequired');
      isValid = false;
    }

    if (!formData.nickname) {
      newErrors.nickname = t('Form.errors.nickRequired');
      isValid = false;
    }

    if (!formData.communication) {
      newErrors.communication = t('Form.errors.communicationRequired');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(t('Form.errors.validError'));
      return;
    }
    try {
      const message = {
        type: 'flexi',
        formData: {
          message: 'Користувач відправив форму',
          name: formData.name,
          surname: formData.nickname,
          quantity: formData.quantity,
          messenger: formData.communication,
          phone: formData.phone,
          email: formData.email,
        },
      };
      setIsLoading(true);
      await Promise.all([
        sendToGoogleScript(message),
        await sendMessage(message),
      ]);
      toast.success(t('Form.ok'));

      router.push(`/${locale}/confirm${query}`);

      toggleForm();
    } catch {
      toast.error(t('Form.errors.sendError'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      onClick={toggleForm}
      className={`${styles.backDrop} ${isFormOpen && styles.formOpen}`}
    >
      <div
        className={styles.formWrap}
        onClick={event => event.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={toggleForm} type="button">
          <Icon name="icon-close" width={16} height={16} color="#999" />
        </button>
        <h2 className={styles.header}>{t('Form.header')}</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('Form.form.namePlaceHolder')}
              className={`${styles.input} ${errors.name ? styles.error : ''}`}
              required
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </label>

          <label className={styles.label}>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder={t('Form.form.nickPlaceHolder')}
              className={`${styles.input} ${
                errors.nickname ? styles.error : ''
              }`}
            />
            {errors.nickname && (
              <p className={styles.errorText}>{errors.nickname}</p>
            )}
          </label>

          <p className={styles.pricePar}>{t('Form.form.priceText')}</p>
          <div className={styles.priceWrap}>
            <button
              className={styles.min}
              type="button"
              onClick={() => handleQuantityChange(-1)}
            ></button>
            <input
              required
              className={styles.quantity}
              type="number"
              placeholder="2"
              value={formData.quantity > 0 ? formData.quantity : ''}
              onChange={e => {
                const newQuantity = Math.max(0, Number(e.target.value));
                setFormData({ ...formData, quantity: newQuantity });
              }}
            />
            <button
              className={styles.plus}
              type="button"
              onClick={() => handleQuantityChange(1)}
            ></button>
            <span className={styles.priceTotal}>
              ={formData.quantity * (locale === 'sk' ? 20 : 1320)}
              {t('Form.form.priceValue')}
            </span>
          </div>

          <p className={styles.pricePar}>{t('Form.form.socialPar')}</p>
          <div className={styles.socWrap}>
            <label>
              <input
                type="radio"
                name="communication"
                id="whatsApp"
                onChange={handleRadioChange}
                checked={formData.communication === 'whatsApp'}
              />
              WhatsApp
            </label>
            <label>
              <input
                type="radio"
                name="communication"
                id="telegram"
                onChange={handleRadioChange}
                checked={formData.communication === 'telegram'}
              />
              Telegram
            </label>
            <label>
              <input
                type="radio"
                name="communication"
                id="viber"
                onChange={handleRadioChange}
                checked={formData.communication === 'viber'}
              />
              Viber
            </label>
            {errors.communication && (
              <p className={styles.errorText}>{errors.communication}</p>
            )}
          </div>

          <label className={styles.label}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('Form.form.phone')}
              inputMode="numeric"
              pattern="[\d\+\(\)\-\s]*"
              className={`${styles.input} ${errors.phone ? styles.error : ''}`}
              required
            />
            {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
          </label>

          <label className={styles.label}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className={`${styles.input}`}
              required
            />
          </label>
          <span
            className={`${styles.loader} ${!isLoading ? styles.hidden : ''}`}
          ></span>
          <div className={`${isLoading ? styles.hidden : styles.formButton}`}>
            <button type="submit">{t('Main.buttonSecond')}</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('portal-root')!
  );
}
