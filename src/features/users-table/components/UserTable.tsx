import React from 'react';
import { flexRender } from '@tanstack/react-table';
import type { TableColumn } from '@store/types';
import type { User } from '@features/users-table/types';
import { useTable } from '../hooks/useTable';
import { useTableColumns } from './TableColumns';
import TableStatus from './TableStatus';
import { Table as RadixTable } from '@radix-ui/themes';

interface UserTableProps {
  users: User[];
  visibleColumns: TableColumn[];
  isLoading: boolean;
  error: unknown;
  selectedRowId?: string | number;
  onRowSelect?: (user: User) => void;
}

const MIN_TABLE_HEIGHT = 300;
const SETTINGS_WIDTH = 34;
const FIRST_COL_WIDTH = 180; 

const UserTable: React.FC<UserTableProps> = ({ users, visibleColumns, isLoading, error, selectedRowId, onRowSelect }) => {
  const columns = useTableColumns(visibleColumns);
  const table = useTable(users, columns);

  const showStatus = isLoading || error || !table.getRowModel().rows.length;
  const statusType = isLoading ? 'loading' : error ? 'error' : 'empty';

  if (showStatus) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center" style={{ minHeight: MIN_TABLE_HEIGHT }}>
        <TableStatus status={statusType} colSpan={columns.length} />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 550, height: 550 }}>
      <div style={{ minWidth: 900 }}>
        <RadixTable.Root className="min-w-full border-separate border-spacing-0 rounded-xl overflow-hidden">
          <RadixTable.Header>
            {table.getHeaderGroups().map(headerGroup => (
              <RadixTable.Row key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => {
                  // sticky first column
                  if (idx === 0) {
                    return (
                      <RadixTable.ColumnHeaderCell
                        key={header.id}
                        style={{ width: FIRST_COL_WIDTH, minWidth: FIRST_COL_WIDTH, maxWidth: FIRST_COL_WIDTH, height: 28, left: 0, top: 0, zIndex: 40 }}
                        className="sticky left-0 top-0 z-40 bg-[#F7F7F8] px-4 py-2 align-middle"
                        scope="col"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </RadixTable.ColumnHeaderCell>
                    );
                  }
                  // sticky settings column
                  if (header.id === 'settings') {
                    return (
                      <RadixTable.ColumnHeaderCell
                        key={header.id}
                        style={{ width: SETTINGS_WIDTH, minWidth: SETTINGS_WIDTH, maxWidth: SETTINGS_WIDTH, height: 28, right: 0, top: 0, zIndex: 30 }}
                        className="sticky right-0 top-0 z-30 bg-[#F7F7F8] px-2 py-2 align-middle"
                        scope="col"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </RadixTable.ColumnHeaderCell>
                    );
                  }
               
                  return (
                    <RadixTable.ColumnHeaderCell
                      key={header.id}
                      style={{ width: header.getSize(), maxWidth: header.getSize(), minWidth: header.getSize(), height: 28 }}
                      className="px-4 py-2 align-middle bg-[#F7F7F8] "
                      scope="col"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </RadixTable.ColumnHeaderCell>
                  );
                })}
              </RadixTable.Row>
            ))}
          </RadixTable.Header>
          <RadixTable.Body>
            {table.getRowModel().rows.map((row, rowIdx) => {
              const isSelected = selectedRowId === row.original?.id;
              const isLastRow = rowIdx === table.getRowModel().rows.length - 1;
              return (
                <RadixTable.Row
                  key={row.id}
                  className={`h-[56px] group ${isSelected ? 'bg-[#F7F7F8] border-l-2 border-[#5F6E7C]' : 'hover:bg-gray-50'} transition-colors`}
                  onClick={onRowSelect ? () => onRowSelect(row.original) : undefined}
                  style={isSelected ? { borderLeftWidth: 2, borderLeftColor: '#5F6E7C' } : {}}
                >
                  {row.getVisibleCells().map((cell, idx, arr) => {
                    // sticky first column
                    if (idx === 0) {
                      return (
                        <RadixTable.Cell
                          key={cell.id}
                          style={{ width: FIRST_COL_WIDTH, minWidth: FIRST_COL_WIDTH, maxWidth: FIRST_COL_WIDTH, left: 0, zIndex: 20 }}
                          className={`sticky left-0 z-20 px-4 py-0 h-[56px] align-middle ${isSelected ? 'bg-[#F7F7F8]' : 'bg-white'} ${!isLastRow ? 'border-b border-[#EAEDF0]' : ''}`}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </RadixTable.Cell>
                      );
                    }
                    // sticky settings column (last)
                    if (cell.column.id === 'settings' && idx === arr.length - 1) {
                      return (
                        <RadixTable.Cell
                          key={cell.id}
                          style={{ width: SETTINGS_WIDTH, minWidth: SETTINGS_WIDTH, maxWidth: SETTINGS_WIDTH, right: 0, zIndex: 20 }}
                          className={`sticky right-0 z-20 px-2 py-0 h-[56px] align-middle ${isSelected ? 'bg-[#F7F7F8]' : 'bg-white'} ${!isLastRow ? 'border-b border-[#EAEDF0]' : ''}`}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </RadixTable.Cell>
                      );
                    }
                    return (
                      <RadixTable.Cell
                        key={cell.id}
                        style={{ width: cell.column.getSize(), maxWidth: cell.column.getSize(), minWidth: cell.column.getSize() }}
                        className={`px-4 py-0 whitespace-nowrap h-[56px] align-middle break-words text-left truncate ${!isLastRow ? 'border-b border-[#EAEDF0]' : ''}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </RadixTable.Cell>
                    );
                  })}
                </RadixTable.Row>
              );
            })}
          </RadixTable.Body>
        </RadixTable.Root>
      </div>
    </div>
  );
};

export default UserTable;
