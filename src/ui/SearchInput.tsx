import { IconSearch } from './icons/IconSearch';
import { clsx } from 'clsx';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  disabled = false,
  error = false,
  errorText,
  className,
  ...rest
}) => (
  <div className={clsx('w-full', className)}>
    <div className="relative w-full">
      <span
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ left: 12, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: '#5F6E7C' }}
      >
        <IconSearch size={20} />
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          'w-full h-9 pr-3 rounded-[8px] border border-[#EAEDF0] bg-[#F9FAFB] text-[15px] leading-[20px] font-plex font-normal placeholder:text-[#5F6E7C] placeholder:font-plex placeholder:font-normal placeholder:text-[13px] placeholder:leading-[20px] focus:outline-none focus:ring-2 focus:ring-blue-200 transition-shadow',
          disabled && 'opacity-60 cursor-not-allowed',
          error && 'border-[#E40808] text-[#E40808] placeholder-[#E40808]'
        )}
        style={{ height: 36, paddingLeft: 40, boxSizing: 'border-box' }}
        {...rest}
      />
    </div>
    {error && errorText && (
      <div className="mt-1 text-[8px] leading-[20px] text-[#E40808] font-plex">
        {errorText}
      </div>
    )}
  </div>
);