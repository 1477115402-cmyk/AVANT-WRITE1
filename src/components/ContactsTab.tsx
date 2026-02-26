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
    <div className="flex-1 overflow-y-auto px-10 py-8 space-y-12">
      <div className="flex justify-between items-end">
        <h2 className="font-display font-bold text-5xl tracking-tighter uppercase">
          People
        </h2>
        <button 
          onClick={onAddFriend}
          className="group flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-black transition-all duration-500"
        >
          <span>Add Connection</span>
          <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
            <UserPlus size={14} strokeWidth={1.5} />
          </div>
        </button>
      </div>

      {/* Friend Requests */}
      {requests.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold text-black/20 uppercase tracking-[0.4em] border-b border-black/[0.05] pb-2">
            Pending Requests
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-6 bg-black/[0.02] border border-black/[0.03] hover:bg-black hover:text-white transition-all duration-500 group"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full border border-black/5 bg-white text-black flex items-center justify-center font-display font-bold text-lg">
                    {req.avatar}
                  </div>
                  <span className="ml-6 font-display font-bold text-lg uppercase tracking-tight">{req.name}</span>
                </div>
                <button
                  onClick={() => onAcceptRequest(req.id)}
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
                >
                  <Check size={16} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friends List */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-bold text-black/20 uppercase tracking-[0.4em] border-b border-black/[0.05] pb-2">
          Directory
        </h3>
        <div className="grid grid-cols-1 gap-0">
          {friends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => onSelectFriend(friend.id)}
              className="group flex items-center py-6 border-b border-black/[0.05] hover:bg-black/[0.01] transition-all duration-500 cursor-pointer"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full border border-black/5 bg-white text-black flex items-center justify-center font-display font-bold text-lg group-hover:bg-black group-hover:text-white transition-all duration-500">
                  {friend.avatar}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    friend.status === 'online'
                      ? 'bg-black'
                      : 'bg-black/10'
                  }`}
                />
              </div>
              <div className="ml-6 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-xl uppercase tracking-tight text-black group-hover:tracking-widest transition-all duration-700">{friend.name}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/20 group-hover:text-black transition-colors">
                    {friend.status}
                  </span>
                </div>
              </div>
              <div className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-px bg-black" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
