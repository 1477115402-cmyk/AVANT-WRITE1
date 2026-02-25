import React from 'react';
import { MessageSquare, Users, PenLine, Settings, Bell } from 'lucide-react';
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
        className={`group relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
          isActive 
            ? 'bg-black text-white shadow-lg scale-110' 
            : 'text-black/40 hover:bg-black/5 hover:text-black'
        }`}
      >
        <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
        
        {/* Tooltip */}
        <div className="absolute left-16 px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>

        {tab === 'messages' && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-20 h-full flex flex-col items-center py-8 bg-white border-r border-black/[0.03] shrink-0 z-50">
      <div className="mb-12">
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
          前
        </div>
      </div>

      <nav className="flex-1 flex flex-col items-center space-y-6">
        {navItem('messages', MessageSquare, '会话')}
        {navItem('contacts', Users, '联系人')}
        {navItem('writing', PenLine, '书写')}
      </nav>

      <div className="flex flex-col items-center space-y-4 mt-auto">
        <button className="p-2 rounded-xl text-black/40 hover:bg-black/5 hover:text-black transition-all">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-xl text-black/40 hover:bg-black/5 hover:text-black transition-all">
          <Settings size={20} />
        </button>
      </div>
    </aside>
  );
};
