export type TableColumn =
  | 'fullName'
  | 'birthDate'
  | 'gender'
  | 'email'
  | 'phone'
  | 'username'
  | 'generalInfo'
  | 'domain'
  | 'ip'
  | 'macIp'
  | 'address'
  | 'bank'
  | 'university'
  | 'company'
  | 'ein'
  | 'ssn';

export interface TableSettingsState {
  visibleColumns: TableColumn[];
  setVisibleColumns: (columns: TableColumn[]) => void;
  persist: () => void;
  restore: () => void;
}
