import type { TableColumn } from '@store/types';

export const TABLE_COLUMN_META: { key: TableColumn; label: string; width: number }[] = [
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