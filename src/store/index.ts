import { create } from 'zustand';
import type { TableSettingsState } from './types';
import { defaultColumns, STORAGE_KEY } from './constants';

export const useTableSettingsStore = create<TableSettingsState>((set, get) => ({
  visibleColumns: defaultColumns,
  setVisibleColumns: (columns) => {
    set({ visibleColumns: columns });
    get().persist();
  },
  persist: () => {
    const { visibleColumns } = get();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ visibleColumns }));
  },
  restore: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const { visibleColumns } = JSON.parse(raw);
        set({
          visibleColumns: Array.isArray(visibleColumns) ? visibleColumns : defaultColumns,
        });
      } catch {
        set({ visibleColumns: defaultColumns });
      }
    }
  },
}));