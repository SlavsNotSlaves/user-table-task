import React from "react";
import { IconCaret, IconTriangleDown } from "@/ui/icons";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  total: number;
}

const limits = [10, 20, 50];

export const PaginationFooter: React.FC<PaginationProps> = ({
  page,
  setPage,
  limit,
  setLimit,
  total,
}) => {
  const pageCount = Math.ceil(total / limit) || 1;

  return (
    <footer className="w-full flex justify-between items-center border-t border-[#EAEDF0] px-6 py-4 bg-white">
      {/* Items per page */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            className="border border-[#EAEDF0] rounded px-3 py-2 text-sm w-[88px] h-[36px] appearance-none pr-8"
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
            aria-label="Items per page"
          >
            {limits.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <IconTriangleDown size={16} />
          </span>
        </div>
        <span className="text-xs text-[#6B7280] font-medium uppercase tracking-wide">Items per page</span>
      </div>

      {/* Range info */}
      <div className="text-xs text-[#6B7280] font-semibold font-plex-sans uppercase">
        {total === 0
          ? "0"
          : `${(page - 1) * limit + 1} - ${Math.min(page * limit, total)} of ${total}`}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded border border-[#EAEDF0] disabled:opacity-50"
          onClick={() => setPage(1)}
          disabled={page === 1}
          aria-label="First page"
        >
          <IconCaret direction="left" variant="line" size={20} />
        </button>
        <button
          className="p-2 rounded border border-[#EAEDF0] disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <IconCaret direction="left" size={20} />
        </button>
        <input
          type="number"
          min={1}
          max={pageCount}
          value={page}
          onChange={e => {
            const val = Number(e.target.value);
            if (val >= 1 && val <= pageCount) setPage(val);
          }}
          className="w-12 border border-[#EAEDF0] rounded text-center text-sm"
          aria-label="Current page"
        />
        <button
          className="p-2 rounded border border-[#EAEDF0] disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
        >
          <IconCaret direction="right" size={20} />
        </button>
        <button
          className="p-2 rounded border border-[#EAEDF0] disabled:opacity-50"
          onClick={() => setPage(pageCount)}
          disabled={page >= pageCount}
          aria-label="Last page"
        >
          <IconCaret direction="right" variant="line" size={20} />
        </button>
      </div>
    </footer>
  );
};

export default PaginationFooter;
