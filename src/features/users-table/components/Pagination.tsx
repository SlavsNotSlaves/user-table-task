interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  total: number;
}

const Pagination = ({ page, setPage, limit, setLimit, total }: PaginationProps) => {
  return (
    <div className="w-full flex justify-between items-center py-4">
      <div>
        <select
          className="border rounded px-2 py-1"
          value={limit}
          onChange={e => setLimit(Number(e.target.value))}
          aria-label="Items per page"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="ml-2 text-sm text-gray-500">ITEMS PER PAGE</span>
      </div>
      <div className="text-sm text-gray-500">
        {total === 0 ? '0' : `${(page - 1) * limit + 1} - ${Math.min(page * limit, total)} of ${total}`}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 rounded disabled:opacity-50"
          onClick={() => setPage(1)}
          disabled={page === 1}
          aria-label="First page"
        >&#171;</button>
        <button
          className="px-2 py-1 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >&#60;</button>
        <input
          type="number"
          min={1}
          max={Math.ceil(total / limit) || 1}
          value={page}
          onChange={e => {
            const val = Number(e.target.value);
            if (val >= 1 && val <= Math.ceil(total / limit)) setPage(val);
          }}
          className="w-12 border rounded text-center"
          aria-label="Current page"
        />
        <button
          className="px-2 py-1 rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page >= Math.ceil(total / limit)}
          aria-label="Next page"
        >&#62;</button>
        <button
          className="px-2 py-1 rounded disabled:opacity-50"
          onClick={() => setPage(Math.ceil(total / limit))}
          disabled={page >= Math.ceil(total / limit)}
          aria-label="Last page"
        >&#187;</button>
      </div>
    </div>
  );
};

export default Pagination;
