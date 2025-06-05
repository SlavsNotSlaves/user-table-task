import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <div className="flex-1 flex flex-col justify-between w-full max-w-[1440px] min-w-[1024px] mx-auto">
      {children}
    </div>
  </div>
);

export default Layout;
