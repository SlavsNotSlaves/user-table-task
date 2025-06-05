import type { User } from '../../../features/users-table/types';
import type { TableColumn } from '../../../store/types';
import TableCell from '../../../components/TableCell';

interface UserTableCellProps {
  user: User;
  column: TableColumn;
}

const columnWidths: Record<TableColumn, number> = {
  fullName: 180,
  birthDate: 170,
  gender: 80,
  email: 180,
  phone: 130,
  username: 130,
  generalInfo: 352,
  domain: 80,
  ip: 112,
  macIp: 112,
  address: 322,
  bank: 100,
  university: 100,
  company: 168,
  ein: 112,
  ssn: 112,
};

function formatBirthDate(date: string, age: number) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US') + ` (${age} years old)`;
}

const renderers: Record<TableColumn, (user: User) => React.ReactNode> = {
  fullName: (user) => (
    <TableCell className="bg-white flex items-center gap-2 min-w-[180px] max-w-[180px]" width={columnWidths.fullName}>
      <img
        src={user.image}
        alt={user.firstName + ' ' + user.lastName}
        className="w-8 h-8 rounded-full object-cover border"
        style={{ width: 32, height: 32, borderColor: '#00000057', borderWidth: 1 }}
      />
      <span className="font-medium truncate" style={{ maxWidth: 120, display: 'inline-block', verticalAlign: 'middle' }}>{user.firstName} {user.lastName}</span>
    </TableCell>
  ),
  birthDate: (user) => <TableCell className="max-w-[170px]" width={columnWidths.birthDate}>{formatBirthDate(user.birthDate, user.age)}</TableCell>,
  gender: (user) => (
    <TableCell className="flex items-center gap-1 max-w-[80px]" width={columnWidths.gender}>
      {user.gender === 'male' ? (
        <span title="Male" aria-label="Male">&#9794;</span>
      ) : (
        <span title="Female" aria-label="Female">&#9792;</span>
      )}
      <span className="capitalize truncate" style={{ maxWidth: 40, display: 'inline-block', verticalAlign: 'middle' }}>{user.gender}</span>
    </TableCell>
  ),
  email: (user) => <TableCell className="max-w-[180px]" width={columnWidths.email}>{user.email}</TableCell>,
  phone: (user) => <TableCell className="max-w-[130px]" width={columnWidths.phone}>{user.phone}</TableCell>,
  username: (user) => <TableCell className="max-w-[130px]" width={columnWidths.username}>{user.username}</TableCell>,
  generalInfo: (user) => (
    <TableCell className="text-xs text-gray-600 max-w-[352px]" width={columnWidths.generalInfo}>
      <span className="truncate" style={{ maxWidth: 320, display: 'inline-block', verticalAlign: 'middle' }}>
        Bloodgroup "{user.bloodGroup}"; Height {user.height}; Weight {user.weight}; Hair color {user.hair.color}
      </span>
    </TableCell>
  ),
  domain: (user) => (
    <TableCell className="text-xs text-blue-600 underline max-w-[80px]" width={columnWidths.domain}>
      {user.email ? (
        <a href={`mailto:${user.email.split('@')[1] ? user.email.split('@')[1] : user.email}`} target="_blank" rel="noopener noreferrer" className="truncate" style={{ maxWidth: 60, display: 'inline-block', verticalAlign: 'middle' }}>
          {user.email.split('@')[1] || '-'}
        </a>
      ) : '-'}
    </TableCell>
  ),
  ip: (user) => <TableCell className="max-w-[112px]" width={columnWidths.ip}>{user.ip}</TableCell>,
  macIp: (user) => <TableCell className="max-w-[112px]" width={columnWidths.macIp}>{user.macAddress}</TableCell>,
  address: (user) => (
    <TableCell className="text-xs max-w-[322px]" width={columnWidths.address}>
      <span className="truncate" style={{ maxWidth: 290, display: 'inline-block', verticalAlign: 'middle' }}>{user.address ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}` : '-'}</span>
    </TableCell>
  ),
  bank: (user) => (
    <TableCell className="max-w-[100px]" width={columnWidths.bank}>{user.bank?.cardType || '-'} {user.bank?.cardNumber ? <span className="text-xs text-gray-400">({user.bank.cardNumber})</span> : ''}</TableCell>
  ),
  university: (user) => <TableCell className="max-w-[100px]" width={columnWidths.university}>{user.university}</TableCell>,
  company: (user) => <TableCell className="max-w-[168px]" width={columnWidths.company}>{user.company?.name}</TableCell>,
  ein: (user) => <TableCell className="max-w-[112px]" width={columnWidths.ein}>{user.ein}</TableCell>,
  ssn: (user) => <TableCell className="max-w-[112px]" width={columnWidths.ssn}>{user.ssn}</TableCell>,
};

const UserTableCell: React.FC<UserTableCellProps> = ({ user, column }) => {
  return renderers[column] ? renderers[column](user) : null;
};

export default UserTableCell;
