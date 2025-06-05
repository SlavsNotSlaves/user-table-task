import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  className?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        type="button"
        className={clsx(
          'inline-flex items-center justify-center rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

IconButton.displayName = 'IconButton'; 