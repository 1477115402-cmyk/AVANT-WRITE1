import React, { useState } from 'react';
import { X, Search, UserPlus } from 'lucide-react';
import { User } from '../types';

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: (user: User) => void;
}

export const AddFriendModal: React.FC<AddFriendModalProps> = ({ isOpen, onClose, onAddFriend }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<User | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setResult(null);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSearching(false);
      // Mock result based on query
      setResult({
        id: `new_${Date.now()}`,
        name: query,
        avatar: query.charAt(0).toUpperCase(),
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xs bg-[var(--color-paper)] rounded-2xl shadow-2xl p-6 border border-[var(--color-ink)]/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--color-ink-light)] hover:text-[var(--color-ink)]">
          <X size={20} />
        </button>
        
        <h3 className="font-serif text-lg text-[var(--color-ink)] mb-4">添加好友</h3>
        
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入名字..."
              className="w-full pl-9 pr-4 py-2 bg-white/50 border border-[var(--color-ink)]/10 rounded-xl focus:outline-none focus:border-[var(--color-accent)]/50 font-serif text-[var(--color-ink)] placeholder:text-[var(--color-ink-light)]/50"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-light)]" size={16} />
          </div>
          <button 
            onClick={handleSearch}
            className="p-2 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-xl hover:opacity-90 transition-opacity"
          >
            <Search size={20} />
          </button>
        </div>

        {isSearching && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-ink)]"></div>
          </div>
        )}

        {result && !isSearching && (
          <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-[var(--color-ink)]/5 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center justify-center font-serif text-lg">
                {result.avatar}
              </div>
              <span className="ml-3 font-serif text-[var(--color-ink)]">{result.name}</span>
            </div>
            <button
              onClick={() => {
                onAddFriend(result);
                onClose();
              }}
              className="p-2 bg-[var(--color-accent)] text-white rounded-full hover:scale-105 transition-transform shadow-md"
            >
              <UserPlus size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
