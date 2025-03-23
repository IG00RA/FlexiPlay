import Header from '@/components/Games/Header/Header';
import styles from '../Main.module.css';

// export const generateMetadata = async () => {
//   return {
//     title: `FlexiFun – Онлайн тренажер FlexiFun Geometry`,
//     description:
//       'FlexiFun Geometry – це інноваційний онлайн тренажер, який допомагає розвивати моторику та логічне мислення за допомогою системи відео вправ. Завдяки двом режимам вправ, тренажер адаптується до різних потреб користувачів, роблячи навчання цікавим і ефективним.',
//   };
// };

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
}
