import { Apple, Wifi, Search, Battery, SlidersHorizontal } from 'lucide-react';
import { refractive } from "@hashintel/refractive";
import { memo, useState, useEffect } from 'react';
import { useWindows } from '../../contexts/WindowContext';

interface MenuBarProps {
  toggleCommandCenter: () => void;
}

export const MenuBar = memo(({ toggleCommandCenter }: MenuBarProps) => {
  const { windows } = useWindows();

  const activeWindow = windows
    .filter(w => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  const appNameMap: Record<string, string> = {
    finder: 'Finder',
    safari: 'Safari',
    messages: 'Messages',
    mail: 'Mail',
    maps: 'Maps',
    facetime: 'FaceTime',
    calendar: 'Calendar',
    calculator: 'Calculator',
    contacts: 'Contacts',
    notes: 'Notes',
    music: 'Music',
    'app store': 'App Store',
    settings: 'Settings'
  };

  const activeAppName = activeWindow ? appNameMap[activeWindow.id] || 'Finder' : null;

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(/,/g, '');
  const formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <refractive.div 
      refraction={{ radius: 0, blur: 12, bezelWidth: 0 }}
      className="w-full h-8 fixed top-0 left-0 z-[9999] flex items-center justify-between px-4 text-[13px] font-medium text-white select-none bg-black/10"
    >
      <div className="flex items-center space-x-4">
        <svg width="14" height="14" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-current">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.92.21-9.84-1.96-14.74-6.53-3.13-2.73-7.1-7.43-11.9-14.1-5.25-7.7-9.62-17.63-13.06-29.77-3.45-12.16-5.19-23.92-5.19-35.28 0-12.45 2.61-22.52 7.84-30.21 3.67-5.3 8.33-9.4 13.98-12.28 5.64-2.88 11.45-4.32 17.43-4.32 4.58 0 9.83 1.13 15.74 3.39 5.92 2.26 9.55 3.39 10.9 3.39 1.45 0 5.3-1.22 11.53-3.67 6.24-2.44 11.69-3.52 16.35-3.23 7.82.26 14.54 2.54 20.14 6.83 3.62 2.8 6.81 6.58 9.53 11.35-8.98 5.4-13.48 12.87-13.48 22.4 0 7.82 2.81 14.53 8.43 20.14 5.63 5.6 12.55 8.78 20.78 9.53-2.07 5.92-4.66 11.31-7.78 16.18zm-38.15-103.52c-.67-7.66 1.83-14.86 7.49-21.6 5.66-6.74 12.92-10.45 21.78-11.13.58 7.35-1.98 14.39-7.7 21.12-5.72 6.74-12.92 10.44-21.57 11.61z" />
        </svg>
        {activeAppName && <span className="font-bold cursor-pointer">{activeAppName}</span>}
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">File</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">Edit</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">View</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">Contact</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">Window</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">Help</span>
      </div>
      


      <div className="flex items-center space-x-[18px]">
        <Wifi size={14} className="cursor-pointer" />
        <Battery size={14} className="cursor-pointer" />
        <Search size={14} className="cursor-pointer" />
        <SlidersHorizontal size={14} className="cursor-pointer hover:opacity-80" onClick={toggleCommandCenter} />
        <span className="cursor-default tracking-wide font-medium ml-1">{formattedDate}  {formattedTime}</span>
      </div>
    </refractive.div>
  );
});
