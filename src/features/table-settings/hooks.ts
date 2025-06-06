import { useMemo } from 'react';
import { TABLE_COLUMNS } from './constants';

export function useFilteredColumns(search: string) {
  return useMemo(
    () => TABLE_COLUMNS.filter((c) => c.label.toLowerCase().includes(search.toLowerCase())),
    [search]
  );
}
