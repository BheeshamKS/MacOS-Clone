import { memo } from 'react';
import { Wifi, Bluetooth, Battery, Monitor, Bell, Search } from 'lucide-react';

export const SettingsContent = memo(() => {
  return (
    <div className="flex-1 flex mt-[56px] h-[calc(100%-56px)] bg-[#f5f5f7]/60 dark:bg-[#1e1e1e]/60">
       <div className="w-[280px] border-r border-black/10 dark:border-white/10 flex flex-col p-4 bg-white/40 dark:bg-black/30">
          <div className="relative mb-4">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <input type="text" placeholder="Search" className="w-full bg-white/50 dark:bg-black/40 rounded-md py-1.5 pl-8 pr-3 text-sm border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />
          </div>

          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-3 p-2 rounded-lg bg-black/5 backdrop-blur-sm cursor-pointer">
                <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center shadow-sm">
                   <Wifi size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Wi-Fi</span>
             </div>
             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 cursor-pointer">
                <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center shadow-sm">
                   <Bluetooth size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Bluetooth</span>
             </div>
             <div className="my-2 border-t border-black/5 dark:border-white/5" />
             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 cursor-pointer">
                <div className="w-7 h-7 rounded bg-red-500 flex items-center justify-center shadow-sm">
                   <Bell size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Notifications</span>
             </div>
             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 cursor-pointer">
                <div className="w-7 h-7 rounded bg-blue-400 flex items-center justify-center shadow-sm">
                   <Monitor size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Display</span>
             </div>
             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 cursor-pointer">
                <div className="w-7 h-7 rounded bg-green-500 flex items-center justify-center shadow-sm">
                   <Battery size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Battery</span>
             </div>
          </div>
       </div>

       <div className="flex-1 p-8">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
             <h1 className="text-2xl font-bold">Wi-Fi</h1>
             <div className="bg-white/50 dark:bg-black/40 rounded-xl p-4 border border-black/5 shadow-sm flex items-center justify-between">
                <div className="flex flex-col">
                   <span className="font-semibold text-[15px]">Wi-Fi</span>
                   <span className="text-sm text-gray-500">Connected to Home Network</span>
                </div>
                {/* Toggle switch placeholder */}
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center px-1 shadow-inner relative cursor-pointer">
                   <div className="w-5 h-5 bg-white rounded-full absolute right-1 shadow border border-black/10" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
});
