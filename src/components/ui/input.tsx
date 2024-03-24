import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactElement;
  endContent?: React.ReactElement;
  startContentAction?: () => void;
  endContentAction?: () => void;
  error?: boolean;
}

const startIconPadding = 'pl-3'; // Default padding when only StartIcon is present
const endIconPadding = 'pr-6'; // Additional padding when only EndIcon is present
const bothIconsPadding = 'pl-10 pr-10'; // Padding when both StartIcon and EndIcon are present

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startContent, endContent, error, ...props }, ref) => {
    const combinedPadding =
      startContent && endContent
        ? bothIconsPadding
        : startContent
        ? startIconPadding
        : endContent
        ? endIconPadding
        : '';
    return (
      <div
        className={cn(
          'flex items-center h-max w-full rounded-xl border border-input bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grayscale-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary  focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
          combinedPadding,
          {
            ' border-red-600 focus-visible:ring-red-500 bg-white focus-within:ring-destructive':
              error,
          }
        )}
      >
        {startContent}
        <input
          type={type}
          className="flex-grow h-full w-full rounded-xl px-5 py-4 focus-within:outline-none focus-within:ring-transparent"
          ref={ref}
          {...props}
        />
        {endContent}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
