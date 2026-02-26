import React, { useState } from 'react';
import { BrushType } from '../types';
import { PenTool, Pencil, Brush, Check, X, Settings2, Eraser } from 'lucide-react';

interface ControlBarProps {
  currentBrush: BrushType;
  brushSize: number;
  inkColor: string;
  onBrushChange: (brush: BrushType) => void;
  onBrushSizeChange: (size: number) => void;
  onInkColorChange: (color: string) => void;
  onSend: () => void;
  onClear: () => void;
}

const INK_COLORS = [
  { name: 'Charcoal', value: '#1a1a1a' },
  { name: 'Indigo', value: '#2c3e50' },
  { name: 'Crimson', value: '#c0392b' },
  { name: 'Forest', value: '#1e3d2b' },
  { name: 'Sepia', value: '#704214' },
];

export const ControlBar: React.FC<ControlBarProps> = ({
  currentBrush,
  brushSize,
  inkColor,
  onBrushChange,
  onBrushSizeChange,
  onInkColorChange,
  onSend,
  onClear,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    onSend();
    setTimeout(() => setIsSending(false), 500);
  };

  const getBrushIcon = (type: BrushType) => {
    switch (type) {
      case 'pen': return <PenTool size={18} strokeWidth={1.5} />;
      case 'pencil': return <Pencil size={18} strokeWidth={1.5} />;
      case 'brush': return <Brush size={18} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="w-full pointer-events-none relative px-8 pb-8 flex items-end justify-between">
      
      {/* Left: Brush Settings */}
      <div className="pointer-events-auto relative z-50">
        
        {/* Toggle Button */}
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-700 ${
            isSettingsOpen 
              ? 'bg-black text-white rotate-180' 
              : 'bg-white text-black border border-black/5 hover:border-black/20'
          }`}
        >
          {isSettingsOpen ? <X size={20} strokeWidth={1.5} /> : <Settings2 size={20} strokeWidth={1.5} />}
        </button>

        {/* Slide-out Panel */}
        <div 
          className={`absolute bottom-20 left-0 bg-white border border-black/5 rounded-[40px] shadow-2xl p-8 w-80 origin-bottom-left transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) ${
            isSettingsOpen 
              ? 'opacity-100 scale-100 translate-x-0' 
              : 'opacity-0 scale-90 -translate-x-8 pointer-events-none'
          }`}
        >
          <div className="space-y-8">
            {/* Brush Type Selector */}
            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/20 mb-4 block">Instrument</label>
              <div className="flex bg-black/[0.02] rounded-full p-1 border border-black/[0.03]">
                {(['pen', 'pencil', 'brush'] as BrushType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => onBrushChange(type)}
                    className={`flex-1 py-3 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentBrush === type
                        ? 'bg-black text-white shadow-xl scale-105'
                        : 'text-black/30 hover:text-black'
                    }`}
                  >
                    {getBrushIcon(type)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Slider */}
            <div>
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.3em] text-black/20 mb-4">
                <span>Weight</span>
                <span className="text-black font-display">{brushSize}pt</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={brushSize}
                onChange={(e) => onBrushSizeChange(parseFloat(e.target.value))}
                className="w-full h-px bg-black/10 appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Color Selector */}
            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/20 mb-4 block">Pigment</label>
              <div className="flex justify-between">
                {INK_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => onInkColorChange(color.value)}
                    className={`w-10 h-10 rounded-full border transition-all duration-500 ${
                      inkColor === color.value 
                        ? 'border-black scale-110 shadow-xl' 
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="pointer-events-auto flex items-center space-x-4">
        <button
          onClick={onClear}
          className="w-14 h-14 rounded-full bg-white border border-black/5 text-black/20 shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-all duration-700"
          aria-label="Clear"
        >
          <Eraser size={20} strokeWidth={1.5} />
        </button>
        
        <button
          onClick={handleSend}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-700 ${
            isSending 
              ? 'bg-black text-white scale-110' 
              : 'bg-black text-white hover:scale-105 active:scale-95'
          }`}
          aria-label="Send"
          disabled={isSending}
        >
          <Check size={32} strokeWidth={1.5} className={`transition-all duration-700 ${isSending ? 'scale-110' : ''}`} />
        </button>
      </div>
    </div>
  );
};
