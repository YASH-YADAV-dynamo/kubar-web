import Image from 'next/image';

export default function KubarAdvantage() {
  return (
    <div className="w-full bg-black relative">
      {/* Desktop Image */}
      <div className="hidden md:block w-full">
        <Image
          src="/advantage.png"
          alt="Kubar Advantage"
          width={1129}
          height={640}
          className="w-full h-[95vh] object-contain"
          priority
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden w-full p-5">
        <div className="relative w-full aspect-[3/4]"> 
          <Image
            src="/advantage_mobile.png"
            alt="Kubar Advantage Mobile"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
