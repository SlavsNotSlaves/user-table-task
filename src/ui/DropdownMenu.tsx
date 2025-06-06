import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  align = 'end',
  sideOffset = 5,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef as any}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="dropdown-menu"
        onClick={() => setOpen(v => !v)}
        className="focus:outline-none focus:border-none border-none"
      >
        {trigger}
      </button>
      {open && (
        <div
          ref={menuRef}
          id="dropdown-menu"
          role="menu"
          tabIndex={-1}
          className={clsx(
            'fixed z-50 min-w-[228px] rounded-2xl border border-gray-300 bg-white shadow-[0_4px_24px_0px_rgba(0,0,0,0.08)] p-4 focus:outline-none animate-fade-in  focus:border-none border-none' ,
            className
          )}
          style={{
            left: buttonRef.current ? buttonRef.current.getBoundingClientRect().left - 200 + 10 : 0, // 200px width + 50px gap
            top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + (sideOffset || 0) : 0,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};