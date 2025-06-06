import React from 'react';
import { SearchInput } from './SearchInput';
import { IconSingleChoice } from './icons/IconSingleChoice';
import * as Checkbox from '@radix-ui/react-checkbox';

export interface DropdownMenuListItem {
  key: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
}

interface DropdownMenuListProps {
  items: DropdownMenuListItem[];
  onToggle: (key: string, checked: boolean) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  notFoundText?: string;
}

export const DropdownMenuList: React.FC<DropdownMenuListProps> = ({
  items,
  onToggle,
  searchValue = '',
  onSearchChange,
  placeholder = 'Search...',
  notFoundText = 'Not found...'
}) => (
  <div style={{ background: 'white' }} className="rounded-[12px] border border-[#EAEDF0] bg-white shadow-[0_4px_24px_0px_rgba(37,45,52,0.10)] p-0 w-[228px]">
    <div className="mb-2" style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 12 }}>
      <SearchInput
        value={searchValue}
        onChange={onSearchChange || (() => {})}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
    <ul
      className="max-h-[320px] overflow-y-auto pb-3"
      style={{ paddingLeft: 12, paddingRight: 8 }}
    >
      {items.length === 0 && (
        <li className="px-3 py-2 text-[#5F6E7C] text-[14px]">{notFoundText}</li>
      )}
      {[
        ...items.filter(item => !item.disabled),
        ...items.filter(item => item.disabled)
      ].map((item) => (
        <li
          key={item.key}
          style={{ padding: '6px 0px' }}
          className={[
            'flex items-center justify-between px-0 py-2 rounded-lg text-[13px] leading-[20px] font-plex font-normal select-none transition-colors',
            item.disabled
              ? 'text-[#5F6E7C] cursor-not-allowed bg-transparent'
              : 'text-[#202932] cursor-pointer hover:bg-blue-50 active:bg-blue-100',
            'focus:bg-blue-50',
          ].join(' ')}
          tabIndex={item.disabled ? -1 : 0}
          aria-disabled={item.disabled}
          onClick={() => !item.disabled && onToggle(item.key, !item.checked)}
        >
          <span className="truncate text-left" style={{ width: 160, marginLeft: 0 }}>{item.label}</span>
          {!item.disabled && (
            <Checkbox.Root
              checked={item.checked}
              disabled={item.disabled}
              onCheckedChange={() => !item.disabled && onToggle(item.key, !item.checked)}
              className={[
                'flex items-center justify-center ml-2 p-0 bg-transparent border-none outline-none shadow-none',
                item.checked ? '' : 'opacity-0',
                item.disabled ? 'opacity-50' : ''
              ].join(' ')}
              tabIndex={-1}
              aria-label={item.label}
              style={{ width: 20, height: 20 }}
            >
              <Checkbox.Indicator forceMount>
                <IconSingleChoice size={20} color="#2563eb" />
              </Checkbox.Indicator>
            </Checkbox.Root>
          )}
        </li>
      ))}
    </ul>
  </div>
);