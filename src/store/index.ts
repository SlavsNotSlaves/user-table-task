import { create } from 'zustand';

export type TableColumn = 'id' | 'firstName' | 'lastName' | 'email' | 'username' | 'age' | 'gender'; 

interface TableSettingsState {
  visibleColumns: TableColumn[];
  setVisibleColumns: (columns: TableColumn[]) => void;
}

export const useTableSettingsStore = create<TableSettingsState>((set) => ({
  visibleColumns: ['id', 'firstName', 'lastName', 'email', 'username', 'age', 'gender'],
  setVisibleColumns: (columns) => set({ visibleColumns: columns }),
}));