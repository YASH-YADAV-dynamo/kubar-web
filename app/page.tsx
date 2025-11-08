import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import TextSlider from './components/TextSlider';
import KubarForMSME from './components/KubarForMSME';
import VerticalScrollSections from './components/VerticalScrollSections';
import Footer from './components/Footer';

export const metadata = {
  title: "Kubar Protocol - Quick Loans for Your Growing Business",
  description: "NavDhan by Kubar Protocol: Get working capital fast with instant approval and flexible repayment. Built for India's small businesses on the ONDC network.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="home-page">
        <Hero />
        <TextSlider />
        <KubarForMSME />
        <AboutUs />
        <VerticalScrollSections />
      </main>
      <Footer />
    </>
  );
}

