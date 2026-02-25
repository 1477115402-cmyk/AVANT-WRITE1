import React from 'react';
import { MessageCircle, Users, PenTool } from 'lucide-react';

export type TabType = 'messages' | 'contacts' | 'writing';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, unreadCount = 0 }) => {
  const navItemClass = (tab: TabType) =>
    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-300 ${
      currentTab === tab
        ? 'text-[var(--color-accent)]'
        : 'text-[var(--color-ink-light)] hover:text-[var(--color-ink)]'
    }`;

  return (
    <nav className="h-16 bg-[var(--color-paper)] border-t border-[var(--color-ink)]/10 flex justify-around items-center px-2 z-50 shrink-0">
      <button onClick={() => onTabChange('messages')} className={navItemClass('messages')}>
        <div className="relative">
          <MessageCircle size={24} strokeWidth={currentTab === 'messages' ? 2.5 : 2} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-accent)] rounded-full" />
          )}
        </div>
        <span className="text-[10px] font-serif tracking-widest">消息</span>
      </button>
      
      <button onClick={() => onTabChange('contacts')} className={navItemClass('contacts')}>
        <Users size={24} strokeWidth={currentTab === 'contacts' ? 2.5 : 2} />
        <span className="text-[10px] font-serif tracking-widest">联系人</span>
      </button>
      
      <button onClick={() => onTabChange('writing')} className={navItemClass('writing')}>
        <PenTool size={24} strokeWidth={currentTab === 'writing' ? 2.5 : 2} />
        <span className="text-[10px] font-serif tracking-widest">书写</span>
      </button>
    </nav>
  );
};
