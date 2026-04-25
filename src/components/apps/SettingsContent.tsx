import { memo, useState } from 'react';
import { Wifi, Bluetooth, Battery, Monitor, Bell, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const SettingsContent = memo(() => {
  const [activeTab, setActiveTab] = useState('Wi-Fi');
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex-1 flex h-full bg-[#f5f5f7]/60 dark:bg-[#1e1e1e]/60">
       <div className="w-[280px] border-r border-black/10 dark:border-white/10 flex flex-col px-4 pb-4 pt-[72px] bg-white/40 dark:bg-black/30">
          <div className="relative mb-4">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <input type="text" placeholder="Search" className="w-full bg-white/50 dark:bg-black/40 rounded-md py-1.5 pl-8 pr-3 text-sm border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />
          </div>

          <div className="flex flex-col gap-1">
             <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === 'Wi-Fi' ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`} onClick={() => setActiveTab('Wi-Fi')}>
                <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center shadow-sm">
                   <Wifi size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Wi-Fi</span>
             </div>
             <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === 'Bluetooth' ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`} onClick={() => setActiveTab('Bluetooth')}>
                <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center shadow-sm">
                   <Bluetooth size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Bluetooth</span>
             </div>
             <div className="my-2 border-t border-black/5 dark:border-white/5" />
             <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === 'Notifications' ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`} onClick={() => setActiveTab('Notifications')}>
                <div className="w-7 h-7 rounded bg-red-500 flex items-center justify-center shadow-sm">
                   <Bell size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Notifications</span>
             </div>
             <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === 'Display' ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`} onClick={() => setActiveTab('Display')}>
                <div className="w-7 h-7 rounded bg-blue-400 flex items-center justify-center shadow-sm">
                   <Monitor size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Display</span>
             </div>
             <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${activeTab === 'Battery' ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`} onClick={() => setActiveTab('Battery')}>
                <div className="w-7 h-7 rounded bg-green-500 flex items-center justify-center shadow-sm">
                   <Battery size={14} className="text-white" />
                </div>
                <span className="text-[13px] font-medium">Battery</span>
             </div>
          </div>
       </div>

       <div className="flex-1 px-8 pb-8 pt-[88px]">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
             <h1 className="text-2xl font-bold">{activeTab}</h1>
             
             {activeTab === 'Wi-Fi' && (
               <div className="bg-white/50 dark:bg-black/40 rounded-xl p-4 border border-black/5 shadow-sm flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="font-semibold text-[15px]">Wi-Fi</span>
                     <span className="text-sm text-gray-500">Connected to Home Network</span>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full flex items-center px-1 shadow-inner relative cursor-pointer">
                     <div className="w-5 h-5 bg-white rounded-full absolute right-1 shadow border border-black/10" />
                  </div>
               </div>
             )}

             {activeTab === 'Display' && (
               <div className="bg-white/50 dark:bg-black/40 rounded-xl p-4 border border-black/5 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="font-semibold text-[15px]">Appearance</span>
                        <span className="text-sm text-gray-500">Toggle dark and light mode</span>
                     </div>
                     <div 
                        className={`w-12 h-6 rounded-full flex items-center px-1 shadow-inner relative cursor-pointer transition-colors ${theme === 'dark' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        onClick={toggleTheme}
                     >
                        <div className={`w-5 h-5 bg-white rounded-full absolute shadow border border-black/10 transition-all ${theme === 'dark' ? 'right-1' : 'left-1'}`} />
                     </div>
                  </div>
               </div>
             )}
          </div>
       </div>
    </div>
  );
});
