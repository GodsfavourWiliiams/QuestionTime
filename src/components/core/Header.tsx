'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AppContainer } from './AppContainer';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { AppLogo } from '../ui/AppLogo';

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();
  return (
    <nav className="z-50 relative border-b border-[#F2F4F70D] bg-primary">
      <AppContainer className="flex items-center justify-between py-4">
        <div className="flex lg:flex-1 items-center gap-x-12">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Journal Logo</span>
            <AppLogo background="dark" />
          </Link>
        </div>
        <div className={cn(' gap-4 items-center flex')}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="border w-10 h-10 ">
                <AvatarImage src={''} alt="Avatar" />
                <AvatarFallback>WG</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex items-center gap-2">
                <p className="text-s font-semibold leading-none capitalize">
                  Williams Godsfavour
                </p>
                <ChevronDownIcon className="w-[14px] h-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </nav>
  );
};

export default Header;
