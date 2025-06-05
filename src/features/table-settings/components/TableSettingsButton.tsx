import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTableSettingsStore } from '@store';
import { useFilteredColumns } from '../hooks';
import { clsx } from 'clsx';

const TableSettingsButton = () => {
  const [search, setSearch] = useState('');
  const {
    visibleColumns,
    setVisibleColumns,
  } = useTableSettingsStore();

  const filtered = useFilteredColumns(search);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full p-2 hover:bg-gray-200 focus:outline-none"
          aria-label="Table settings"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-64 bg-white border rounded shadow-lg z-50 p-2 focus:outline-none"
          sideOffset={5}
          align="end"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full mb-2 px-2 py-1 border rounded"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search columns"
            autoFocus
          />
          
          <div className="mb-2">
            <span className="block text-xs font-semibold text-gray-500 mb-1">Visible columns</span>
            <ul className="max-h-40 overflow-y-auto">
              {filtered.length === 0 && (
                <li className="px-2 py-2 text-gray-400 text-sm">Not found...</li>
              )}
              {filtered.map(col => (
                <DropdownMenu.Item key={col.key} asChild>
                  <li className={clsx(
                    "flex items-center gap-2 px-2 py-1 text-sm",
                    "cursor-pointer select-none outline-none",
                    "hover:bg-gray-100 focus:bg-gray-100"
                  )}>
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(col.key)}
                      disabled={col.disabled}
                      onChange={e => {
                        if (col.disabled) return;
                        if (e.target.checked) {
                          setVisibleColumns([...visibleColumns, col.key]);
                        } else {
                          setVisibleColumns(visibleColumns.filter(c => c !== col.key));
                        }
                      }}
                      aria-label={`Toggle ${col.label}`}
                      className="cursor-pointer"
                    />
                    <span className={clsx(col.disabled && 'text-gray-400')}>{col.label}</span>
                  </li>
                </DropdownMenu.Item>
              ))}
            </ul>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default TableSettingsButton;
