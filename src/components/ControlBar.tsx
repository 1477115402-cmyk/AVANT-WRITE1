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
      case 'pen': return <PenTool size={20} />;
      case 'pencil': return <Pencil size={20} />;
      case 'brush': return <Brush size={20} />;
    }
  };

  return (
    <div className="w-full pointer-events-none relative px-4 pb-6 flex items-end justify-between">
      
      {/* Left: Brush Settings */}
      <div className="pointer-events-auto relative z-50">
        
        {/* Toggle Button */}
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-500 ${
            isSettingsOpen 
              ? 'bg-black text-white rotate-90' 
              : 'bg-white text-black border border-black/5'
          }`}
        >
          {isSettingsOpen ? <X size={20} /> : <Settings2 size={20} />}
        </button>

        {/* Slide-out Panel */}
        <div 
          className={`absolute bottom-16 left-0 bg-white/90 backdrop-blur-2xl border border-black/5 rounded-[32px] shadow-2xl p-6 w-72 origin-bottom-left transition-all duration-500 ${
            isSettingsOpen 
              ? 'opacity-100 scale-100 translate-x-0' 
              : 'opacity-0 scale-90 -translate-x-4 pointer-events-none'
          }`}
        >
          <div className="space-y-6">
            {/* Brush Type Selector */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-3 block">笔刷类型</label>
              <div className="flex bg-black/5 rounded-2xl p-1">
                {(['pen', 'pencil', 'brush'] as BrushType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => onBrushChange(type)}
                    className={`flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all ${
                      currentBrush === type
                        ? 'bg-white text-black shadow-sm'
                        : 'text-black/40 hover:text-black'
                    }`}
                  >
                    {getBrushIcon(type)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Slider */}
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-black/30 mb-3">
                <span>笔触粗细</span>
                <span className="text-black/60">{brushSize}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={brushSize}
                onChange={(e) => onBrushSizeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 rounded-full appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Color Selector */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-3 block">墨色选择</label>
              <div className="flex justify-between px-1">
                {INK_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => onInkColorChange(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      inkColor === color.value 
                        ? 'border-black scale-125 shadow-lg' 
                        : 'border-transparent hover:scale-110'
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
      <div className="pointer-events-auto flex items-center space-x-3">
        <button
          onClick={onClear}
          className="w-12 h-12 rounded-2xl bg-white border border-black/5 text-black/40 shadow-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all duration-300"
          aria-label="Clear"
        >
          <Eraser size={20} />
        </button>
        
        <button
          onClick={handleSend}
          className={`w-14 h-14 rounded-[24px] shadow-2xl flex items-center justify-center transition-all duration-500 ${
            isSending 
              ? 'bg-green-500 text-white scale-110' 
              : 'bg-black text-white hover:scale-105 active:scale-95'
          }`}
          aria-label="Send"
          disabled={isSending}
        >
          <Check size={28} strokeWidth={2.5} className={`transition-all duration-500 ${isSending ? 'scale-110' : ''}`} />
        </button>
      </div>
    </div>
  );
};
