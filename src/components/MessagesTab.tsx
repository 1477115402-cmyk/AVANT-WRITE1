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
    <div className="flex-1 overflow-y-auto px-10 py-8 space-y-0">
      <div className="flex justify-between items-end mb-12">
        <h2 className="font-display font-bold text-5xl tracking-tighter uppercase">
          Index
        </h2>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30 pb-2">
          {sessions.length} Conversations
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center border-t border-black/[0.05]">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/20">Empty Index</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-0 border-t border-black/[0.05]">
          {sessions.map((session) => {
            const friend = getFriend(session.partnerId);
            if (!friend) return null;

            return (
              <div
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className="group flex items-center py-8 border-b border-black/[0.05] hover:bg-black/[0.01] transition-all duration-500 cursor-pointer"
              >
                {/* Numbering */}
                <div className="w-12 text-[10px] font-bold font-display text-black/10 group-hover:text-black/40 transition-colors">
                  {session.id.slice(0, 2).toUpperCase()}
                </div>

                {/* Avatar */}
                <div className="relative shrink-0 ml-4">
                  <div className="w-12 h-12 rounded-full border border-black/5 bg-white text-black flex items-center justify-center font-display font-bold text-lg group-hover:bg-black group-hover:text-white transition-all duration-500">
                    {friend.avatar}
                  </div>
                  {session.unreadCount > 0 && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-black rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Content */}
                <div className="ml-8 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-display font-bold text-xl text-black tracking-tight truncate uppercase">
                      {friend.name}
                    </h3>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/20 group-hover:text-black transition-colors">
                      {session.lastMessage
                        ? session.lastMessage.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Just Now'}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="h-6 flex-1 relative overflow-hidden flex items-center">
                      {session.lastMessage && session.lastMessage.imageUrl ? (
                         <img 
                           src={session.lastMessage.imageUrl} 
                           alt="Last message" 
                           className="h-full w-auto object-contain opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                         />
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/10 group-hover:text-black/30 transition-colors">
                          Awaiting Draft
                        </span>
                      )}
                    </div>
                    {session.unreadCount > 0 && (
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-black text-white rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-8 h-px bg-black" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
