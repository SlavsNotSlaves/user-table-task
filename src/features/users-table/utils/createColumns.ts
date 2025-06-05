import type { ColumnDef } from '@tanstack/react-table';
import type { TableColumn } from '@store/types';
import type { User } from '../types';
import UserTableCell from '../components/UserTableCell';
import { TableHeader, SettingsHeader } from '../components/TableHeader';
import { SettingsCell } from '../components/SettingsCell';
import { TABLE_COLUMN_META } from '../constants';

export function createColumns(visibleColumns: TableColumn[]): ColumnDef<User, any>[] {
  return [
    ...TABLE_COLUMN_META.filter(col => visibleColumns.includes(col.key)).map(col => ({
      id: col.key,
      header: () => <TableHeader label={col.label} width={col.width} />,
      cell: ({ row }: { row: { original: User } }) => <UserTableCell user={row.original} column={col.key} />,
      size: col.width,
    })),
    {
      id: 'settings',
      header: () => <SettingsHeader width={34} />,
      cell: () => <SettingsCell />,
      size: 34,
    },
  ];
} 