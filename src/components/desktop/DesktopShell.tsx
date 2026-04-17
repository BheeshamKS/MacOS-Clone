import type { FC, ReactNode } from 'react';

interface DesktopShellProps {
  children: ReactNode;
}

export const DesktopShell: FC<DesktopShellProps> = ({ children }) => {
  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center text-black font-sans"
      style={{ backgroundImage: "url('/wallpaper.png')" }}
    >
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      {children}
    </div>
  );
};
