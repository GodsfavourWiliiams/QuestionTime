import { cn } from '@/lib/utils';
import { FC } from 'react';

type HeroContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const HeroContainer: FC<HeroContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        ' p-5 md:p-6 bg-white rounded-2xl w-full -mt-[180px] z-20',
        className
      )}
    >
      {children}
    </div>
  );
};
