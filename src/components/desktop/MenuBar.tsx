import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Search, Battery } from 'lucide-react';

export const MenuBar = () => {
  return (
    <div className="w-full h-8 fixed top-0 left-0 z-50 flex items-center justify-between px-4 text-[13px] font-medium text-white select-none backdrop-blur-md bg-black/10">
      <div className="flex items-center space-x-4">
        <Apple size={14} className="cursor-pointer" />
        <span className="font-bold cursor-pointer">Phone</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">File</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">Edit</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">View</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">Contact</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">Window</span>
        <span className="cursor-pointer font-medium hover:text-white/80 transition-colors">Help</span>
      </div>
      
      {/* The Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-7 bg-black rounded-b-2xl z-50 shadow-lg flex items-center justify-center">
         {/* camera lens reflection */}
         <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222] shadow-[inset_0_0_2px_#000]"></div>
         <div className="w-1 h-1 rounded-full bg-green-500 absolute right-6 opacity-0"></div> {/* Optional active camera dot */}
      </div>

      <div className="flex items-center space-x-4">
        <Wifi size={14} className="cursor-pointer" />
        <Battery size={14} className="cursor-pointer" />
        <Search size={14} className="cursor-pointer" />
        <span className="cursor-default tracking-wide font-medium">Tue Apr 1  9:41 AM</span>
      </div>
    </div>
  );
};
