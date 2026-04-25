import { Wifi, Search, Battery, SlidersHorizontal } from 'lucide-react';
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
        <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-current ml-1">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
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
