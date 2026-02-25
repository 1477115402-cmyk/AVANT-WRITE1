import React from 'react';
import { ChatSession, Friend } from '../types';

interface MessagesTabProps {
  sessions: ChatSession[];
  friends: Friend[];
  onSelectSession: (sessionId: string) => void;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({ sessions, friends, onSelectSession }) => {
  const getFriend = (id: string) => friends.find((f) => f.id === id);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
      {sessions.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-[var(--color-ink-light)] opacity-50 font-serif italic">
          <p>暂无消息</p>
        </div>
      ) : (
        sessions.map((session) => {
          const friend = getFriend(session.partnerId);
          if (!friend) return null;

          return (
            <div
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className="flex items-center p-5 bg-white rounded-[32px] border border-black/[0.03] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-[24px] bg-black text-white flex items-center justify-center font-bold text-xl shadow-xl">
                  {friend.avatar}
                </div>
                {session.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-black rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="ml-5 flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-black tracking-tight truncate">
                    {friend.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">
                    {session.lastMessage
                      ? session.lastMessage.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </span>
                </div>
                
                <div className="h-10 relative overflow-hidden rounded-2xl bg-black/[0.02] border border-black/[0.03] flex items-center px-3">
                  {session.lastMessage && session.lastMessage.imageUrl ? (
                     <img 
                       src={session.lastMessage.imageUrl} 
                       alt="Last message" 
                       className="h-full w-auto object-contain opacity-60 mix-blend-multiply"
                     />
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">
                      New Session
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
