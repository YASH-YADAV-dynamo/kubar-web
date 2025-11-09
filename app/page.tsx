import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import ExpandBussiness from './components/ExpandBussiness';
import ImageCarousel from './components/ImageCarousel';
import VerticalScrollSections from './components/VerticalScrollSections';
import ProductCTA from './components/ProductCTA';
import Footer from './components/Footer';

export const metadata = {
  title: "Kubar Labs - Quick Loans for Your Growing Business",
  description: "NavDhan by Kubar Labs: Get working capital fast with instant approval and flexible repayment. Built for India's small businesses on the ONDC network.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="home-page">
        <Hero />
        <AboutUs />
        <VerticalScrollSections />
        <ExpandBussiness />
        <ImageCarousel />
        <ProductCTA />
      </main>
      <Footer />
    </>
  );
}

