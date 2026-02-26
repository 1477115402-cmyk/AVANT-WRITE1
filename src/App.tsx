import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { MessagesTab } from './components/MessagesTab';
import { ContactsTab } from './components/ContactsTab';
import { WritingTab } from './components/WritingTab';
import { FloatingActionButton } from './components/FloatingActionButton';
import { AddFriendModal } from './components/AddFriendModal';
import { Sidebar } from './components/Sidebar';
import { BrushType, ChatSession, Friend, FriendRequest, Message, User } from './types';
import { CURRENT_USER, MOCK_FRIENDS, MOCK_REQUESTS, MOCK_SESSIONS } from './data/mock';

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function App() {
  // State
  const [currentTab, setCurrentTab] = useState<TabType>('messages');
  const [currentBrush, setCurrentBrush] = useState<BrushType>('pen');
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  
  // Data State
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);
  const [requests, setRequests] = useState<FriendRequest[]>(MOCK_REQUESTS);
  const [sessions, setSessions] = useState<ChatSession[]>(MOCK_SESSIONS);
  
  // Selection State
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Computed
  const activeSession = sessions.find(s => s.id === activeSessionId);
  const activePartner = activeSession 
    ? friends.find(f => f.id === activeSession.partnerId) || null 
    : null;
  
  const totalUnread = sessions.reduce((acc, s) => acc + s.unreadCount, 0);

  // Handlers
  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
  };

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setCurrentTab('writing');
    // Mark as read
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, unreadCount: 0 } : s));
  };

  const handleSelectFriend = (friendId: string) => {
    // Check if session exists
    const existingSession = sessions.find(s => s.partnerId === friendId);
    if (existingSession) {
      handleSelectSession(existingSession.id);
    } else {
      // Create new session
      const newSession: ChatSession = {
        id: generateId(),
        partnerId: friendId,
        messages: [],
        unreadCount: 0,
      };
      setSessions(prev => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
      setCurrentTab('writing');
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    const newFriend: Friend = {
      id: request.id,
      name: request.name,
      avatar: request.avatar,
      status: 'online', // Default to online for new friends
    };

    setFriends(prev => [...prev, newFriend]);
    setRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const handleAddFriend = (user: User) => {
    // Check if already friend
    if (friends.some(f => f.id === user.id)) {
      handleSelectFriend(user.id);
      return;
    }

    const newFriend: Friend = {
      ...user,
      status: 'online',
    };
    setFriends(prev => [...prev, newFriend]);
    
    // Immediately start chat
    handleSelectFriend(newFriend.id);
  };

  const handleSend = (imageUrl: string) => {
    if (!activeSessionId) return;

    const newMessage: Message = {
      id: generateId(),
      senderId: CURRENT_USER.id,
      imageUrl,
      timestamp: new Date(),
    };

    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          messages: [...s.messages, newMessage],
          lastMessage: newMessage,
        };
      }
      return s;
    }));
  };

  const handleClear = () => {
    // Canvas clear is handled in WritingTab
  };

  const handleNewChat = () => {
    setCurrentTab('contacts');
  };

  // Dynamic Header Props
  let headerTitle = 'Avant Write';
  let headerStatus = undefined;

  if (currentTab === 'messages') headerTitle = 'Index';
  if (currentTab === 'contacts') headerTitle = 'People';
  if (currentTab === 'writing' && activePartner) {
    headerTitle = activePartner.name;
    headerStatus = activePartner.status === 'online' ? 'Online' : 'Offline';
  }

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden selection:bg-black selection:text-white">
      {/* PC Sidebar */}
      <div className="hidden md:flex">
        <Sidebar 
          currentTab={currentTab} 
          onTabChange={handleTabChange} 
          unreadCount={totalUnread} 
        />
      </div>

      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header (Top Bar) */}
        <Header title={headerTitle} status={headerStatus} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative w-full max-w-lg mx-auto h-full bg-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)] pb-24 md:pb-0 md:max-w-none overflow-hidden transition-all duration-500 ease-in-out">
        
        {currentTab === 'messages' && (
          <MessagesTab 
            sessions={sessions} 
            friends={friends} 
            onSelectSession={handleSelectSession} 
          />
        )}

        {currentTab === 'contacts' && (
          <ContactsTab 
            friends={friends} 
            requests={requests} 
            onSelectFriend={handleSelectFriend}
            onAcceptRequest={handleAcceptRequest}
            onAddFriend={() => setIsAddFriendModalOpen(true)}
          />
        )}

        {currentTab === 'writing' && (
          <WritingTab
            partner={activePartner}
            currentUser={CURRENT_USER}
            messages={activeSession?.messages || []}
            currentBrush={currentBrush}
            onBrushChange={setCurrentBrush}
            onSend={handleSend}
            onClear={handleClear}
          />
        )}

        {/* FAB for Messages/Contacts */}
        {(currentTab === 'messages' || currentTab === 'contacts') && (
          <FloatingActionButton onClick={handleNewChat} />
        )}
      </div>
    </div>

    {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden">
        <BottomNav 
          currentTab={currentTab} 
          onTabChange={handleTabChange} 
          unreadCount={totalUnread}
        />
      </div>

      {/* Modals */}
      <AddFriendModal 
        isOpen={isAddFriendModalOpen} 
        onClose={() => setIsAddFriendModalOpen(false)} 
        onAddFriend={handleAddFriend}
      />
    </div>
  );
}
