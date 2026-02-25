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
    <header className="w-full h-16 flex items-center justify-between px-6 z-40 bg-white/80 backdrop-blur-md border-b border-black/[0.03] shrink-0">
      <div className="flex flex-col justify-center">
        <div className="text-black font-bold tracking-tight text-lg leading-none">
          {title}
        </div>
        {status && (
          <div className="text-[10px] text-black/40 font-bold uppercase tracking-widest mt-1">
            {status}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-black/20 font-mono text-xs font-bold uppercase tracking-widest">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <button className="p-2 rounded-xl text-black/40 hover:bg-black/5 hover:text-black transition-all">
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-xl text-black/40 hover:bg-black/5 hover:text-black transition-all">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
