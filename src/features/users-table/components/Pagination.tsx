import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import { IconCaret, IconTriangleDown, IconTriangleUp } from '@/ui/icons';
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
      'flex items-center px-2 h-[36px] text-[13px] font-plex-sans text-[#202932] cursor-pointer rounded-[8px] data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600 data-[highlighted]:bg-[#F5F7FA] data-[disabled]:text-gray-300 data-[disabled]:cursor-not-allowed outline-none select-none'
    }
    {...props}
    ref={ref}
  >
    <Select.ItemText>{children}</Select.ItemText>
    <Select.ItemIndicator className="ml-auto"></Select.ItemIndicator>
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
    <footer className="w-full flex justify-between items-center bg-white border border-[#EAEDF0] border-t-0 rounded-b-[8px] px-7 py-7">
      {/* Items per page */}
      <div className="flex items-center justify-between gap-4" style={{ padding: '8px' }}>
        <div className="relative" style={{ marginRight: '10px' }}>
          <Select.Root
            value={String(limit)}
            onValueChange={(v: string) => setLimit(Number(v))}
            open={open}
            onOpenChange={setOpen}
          >
            <Select.Trigger
              className="border border-[#EAEDF0] rounded-[8px] px-4 h-[36px] w-[88px] flex items-center justify-between text-[13px] font-plex-sans text-[#202932] bg-white focus:outline-none focus:ring-2 focus:ring-[#005CB2] transition-all duration-100 shadow-none relative overflow-hidden gap-2 data-[state=open]:border-2 data-[state=open]:border-blue-500"
              aria-label="Items per page"
            >
              <Select.Value />
              {open ? (
                <IconTriangleUp size={20} color="#005CB2" />
              ) : (
                <IconTriangleDown size={20} color="#005CB2" />
              )}
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                style={{
                  minWidth: 88,
                  width: 88,
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 4px 24px 0px rgba(37,45,52,0.10)',
                  zIndex: 50,
                  overflow: 'hidden',
                }}
                className="border border-[#EAEDF0] animate-fadeIn"
                position="popper"
                side="bottom"
                align="start"
                sideOffset={2}
              >
                <Select.Viewport>
                  {limits.map((l) => (
                    <SelectItem key={l} value={String(l)} style={{ padding: '0px 6px' }}>
                      {l}
                    </SelectItem>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <div>
          <span className="text-xs text-[#6B7280] font-semibold uppercase tracking-wide text-[10px]">
            Items per page
          </span>
        </div>
      </div>

      {/* Range info */}
      <div className="text-xs text-[#6B7280] font-semibold font-plex-sans uppercase  text-[10px]">
        {total === 0
          ? '0'
          : `${(page - 1) * limit + 1} - ${Math.min(page * limit, total)} of ${total}`}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2" style={{ padding: '8px' }}>
        <IconButton onClick={() => setPage(1)} disabled={page === 1} aria-label="First page">
          <IconCaret
            direction="left"
            variant="line"
            size={20}
            className=" text-[#6B7280] transition-colors"
          />
        </IconButton>
        <IconButton
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <IconCaret direction="left" size={20} className=" text-[#6B7280] transition-colors" />
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
          className="w-[64px] h-[32px] border border-[#EAEDF0] rounded-[8px] text-center text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none mx-[6px] focus:border-[#005CB2] focus:ring-2 focus:ring-[#005CB2] focus:outline-none  "
          aria-label="Current page"
          style={{ MozAppearance: 'textfield', borderColor: '#EAEDF0' }}
        />
        <IconButton
          onClick={() => setPage(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
        >
          <IconCaret direction="right" size={20} className=" text-[#6B7280] transition-colors" />
        </IconButton>
        <IconButton
          onClick={() => setPage(pageCount)}
          disabled={page >= pageCount}
          aria-label="Last page"
        >
          <IconCaret
            direction="right"
            variant="line"
            size={20}
            className=" text-[#6B7280] transition-colors"
          />
        </IconButton>
      </div>
    </footer>
  );
};

export default PaginationFooter;
