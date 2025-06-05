import React from 'react';
import { TableSettingsButton } from '@features/table-settings/components';
import type { TableColumn } from '@store/types';

interface UserTableHeaderProps {
  visibleColumns: TableColumn[];
}

const columns: { key: TableColumn; label: string; width: number }[] = [
  { key: 'fullName', label: 'FULL NAME', width: 180 },
  { key: 'birthDate', label: 'BIRTHDAY', width: 170 },
  { key: 'gender', label: 'GENDER', width: 80 },
  { key: 'email', label: 'EMAIL', width: 180 },
  { key: 'phone', label: 'PHONE', width: 130 },
  { key: 'username', label: 'USERNAME', width: 130 },
  { key: 'generalInfo', label: 'GENERAL INFO', width: 352 },
  { key: 'domain', label: 'DOMAIN', width: 80 },
  { key: 'ip', label: 'IP', width: 112 },
  { key: 'macIp', label: 'MAC IP', width: 112 },
  { key: 'address', label: 'ADDRESS', width: 322 },
  { key: 'bank', label: 'BANK', width: 100 },
  { key: 'university', label: 'UNIVERSITY', width: 100 },
  { key: 'company', label: 'COMPANY', width: 168 },
  { key: 'ein', label: 'EIN', width: 112 },
  { key: 'ssn', label: 'SSN', width: 112 },
];

const UserTableHeader: React.FC<UserTableHeaderProps> = ({ visibleColumns }) => (
  <thead className="bg-gray-50 sticky top-0 z-10" style={{ height: 28 }}>
    <tr>
      {columns.map(col => visibleColumns.includes(col.key) && (
        <th
          key={col.key}
          style={{ width: col.width, maxWidth: col.width, minWidth: col.width, height: 28 }}
          className="bg-gray-50 px-4 py-2 text-left text-xs font-semibold text-gray-500 border-b align-middle"
        >
          {col.label}
        </th>
      ))}
      <th className="sticky right-0 bg-gray-50 z-30 px-2 py-2 border-b align-middle" style={{ right: 0, top: 0, width: 34, minWidth: 34, maxWidth: 34, height: 28 }}>
        <TableSettingsButton />
      </th>
    </tr>
  </thead>
);

export default UserTableHeader;
