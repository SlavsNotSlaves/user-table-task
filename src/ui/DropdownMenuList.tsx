import React from 'react';
import { clsx } from 'clsx';
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
  <div>
    <SearchInput
      value={searchValue}
      onChange={onSearchChange || (() => {})}
      placeholder={placeholder}
      className="mb-2"
    />
    <ul className="py-1 max-h-60 overflow-y-auto">
      {items.length === 0 && (
        <li className="px-3 py-2 text-gray-400 text-sm">{notFoundText}</li>
      )}
      {items.map(item => (
        <li
          key={item.key}
          className={clsx(
            'flex items-center justify-between px-3 py-2 rounded-md font-plex text-[13px] leading-[20px]',
            item.disabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'cursor-pointer hover:bg-gray-100'
          )}
          onClick={() => !item.disabled && onToggle(item.key, !item.checked)}
        >
          <span>{item.label}</span>
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