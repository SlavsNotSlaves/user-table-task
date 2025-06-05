import React from 'react';

type CaretVariant = 'default' | 'line';

export const IconCaret = ({
  direction = 'right',
  variant = 'default',
  size = 20,
  color = '#687684',
  ...props
}: React.SVGProps<SVGSVGElement> & {
  direction?: 'left' | 'right';
  variant?: CaretVariant;
  size?: number;
  color?: string;
}) => {
  const path = variant === 'default' 
    ? "M7.5 4.5L12.5 9.5L7.5 14.5"
    : "M12 10.4142V16H14L14 4H12V9.58576L11.7071 9.29286L7.20706 4.79286L5.79285 6.20708L9.58574 9.99997L5.79285 13.7929L7.20706 15.2071L11.7071 10.7071L12 10.4142Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={direction === 'left' ? { transform: 'scaleX(-1)' } : undefined}
      {...props}
    >
      {variant === 'default' ? (
        <path
          d={path}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={path}
          fill={color}
        />
      )}
    </svg>
  );
}; 