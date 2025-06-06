import React from 'react';
import type { TableColumn } from '@store/types';
import type { User } from '@features/users-table/types';
import TableStatus from './TableStatus';
import { TableSettingsButton } from '@/features/table-settings/components';
import { IconMale, IconFemale } from '@/ui/icons';
import Link from '@/ui/Link';

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
      <div className="min-h-0 flex items-center justify-center" style={{ height: 574 }}>
        <TableStatus status={isLoading ? 'loading' : 'error'} colSpan={visibleColumns.length} />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="min-h-0 flex items-center justify-center" style={{ height: 574 }}>
        <TableStatus status="empty" colSpan={visibleColumns.length} />
      </div>
    );
  }

  return (
    <div style={{ height: 560, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, marginTop: 12 }}>
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
                  background: idx === 0 ? '#f7f7f8' : undefined,
                  zIndex: idx === 0 ? 11 : 10,
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: 10,
                  lineHeight: '12px',
                  letterSpacing: 0.2,
                  color: '#5F6E7C',
                  textTransform: 'uppercase',
                  verticalAlign: 'middle',
                  borderBottom: '1px solid #EAEDF0',
                  borderRight: idx !== visibleColumns.length - 1 ? '1px solid #EAEDF0' : undefined,
                  padding: '0 8px',
                  height: 28,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                className="align-middle text-xs font-semibold text-left bg-[#f7f7f8]"
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
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600,
                fontSize: 10,
                lineHeight: '12px',
                letterSpacing: 0.2,
                color: '#5F6E7C',
                textTransform: 'uppercase',
                verticalAlign: 'middle',
                borderBottom: '1px solid #EAEDF0',
                borderRight: '1px solid #EAEDF0',
                padding: '0 8px',
                height: 28,
                whiteSpace: 'nowrap',
              }}
              className="align-middle text-xs font-semibold text-left bg-[#f7f7f8]"
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
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: '20px',
                    color: '#1F1E1D',
                    verticalAlign: 'middle',
                    letterSpacing: 0,
                    padding: '0 8px',
                    height: 56,
                    maxWidth: 220,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    borderBottom: '1px solid #EAEDF0',
                    borderRight: idx !== visibleColumns.length - 1 ? '1px solid #EAEDF0' : undefined,
                  }}
                  className="align-middle text-left truncate"
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
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {user.gender === 'male' ? (
            <IconMale size={20} style={{ color: '#1F1E1D' }} />
          ) : (
            <IconFemale size={20} style={{ color: '#1F1E1D' }} />
          )}
          <span style={{ textTransform: 'capitalize' }}>{user.gender}</span>
        </span>
      );
    case 'email':
    case 'phone':
    case 'username':
    case 'generalInfo':
    case 'domain':
    case 'ip':
    case 'macIp':
    case 'address':
    case 'bank':
    case 'university':
    case 'company':
    case 'ein':
    case 'ssn':
      return (
        <span style={{
          color: '#1F1E1D',
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontWeight: 400,
          fontSize: 13,
          lineHeight: '20px',
          letterSpacing: 0,
          verticalAlign: 'middle',
          display: 'inline-block',
        }}>
          {
            col === 'generalInfo'
              ? `Bloodgroup "${user.bloodGroup}"; Height ${user.height}; Weight ${user.weight}; Hair color ${user.hair.color}`
              : col === 'domain'
                ? <Link domain={user.email ? user.email.split('@')[1] : ''} />
                : col === 'address'
                  ? (user.address ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}` : '')
                  : col === 'bank'
                    ? (user.bank?.cardType || '')
                    : col === 'company'
                      ? (user.company?.name || '')
                      : col === 'macIp'
                        ? (user.macAddress || '')
                        : (user[col as keyof User] as string)
          }
        </span>
      );
    default: {
      const value = Object.prototype.hasOwnProperty.call(user, col) ? (user as any)[col] : '';
      return value || '-';
    }
  }
}

export default UserTable;
