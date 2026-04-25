import { useRef, memo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { refractive } from "@hashintel/refractive";
import { useWindows } from '../../contexts/WindowContext';

import finderIcon from '../../assets/icons/finder.svg';
import safariIcon from '../../assets/icons/safari.svg';
import messagesIcon from '../../assets/icons/messages.svg';
import mailIcon from '../../assets/icons/mail.svg';
import mapsIcon from '../../assets/icons/maps.svg';
import facetimeIcon from '../../assets/icons/facetime.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import calculatorIcon from '../../assets/icons/calculator.svg';
import contactsIcon from '../../assets/icons/contacts.svg';
import notesIcon from '../../assets/icons/notes.svg';
import musicIcon from '../../assets/icons/music.svg';
import appstoreIcon from '../../assets/icons/appstore.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import trashIcon from '../../assets/icons/trash.svg';

const apps = [
  { name: 'Finder', icon: finderIcon, scale: 1 },
  { name: 'Safari', icon: safariIcon, scale: 1 },
  { name: 'Messages', icon: messagesIcon, scale: 0.875 },
  { name: 'Mail', icon: mailIcon, scale: 1 },
  { name: 'Maps', icon: mapsIcon, scale: 1 },
  { name: 'FaceTime', icon: facetimeIcon, scale: 0.875 },
  { name: 'Calendar', icon: calendarIcon, scale: 1 },
  { name: 'Calculator', icon: calculatorIcon, scale: 0.875 },
  { name: 'Contacts', icon: contactsIcon, scale: 0.875 },
  { name: 'Notes', icon: notesIcon, scale: 1 },
  { name: 'Music', icon: musicIcon, scale: 1 },
  { name: 'App Store', icon: appstoreIcon, scale: 1 },
  { name: 'Settings', icon: settingsIcon, scale: 1 },
  { divider: true },
  { name: 'Trash', icon: trashIcon, scale: 1 },
];

export const Dock = memo(() => {
  const mouseX = useMotionValue(Infinity);
  const { windows, openApp, updateDockBounds } = useWindows();

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center z-[9999] pointer-events-none">
      <refractive.div 
        refraction={{ radius: 24, blur: 20, bezelWidth: 2 }}
        className="pointer-events-auto shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_20px_40px_rgba(0,0,0,0.3)] bg-white/10 dark:bg-black/10 saturate-[200%]"
        onMouseMove={(e: any) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <div className="flex items-end gap-[10px] px-3 pb-2 pt-2 h-[68px]">
          {apps.map((app, i) => {
            if (app.divider) {
               return <div key={i} className="w-[1px] h-10 bg-black/10 mx-1 mb-2 self-end" />;
            }
            
            const appId = app.name?.toLowerCase() || '';
            const isActive = windows.some(w => w.id === appId && w.isOpen);
            
            return (
               <DockIcon 
                  mouseX={mouseX} 
                  key={i} 
                  app={app} 
                  isActive={isActive} 
                  onAppClick={() => openApp(appId)} 
                  updateDockBounds={updateDockBounds}
               />
            );
          })}
        </div>
      </refractive.div>
    </div>
  );
});

const DockIcon = memo(({ mouseX, app, isActive, onAppClick, updateDockBounds }: { mouseX: any; app: any; isActive: boolean; onAppClick: () => void; updateDockBounds: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !app.name) return;
    const updateBounds = () => {
      if (ref.current) {
        updateDockBounds(app.name.toLowerCase(), ref.current.getBoundingClientRect());
      }
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [app.name, updateDockBounds]);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 85, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 170, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      whileTap={{ scale: 0.8 }}
      onClick={onAppClick}
      className="group relative flex flex-col items-center justify-end cursor-pointer h-full"
    >
      <motion.div style={{ width, height: width }} className="relative flex items-center justify-center origin-bottom drop-shadow-md">
           <img 
              src={app.icon} 
              alt={app.name} 
              style={{ transform: `scale(${app.scale || 1})` }}
              className="w-full h-full aspect-square block object-contain select-none" 
              draggable={false}
           />
      </motion.div>
      
      {isActive && (
        <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-black/60 dark:bg-white/70 shadow-sm" />
      )}
      
      <div className="absolute -top-[52px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="bg-white/50 dark:bg-black/50 text-black dark:text-white font-medium text-xs px-3 py-1.5 rounded-[8px] whitespace-nowrap shadow-lg backdrop-blur-[30px] saturate-[200%] border border-black/10 dark:border-white/10">
          {app.name}
        </div>
      </div>
    </motion.div>
  );
});
