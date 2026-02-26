import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-32 right-10 w-16 h-16 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-500 z-40 group"
      aria-label="New Chat"
    >
      <Plus size={24} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
    </button>
  );
};
