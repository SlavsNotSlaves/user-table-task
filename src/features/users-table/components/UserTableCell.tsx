import type { User } from '@features/users-table/types';
import type { TableColumn } from '@store/types';

interface UserTableCellProps {
  user: User;
  column: TableColumn;
}

function formatBirthDate(date: string, age: number) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US') + ` (${age} years old)`;
}

const renderers: Record<TableColumn, (user: User) => React.ReactNode> = {
  fullName: (user) => (
    <span className="flex items-center gap-2 min-w-[180px] max-w-[180px]">
      <img
        src={user.image}
        alt={user.firstName + ' ' + user.lastName}
        className="w-8 h-8 rounded-full object-cover border"
        style={{ width: 32, height: 32, borderColor: '#00000057', borderWidth: 1 }}
      />
      <span className="font-medium truncate" style={{ maxWidth: 120, display: 'inline-block', verticalAlign: 'middle' }}>{user.firstName} {user.lastName}</span>
    </span>
  ),
  birthDate: (user) => <span className="max-w-[170px]">{formatBirthDate(user.birthDate, user.age)}</span>,
  gender: (user) => (
    <span className="flex items-center gap-1 max-w-[80px]">
      {user.gender === 'male' ? (
        <span title="Male" aria-label="Male">&#9794;</span>
      ) : (
        <span title="Female" aria-label="Female">&#9792;</span>
      )}
      <span className="capitalize truncate" style={{ maxWidth: 40, display: 'inline-block', verticalAlign: 'middle' }}>{user.gender}</span>
    </span>
  ),
  email: (user) => <span className="max-w-[180px]">{user.email}</span>,
  phone: (user) => <span className="max-w-[130px]">{user.phone}</span>,
  username: (user) => <span className="max-w-[130px]">{user.username}</span>,
  generalInfo: (user) => (
    <span className="text-xs text-gray-600 max-w-[352px] truncate inline-block align-middle" style={{ maxWidth: 320 }}>
      Bloodgroup "{user.bloodGroup}"; Height {user.height}; Weight {user.weight}; Hair color {user.hair.color}
    </span>
  ),
  domain: (user) => (
    <span className="text-xs text-blue-600 underline max-w-[80px]">
      {user.email ? (
        <a href={`mailto:${user.email.split('@')[1] ? user.email.split('@')[1] : user.email}`} target="_blank" rel="noopener noreferrer" className="truncate" style={{ maxWidth: 60, display: 'inline-block', verticalAlign: 'middle' }}>
          {user.email.split('@')[1] || '-'}
        </a>
      ) : '-'}
    </span>
  ),
  ip: (user) => <span className="max-w-[112px]">{user.ip}</span>,
  macIp: (user) => <span className="max-w-[112px]">{user.macAddress}</span>,
  address: (user) => (
    <span className="text-xs max-w-[322px] truncate inline-block align-middle" style={{ maxWidth: 290 }}>
      {user.address ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}` : '-'}
    </span>
  ),
  bank: (user) => (
    <span className="max-w-[100px]">{user.bank?.cardType || '-'} {user.bank?.cardNumber ? <span className="text-xs text-gray-400">({user.bank.cardNumber})</span> : ''}</span>
  ),
  university: (user) => <span className="max-w-[100px]">{user.university}</span>,
  company: (user) => <span className="max-w-[168px]">{user.company?.name}</span>,
  ein: (user) => <span className="max-w-[112px]">{user.ein}</span>,
  ssn: (user) => <span className="max-w-[112px]">{user.ssn}</span>,
};

const UserTableCell: React.FC<UserTableCellProps> = ({ user, column }) => {
  return renderers[column] ? renderers[column](user) : null;
};

export default UserTableCell;
