import { memo } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarContent = memo(() => {
  return (
    <div className="flex-1 flex mt-[56px] h-[calc(100%-56px)] bg-white/20 dark:bg-black/20">
      <div className="w-[250px] border-r border-black/10 dark:border-white/10 p-5 hidden md:block">
        <h2 className="text-xl font-bold mb-6">April 2026</h2>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
           {['S','M','T','W','T','F','S'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
           {/* Static stub representation */}
           {Array.from({length: 30}).map((_, i) => (
             <div key={i} className={`p-1 rounded-full ${i===16 ? 'bg-red-500 text-white font-bold' : 'hover:bg-black/5'} cursor-pointer`}>
               {i + 1}
             </div>
           ))}
        </div>
        <div className="mt-8 border-t border-black/10 pt-4">
           <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Upcoming</h3>
           <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                 <div className="w-1 h-3 rounded-full bg-blue-500 mt-1" />
                 <div>
                   <p className="text-sm font-bold">Sync Meeting</p>
                   <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10} /> 10:00 AM</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white/30 dark:bg-black/30">
        <div className="h-14 border-b border-black/10 flex items-center justify-between px-6">
           <span className="text-2xl font-bold tracking-tight">Today</span>
           <div className="flex items-center gap-3">
             <button className="p-1 hover:bg-black/5 rounded"><ChevronLeft size={18} /></button>
             <button className="p-1 hover:bg-black/5 rounded"><ChevronRight size={18} /></button>
           </div>
        </div>
        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center opacity-30 pointer-events-none">
               <CalendarIcon size={64} className="mb-4" />
               <span className="text-xl font-medium">No Multiple Events</span>
            </div>
        </div>
      </div>
    </div>
  );
});
