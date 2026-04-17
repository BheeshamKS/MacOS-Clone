import { Apple, Wifi, Search, Battery, SlidersHorizontal } from 'lucide-react';
import { refractive } from "@hashintel/refractive";
import { memo } from 'react';

interface MenuBarProps {
  toggleCommandCenter: () => void;
}

export const MenuBar = memo(({ toggleCommandCenter }: MenuBarProps) => {
  return (
    <refractive.div 
      refraction={{ radius: 0, blur: 12, bezelWidth: 0 }}
      className="w-full h-8 fixed top-0 left-0 z-[60] flex items-center justify-between px-4 text-[13px] font-medium text-white select-none bg-black/10"
    >
      <div className="flex items-center space-x-4">
        <Apple size={14} className="cursor-pointer" />
        <span className="font-bold cursor-pointer">Phone</span>
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
        <span className="cursor-default tracking-wide font-medium ml-1">Tue Apr 1  9:41 AM</span>
      </div>
    </refractive.div>
  );
});
