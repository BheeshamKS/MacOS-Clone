import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { WindowProvider, useWindows } from './contexts/WindowContext';
import { DesktopShell } from './components/desktop/DesktopShell';
import { MenuBar } from './components/desktop/MenuBar';
import { Dock } from './components/desktop/Dock';
import { DraggableWindow } from './components/window/DraggableWindow';
import { CommandCenter } from './components/desktop/CommandCenter';

function AppContent() {
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);

  return (
    <DesktopShell>
      <MenuBar toggleCommandCenter={() => setIsCommandCenterOpen(!isCommandCenterOpen)} />
      
      <CommandCenter isOpen={isCommandCenterOpen} />
      
      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto overflow-hidden">
            <WindowManager />
        </div>
      </div>

      <Dock />
    </DesktopShell>
  );
}

function WindowManager() {
  const { windows } = useWindows();
  return (
    <>
      {windows.map(win => {
        if (!win.isOpen) return null;
        return <DraggableWindow key={win.id} windowState={win} />;
      })}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WindowProvider>
        <AppContent />
      </WindowProvider>
    </ThemeProvider>
  );
}

export default App;
