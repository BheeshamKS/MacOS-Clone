import { memo } from 'react';
import { 
  Clock, FileText, Monitor, HardDrive, 
  Download, Cloud, Folder
} from 'lucide-react';

const FolderIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="folderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7CD0FF" />
        <stop offset="100%" stopColor="#30A8FF" />
      </linearGradient>
      <linearGradient id="folderBackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6BC2FF" />
        <stop offset="100%" stopColor="#259CFF" />
      </linearGradient>
      <filter id="folderShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
      </filter>
    </defs>
    <path d="M4 14 C4 11 6 9 9 9 L24 9 C26 9 27 10 28 11.5 L31 16 L55 16 C58 16 60 18 60 21 L60 51 C60 54 58 56 55 56 L9 56 C6 56 4 54 4 51 Z" fill="url(#folderBackGradient)" />
    <path d="M4 23 C4 21 6 19 9 19 L55 19 C58 19 60 21 60 24 L60 51 C60 54 58 56 55 56 L9 56 C6 56 4 54 4 51 Z" fill="url(#folderGradient)" filter="url(#folderShadow)" />
  </svg>
);

export const FinderContent = memo(() => {
  return (
    <div className="flex-1 flex h-full bg-[#f5f5f7]/80 dark:bg-[#1e1e1e]/80">
      {/* Left Sidebar */}
      <div className="w-[200px] border-r border-black/10 dark:border-white/10 flex flex-col pt-[56px] bg-white/40 dark:bg-black/30 backdrop-blur-md">
        
        <div className="px-3 mb-4">
          <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1 px-2 uppercase">Favorites</h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-default">
              <Clock size={14} className="text-blue-500" />
              <span className="text-[13px] font-medium text-black dark:text-white">Recents</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-black/10 dark:bg-white/10 cursor-default">
              <FileText size={14} className="text-blue-500" />
              <span className="text-[13px] font-medium text-black dark:text-white">Applications</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-default">
              <Monitor size={14} className="text-blue-500" />
              <span className="text-[13px] font-medium text-black dark:text-white">Desktop</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-default">
              <FileText size={14} className="text-blue-500" />
              <span className="text-[13px] font-medium text-black dark:text-white">Documents</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-default">
              <Download size={14} className="text-blue-500" />
              <span className="text-[13px] font-medium text-black dark:text-white">Downloads</span>
            </div>
          </div>
        </div>

        <div className="px-3 mb-4">
          <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1 px-2 uppercase">Locations</h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-default">
              <HardDrive size={14} className="text-gray-500" />
              <span className="text-[13px] font-medium text-black dark:text-white">Macintosh HD</span>
            </div>
          </div>
        </div>

        <div className="px-3">
          <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1 px-2 uppercase">iCloud</h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-default">
              <Cloud size={14} className="text-blue-400" />
              <span className="text-[13px] font-medium text-black dark:text-white">iCloud Drive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Area Grid */}
      <div className="flex-1 p-6 pt-[56px] overflow-y-auto">
         <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {[
              { name: 'Xcode' }, { name: 'Figma' }, { name: 'VS Code' },
              { name: 'Terminal' }, { name: 'System Settings' }, { name: 'Calendar' },
              { name: 'Notes' }, { name: 'Music' }, { name: 'Podcasts' },
              { name: 'TV' }, { name: 'Books' }, { name: 'Dictionary' },
              { name: 'Calculator' }, { name: 'Chess' }, { name: 'Stickies' }
            ].map((app, i) => (
               <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/10 rounded-xl flex items-center justify-center border border-black/5 dark:border-white/5 shadow-sm group-hover:scale-105 transition-transform">
                     <FolderIcon size={40} />
                  </div>
                  <span className="text-[12px] font-medium text-black dark:text-white/90 text-center truncate w-full">{app.name}</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
});
