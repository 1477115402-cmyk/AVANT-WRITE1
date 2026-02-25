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
      <div className="flex-1 flex items-center justify-center text-[var(--color-ink-light)] font-serif opacity-50">
        请选择一个会话
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 z-50 flex justify-between pointer-events-none">
        {/* Test Mode Toggle (Left) */}
        <button
          onClick={() => setTestMode(!testMode)}
          className={`pointer-events-auto flex items-center space-x-2 px-4 py-2 rounded-2xl border transition-all duration-300 ${
            testMode
              ? 'bg-black text-white border-black shadow-xl'
              : 'bg-white/80 backdrop-blur-md border-black/5 text-black/40 hover:text-black'
          }`}
        >
          <FlaskConical size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{testMode ? '测试中' : '共写测试'}</span>
        </button>

        {/* Co-write Toggle (Right) */}
        <button
          onClick={() => setIsCoWriting(!isCoWriting)}
          className={`pointer-events-auto flex items-center space-x-2 px-4 py-2 rounded-2xl border transition-all duration-300 ${
            isCoWriting
              ? 'bg-black text-white border-black shadow-xl'
              : 'bg-white/80 backdrop-blur-md border-black/5 text-black/40 hover:text-black'
          }`}
        >
          <Users size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{isCoWriting ? '共写中' : '共写模式'}</span>
        </button>
      </div>

      {/* Top Section: History (30%) */}
      <div className={`relative overflow-hidden border-b border-black/5 bg-white shrink-0 transition-all duration-700 ease-in-out ${
        isCoWriting ? 'h-0 opacity-0' : 'h-[30%] opacity-100'
      } landscape:hidden`}>
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/[0.02] to-transparent z-10 pointer-events-none" />
        <HistoryList messages={messages} currentUser={currentUser} partner={partner} />
      </div>

      {/* Bottom Section: Canvas (70% or 100%) */}
      <div className={`relative bg-white z-10 transition-all duration-700 ease-in-out ${
        isCoWriting ? 'h-full' : 'h-[70%]'
      } landscape:h-full flex-1`}>
         <CanvasBoard 
            ref={canvasRef} 
            brushType={currentBrush} 
            brushSize={brushSize}
            inkColor={inkColor}
            testMode={testMode}
          />
          
          {/* Watermark */}
          <div className={`absolute top-20 left-6 text-black opacity-[0.03] font-serif pointer-events-none select-none text-4xl writing-mode-vertical transition-opacity duration-700 ${isCoWriting ? 'opacity-[0.05]' : 'opacity-[0.03]'}`}>
            {isCoWriting ? `${partner.name} · 共写` : `${partner.name} · 独写`}
          </div>

          {/* Controls Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[var(--color-paper)] via-[var(--color-paper)]/80 to-transparent pt-8 pb-2 pointer-events-none">
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
