import React from 'react';

interface TableStatusProps {
  status: 'loading' | 'error' | 'empty';
  colSpan: number;
}

const TableStatus: React.FC<TableStatusProps> = ({ status, colSpan }) => {
  const getMessage = () => {
    switch (status) {
      case 'loading':
        return 'Loading...';
      case 'error':
        return 'Oops, something went wrong';
      case 'empty':
        return 'No data';
      default:
        return '';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <tr>
      <td colSpan={colSpan} className={`text-center py-10 ${getTextColor()}`}>
        {getMessage()}
      </td>
    </tr>
  );
};

export default TableStatus;
