interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const UserSearch = ({ value, onChange }: UserSearchProps) => {
  return (
    <div className="w-full flex justify-center py-4">
      <input
        type="text"
        placeholder="Search users..."
        className="border rounded px-3 py-2 w-80"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search users"
      />
    </div>
  );
};

export default UserSearch;
