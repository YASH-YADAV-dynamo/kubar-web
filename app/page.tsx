import Header from './components/Header';
import Footer from './components/Footer';
import HomeClient from './HomeClient';

export const metadata = {
  title: "Kubar Labs - Quick Loans for Your Growing Business",
  description: "NavDhan by Kubar Labs: Get working capital fast with instant approval and flexible repayment. Built for India's small businesses on the ONDC network.",
};

export default function Home() {
  return (
    <>
      <Header />
      <HomeClient />
      <Footer />
    </>
  );
}

