import React from 'react';
import { SearchInput } from './SearchInput';
import { IconSingleChoice } from './icons/IconSingleChoice';

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
    <div className="mb-2 px-4 pt-4">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange || (() => {})}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
    <ul className="max-h-[320px] overflow-y-auto px-4 pb-4">
      {items.length === 0 && (
        <li className="px-3 py-2 text-gray-400 text-[14px]">{notFoundText}</li>
      )}
      {items.map(item => (
        <li
          key={item.key}
          className={[
            'flex items-center justify-between px-0 py-2 rounded-lg text-[13px] leading-[20px] font-plex font-normal select-none transition-colors',
            item.disabled
              ? 'text-gray-300 cursor-not-allowed bg-transparent'
              : 'text-[#202932] cursor-pointer hover:bg-blue-50 active:bg-blue-100',
            'focus:bg-blue-50'
          ].join(' ')}
          tabIndex={item.disabled ? -1 : 0}
          aria-disabled={item.disabled}
          onClick={() => !item.disabled && onToggle(item.key, !item.checked)}
        >
          <span className="truncate" style={{width: 152}}>{item.label}</span>
          {item.checked && (
            <span className="text-blue-600 ml-2 flex-shrink-0">
              <IconSingleChoice size={18} color="#2563eb" />
            </span>
          )}
        </li>
      ))}
    </ul>
  </div>
);