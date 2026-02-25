import React, { useState, useEffect } from 'react';

interface HeaderProps {
  title?: string;
  status?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = '静私之室', status }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-12 flex items-center justify-between px-6 z-40 bg-[var(--color-paper)]/80 backdrop-blur-sm border-b border-[var(--color-ink)]/10 transition-all duration-300">
      <div className="flex flex-col justify-center">
        <div className="text-[var(--color-ink)] font-serif tracking-widest text-lg leading-none">
          {title}
        </div>
        {status && (
          <div className="text-[10px] text-[var(--color-ink-light)] font-mono opacity-60 mt-0.5">
            {status}
          </div>
        )}
      </div>
      <div className="text-[var(--color-ink-light)] font-mono text-sm opacity-50">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </header>
  );
};
