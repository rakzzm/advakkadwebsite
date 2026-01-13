'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Message = {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
  read: boolean;
};

export type Chat = {
  id: string;
  customerName: string;
  lastMessage: string;
  unreadCount: number;
  lastActive: string;
  messages: Message[];
};

type ChatContextType = {
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  sendMessage: (chatId: string, text: string) => void;
  markAsRead: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_CHATS: Chat[] = [
  {
    id: 'chat_001',
    customerName: 'Rahul Krishna',
    lastMessage: 'Is the red saree available?',
    unreadCount: 1,
    lastActive: '2 mins ago',
    messages: [
      { id: 'm1', sender: 'user', text: 'Hi, I have a question.', timestamp: '10:00 AM', read: true },
      { id: 'm2', sender: 'admin', text: 'Hello! How can I help you?', timestamp: '10:05 AM', read: true },
      { id: 'm3', sender: 'user', text: 'Is the red saree available?', timestamp: '10:10 AM', read: false },
    ]
  },
  {
    id: 'chat_002',
    customerName: 'Guest User 402',
    lastMessage: 'Thanks for the info.',
    unreadCount: 0,
    lastActive: '1 day ago',
    messages: [
      { id: 'm1', sender: 'user', text: 'Do you ship to Dubai?', timestamp: 'Yesterday', read: true },
      { id: 'm2', sender: 'admin', text: 'Yes, we do world-wide shipping.', timestamp: 'Yesterday', read: true },
      { id: 'm3', sender: 'user', text: 'Thanks for the info.', timestamp: 'Yesterday', read: true },
    ]
  }
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('advakkad_chats');
    if (saved) {
      setChats(JSON.parse(saved));
    }

    // Listen for storage events (updates from other tabs/frontend)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'advakkad_chats' && e.newValue) {
        setChats(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('advakkad_chats', JSON.stringify(chats));
  }, [chats]);

  const sendMessage = (chatId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'admin',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setChats(chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: text,
          lastActive: 'Just now'
        };
      }
      return chat;
    }));
  };

  const markAsRead = (chatId: string) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    ));
  };

  const deleteChat = (chatId: string) => {
    setChats(chats.filter(c => c.id !== chatId));
    if (activeChatId === chatId) setActiveChatId(null);
  };

  return (
    <ChatContext.Provider value={{ chats, activeChatId, setActiveChatId, sendMessage, markAsRead, deleteChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
