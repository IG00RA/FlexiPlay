import About from '@/components/About/About';
import HeaderMain from '@/components/HeaderMain/HeaderMain';
import Hero from '@/components/Hero/Hero';
import Important from '@/components/Important/Important';

export default function Home() {
  return (
    <>
      <HeaderMain />
      <main>
        <Hero />
        <About />
        <Important />
      </main>
    </>
  );
}
