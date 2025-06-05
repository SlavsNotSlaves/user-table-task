import React from 'react';
import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';
import type { TableColumn } from '../store/types';
import type { User } from '../features/users-table/types';

interface UserTableProps {
  users: User[];
  visibleColumns: TableColumn[];
  isLoading: boolean;
  error: unknown;
}

const UserTable: React.FC<UserTableProps> = ({ users, visibleColumns, isLoading, error }) => (
  <div className="flex-1 min-h-0 overflow-y-auto">
    <table className="min-w-full border-separate border-spacing-0">
      <UserTableHeader visibleColumns={visibleColumns} />
      <tbody className="[&>tr]:max-h-[56px] [&>tr]:h-[56px] [&>tr>td]:align-middle [&>tr>td]:py-0 [&>tr>td]:px-4 [&>tr:last-child>td]:border-b-0">
        {isLoading && (
          <tr><td colSpan={visibleColumns.length + 1} className="text-center py-10 text-gray-400">Loading...</td></tr>
        )}
        {!!error && (
          <tr><td colSpan={visibleColumns.length + 1} className="text-center py-10 text-red-500">Oops, something went wrong</td></tr>
        ) }
        {!isLoading && !error && (
          users?.length ? users.map((user) => (
            <UserTableRow key={user.id} user={user} visibleColumns={visibleColumns} />
          )) : (
            <tr><td colSpan={visibleColumns.length + 1} className="text-center py-10 text-gray-400">No data</td></tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

export default UserTable;
