import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/kubar_logo.png"
          alt="Kubar Protocol Logo"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
      <div className="flex items-center gap-6">
        <Link href="https://kubar.tech" target="_blank" className="text-white font-bold text-base hover:underline">
          Kubar.tech
        </Link>
        <Link href="#contact" className="text-white text-base hover:underline">
          Contact Us
        </Link>
      </div>
    </footer>
  );
}
