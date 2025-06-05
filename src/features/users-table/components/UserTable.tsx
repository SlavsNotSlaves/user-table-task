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
  selectedRowId?: string | number;
  onRowSelect?: (user: User) => void;
}

const MIN_TABLE_HEIGHT = 300;

const SETTINGS_WIDTH = 34;

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
    <div className="flex-1 min-h-0 overflow-y-auto rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 rounded-xl overflow-hidden">
          <thead className="bg-[#F7F7F8] sticky top-0 z-10 h-[28px]">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  header.id === 'settings' ? (
                    <th
                      key={header.id}
                      style={{ width: SETTINGS_WIDTH, minWidth: SETTINGS_WIDTH, maxWidth: SETTINGS_WIDTH, height: 28, right: 0, top: 0 }}
                      className="sticky right-0 top-0 z-30 bg-[#F7F7F8] px-2 py-2 border-b border-[#EAEDF0] align-middle"
                      scope="col"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ) : (
                    <th
                      key={header.id}
                      style={{ width: header.getSize(), maxWidth: header.getSize(), minWidth: header.getSize(), height: 28 }}
                      className="px-4 py-2 text-left text-xs font-semibold text-[#5F6E7C] border-b border-[#EAEDF0] align-middle uppercase tracking-wider bg-[#F7F7F8]"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  )
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => {
              const isSelected = selectedRowId === row.original?.id;
              return (
                <tr
                  key={row.id}
                  className={`h-[56px] group ${isSelected ? 'bg-[#F7F7F8] border-l-2 border-[#5F6E7C]' : 'hover:bg-gray-50'} transition-colors`}
                  onClick={onRowSelect ? () => onRowSelect(row.original) : undefined}
                  style={isSelected ? { borderLeftWidth: 2, borderLeftColor: '#5F6E7C' } : {}}
                >
                  {row.getVisibleCells().map((cell, idx, arr) => (
                    cell.column.id === 'settings' && idx === arr.length - 1 ? (
                      <td
                        key={cell.id}
                        style={{ width: SETTINGS_WIDTH, minWidth: SETTINGS_WIDTH, maxWidth: SETTINGS_WIDTH, right: 0 }}
                        className="sticky right-0 z-20 bg-white px-2 py-0 border-b border-[#EAEDF0] h-[56px] align-middle"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ) : (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize(), maxWidth: cell.column.getSize(), minWidth: cell.column.getSize() }}
                        className="px-4 py-0 border-b border-[#EAEDF0] whitespace-nowrap h-[56px] align-middle break-words text-left truncate"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
