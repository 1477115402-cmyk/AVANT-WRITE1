import React from 'react';
import { Message, User } from '../types';

interface HistoryListProps {
  messages: Message[];
  currentUser: User;
  partner?: User;
}

export const HistoryList: React.FC<HistoryListProps> = ({ messages, currentUser, partner }) => {
  return (
    <div className="w-full h-full overflow-y-auto px-4 py-2 space-y-6 history-scroll pb-20">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-[var(--color-ink-light)] opacity-30 font-serif italic">
          <p>暂无笔迹</p>
          <p className="text-xs mt-2">No traces yet</p>
        </div>
      ) : (
        messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          const sender = isMe ? currentUser : partner;
          
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group items-end space-x-3`}>
              
              {!isMe && sender && (
                <div className="w-8 h-8 rounded-2xl bg-black/5 text-black text-xs flex items-center justify-center font-bold shrink-0 mb-1">
                  {sender.avatar}
                </div>
              )}

              <div className="relative max-w-[85%]">
                <div className="absolute -top-5 right-0 text-[10px] font-mono font-bold uppercase tracking-widest text-black/20 opacity-0 group-hover:opacity-100 transition-opacity px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className={`p-1 rounded-3xl border border-black/[0.03] shadow-sm bg-white overflow-hidden ${isMe ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                  <img
                    src={msg.imageUrl}
                    alt="Handwritten message"
                    className="w-full h-auto"
                    style={{
                      mixBlendMode: 'multiply',
                    }}
                  />
                </div>
              </div>

              {isMe && (
                <div className="w-8 h-8 rounded-2xl bg-black text-white text-xs flex items-center justify-center font-bold shrink-0 mb-1 shadow-lg">
                  {currentUser.avatar}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
