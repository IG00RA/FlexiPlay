import MainPage from '@/components/Games/MainPage/MainPage';
import styles from './Main.module.css';
import Header from '@/components/Games/Header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <MainPage />
      </main>
    </>
  );
}
