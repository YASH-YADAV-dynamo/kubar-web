import NavDhanHeader from '../../components/NavDhanHeader';
import NavDhanFooter from '../../components/NavDhanFooter';
import Products from '../../components/Products';
import KubarForNBFCAndMSME from '../../components/KubarForNBFCAndMSME';
import NavDhanWrapper from './NavDhanWrapper';

export const metadata = {
  title: "NavDhan — Kubar Labs",
  description: "NavDhan by Kubar Labs embeds MSME credit intelligence through lender-grade services.",
};

export default function NavDhanPage() {
  return (
    <NavDhanWrapper>
      <div data-page="navdhan">
        <NavDhanHeader />
        <main style={{ background: '#ffffff' }}>
          <Products />
          <KubarForNBFCAndMSME />
        </main>
        <NavDhanFooter />
      </div>
    </NavDhanWrapper>
  );
}

