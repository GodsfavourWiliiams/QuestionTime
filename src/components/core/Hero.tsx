import Image from 'next/image';
import { AppContainer } from './AppContainer';
import Header from './Header';

export default function Hero() {
  return (
    <div className="bg-primary h-[300px] text-white relative p-0">
      <Header />
      <AppContainer className="flex items-center flex-col gap-10">
        <Image
          src="/images/hero-bg.svg"
          alt="Hero image"
          width={3800}
          height={300}
          className="w-full h-full absolute z-0 overflow-hidden bottom-0 left-0 right-0 object-cover"
          unoptimized
          priority
        />
      </AppContainer>
    </div>
  );
}
