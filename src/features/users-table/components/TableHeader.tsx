import React from 'react';
import { TableSettingsButton } from '@features/table-settings/components';
import { Text } from '@radix-ui/themes';

interface TableHeaderProps {
  label: string;
  width: number;
}

interface SettingsHeaderProps {
  width: number;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ label, width }) => (
  <div 
    style={{ width, maxWidth: width, minWidth: width, height: 28 }} 
    className="px-4 py-2 text-left border-b align-middle bg-gray-50"
  >
    <Text as="span" size="1" weight="bold" className="uppercase tracking-[0.02em] font-plex text-[#5F6E7C]">
      {label}
    </Text>
  </div>
);

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ width }) => (
  <th
    className="sticky right-0 top-0 z-30 bg-[#F7F7F8] px-2 py-2 border-b align-middle"
    style={{ right: 0, top: 0, width, minWidth: width, maxWidth: width, height: 28 }}
    scope="col"
  >
    <TableSettingsButton />
  </th>
); 