import React from 'react';

export const IconTriangleUp = ({
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
    <path d="M15 13L10 8L5 13H15Z" fill={color} />
  </svg>
);
