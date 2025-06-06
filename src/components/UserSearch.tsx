import { SearchInput } from '@/ui';

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const UserSearch = ({ value, onChange }: UserSearchProps) => {
  return (
    <div className="w-full py-4 mt-32" style={{marginTop: '32px'}}>
      <SearchInput
        value={value}
        onChange={v => {
          onChange(v);
        }}
        placeholder="Search..."
        aria-label="Search"
        className="w-full"
      />
    </div>
  );
};

export default UserSearch;
