import React, { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface DesktopShellProps {
  children: ReactNode;
}

export const DesktopShell: React.FC<DesktopShellProps> = ({ children }) => {
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
