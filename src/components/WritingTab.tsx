import React, { useRef, useEffect, useState } from 'react';
import { CanvasBoard, CanvasBoardRef } from './CanvasBoard';
import { ControlBar } from './ControlBar';
import { HistoryList } from './HistoryList';
import { BrushType, Message, Friend, User } from '../types';
import { Users, FlaskConical } from 'lucide-react';

interface WritingTabProps {
  partner: Friend | null;
  currentUser: User;
  messages: Message[];
  currentBrush: BrushType;
  onBrushChange: (brush: BrushType) => void;
  onSend: (imageUrl: string) => void;
  onClear: () => void;
}

export const WritingTab: React.FC<WritingTabProps> = ({
  partner,
  currentUser,
  messages,
  currentBrush,
  onBrushChange,
  onSend,
  onClear,
}) => {
  const canvasRef = useRef<CanvasBoardRef>(null);
  const [brushSize, setBrushSize] = useState(4);
  const [inkColor, setInkColor] = useState('#1a1a1a');
  const [isCoWriting, setIsCoWriting] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const handleSendClick = () => {
    if (canvasRef.current) {
      const imageUrl = canvasRef.current.getImage();
      onSend(imageUrl);
      canvasRef.current.clear();
    }
  };

  const handleClearClick = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      onClear();
    }
  };

  if (!partner) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <div className="font-display font-bold text-8xl text-black/[0.02] absolute inset-0 flex items-center justify-center pointer-events-none uppercase tracking-tighter">
          Avant Write
        </div>
        <p className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-black/20">Select a Draft to Begin</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden bg-white">
      {/* Top Controls */}
      <div className="absolute top-8 left-8 right-8 z-50 flex justify-between pointer-events-none">
        {/* Test Mode Toggle (Left) */}
        <button
          onClick={() => setTestMode(!testMode)}
          className={`pointer-events-auto flex items-center space-x-3 px-6 py-3 rounded-full border transition-all duration-500 ${
            testMode
              ? 'bg-black text-white border-black shadow-2xl scale-105'
              : 'bg-white/80 backdrop-blur-md border-black/5 text-black/40 hover:text-black hover:border-black/20'
          }`}
        >
          <FlaskConical size={14} strokeWidth={1.5} />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{testMode ? 'Lab Active' : 'Lab Mode'}</span>
        </button>

        {/* Co-write Toggle (Right) */}
        <button
          onClick={() => setIsCoWriting(!isCoWriting)}
          className={`pointer-events-auto flex items-center space-x-3 px-6 py-3 rounded-full border transition-all duration-500 ${
            isCoWriting
              ? 'bg-black text-white border-black shadow-2xl scale-105'
              : 'bg-white/80 backdrop-blur-md border-black/5 text-black/40 hover:text-black hover:border-black/20'
          }`}
        >
          <Users size={14} strokeWidth={1.5} />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{isCoWriting ? 'Co-Drafting' : 'Solo Mode'}</span>
        </button>
      </div>

      {/* Top Section: History (30%) */}
      <div className={`relative overflow-hidden border-b border-black/[0.05] bg-white shrink-0 transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) ${
        isCoWriting ? 'h-0 opacity-0' : 'h-[35%] opacity-100'
      } landscape:hidden`}>
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <HistoryList messages={messages} currentUser={currentUser} partner={partner} />
      </div>

      {/* Bottom Section: Canvas (70% or 100%) */}
      <div className={`relative bg-white z-10 transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) ${
        isCoWriting ? 'h-full' : 'h-[65%]'
      } landscape:h-full flex-1`}>
         <CanvasBoard 
            ref={canvasRef} 
            brushType={currentBrush} 
            brushSize={brushSize}
            inkColor={inkColor}
            testMode={testMode}
          />
          
          {/* Watermark */}
          <div className={`absolute top-24 left-10 text-black opacity-[0.02] font-display font-bold pointer-events-none select-none text-7xl uppercase tracking-tighter transition-all duration-1000 ${isCoWriting ? 'opacity-[0.05] scale-110' : 'opacity-[0.02]'}`}>
            {isCoWriting ? 'Co-Draft' : 'Solo'}
          </div>

          {/* Controls Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/90 to-transparent pt-12 pb-6 pointer-events-none">
            <ControlBar
              currentBrush={currentBrush}
              brushSize={brushSize}
              inkColor={inkColor}
              onBrushChange={onBrushChange}
              onBrushSizeChange={setBrushSize}
              onInkColorChange={setInkColor}
              onSend={handleSendClick}
              onClear={handleClearClick}
            />
          </div>
      </div>
    </div>
  );
};
