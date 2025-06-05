import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '../types';

export function useTable(users: User[], columns: ColumnDef<User, any>[]) {
  return useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    debugTable: false,
  });
} 