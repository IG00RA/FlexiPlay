'use client';

import { useState } from 'react';
import styles from './Buttons.module.css';
import Form from '../Form/Form';
import { useTranslations } from 'next-intl';

const ButtonWhite = ({ className = '' }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(prevState => !prevState);
  };

  const t = useTranslations();
  return (
    <>
      <button
        onClick={toggleForm}
        className={`${styles.button_white} ${className}`}
        type="button"
      >
        {t('Buttons.order')}
      </button>
      {isFormOpen && <Form isFormOpen={isFormOpen} toggleForm={toggleForm} />}
    </>
  );
};

export default ButtonWhite;
