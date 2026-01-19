'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Types shared with Admin Chat
type AdminMessage = {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
  read: boolean;
};

type ChatStatus = 'bot' | 'human';

type ChatSession = {
  id: string;
  customerName: string;
  lastMessage: string;
  unreadCount: number;
  lastActive: string;
  status: ChatStatus; // Added status
  messages: AdminMessage[];
};

type LocalMessage = {
  text: string;
  sender: 'incoming' | 'outgoing';
};

// ... (KNOWLEDGE_BASE remains same)
const KNOWLEDGE_BASE = {
  products: [
    { keywords: ["saree", "silk", "banarasi", "vichitra"], response: "We have a beautiful collection of Sarees including Banarasi Butta, Cotton Silk, and Foil Print Vichitra Silk Sarees. Prices start from ₹499." },
    { keywords: ["mundu", "kaithari"], response: "Our traditional Kaithari Mundu is available for just ₹299." },
    { keywords: ["kids", "uniform", "school"], response: "We offer Girls School Uniforms for various age groups (5-15 years), priced at ₹849." },
    { keywords: ["churidar", "designer"], response: "Check out our Designer Churidar Sets and Custom Churidars, starting at ₹1499." },
    { keywords: ["price", "cost", "how much"], response: "Our products range from budget-friendly items like Mundus (₹299) to premium Silk Sarees (₹4999). What specific item are you interested in?" }
  ],
  policies: [
    { keywords: ["return", "exchange", "back"], response: "We accept returns within 7 days of delivery for unused items with tags. We only replace items if they are defective or damaged." },
    { keywords: ["refund", "money"], response: "Refunds are processed within 5-7 business days after we receive and inspect your return." },
    { keywords: ["delivery", "shipping", "time", "reach", "track"], response: "Standard delivery takes 5-7 days. Express delivery (2-3 days) is available in select locations. Free shipping on orders above ₹2000!" },
    { keywords: ["privacy", "data"], response: "Your privacy is important to us. We only use your data to process orders and improve your shopping experience. We never sell your data." },
    { keywords: ["contact", "phone", "email", "support"], response: "You can reach us at +91 98476 72978 or email info@adavakkad.com. We are located at City Centre Complex, Thrikkadeeri, Kerala." }
  ],
  greetings: [
    { keywords: ["hi", "hello", "hey", "start"], response: "Hello! I'm the Adavakkad Assistant. How can I help you today? Ask me about products, delivery, or returns!" },
    { keywords: ["thank", "thanks", "bye"], response: "You're welcome! Happy shopping at Adavakkad Collections." }
  ],
  fallback: "I'm not sure about that specific detail. However, our team can help! Contact us at +91 98476 72978 for more assistance."
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<LocalMessage[]>([
    { text: "Hi there! 👋\nI'm your AI assistant. How can I help you today?", sender: 'incoming' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Use useLocalStorage for persistence
  const [sessionId, setSessionId] = useLocalStorage<string>('chat_session_id', '');
  const [chats, setChats] = useLocalStorage<ChatSession[]>('advakkad_chats', []);

  // Derived state for status
  const [sessionStatus, setSessionStatus] = useState<ChatStatus>('bot');
  
  const chatBoxRef = useRef<HTMLUListElement>(null);

  // Initialize Session ID if missing
  useEffect(() => {
    // Only generate if we don't have one
    if (!sessionId) {
       const existing = localStorage.getItem('chat_session_id');
       if (!existing) {
         setSessionId('guest_' + Date.now());
       }
    }
  }, [sessionId, setSessionId]);

  // Sync messages from chats when chats or sessionId changes
  useEffect(() => {
    if (!sessionId || !chats.length) return;

    const myChat = chats.find(c => c.id === sessionId);
    if (myChat) {
      // Avoid synchronous setState if possible, or accept it as it's a response to prop/storage change
      // But let's wrap in check to avoid unnecessary updates
      if (myChat.status && myChat.status !== sessionStatus) {
         const timer = setTimeout(() => {
             setSessionStatus(myChat.status);
         }, 0);
         return () => clearTimeout(timer);
      }
      
      const converted: LocalMessage[] = myChat.messages.map(m => ({
        text: m.text,
        sender: m.sender === 'admin' ? 'incoming' : 'outgoing'
      }));

      const timer = setTimeout(() => {
          setMessages(prev => {
              if (prev.length !== converted.length || (prev.length > 0 && converted.length > 0 && prev[prev.length-1].text !== converted[converted.length-1].text)) {
                  return converted.length > 0 ? converted : prev;
              }
              return prev;
          });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [chats, sessionId, sessionStatus]);

  // Auto-scroll
  useEffect(() => {
    if(chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Helper to sync to localStorage
  const syncToStorage = (text: string, sender: 'user' | 'admin', newStatus?: ChatStatus) => {
    // We update 'chats' directly via setChats, which updates LS and triggers other tabs.
    if (!sessionId) return;
    
    // Find if chat exists
    const chatIndex = chats.findIndex(c => c.id === sessionId);
    
    const newMessage: AdminMessage = {
      id: Date.now().toString(),
      sender: sender,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: sender === 'admin'
    };

    let newChats = [...chats];
    
    if (chatIndex >= 0) {
      newChats[chatIndex] = {
          ...newChats[chatIndex],
          messages: [...newChats[chatIndex].messages, newMessage],
          lastMessage: text,
          lastActive: 'Just now',
          unreadCount: sender === 'user' ? newChats[chatIndex].unreadCount + 1 : newChats[chatIndex].unreadCount,
          status: newStatus || newChats[chatIndex].status
      };
    } else {
        // Create new
        const newChat: ChatSession = {
            id: sessionId,
            customerName: 'Guest User ' + sessionId.slice(-4),
            lastMessage: text,
            unreadCount: sender === 'user' ? 1 : 0,
            lastActive: 'Just now',
            status: newStatus || 'bot',
            messages: [newMessage]
        };
        newChats = [...newChats, newChat];
    }
    setChats(newChats);
  };

  // Bot Logic
  const generateResponse = (userMessage: string): { text: string; action: 'reply' | 'handoff' } => {
    const input = userMessage.toLowerCase();

    // 1. Check for Handoff Keywords
    if (['agent', 'human', 'person', 'support', 'talk to someone'].some(k => input.includes(k))) {
      return { 
        text: "I'm connecting you to a human agent. They will review your chat and reply shortly!", 
        action: 'handoff' 
      };
    }

    // 2. Knowledge Base Search
    for (const group of Object.values(KNOWLEDGE_BASE)) {
      if (typeof group === 'string') continue;
      if (Array.isArray(group)) {
        for (const item of group) {
           if (item.keywords.some(k => input.includes(k))) return { text: item.response, action: 'reply' };
        }
      }
    }
    
    // 3. Fallback
    return { text: KNOWLEDGE_BASE.fallback, action: 'reply' };
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    // 1. Update UI
    setInputValue("");
    
    if (sessionStatus === 'human') {
        syncToStorage(text, 'user');
        return;
    }

    syncToStorage(text, 'user');

    // 2. Generate Bot Response
    const response = generateResponse(text);
    
    if (response) {
      if (response.action === 'handoff') {
          setSessionStatus('human');
          setIsTyping(true);
          setTimeout(() => {
            syncToStorage(response.text, 'admin', 'human');
            setIsTyping(false);
          }, 800);
      } else {
          // Normal Bot Reply
          setIsTyping(true);
          setTimeout(() => {
            syncToStorage(response.text, 'admin'); 
            setIsTyping(false);
          }, 600);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <>
      <button className="chatbot-toggler" onClick={toggleChat}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', opacity: isOpen ? 0 : 1, transition: 'opacity 0.3s ease' }}>
            <Image 
                src="/bot-avatar.png" 
                alt="Chat" 
                fill
                style={{ objectFit: 'cover' }}
            />
        </div>
        <span className="material-symbols-outlined" style={{ opacity: isOpen ? 1 : 0, position: 'absolute' }}>close</span>
      </button>

      <div className={`chatbot ${isOpen ? 'show-chatbot' : ''}`}>
        <header>
          <h2>Adavakkad Assistant</h2>
          <span className="material-symbols-outlined" onClick={toggleChat} style={{ position: 'absolute', right: '20px', top: '20px', cursor: 'pointer' }}>close</span>
        </header>
        <ul className="chatbox" ref={chatBoxRef}>
          {messages.map((msg, i) => (
            <li key={i} className={`chat ${msg.sender}`}>
              {msg.sender === 'incoming' && (
                <div className="bot-avatar" style={{ position: 'relative', width: '32px', height: '32px' }}>
                    <Image src="/bot-avatar.png" alt="Bot" fill style={{ borderRadius: '50%', objectFit: 'cover' }} />
                </div>
              )}
              <p>{msg.text}</p>
            </li>
          ))}
          {isTyping && (
             <li className="chat incoming">
               <div className="bot-avatar" style={{ position: 'relative', width: '32px', height: '32px' }}>
                  <Image src="/bot-avatar.png" alt="Bot" fill style={{ borderRadius: '50%', objectFit: 'cover' }} />
               </div>
               <p>Thinking...</p>
             </li>
          )}
        </ul>
        <div className="chat-input">
          <textarea 
            placeholder="Type a message..." 
            spellCheck={false} 
            required 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <span 
            id="send-btn" 
            className="material-symbols-outlined" 
            onClick={handleSend}
            style={{ 
              visibility: inputValue.trim() ? 'visible' : 'hidden',
              cursor: 'pointer',
              color: 'var(--color-primary)'
            }}
          >
            send
          </span>
        </div>
      </div>
    </>
  );
}
