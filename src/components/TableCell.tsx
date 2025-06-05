import React from 'react';

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  className?: string;
  maxWidth?: number | string;
  minWidth?: number | string;
  width?: number | string;
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  className = '',
  maxWidth,
  minWidth,
  width,
  ...rest
}) => {
  return (
    <td
      className={`px-4 py-2 border-b whitespace-nowrap h-[56px] align-middle break-words text-left truncate ${className}`}
      style={{ maxWidth, minWidth, width, ...rest.style }}
      {...rest}
    >
      {children}
    </td>
  );
};

export default TableCell;
