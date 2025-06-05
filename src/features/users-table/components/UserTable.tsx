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

const UserTable: React.FC<UserTableProps> = ({
  users,
  visibleColumns,
  isLoading,
  error,
  selectedRowId,
  onRowSelect,
}) => {
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
    <div className="overflow-auto" style={{ maxHeight: 550, height: 550 }}>
      <div style={{ minWidth: 900, position: 'relative' }}>
        <RadixTable.Root className="min-w-full border-separate border-spacing-0 rounded-xl">
          <RadixTable.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <RadixTable.Row key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => {
                  const isFirst = idx === 0;
                  const isLast = header.id === 'settings';
                  return (
                    <RadixTable.ColumnHeaderCell
                      key={header.id}
                      style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: isFirst ? 40 : isLast ? 30 : 10,
                        left: isFirst ? 0 : undefined,
                        right: isLast ? 0 : undefined,
                        width: isFirst
                          ? FIRST_COL_WIDTH
                          : isLast
                          ? SETTINGS_WIDTH
                          : header.getSize(),
                        minWidth: isFirst
                          ? FIRST_COL_WIDTH
                          : isLast
                          ? SETTINGS_WIDTH
                          : header.getSize(),
                        maxWidth: isFirst
                          ? FIRST_COL_WIDTH
                          : isLast
                          ? SETTINGS_WIDTH
                          : header.getSize(),
                        backgroundColor: '#F7F7F8',
                        height: 28,
                      }}
                      className="px-4 py-2 border-b align-middle bg-[#F7F7F8]"
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
                  className={`h-[56px] group ${
                    isSelected ? 'bg-[#F7F7F8] border-l-2 border-[#5F6E7C]' : 'hover:bg-gray-50'
                  } transition-colors`}
                  onClick={onRowSelect ? () => onRowSelect(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell, idx, arr) => {
                    const isFirst = idx === 0;
                    const isLast = cell.column.id === 'settings' && idx === arr.length - 1;

                    return (
                      <RadixTable.Cell
                        key={cell.id}
                        style={{
                          position: isFirst || isLast ? 'sticky' : 'static',
                          left: isFirst ? 0 : undefined,
                          right: isLast ? 0 : undefined,
                          zIndex: isFirst || isLast ? 20 : 1,
                          backgroundColor: isSelected ? '#F7F7F8' : 'white',
                          width: isFirst
                            ? FIRST_COL_WIDTH
                            : isLast
                            ? SETTINGS_WIDTH
                            : cell.column.getSize(),
                          minWidth: isFirst
                            ? FIRST_COL_WIDTH
                            : isLast
                            ? SETTINGS_WIDTH
                            : cell.column.getSize(),
                          maxWidth: isFirst
                            ? FIRST_COL_WIDTH
                            : isLast
                            ? SETTINGS_WIDTH
                            : cell.column.getSize(),
                        }}
                        className={`px-4 py-0 whitespace-nowrap h-[56px] align-middle text-left truncate ${
                          !isLastRow ? 'border-b border-[#EAEDF0]' : ''
                        }`}
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
