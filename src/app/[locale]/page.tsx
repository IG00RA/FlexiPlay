import About from '@/components/About/About';
import HeaderMain from '@/components/HeaderMain/HeaderMain';
import Hero from '@/components/Hero/Hero';
import Important from '@/components/Important/Important';
import Included from '@/components/Included/Included';

export default function Home() {
  return (
    <>
      <HeaderMain />
      <main>
        <Hero />
        <About />
        <Important />
        <Included />
      </main>
    </>
  );
}
