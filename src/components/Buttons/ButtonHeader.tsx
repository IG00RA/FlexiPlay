'use client';

import { useState } from 'react';
import styles from './Buttons.module.css';
import Form from '../Form/Form';
import { useTranslations } from 'next-intl';

// Визначаємо інтерфейс для пропсів компонента
interface ButtonHeaderProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // Точні можливі значення для type
}

// Компонент із типізацією пропсів
const ButtonHeader: React.FC<ButtonHeaderProps> = ({
  className = '',
  type = 'button',
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    if (type === 'submit') {
      return;
    }
    setIsFormOpen(prevState => !prevState);
  };

  const t = useTranslations();
  return (
    <>
      <button
        onClick={toggleForm}
        className={`${styles.button} ${styles.button_header} ${className}`}
        type={type}
      >
        {t('Buttons.order')}
      </button>
      {isFormOpen && <Form isFormOpen={isFormOpen} toggleForm={toggleForm} />}
    </>
  );
};

export default ButtonHeader;
