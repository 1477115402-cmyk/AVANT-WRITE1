import React, { useState, useEffect } from 'react';
import { Settings, Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  status?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Avant Write', status }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full h-20 flex items-center justify-between px-10 z-40 bg-white border-b border-black/[0.05] shrink-0">
      <div className="flex flex-col justify-center">
        <div className="text-black font-display font-bold tracking-tight text-2xl uppercase">
          {title}
        </div>
        {status && (
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <div className="text-[9px] text-black/40 font-bold uppercase tracking-[0.2em]">
              {status}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-12">
        <div className="hidden md:flex flex-col items-end">
          <div className="text-[9px] text-black/30 font-bold uppercase tracking-[0.3em] mb-1">
            Current Time
          </div>
          <div className="text-black font-display font-medium text-lg tracking-tight">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black/5 hover:bg-black hover:text-white transition-all duration-500">
            <Bell size={16} strokeWidth={1.5} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black/5 hover:bg-black hover:text-white transition-all duration-500">
            <Settings size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
};
