import type { User } from '@features/users-table/types';
import type { TableColumn } from '@store/types';
import { IconMale, IconFemale } from '@/ui/icons';

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
    <span className="flex items-center gap-3 min-w-[180px] max-w-[180px] h-full px-0 py-0">
      <img
        src={user.image}
        alt={user.firstName + ' ' + user.lastName}
        className="w-8 h-8 rounded-full object-cover border border-[#EAEDF0] bg-white"
        style={{ width: 32, height: 32 }}
      />
      <span className="font-plex truncate text-[#202932] max-w-[120px]">{user.firstName} {user.lastName}</span>
    </span>
  ),
  birthDate: (user) => <span className="max-w-[170px] text-[#5F6E7C] font-plex truncate">{formatBirthDate(user.birthDate, user.age)}</span>,
  gender: (user) => (
    <span className="flex items-center gap-1 max-w-[80px] justify-start">
      {user.gender === 'male' ? (
        <IconMale size={20} />
      ) : (
        <IconFemale size={20} />
      )}
      <span className="capitalize truncate ml-1 text-[#5F6E7C] font-plex max-w-[40px]">{user.gender}</span>
    </span>
  ),
  email: (user) => <span className="max-w-[180px] text-[#202932] font-medium font-plex truncate">{user.email}</span>,  phone: (user) => <span className="max-w-[130px] text-[#5F6E7C] font-plex truncate">{user.phone}</span>,
  username: (user) => <span className="max-w-[130px] text-[#5F6E7C] font-plex truncate">{user.username}</span>,
  generalInfo: (user) => (
    <span  className="text-xs text-[#5F6E7C] max-w-[352px] truncate inline-block align-middle font-plex" style={{ maxWidth: 320 }}>
      Bloodgroup "{user.bloodGroup}"; Height {user.height}; Weight {user.weight}; Hair color {user.hair.color}
    </span>
  ),
  domain: (user) => (
    <span  className="text-xs text-blue-600 underline max-w-[80px] font-plex">
      {user.email ? (
        <a href={`mailto:${user.email.split('@')[1] ? user.email.split('@')[1] : user.email}`} target="_blank" rel="noopener noreferrer" className="truncate" style={{ maxWidth: 60 }}>{user.email.split('@')[1] || '-'}</a>
      ) : '-'}
    </span>
  ),
  ip: (user) => <span className="max-w-[112px] text-[#5F6E7C] font-plex truncate">{user.ip}</span>,
  macIp: (user) => <span className="max-w-[112px] text-[#5F6E7C] font-plex truncate">{user.macAddress}</span>,
  address: (user) => (
    <span className="text-xs max-w-[322px] truncate inline-block align-middle text-[#5F6E7C] font-plex" style={{ maxWidth: 290 }}>
      {user.address ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}` : '-'}
    </span>
  ),
  bank: (user) => (
    <span className="max-w-[100px] text-[#5F6E7C] font-plex truncate">{user.bank?.cardType || '-'} {user.bank?.cardNumber ? <span className="text-xs text-gray-400">({user.bank.cardNumber})</span> : ''}</span>
  ),
  university: (user) => <span  className="max-w-[100px] text-[#5F6E7C] font-plex truncate">{user.university}</span>,
  company: (user) => <span className="max-w-[168px] text-[#5F6E7C] font-plex truncate">{user.company?.name}</span>,
  ein: (user) => <span  className="max-w-[112px] text-[#5F6E7C] font-plex truncate">{user.ein}</span>,
  ssn: (user) => <span  className="max-w-[112px] text-[#5F6E7C] font-plex truncate">{user.ssn}</span>,
};

const UserTableCell: React.FC<UserTableCellProps> = ({ user, column }) => {
  return renderers[column] ? renderers[column](user) : null;
};

export default UserTableCell;
