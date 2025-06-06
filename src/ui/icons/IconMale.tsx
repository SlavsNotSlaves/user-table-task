import React from 'react';

export const IconMale = ({
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
      d="M10.625 4.6875C11.4879 4.6875 12.1875 3.98795 12.1875 3.125C12.1875 2.26206 11.4879 1.5625 10.625 1.5625C9.76206 1.5625 9.0625 2.26206 9.0625 3.125C9.0625 3.98795 9.76206 4.6875 10.625 4.6875Z"
      fill={color}
    />
    <path
      d="M12.9688 5.46875H8.28125C8.07405 5.46875 7.87534 5.55106 7.72882 5.69757C7.58231 5.84409 7.5 6.0428 7.5 6.25V11.7188H9.0625V17.1875H12.1875V11.7188H13.75V6.25C13.75 6.0428 13.6677 5.84409 13.5212 5.69757C13.3747 5.55106 13.176 5.46875 12.9688 5.46875Z"
      fill={color}
    />
  </svg>
);
