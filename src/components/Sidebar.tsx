import React from 'react';
import { MessageSquare, Users, PenLine, Settings, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { TabType } from './BottomNav';

interface SidebarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, unreadCount = 0 }) => {
  const navItem = (tab: TabType, Icon: any, label: string) => {
    const isActive = currentTab === tab;
    return (
      <button
        onClick={() => onTabChange(tab)}
        className={`group relative w-full py-4 flex flex-col items-center justify-center transition-all duration-500 ${
          isActive 
            ? 'text-black' 
            : 'text-black/20 hover:text-black/60'
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
        <span className={`mt-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
          {label}
        </span>
        
        {/* Active Indicator Line */}
        {isActive && (
          <motion.div 
            layoutId="activeTab"
            className="absolute left-0 w-[2px] h-8 bg-black"
          />
        )}
      </button>
    );
  };

  return (
    <aside className="w-24 h-full flex flex-col items-center py-10 bg-white border-r border-black/[0.05] shrink-0 z-50">
      <div className="mb-16">
        <div className="font-display font-bold text-2xl tracking-tighter">
          AVANT<br/>WRITE
        </div>
      </div>

      <nav className="w-full flex-1 flex flex-col items-center space-y-2">
        {navItem('messages', MessageSquare, 'Index')}
        {navItem('contacts', Users, 'People')}
        {navItem('writing', PenLine, 'Draft')}
      </nav>

      <div className="flex flex-col items-center space-y-8 mt-auto">
        <button className="text-black/20 hover:text-black transition-colors">
          <Bell size={18} strokeWidth={1.5} />
        </button>
        <button className="text-black/20 hover:text-black transition-colors">
          <Settings size={18} strokeWidth={1.5} />
        </button>
      </div>
    </aside>
  );
};
