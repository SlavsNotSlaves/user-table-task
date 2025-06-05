import React from 'react';
import { flexRender } from '@tanstack/react-table';
import type { TableColumn } from '@store/types';
import type { User } from '@features/users-table/types';
import { useTable } from '../hooks/useTable';
import { useTableColumns } from './TableColumns';
import TableStatus from './TableStatus';

interface UserTableProps {
  users: User[];
  visibleColumns: TableColumn[];
  isLoading: boolean;
  error: unknown;
}

const MIN_TABLE_HEIGHT = 300;

const UserTable: React.FC<UserTableProps> = ({ users, visibleColumns, isLoading, error }) => {
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
    <div className="flex-1 min-h-0 overflow-y-auto">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-gray-50 sticky top-0 z-10" style={{ height: 28 }}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  style={{ width: header.getSize(), maxWidth: header.getSize(), minWidth: header.getSize(), height: 28, ...(header.id === 'settings' ? { position: 'sticky', right: 0, zIndex: 30, background: '#f9fafb' } : {}) }}
                  className={`px-0 py-0 text-left text-xs font-semibold text-gray-500 border-b align-middle ${header.id === 'settings' ? 'sticky right-0 z-30 bg-gray-50' : 'bg-gray-50'}`}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="align-middle">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize(), maxWidth: cell.column.getSize(), minWidth: cell.column.getSize(), ...(cell.column.id === 'settings' ? { position: 'sticky', right: 0, zIndex: 20, background: '#fff' } : {}) }}
                  className={`px-0 py-0 border-b whitespace-nowrap h-[56px] align-middle break-words text-left truncate ${cell.column.id === 'settings' ? 'sticky right-0 z-20 bg-white' : ''}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
