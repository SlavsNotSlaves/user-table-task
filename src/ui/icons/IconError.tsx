import React from 'react';

export const IconError = ({
  size = 20,
  color = '#687684',
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.8333 1.66663V13.75H9.16663V1.66663H10.8333ZM9.16663 15.8333H10.8366V17.5033H9.16663V15.8333Z"
      fill={color}
    />
  </svg>
);
