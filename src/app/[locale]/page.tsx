import About from '@/components/About/About';
import Feedback from '@/components/Feedback/Feedback';
import Footer from '@/components/Footer/Footer';
import HeaderMain from '@/components/HeaderMain/HeaderMain';
import Hero from '@/components/Hero/Hero';
import Important from '@/components/Important/Important';
import Included from '@/components/Included/Included';
import Questions from '@/components/Questions/Questions';

export default function Home() {
  return (
    <>
      <HeaderMain />
      <main>
        <Hero />
        <About />
        <Important />
        <Included />
        <Feedback />
        <Questions />
        <Footer />
      </main>
    </>
  );
}
