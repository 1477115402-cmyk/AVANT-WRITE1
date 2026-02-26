import React from 'react';
import { Message, User } from '../types';

interface HistoryListProps {
  messages: Message[];
  currentUser: User;
  partner?: User;
}

export const HistoryList: React.FC<HistoryListProps> = ({ messages, currentUser, partner }) => {
  return (
    <div className="w-full h-full overflow-y-auto px-8 py-6 space-y-12 history-scroll pb-24">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-black/10 font-display font-bold uppercase tracking-[0.4em]">
          <p>No Traces</p>
        </div>
      ) : (
        messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          const sender = isMe ? currentUser : partner;
          
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group space-y-2`}>
              <div className="flex items-center space-x-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/20">
                  {sender?.name || 'Unknown'}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/10">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="relative max-w-[90%]">
                <div className={`p-2 border border-black/[0.05] bg-white transition-all duration-500 group-hover:border-black/20`}>
                  <img
                    src={msg.imageUrl}
                    alt="Handwritten message"
                    className="w-full h-auto grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    style={{
                      mixBlendMode: 'multiply',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
