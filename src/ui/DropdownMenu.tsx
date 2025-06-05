import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { clsx } from 'clsx';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  sideOffset = 5,
  align = 'end',
  className,
}) => (
  <RadixDropdownMenu.Root>
    <RadixDropdownMenu.Trigger asChild>
      {trigger}
    </RadixDropdownMenu.Trigger>
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={clsx(
          'bg-white rounded-xl shadow-lg p-3 min-w-[228px] z-50 focus:outline-none',
          className
        )}
        sideOffset={sideOffset}
        align={align}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  </RadixDropdownMenu.Root>
); 