import React from 'react';
import { Friend, FriendRequest } from '../types';
import { UserPlus, Check } from 'lucide-react';

interface ContactsTabProps {
  friends: Friend[];
  requests: FriendRequest[];
  onSelectFriend: (friendId: string) => void;
  onAcceptRequest: (requestId: string) => void;
  onAddFriend: () => void;
}

export const ContactsTab: React.FC<ContactsTabProps> = ({
  friends,
  requests,
  onSelectFriend,
  onAcceptRequest,
  onAddFriend,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
      {/* Add Friend Header */}
      <div 
        onClick={onAddFriend}
        className="flex items-center p-3 bg-[var(--color-ink)]/5 rounded-lg cursor-pointer hover:bg-[var(--color-ink)]/10 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center justify-center">
          <UserPlus size={20} />
        </div>
        <span className="ml-3 font-serif text-[var(--color-ink)]">添加好友</span>
      </div>

      {/* Friend Requests */}
      {requests.length > 0 && (
        <div>
          <h3 className="text-xs font-mono text-[var(--color-ink-light)] uppercase tracking-widest mb-2 px-1">
            新的朋友
          </h3>
          <div className="space-y-2">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-[var(--color-ink)]/5"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-ink-light)] text-[var(--color-paper)] flex items-center justify-center font-serif">
                    {req.avatar}
                  </div>
                  <span className="ml-3 font-serif text-[var(--color-ink)]">{req.name}</span>
                </div>
                <button
                  onClick={() => onAcceptRequest(req.id)}
                  className="px-3 py-1 bg-[var(--color-ink)] text-[var(--color-paper)] text-xs rounded-full flex items-center space-x-1 hover:opacity-90 active:scale-95 transition-all"
                >
                  <Check size={12} />
                  <span>接受</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friends List */}
      <div>
        <h3 className="text-xs font-mono text-[var(--color-ink-light)] uppercase tracking-widest mb-2 px-1">
          好友列表
        </h3>
        <div className="space-y-2">
          {friends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => onSelectFriend(friend.id)}
              className="flex items-center p-3 bg-white/40 rounded-xl hover:bg-white/70 active:scale-[0.99] transition-all cursor-pointer border-b border-[var(--color-ink)]/5 last:border-0"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center justify-center font-serif text-lg shadow-sm">
                  {friend.avatar}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[var(--color-paper)] ${
                    friend.status === 'online'
                      ? 'bg-green-500'
                      : friend.status === 'busy'
                      ? 'bg-red-400'
                      : 'bg-gray-400'
                  }`}
                />
              </div>
              <span className="ml-3 font-serif text-[var(--color-ink)] text-lg">{friend.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
