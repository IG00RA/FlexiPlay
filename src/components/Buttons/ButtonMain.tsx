'use client';

import { useState } from 'react';
import styles from './Buttons.module.css';
import Form from '../Form/Form';
import { useTranslations } from 'next-intl';

const ButtonMain = ({ className = '' }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const t = useTranslations();
  const toggleForm = () => {
    setIsFormOpen(prevState => !prevState);
  };
  return (
    <>
      <button
        onClick={toggleForm}
        className={`${styles.button} ${className}`}
        type="button"
      >
        {t('Buttons.order')}
      </button>
      {isFormOpen && <Form isFormOpen={isFormOpen} toggleForm={toggleForm} />}
    </>
  );
};

export default ButtonMain;
