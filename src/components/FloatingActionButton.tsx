import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-24 right-6 w-14 h-14 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40"
      aria-label="New Chat"
    >
      <Plus size={28} />
    </button>
  );
};
