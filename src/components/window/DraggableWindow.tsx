import React from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2, Search, LayoutGrid, Menu, Phone, Video, Mail, MessageCircle, ChevronDown } from 'lucide-react';

interface WindowProps {
  id?: string;
  defaultPosition?: { x: number, y: number };
}

export const DraggableWindow = ({
  defaultPosition = { x: 280, y: 150 },
}: WindowProps) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={defaultPosition}
      style={{ width: 850, height: 580, zIndex: 10 }}
      className="absolute flex flex-col rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_20px_50px_rgba(0,0,0,0.25)] border border-white/20 bg-white/10 backdrop-blur-[50px] saturate-[200%] overflow-hidden text-black font-sans"
    >
      {/* Title Bar Layer */}
      <div 
        className="absolute top-0 w-full h-14 flex items-center px-4 select-none cursor-grab active:cursor-grabbing z-20"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2 w-20">
          <button className="w-[13px] h-[13px] rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center group shadow-sm">
            <X size={9} className="text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button className="w-[13px] h-[13px] rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center group shadow-sm">
            <Minus size={9} className="text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button className="w-[13px] h-[13px] rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center group shadow-sm">
            <Maximize2 size={7} className="text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex mt-[56px] h-[calc(100%-56px)]">
        {/* Left Sidebar */}
        <div className="w-[280px] border-r border-black/10 flex flex-col pt-1 px-4 h-full bg-white/20">
           {/* Top Actions */}
           <div className="flex items-center justify-between pl-14 mb-4">
              <div className="flex items-center space-x-2">
                 <span className="font-bold text-[13px]">Edit</span>
                 <Menu size={16} className="text-gray-500" />
              </div>
              <div className="flex items-center space-x-2 bg-white/50 rounded-md px-2 py-1 shadow-sm border border-black/5">
                 <LayoutGrid size={14} className="text-gray-500" />
                 <Search size={14} className="text-gray-500" />
                 <span className="text-xs text-gray-400">Search</span>
              </div>
           </div>

           {/* Favorites Top Grid */}
           <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { name: 'Tania', bg: 'bg-zinc-300' },
                { name: 'Brian', bg: 'bg-orange-300' },
                { name: 'Mayuri', bg: 'bg-[#b6e828]', isText: true, init: 'MP' },
                { name: 'Konstantin', bg: 'bg-amber-700' }
              ].map((f, i) => (
                 <div key={i} className="flex flex-col items-center space-y-1.5">
                    <div className={`w-[50px] h-[65px] rounded-[14px] ${f.bg} flex items-center justify-center shadow-sm overflow-hidden`}>
                       {f.isText ? <span className="text-white font-medium text-lg">{f.init}</span> : <div className="w-9 h-9 bg-black/20 rounded-full mt-4" />}
                    </div>
                    <span className="text-[10px] text-gray-700 font-medium">{f.name}</span>
                 </div>
              ))}
           </div>

           {/* Recents List */}
           <h3 className="text-xs font-bold text-gray-900 mb-1">Recents</h3>
           <div className="flex-1 overflow-y-auto space-y-0.5 pb-4 -mx-2 px-2">
              {[
                { name: 'Luis Coderque', sub: 'Mobile', time: '9:23 AM', active: true, icon: Phone },
                { name: 'Konstantin Babichev', sub: 'FaceTime Video', time: '8:43 AM', active: false, icon: Video },
                { name: 'Aybüke Kurtuldu', sub: 'Mobile', time: '7:14 AM', active: false, icon: Phone },
                { name: 'Andrew Penick', sub: 'Mobile', time: 'Yesterday', active: false, icon: Phone },
                { name: 'Amy Hollingshead', sub: 'Mobile', time: 'Yesterday', active: false, icon: Phone },
                { name: '267-555-0133', sub: 'Palo Alto, CA', time: 'Sunday', active: false, icon: Phone }
              ].map((r, i) => (
                <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl cursor-default ${r.active ? 'bg-black/5 shadow-sm' : 'hover:bg-black/5'}`}>
                   <div className="flex items-center space-x-3">
                      <div className="w-[34px] h-[34px] rounded-full bg-gray-300 overflow-hidden flex items-end justify-center shadow-sm border border-black/5">
                        <div className="w-5 h-5 bg-black/10 rounded-full mb{-1}" />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[13px] font-bold text-gray-900">{r.name}</span>
                         <span className="text-[11px] text-gray-500 font-medium">{r.sub}</span>
                      </div>
                   </div>
                   <div className="flex items-center space-x-1.5 text-gray-400">
                      <span className="text-[11px] font-medium">{r.time}</span>
                      <div className="w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5">
                        <r.icon size={10} className="text-blue-500" />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-[22px]">
           <div className="w-full h-full bg-gradient-to-br from-[#f872b7] to-[#d641d9] rounded-[22px] p-6 flex flex-col shadow-[inset_0_0_20px_rgba(255,255,255,0.3)] relative overflow-hidden">
             
             {/* Abstract blur background effect */}
             <div className="absolute -bottom-10 -left-20 w-[150%] h-[60%] bg-[#b42ac3] opacity-40 blur-[40px] rounded-[100%]" />
             <div className="absolute -top-20 -right-20 w-[100%] h-[50%] bg-[#ff9ed2] opacity-50 blur-[50px] rounded-[100%]" />

             {/* Avatar Area */}
             <div className="flex flex-col items-center pt-8 z-10 w-full">
                <div className="relative">
                  <div className="w-[140px] h-[140px] bg-white/10 backdrop-blur-sm rounded-full mb-3 shadow-lg border-[3px] border-white/30 flex items-end justify-center overflow-hidden">
                    {/* Memoji placeholder body */}
                    <div className="w-[100px] h-[90px] bg-[#fb8ea1] rounded-t-[50px]" />
                  </div>
                </div>

                <h2 className="text-[34px] font-semibold text-white tracking-tight mb-6 drop-shadow-md">Luis Coderque</h2>
                
                {/* Action Buttons */}
                <div className="flex space-x-[18px] mb-[30px]">
                   <button className="w-[42px] h-[42px] rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-sm transition-colors">
                      <MessageCircle size={18} fill="currentColor" />
                   </button>
                   <button className="w-[42px] h-[42px] rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-sm transition-colors">
                      <Phone size={18} fill="currentColor" />
                   </button>
                   <button className="w-[42px] h-[42px] rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-sm transition-colors">
                      <Video size={18} fill="currentColor" />
                   </button>
                   <button className="w-[42px] h-[42px] rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-sm transition-colors">
                      <Mail size={18} fill="currentColor" />
                   </button>
                </div>
                
                {/* Contact Info Card */}
                <div className="w-full max-w-[320px] rounded-[18px] bg-white/10 backdrop-blur-[30px] border border-white/25 p-[20px] text-white shadow-xl shadow-black/10">
                   <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/20">
                      <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full bg-[#fa695c] shadow-sm flex items-end justify-center overflow-hidden border border-white/20">
                            <div className="w-5 h-5 bg-black/10 rounded-full mb-[-4px]" />
                         </div>
                         <div className="leading-tight">
                           <span className="text-[13px] font-semibold tracking-wide">Contact Photo and Poster<br/><span className="text-[11px] text-white/80 font-medium">Contacts Only</span></span>
                         </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                         <ChevronDown size={14} strokeWidth={3} />
                      </div>
                   </div>
                   
                   <div className="flex flex-col space-y-[14px]">
                      <div>
                         <span className="text-[11px] text-white/90 font-medium tracking-wide">mobile</span>
                         <div className="text-[15px] font-medium mt-0.5">(408) 555-3138</div>
                      </div>
                      <div className="pb-1 border-b border-white/10">
                         <span className="text-[11px] text-white/90 font-medium tracking-wide">work</span>
                         <div className="text-[15px] font-medium mt-0.5 text-blue-100">l_coderque@icloud.com</div>
                      </div>
                   </div>
                </div>

             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
