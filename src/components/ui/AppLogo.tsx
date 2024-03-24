import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type AppLogoProps = {
  background?: 'light' | 'dark';
};
export const AppLogo: FC<AppLogoProps> = ({ background = 'light' }) => {
  return (
    <div className="flex gap-3 items-center">
      <span
        className={twMerge(
          `text-xl sm:text-2xl font-bold`,
          background === 'light' ? 'text-body' : 'text-white'
        )}
      >
        Question Time
      </span>
    </div>
  );
};
