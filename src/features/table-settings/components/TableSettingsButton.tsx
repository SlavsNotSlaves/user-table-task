import { useState, useEffect, useRef } from 'react';
import { useTableSettingsStore } from '../../../store';
import { useFilteredColumns } from '../hooks';

const TableSettingsButton = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const {
    visibleColumns,
    setVisibleColumns,
    restore,
  } = useTableSettingsStore();

  useEffect(() => {
    restore();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener('mousedown', handle);
    return () => window.removeEventListener('mousedown', handle);
  }, [open]);

  const filtered = useFilteredColumns(search);

  return (
    <div className="relative" ref={ref}>
      <button
        className="rounded-full p-2 hover:bg-gray-200 focus:outline-none"
        aria-label="Table settings"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={e => {
          e.stopPropagation();
          setOpen(v => !v);
        }}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
      </button>
      {open && (
        <div
          className="absolute left-0 top-10 w-64 bg-white border rounded shadow-lg z-50 p-2 focus:outline-none"
          style={{ minWidth: 220 }}
          role="menu"
          tabIndex={-1}
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
                <li key={col.key} className="flex items-center gap-2 px-2 py-1 text-sm">
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
                  />
                  <span className={col.disabled ? 'text-gray-400' : ''}>{col.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSettingsButton;
