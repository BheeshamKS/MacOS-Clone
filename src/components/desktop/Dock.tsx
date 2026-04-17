import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Smile, Calendar, Mail, Map, Settings, Trash2, FolderOpen,
  MessageCircle, Video, Play, Phone, Compass, FileText, View,
  Music, Tv 
} from 'lucide-react';

const apps = [
  { name: 'Finder', fallback: FolderOpen, icon: '/icons/dock/finder.svg', active: true },
  { name: 'Launchpad', fallback: View, icon: '/icons/dock/launchpad.svg', active: false },
  { name: 'Safari', fallback: Compass, icon: '/icons/dock/safari.svg', active: true },
  { name: 'Messages', fallback: MessageCircle, icon: '/icons/dock/messages.svg', active: false },
  { name: 'Mail', fallback: Mail, icon: '/icons/dock/mail.svg', active: false },
  { name: 'Maps', fallback: Map, icon: '/icons/dock/maps.svg', active: false },
  { name: 'FaceTime', fallback: Video, icon: '/icons/dock/facetime.svg', active: false },
  { name: 'Calendar', fallback: Calendar, icon: '/icons/dock/calendar.svg', active: true },
  { name: 'Contacts', fallback: Smile, icon: '/icons/dock/contacts.svg', active: true },
  { name: 'Notes', fallback: FileText, icon: '/icons/dock/notes.svg', active: false },
  { name: 'TV', fallback: Tv, icon: '/icons/dock/tv.svg', active: false },
  { name: 'Music', fallback: Music, icon: '/icons/dock/music.svg', active: false },
  { name: 'App Store', fallback: Play, icon: '/icons/dock/appstore.svg', active: false },
  { name: 'Settings', fallback: Settings, icon: '/icons/dock/settings.svg', active: false },
  { divider: true },
  { name: 'Trash', fallback: Trash2, icon: '/icons/dock/trash.svg', active: false },
];

export const Dock = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <div 
        className="pointer-events-auto rounded-[32px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_20px_40px_rgba(0,0,0,0.3)] border border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-[50px] saturate-[200%]"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <div className="flex items-end gap-[10px] px-3 pb-2 pt-2 h-[68px]">
          {apps.map((app, i) => (
            app.divider ? (
               <div key={i} className="w-[1px] h-10 bg-black/10 mx-1 mb-2 self-end" />
            ) : (
               <DockIcon mouseX={mouseX} key={i} app={app} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

function DockIcon({ mouseX, app }: { mouseX: any; app: any }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Base 48px size mapped over 150px proximity scale up to 85px max
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 85, 48]);
  // Use exact official macOS derived physics attributes
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 170, damping: 12 });

  const FallbackIcon = app.fallback;

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      whileTap={{ scale: 0.8 }}
      className="group relative flex flex-col items-center justify-end cursor-pointer h-full"
    >
      <motion.div style={{ width, height: width }} className="relative flex items-center justify-center origin-bottom">
        {!imgError && app.icon ? (
           <img 
              src={app.icon} 
              alt={app.name} 
              className="w-full h-full object-contain drop-shadow-md" 
              onError={() => setImgError(true)}
           />
        ) : (
           <div className={`relative flex items-center justify-center w-full h-full rounded-[22%] shadow-md bg-white/20 overflow-hidden border border-black/5`}>
             {FallbackIcon && <FallbackIcon className="w-3/5 h-3/5 text-black drop-shadow-sm" />}
           </div>
        )}
      </motion.div>
      
      {app.active && (
        <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-black/60 dark:bg-white/70" />
      )}
      
      <div className="absolute -top-[52px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="bg-white/50 dark:bg-black/50 text-black dark:text-white font-medium text-xs px-3 py-1.5 rounded-[8px] whitespace-nowrap shadow-lg backdrop-blur-[30px] saturate-[200%] border border-black/10 dark:border-white/10">
          {app.name}
        </div>
      </div>
    </motion.div>
  );
}
