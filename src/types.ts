export type BrushType = 'pen' | 'pencil' | 'brush';

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string; // Initial letter
}

export interface Friend extends User {
  status: 'online' | 'offline' | 'busy';
  isRequest?: boolean;
}

export interface Message {
  id: string;
  senderId: string; // 'me' or friendId
  imageUrl: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  partnerId: string;
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
}

export interface FriendRequest extends User {
  timestamp: Date;
}
