import type { TableColumn } from '../../store/types';

// Table columns config for settings and rendering
export const TABLE_COLUMNS: {
  key: TableColumn;
  label: string;
  disabled: boolean;
  sortKey?: string;
}[] = [
  { key: 'fullName', label: 'Full name', disabled: true, sortKey: 'firstName' },
  { key: 'birthDate', label: 'Birthday', disabled: false, sortKey: 'birthDate' },
  { key: 'gender', label: 'Gender', disabled: false, sortKey: 'gender' },
  { key: 'email', label: 'Email', disabled: true, sortKey: 'email' },
  { key: 'phone', label: 'Phone', disabled: false, sortKey: 'phone' },
  { key: 'username', label: 'Username', disabled: true, sortKey: 'username' },
  { key: 'generalInfo', label: 'General Info', disabled: false, sortKey: undefined },
  { key: 'domain', label: 'Domain', disabled: false, sortKey: undefined },
  { key: 'ip', label: 'IP', disabled: false, sortKey: 'ip' },
  { key: 'macIp', label: 'Mac IP', disabled: false, sortKey: 'macAddress' },
  { key: 'address', label: 'Address', disabled: false, sortKey: undefined },
  { key: 'bank', label: 'Bank', disabled: false, sortKey: undefined },
  { key: 'university', label: 'University', disabled: false, sortKey: undefined },
  { key: 'company', label: 'Company', disabled: false, sortKey: undefined },
  { key: 'ein', label: 'Ein', disabled: false, sortKey: undefined },
  { key: 'ssn', label: 'SSN', disabled: false, sortKey: undefined },
];
