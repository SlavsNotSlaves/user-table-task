import React from 'react';
import type { User } from '@features/users-table/types';
import type { TableColumn } from '@store/types';
import UserTableCell from './UserTableCell';

interface UserTableRowProps {
  user: User;
  visibleColumns: TableColumn[];
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user, visibleColumns }) => (
  <tr className="hover:bg-gray-50 h-[56px]">
    {visibleColumns.map((col) => (
      <React.Fragment key={col}>
        <UserTableCell user={user} column={col} />
      </React.Fragment>
    ))}
    <td className="sticky right-0 bg-white z-20 px-2 py-2 border-b h-[56px] align-middle"></td>
  </tr>
);

export default UserTableRow;
