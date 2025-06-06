import React from 'react';

export const IconSingleChoice = ({
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.746 6.66602L8.60313 14.666L7.87519 15.4813L7.12766 14.6839L4.27051 11.6363L5.72958 10.2684L7.8392 12.5187L14.2541 5.33398L15.746 6.66602Z"
      fill={color}
    />
  </svg>
);
