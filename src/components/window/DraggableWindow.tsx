import { memo, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { refractive } from "@hashintel/refractive";
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWindows } from '../../contexts/WindowContext';
import type { WindowState } from '../../contexts/WindowContext';
import { FinderContent } from '../apps/FinderContent';
import { ContactsContent } from '../apps/ContactsContent';
import { CalculatorContent } from '../apps/CalculatorContent';
import { CalendarContent } from '../apps/CalendarContent';
import { SettingsContent } from '../apps/SettingsContent';

const RefractiveMotionDiv = refractive(motion.div);

interface WindowProps {
  windowState: WindowState;
}

const GenericContent = ({ name }: { name: string }) => (
  <div className="flex-1 flex items-center justify-center h-full pt-[56px] bg-black/20 text-white/50 text-2xl font-light">
    {name.charAt(0).toUpperCase() + name.slice(1)} App
  </div>
);

export const DraggableWindow = memo(({ windowState }: WindowProps) => {
  const dragControls = useDragControls();
  const { closeApp, minimizeApp, maximizeApp, focusApp, dockBounds } = useWindows();

  const isCalc = windowState.id === 'calculator';
  const defaultWidth = isCalc ? 280 : 850;
  const defaultHeight = isCalc ? 580 : 580;
  const defaultX = isCalc ? 450 : 280;
  const defaultY = isCalc ? 200 : 150;

  const [dragPos, setDragPos] = useState({ x: defaultX, y: defaultY });

  const getMinimizedState = () => {
    const target = dockBounds[windowState.id.toLowerCase()];
    if (!target) {
      return { scale: 0.2, x: defaultX, y: 800, opacity: 0 };
    }
    
    const targetScale = target.width / defaultWidth;
    const targetX = target.x + target.width / 2 - defaultWidth / 2;
    const targetY = target.y + target.height / 2 - defaultHeight / 2;

    return { scale: targetScale, x: targetX, y: targetY, opacity: 0 };
  };

  const renderContent = () => {
    switch (windowState.id.toLowerCase()) {
      case 'finder': return <FinderContent />;
      case 'contacts': return <ContactsContent />;
      case 'calculator': return <CalculatorContent />;
      case 'calendar': return <CalendarContent />;
      case 'settings': return <SettingsContent />;
      default: return <GenericContent name={windowState.id} />;
    }
  };

  const dynamicStyle = {
    zIndex: windowState.zIndex, 
    pointerEvents: windowState.isMinimized ? 'none' as const : 'auto' as const
  };

  return (
    <RefractiveMotionDiv
      refraction={{ radius: 16, blur: 12, bezelWidth: 1 }}
      drag={!windowState.isMaximized && !windowState.isMinimized}
      onDragEnd={(_e, info) => {
        setDragPos(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }));
      }}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ ...getMinimizedState(), width: defaultWidth, height: defaultHeight }}
      animate={
        windowState.isMinimized
          ? { ...getMinimizedState(), width: defaultWidth, height: defaultHeight, transition: { type: 'spring', damping: 25, stiffness: 200 } }
          : windowState.isMaximized
            ? { x: 0, y: 32, width: '100vw', height: 'calc(100vh - 32px)', scale: 1, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } }
            : { x: dragPos.x, y: dragPos.y, width: defaultWidth, height: defaultHeight, scale: 1, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } }
      }
      style={dynamicStyle}
      onPointerDown={() => focusApp(windowState.id)}
      className="absolute top-0 left-0 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.25)] bg-white/10 overflow-hidden text-black font-sans origin-center"
    >
      {/* Title Bar Layer */}
      <div 
        className="absolute top-0 w-full h-14 flex items-center px-4 select-none cursor-grab active:cursor-grabbing z-50"
        onPointerDown={(e) => {
          focusApp(windowState.id);
          if (!windowState.isMaximized) dragControls.start(e);
        }}
        onDoubleClick={() => maximizeApp(windowState.id)}
      >
        <div className="flex items-center gap-2 w-20 z-10">
          <button 
            onPointerDown={(e) => { e.stopPropagation(); closeApp(windowState.id); }} 
            className="w-[13px] h-[13px] rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center group shadow-sm z-50 cursor-pointer"
          >
            <X size={9} className="text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button 
            onPointerDown={(e) => { e.stopPropagation(); minimizeApp(windowState.id); }} 
            className="w-[13px] h-[13px] rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center group shadow-sm z-50 cursor-pointer"
          >
            <Minus size={9} className="text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button 
            onPointerDown={(e) => { e.stopPropagation(); maximizeApp(windowState.id); }} 
            className="w-[13px] h-[13px] rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center group shadow-sm z-50 cursor-pointer"
          >
            <Maximize2 size={7} className="text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Dynamic App Content Area */}
      {renderContent()}

    </RefractiveMotionDiv>
  );
});
