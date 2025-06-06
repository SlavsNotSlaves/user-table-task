import React from 'react';
import type { TableColumn } from '@store/types';
import type { User } from '@features/users-table/types';
import TableStatus from './TableStatus';
import { TableSettingsButton } from '@/features/table-settings/components';

interface UserTableProps {
  users: User[];
  visibleColumns: TableColumn[];
  isLoading: boolean;
  error: unknown;
}

const COLUMN_LABELS: Record<TableColumn, string> = {
  fullName: 'Full Name',
  birthDate: 'Birthday',
  gender: 'Gender',
  email: 'Email',
  phone: 'Phone',
  username: 'Username',
  generalInfo: 'General Info',
  domain: 'Domain',
  ip: 'IP',
  macIp: 'Mac IP',
  address: 'Address',
  bank: 'Bank',
  university: 'University',
  company: 'Company',
  ein: 'EIN',
  ssn: 'SSN',
};

const UserTable: React.FC<UserTableProps> = ({ users, visibleColumns, isLoading, error }) => {
  if (isLoading || error) {
    return (
      <div className="min-h-0 flex items-center justify-center" style={{ height: 560 }}>
        <TableStatus status={isLoading ? 'loading' : 'error'} colSpan={visibleColumns.length} />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="min-h-0 flex items-center justify-center" style={{ height: 560 }}>
        <TableStatus status="empty" colSpan={visibleColumns.length} />
      </div>
    );
  }

  return (
    <div style={{ height: 560, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8  }}>
      <table style={{ minWidth: 900, borderCollapse: 'separate' }} className="min-w-full">
        <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
          <tr>
            {visibleColumns.map((col, idx) => (
              <th
                key={col}
                style={{
                  position: idx === 0 ? 'sticky' : 'static',
                  left: idx === 0 ? 0 : undefined,
                  top: 0,
                  background: '#f7f7f8',
                  zIndex: idx === 0 ? 11 : 10,
                }}
                className="px-4 py-2 border-b align-middle text-xs font-semibold text-gray-500 text-left bg-[#f7f7f8]"
              >
                {COLUMN_LABELS[col]}
              </th>
            ))}
            <th
              style={{
                position: 'sticky',
                right: 0,
                top: 0,
                background: '#f7f7f8',
                zIndex: 12,
                maxWidth: 34,
                width: 34,
              }}
              className="px-4 py-2 border-b align-middle text-xs font-semibold text-gray-500 text-left bg-[#f7f7f8]"
            >
              <TableSettingsButton />
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="h-[56px] hover:bg-gray-50">
              {visibleColumns.map((col, idx) => (
                <td
                  key={col}
                  style={{
                    position: idx === 0 ? 'sticky' : 'static',
                    left: idx === 0 ? 0 : undefined,
                    background: idx === 0 ? '#fff' : undefined,
                    zIndex: idx === 0 ? 2 : 1,
                  }}
                  className="px-4 py-2 border-b align-middle text-left truncate"
                >
                  {renderUserCell(user, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function renderUserCell(user: User, col: TableColumn) {
  switch (col) {
    case 'fullName':
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {user.image && (
            <img
              src={user.image}
              alt={user.firstName + ' ' + user.lastName}
              style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', marginRight: 8 }}
            />
          )}
          <span>{user.firstName + ' ' + user.lastName}</span>
        </span>
      );
    case 'birthDate':
      return user.birthDate;
    case 'gender':
      return user.gender;
    case 'email':
      return user.email;
    case 'phone':
      return user.phone;
    case 'username':
      return user.username;
    case 'generalInfo':
      return `Bloodgroup "${user.bloodGroup}"; Height ${user.height}; Weight ${user.weight}; Hair color ${user.hair.color}`;
    case 'domain':
      return user.email ? user.email.split('@')[1] : '';
    case 'ip':
      return user.ip;
    case 'macIp':
      return user.macAddress;
    case 'address':
      return user.address ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}` : '';
    case 'bank':
      return user.bank?.cardType || '';
    case 'university':
      return user.university;
    case 'company':
      return user.company?.name || '';
    case 'ein':
      return user.ein;
    case 'ssn':
      return user.ssn;
    default:
      return '';
  }
}

export default UserTable;
