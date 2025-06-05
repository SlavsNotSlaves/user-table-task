import { SearchInput } from '@/ui';

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const UserSearch = ({ value, onChange }: UserSearchProps) => {
  return (
    <div className="w-full py-4">
      <SearchInput
        value={value}
        onChange={onChange}
        placeholder="Search..."
        aria-label="Search"
        className="w-full"
      />
    </div>
  );
};

export default UserSearch;
