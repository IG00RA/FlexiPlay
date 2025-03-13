import About from '@/components/About/About';
import HeaderMain from '@/components/HeaderMain/HeaderMain';
import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <>
      <HeaderMain />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
