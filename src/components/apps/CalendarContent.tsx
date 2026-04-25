import { memo } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarContent = memo(() => {
  const today = new Date();
  const currentMonthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const currentDay = today.getDate();
  
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const calendarDays = Array(firstDayOfMonth).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <div className="flex-1 flex h-full pt-[56px] bg-white/20 dark:bg-black/20">
      <div className="w-[250px] border-r border-black/10 dark:border-white/10 p-5 hidden md:block">
        <h2 className="text-xl font-bold mb-6">{currentMonthName}</h2>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {calendarDays.map((day, i) => (
            <div key={i} className={`p-1 rounded-full ${day === currentDay ? 'bg-red-500 text-white font-bold' : day ? 'hover:bg-black/5 cursor-pointer' : ''}`}>
              {day || ''}
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
