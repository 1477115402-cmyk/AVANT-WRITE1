import React from 'react';
import { MessageSquare, Users, PenLine } from 'lucide-react';
import { motion } from 'motion/react';

export type TabType = 'messages' | 'contacts' | 'writing';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, unreadCount = 0 }) => {
  const navItem = (tab: TabType, Icon: any, label: string) => {
    const isActive = currentTab === tab;
    return (
      <button
        onClick={() => onTabChange(tab)}
        className={`relative flex-1 flex flex-col items-center justify-center transition-all duration-500 ${
          isActive ? 'text-black' : 'text-black/20'
        }`}
      >
        <div className="relative">
          <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
          {tab === 'messages' && unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <span className={`mt-1 text-[8px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          {label}
        </span>
        
        {isActive && (
          <motion.div 
            layoutId="activeTabMobile"
            className="absolute bottom-0 w-8 h-[2px] bg-black"
          />
        )}
      </button>
    );
  };

  return (
    <nav className="w-full h-20 bg-white border-t border-black/[0.05] flex items-stretch px-6 pb-2">
      {navItem('messages', MessageSquare, 'Index')}
      {navItem('contacts', Users, 'People')}
      {navItem('writing', PenLine, 'Draft')}
    </nav>
  );
};
