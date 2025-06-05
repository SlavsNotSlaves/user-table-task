import React from 'react';
import { TableSettingsButton } from '@features/table-settings/components';

interface TableHeaderProps {
  label: string;
  width: number;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ label, width }) => (
  <div 
    style={{ width, maxWidth: width, minWidth: width, height: 28 }} 
    className="px-4 py-2 text-left text-xs font-semibold text-gray-500 border-b align-middle bg-gray-50"
  >
    {label}
  </div>
);

interface SettingsHeaderProps {
  width: number;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ width }) => (
  <div 
    className="sticky right-0 bg-gray-50 z-30 px-2 py-2 border-b align-middle" 
    style={{ right: 0, top: 0, width, minWidth: width, maxWidth: width, height: 28 }}
  >
    <TableSettingsButton />
  </div>
); 