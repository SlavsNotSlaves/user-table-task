import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { clsx } from 'clsx';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  className,
  sideOffset = 5,
  align = 'end',
}) => (
  <DropdownMenuPrimitive.Root>
    <DropdownMenuPrimitive.Trigger asChild>
      {trigger}
    </DropdownMenuPrimitive.Trigger>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={clsx(
          'min-w-[228px] rounded-[12px] border border-[#EAEDF0] bg-white shadow-[0_4px_24px_0px_rgba(37,45,52,0.10)] p-0 z-50 focus:outline-none',
          className
        )}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Root>
);