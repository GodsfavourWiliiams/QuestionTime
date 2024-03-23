'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AppContainer } from './AppContainer';
import { useRouter } from 'next/navigation';
import { AppLogo } from '../ui/AppLogo';
import { useLogout } from '@/helpers/api/useAuth';
import { Icons } from '@/assets/icons';
import { Button } from '../ui/button';

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();

  const { logoutUser: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
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
          <Button onClick={handleLogout} className="flex items-center gap-4">
            <p className="text-s font-semibold leading-none capitalize">
              Logout
            </p>
            <Icons.Logout className="w-[14px] h-[14px] text-white" />
          </Button>
        </div>
      </AppContainer>
    </nav>
  );
};

export default Header;
