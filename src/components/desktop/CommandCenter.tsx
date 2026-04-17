
import { motion, AnimatePresence } from 'framer-motion';
import { refractive } from "@hashintel/refractive";
import { memo } from 'react';

const RefractiveMotionDiv = refractive(motion.div);
import { 
  Wifi, Bluetooth, Airplay, Moon, 
  Monitor, Copy, Sun, Volume2, 
  Moon as MoonHalf, Calculator, Timer, Camera, 
  Play, FastForward, Rewind
} from 'lucide-react';

const BOTTOM_ACTIONS = [MoonHalf, Calculator, Timer, Camera];

export const CommandCenter = memo(({ isOpen }: { isOpen: boolean }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <RefractiveMotionDiv
          refraction={{ radius: 36, blur: 30, bezelWidth: 1 }}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          className="absolute top-10 right-2 w-[340px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] bg-white/10 dark:bg-black/10 p-3.5 text-white font-sans z-[60] overflow-hidden"
        >
          {/* Main Grid */}
          <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
            {/* Wi-Fi & Bluetooth Stack */}
            <div className="flex flex-col gap-[14px]">
              {/* Wi-Fi Pill */}
              <div className="bg-white/10 dark:bg-black/20 rounded-[22px] p-3.5 flex items-center gap-3 border border-white/10 shadow-sm cursor-pointer hover:bg-white/20 transition-colors h-[76px]">
                <div className="w-[38px] h-[38px] rounded-full bg-[#007aff] flex items-center justify-center shadow-md">
                  <Wifi size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-[13px] leading-tight text-white drop-shadow-sm">Wi-Fi</span>
                  <span className="text-[11px] font-medium text-white/70">Home</span>
                </div>
              </div>

              {/* Bluetooth & Airdrop Row */}
              <div className="flex gap-[14px] h-[76px]">
                <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-[22px] flex items-center justify-center border border-white/10 shadow-sm cursor-pointer hover:bg-white/20 transition-colors">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#007aff] flex items-center justify-center shadow-md">
                    <Bluetooth size={18} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-[22px] flex items-center justify-center border border-white/10 shadow-sm cursor-pointer hover:bg-white/20 transition-colors">
                  <div className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shadow-md">
                     <div className="w-[22px] h-[22px] rounded-full border-2 border-[#007aff] border-t-transparent animate-spin-slow flex items-center justify-center">
                       <Airplay size={10} className="text-[#007aff]" />
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Now Playing Square */}
            <div className="bg-white/10 dark:bg-black/20 rounded-[24px] p-4 border border-white/10 shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-[12px] bg-red-400 overflow-hidden shadow-md">
                  <div className="w-full h-full bg-gradient-to-br from-[#ff5b5b] to-[#ff9d2e] flex items-center justify-center relative overflow-hidden">
                     <span className="text-white font-black text-[28px] opacity-20 absolute -bottom-2 -right-1">🎶</span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                   <Airplay size={10} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <span className="font-semibold text-[14px] leading-tight text-white drop-shadow-sm truncate">Besties</span>
                <span className="text-[12px] font-medium text-white/70 truncate">Black Country, New Road</span>
              </div>
              <div className="flex items-center justify-between px-1 mt-4">
                <Rewind size={18} className="text-white/90 fill-current hover:text-white cursor-pointer transition-colors" />
                <Play size={22} className="text-white fill-current cursor-pointer hover:scale-110 transition-transform" />
                <FastForward size={18} className="text-white/90 fill-current hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          {/* Middle Tools */}
          <div className="flex gap-[14px] mb-[14px] h-[64px]">
            {/* Focus */}
            <div className="flex-[2] bg-white/10 dark:bg-black/20 rounded-[22px] p-3 flex items-center gap-3 border border-white/10 shadow-sm cursor-pointer hover:bg-white/20 transition-colors">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shadow-inner ml-1">
                <Moon size={16} className="text-white fill-current" />
              </div>
              <span className="font-bold text-[13px] text-white tracking-wide">Focus</span>
            </div>
            
            {/* Screen Mirror */}
            <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-[22px] flex items-center justify-center border border-white/10 shadow-sm cursor-pointer hover:bg-white/20 transition-colors">
              <Monitor size={22} className="text-white" />
            </div>
            
            {/* Copy/Other */}
            <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-[22px] flex items-center justify-center border border-white/10 shadow-sm cursor-pointer hover:bg-white/20 transition-colors">
              <Copy size={20} className="text-white" />
            </div>
          </div>

          {/* Sliders */}
          <div className="flex flex-col gap-[14px] mb-4">
            {/* Display */}
            <div className="bg-white/10 dark:bg-black/20 rounded-[22px] p-3.5 border border-white/10 shadow-sm flex flex-col gap-[10px]">
              <span className="font-bold text-[12px] text-white/90 px-1 tracking-wide">Display</span>
              <div className="relative w-full h-[28px] bg-white/15 dark:bg-black/40 rounded-full overflow-hidden shadow-inner flex items-center px-2">
                <div className="absolute left-0 top-0 h-full w-[80%] bg-white rounded-full flex items-center shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    <Sun size={15} strokeWidth={2.5} className="text-black ml-2" />
                </div>
              </div>
            </div>
            
            {/* Sound */}
            <div className="bg-white/10 dark:bg-black/20 rounded-[22px] p-3.5 border border-white/10 shadow-sm flex flex-col gap-[10px]">
              <span className="font-bold text-[12px] text-white/90 px-1 tracking-wide">Sound</span>
              <div className="relative w-full h-[28px] bg-white/15 dark:bg-black/40 rounded-full overflow-hidden shadow-inner flex items-center px-2">
                <div className="absolute left-0 top-0 h-full w-[45%] bg-white rounded-full flex items-center shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    <Volume2 size={15} strokeWidth={2.5} className="text-black ml-2" />
                </div>
                <div className="absolute right-3 z-10">
                   <div className="w-5 h-5 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                     <Airplay size={10} className="text-white" />
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row Actions */}
          <div className="flex justify-between px-1 mb-5">
            {BOTTOM_ACTIONS.map((Icon, i) => (
              <div key={i} className="w-[58px] h-[58px] rounded-[50%] bg-white/10 dark:bg-black/20 border border-white/10 shadow-sm flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                <Icon size={24} className="text-white drop-shadow-sm" strokeWidth={1.5} />
              </div>
            ))}
          </div>

          {/* Bottom Edit Button */}
          <div className="flex justify-center mb-1">
            <button className="bg-white/10 dark:bg-black/20 hover:bg-white/20 px-5 py-1.5 rounded-full text-[13px] font-bold text-white shadow-sm border border-white/10 transition-colors">
              Edit Controls
            </button>
          </div>
        </RefractiveMotionDiv>
      )}
    </AnimatePresence>
  );
});
