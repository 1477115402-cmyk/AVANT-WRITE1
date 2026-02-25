import { Friend, ChatSession, FriendRequest, User } from '../types';

export const CURRENT_USER: User = {
  id: 'me',
  name: '我',
  avatar: '我',
};

export const MOCK_FRIENDS: Friend[] = [
  { id: 'f1', name: '林语堂', avatar: '林', status: 'online' },
  { id: 'f2', name: '张爱玲', avatar: '张', status: 'offline' },
  { id: 'f3', name: '鲁迅', avatar: '鲁', status: 'busy' },
  { id: 'f4', name: '徐志摩', avatar: '徐', status: 'online' },
];

export const MOCK_REQUESTS: FriendRequest[] = [
  { id: 'r1', name: '三毛', avatar: '三', timestamp: new Date(Date.now() - 86400000) },
];

// Helper to generate some fake history
const generateHistory = (count: number, senderId: string): any[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `msg_${Math.random().toString(36).substr(2, 9)}`,
    senderId: Math.random() > 0.5 ? 'me' : senderId,
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', // Placeholder transparent pixel
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * (count - i)),
  }));
};

export const MOCK_SESSIONS: ChatSession[] = [
  {
    id: 's1',
    partnerId: 'f1',
    messages: [], // Will be populated in App initialization if needed, or just empty for now
    unreadCount: 2,
    lastMessage: {
      id: 'm_last_1',
      senderId: 'f1',
      imageUrl: '', // Placeholder
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  },
  {
    id: 's2',
    partnerId: 'f2',
    messages: [],
    unreadCount: 0,
    lastMessage: {
      id: 'm_last_2',
      senderId: 'me',
      imageUrl: '',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  },
];
