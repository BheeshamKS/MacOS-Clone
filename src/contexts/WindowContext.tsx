import { createContext, useContext, useState, type ReactNode } from 'react';

export type WindowState = {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
};

interface WindowContextType {
  windows: WindowState[];
  dockBounds: Record<string, DOMRect>;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  maximizeApp: (id: string) => void;
  focusApp: (id: string) => void;
  updateDockBounds: (id: string, rect: DOMRect) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

const DEFAULT_WINDOWS: WindowState[] = [];

export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>(DEFAULT_WINDOWS);
  const [dockBounds, setDockBounds] = useState<Record<string, DOMRect>>({});
  const [targetZ, setTargetZ] = useState(10);

  const updateDockBounds = (id: string, rect: DOMRect) => {
    setDockBounds(prev => {
      // Avoid unnecessary re-renders if rect hasn't changed
      const current = prev[id];
      if (current && current.x === rect.x && current.y === rect.y && current.width === rect.width && current.height === rect.height) {
        return prev;
      }
      return { ...prev, [id]: rect };
    });
  };

  const openApp = (id: string) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      const newZ = targetZ + 1;
      setTargetZ(newZ);

      if (existing) {
        return prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: newZ } : w);
      }
      // If doesn't exist, append it
      return [...prev, { id, isOpen: true, isMinimized: false, isMaximized: false, zIndex: newZ }];
    });
  };

  const closeApp = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const minimizeApp = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const maximizeApp = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusApp = (id: string) => {
    setWindows(prev => {
      const newZ = targetZ + 1;
      setTargetZ(newZ);
      return prev.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w);
    });
  };

  return (
    <WindowContext.Provider value={{ windows, dockBounds, openApp, closeApp, minimizeApp, maximizeApp, focusApp, updateDockBounds }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) throw new Error('useWindows must be used within a WindowProvider');
  return context;
};
