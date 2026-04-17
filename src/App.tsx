import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { DesktopShell } from './components/desktop/DesktopShell';
import { MenuBar } from './components/desktop/MenuBar';
import { Dock } from './components/desktop/Dock';
import { DraggableWindow } from './components/window/DraggableWindow';

function AppContent() {
  return (
    <DesktopShell>
      <MenuBar />
      
      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto overflow-hidden">
            <DraggableWindow />
        </div>
      </div>

      <Dock />
    </DesktopShell>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
