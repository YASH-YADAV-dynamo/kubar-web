import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Products from '../../components/Products';
import KubarForNBFCAndMSME from '../../components/KubarForNBFCAndMSME';

export const metadata = {
  title: "NavDhan — Kubar Labs",
  description: "NavDhan by Kubar Labs embeds MSME credit intelligence through lender-grade services.",
};

export default function NavDhanPage() {
  return (
    <>
      <Header />
      <main>
        <Products />
        <KubarForNBFCAndMSME />
      </main>
      <Footer />
    </>
  );
}

