import { useState } from 'react';
import { useTableSettingsStore } from '@store';
import { useFilteredColumns } from '../hooks';
import { DropdownMenu, DropdownMenuList, IconButton } from '@/ui';
import { IconGear } from '@/ui/icons';

const TableSettingsButton = () => {
  const [search, setSearch] = useState('');
  const {
    visibleColumns,
    setVisibleColumns,
  } = useTableSettingsStore();

  const filtered = useFilteredColumns(search);

  const items = filtered.map(col => ({
    key: col.key,
    label: col.label,
    checked: visibleColumns.includes(col.key),
    disabled: col.disabled,
  }));

  return (
    <DropdownMenu
      trigger={
        <IconButton
          aria-label="Table settings"
          className="sticky top-4 z-20 bg-white border border-[#EAEDF0] shadow hover:bg-gray-100"
        >
          <IconGear size={20} />
        </IconButton>
      }
      sideOffset={5}
      align="end"
    >
      <DropdownMenuList
        items={items}
        onToggle={(key, checked) => {
          const col = filtered.find(c => c.key === key);
          if (!col || col.disabled) return;
          const colKey = key as import('@store/types').TableColumn;
          if (checked) {
            setVisibleColumns([...visibleColumns, colKey]);
          } else {
            setVisibleColumns(visibleColumns.filter(c => c !== colKey));
          }
        }}
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Search..."
        notFoundText="Not found..."
      />
    </DropdownMenu>
  );
};

export default TableSettingsButton;
