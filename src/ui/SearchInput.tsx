import { TextField } from '@radix-ui/themes';
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
   <TextField.Root
        size="3"
        radius="large"
        variant="surface"
        className="w-full"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
>
  <TextField.Slot side="left">
    <IconSearch size={18} className={clsx('text-gray-400', disabled && 'text-gray-300')} />
  </TextField.Slot>
  </TextField.Root>
    {error && errorText && (
      <div className="mt-1 text-[8px] leading-[20px] text-[#E40808] font-plex">{errorText}</div>
    )}
  </div>
); 