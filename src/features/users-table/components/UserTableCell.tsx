import type { User } from '@features/users-table/types';
import type { TableColumn } from '@store/types';
import { IconMale, IconFemale } from '@/ui/icons';
import { Text } from '@radix-ui/themes';

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
      <Text as="span" size="2" weight="regular" className="font-plex truncate text-[#202932]" style={{ maxWidth: 120 }}>{user.firstName} {user.lastName}</Text>
    </span>
  ),
  birthDate: (user) => <Text as="span" size="2" weight="regular" className="max-w-[170px] text-[#5F6E7C] font-plex truncate">{formatBirthDate(user.birthDate, user.age)}</Text>,
  gender: (user) => (
    <span className="flex items-center gap-1 max-w-[80px] justify-start">
      {user.gender === 'male' ? (
        <IconMale size={20} />
      ) : (
        <IconFemale size={20} />
      )}
      <Text as="span" size="2" weight="regular" className="capitalize truncate ml-1 text-[#5F6E7C] font-plex" style={{ maxWidth: 40 }}>{user.gender}</Text>
    </span>
  ),
  email: (user) => <Text as="span" size="2" weight="regular" className="max-w-[180px] text-[#202932] font-medium font-plex truncate">{user.email}</Text>,
  phone: (user) => <Text as="span" size="2" weight="regular" className="max-w-[130px] text-[#5F6E7C] font-plex truncate">{user.phone}</Text>,
  username: (user) => <Text as="span" size="2" weight="regular" className="max-w-[130px] text-[#5F6E7C] font-plex truncate">{user.username}</Text>,
  generalInfo: (user) => (
    <Text as="span" size="1" weight="regular" className="text-xs text-[#5F6E7C] max-w-[352px] truncate inline-block align-middle font-plex" style={{ maxWidth: 320 }}>
      Bloodgroup "{user.bloodGroup}"; Height {user.height}; Weight {user.weight}; Hair color {user.hair.color}
    </Text>
  ),
  domain: (user) => (
    <Text as="span" size="1" weight="regular" className="text-xs text-blue-600 underline max-w-[80px] font-plex">
      {user.email ? (
        <a href={`mailto:${user.email.split('@')[1] ? user.email.split('@')[1] : user.email}`} target="_blank" rel="noopener noreferrer" className="truncate" style={{ maxWidth: 60 }}>{user.email.split('@')[1] || '-'}</a>
      ) : '-'}
    </Text>
  ),
  ip: (user) => <Text as="span" size="2" weight="regular" className="max-w-[112px] text-[#5F6E7C] font-plex truncate">{user.ip}</Text>,
  macIp: (user) => <Text as="span" size="2" weight="regular" className="max-w-[112px] text-[#5F6E7C] font-plex truncate">{user.macAddress}</Text>,
  address: (user) => (
    <Text as="span" size="1" weight="regular" className="text-xs max-w-[322px] truncate inline-block align-middle text-[#5F6E7C] font-plex" style={{ maxWidth: 290 }}>
      {user.address ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}` : '-'}
    </Text>
  ),
  bank: (user) => (
    <Text as="span" size="2" weight="regular" className="max-w-[100px] text-[#5F6E7C] font-plex truncate">{user.bank?.cardType || '-'} {user.bank?.cardNumber ? <span className="text-xs text-gray-400">({user.bank.cardNumber})</span> : ''}</Text>
  ),
  university: (user) => <Text as="span" size="2" weight="regular" className="max-w-[100px] text-[#5F6E7C] font-plex truncate">{user.university}</Text>,
  company: (user) => <Text as="span" size="2" weight="regular" className="max-w-[168px] text-[#5F6E7C] font-plex truncate">{user.company?.name}</Text>,
  ein: (user) => <Text as="span" size="2" weight="regular" className="max-w-[112px] text-[#5F6E7C] font-plex truncate">{user.ein}</Text>,
  ssn: (user) => <Text as="span" size="2" weight="regular" className="max-w-[112px] text-[#5F6E7C] font-plex truncate">{user.ssn}</Text>,
};

const UserTableCell: React.FC<UserTableCellProps> = ({ user, column }) => {
  return renderers[column] ? renderers[column](user) : null;
};

export default UserTableCell;
