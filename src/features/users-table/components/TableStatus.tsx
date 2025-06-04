interface TableStatusProps {
  status: 'loading' | 'error' | 'notfound';
}

const TableStatus = ({ status }: TableStatusProps) => {
  if (status === 'loading') return <div className="text-center py-10">Loading Page...</div>;
  if (status === 'error') return <div className="text-center py-10 text-red-500">Oops, something went wrong</div>;
  if (status === 'notfound') return <div className="text-center py-10">Not found</div>;
  return null;
};

export default TableStatus;
