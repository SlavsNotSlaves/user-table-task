import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { IconCaret, IconTriangleDown, IconTriangleUp } from "@/ui/icons";
import { IconButton } from '@/ui';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  total: number;
}

const limits = [10, 20, 50];

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, ref) => (
  <Select.Item
    className={
      "flex items-center px-4 py-2 text-[13px] font-plex-sans text-[#202932] cursor-pointer rounded-[8px] data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600 data-[highlighted]:bg-[#F5F7FA] data-[disabled]:text-gray-300 data-[disabled]:cursor-not-allowed outline-none select-none"
    }
    {...props}
    ref={ref}
  >
    <Select.ItemText>{children}</Select.ItemText>
    <Select.ItemIndicator className="ml-auto">
      {/* Можно добавить галочку или оставить пусто */}
    </Select.ItemIndicator>
  </Select.Item>
));

export const PaginationFooter: React.FC<PaginationProps> = ({
  page,
  setPage,
  limit,
  setLimit,
  total,
}) => {
  const pageCount = Math.ceil(total / limit) || 1;
  const [open, setOpen] = React.useState(false);

  return (
    <footer className="w-full flex justify-between items-center border-t border-[#EAEDF0] px-6 py-4 bg-white">
      {/* Items per page */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Select.Root
            value={String(limit)}
            onValueChange={(v: string) => setLimit(Number(v))}
            open={open}
            onOpenChange={setOpen}
          >
            <Select.Trigger
              className="border border-[#EAEDF0] rounded-[8px] px-4 h-[36px] w-[88px] flex items-center justify-between text-[13px] font-plex-sans text-[#202932] bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-100 shadow-none relative"
              aria-label="Items per page"
            >
              <Select.Value />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {open ? (
                  <IconTriangleUp size={20} color="#202932" />
                ) : (
                  <IconTriangleDown size={20} color="#202932" />
                )}
              </span>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="rounded-[12px] border border-[#EAEDF0] bg-white shadow-lg mt-2 z-50 min-w-[88px] w-full animate-fadeIn">
                <Select.Viewport className="py-2">
                  {limits.map((l) => (
                    <SelectItem key={l} value={String(l)}>
                      {l}
                    </SelectItem>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <span className="text-xs text-[#6B7280] font-medium uppercase tracking-wide">
          Items per page
        </span>
      </div>

      {/* Range info */}
      <div className="text-xs text-[#6B7280] font-semibold font-plex-sans uppercase">
        {total === 0
          ? "0"
          : `${(page - 1) * limit + 1} - ${Math.min(page * limit, total)} of ${total}`}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <IconButton
          onClick={() => setPage(1)}
          disabled={page === 1}
          aria-label="First page"
          className="border border-[#EAEDF0]"
        >
          <IconCaret direction="left" variant="line" size={20} />
        </IconButton>
        <IconButton
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="border border-[#EAEDF0]"
        >
          <IconCaret direction="left" size={20} />
        </IconButton>
        <input
          type="number"
          min={1}
          max={pageCount}
          value={page}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 1 && val <= pageCount) setPage(val);
          }}
          className="w-12 border border-[#EAEDF0] rounded text-center text-sm"
          aria-label="Current page"
        />
        <IconButton
          onClick={() => setPage(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
          className="border border-[#EAEDF0]"
        >
          <IconCaret direction="right" size={20} />
        </IconButton>
        <IconButton
          onClick={() => setPage(pageCount)}
          disabled={page >= pageCount}
          aria-label="Last page"
          className="border border-[#EAEDF0]"
        >
          <IconCaret direction="right" variant="line" size={20} />
        </IconButton>
      </div>
    </footer>
  );
};

export default PaginationFooter;
