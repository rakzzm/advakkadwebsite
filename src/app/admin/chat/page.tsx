'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';

export default function AdminChat() {
  const { chats, activeChatId, setActiveChatId, sendMessage, markAsRead, deleteChat } = useChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  // Mark as read when opening a chat
  useEffect(() => {
    if (activeChatId && activeChat?.unreadCount > 0) {
      markAsRead(activeChatId);
    }
  }, [activeChatId, activeChat?.unreadCount, markAsRead]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatId) return;
    sendMessage(activeChatId, inputText);
    setInputText('');
  };

  return (
    <div className="chat-container">
      {/* Sidebar List */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
           <h2>Inbox ({chats.reduce((acc, c) => acc + c.unreadCount, 0)})</h2>
        </div>
        <div className="chat-list">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              className={`chat-item ${activeChatId === chat.id ? 'active' : ''} ${chat.unreadCount > 0 ? 'unread' : ''}`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <div className="chat-avatar">{chat.customerName[0]}</div>
              <div className="chat-info">
                <div className="chat-top">
                  <span className="name">{chat.customerName}</span>
                  <span className="time">{chat.lastActive}</span>
                </div>
                <div className="chat-bottom">
                  <p className="preview">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && <span className="badge">{chat.unreadCount}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {activeChat ? (
          <>
            <div className="chat-header">
              <div className="header-info">
                 <h3>{activeChat.customerName}</h3>
                 <span className="status">Active now</span>
              </div>
              <button onClick={() => deleteChat(activeChat.id)} className="delete-btn" title="Delete Conversation">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>

            <div className="messages-area">
              {activeChat.messages.map(msg => (
                 <div key={msg.id} className={`message ${msg.sender}`}>
                   <div className="bubble">
                     {msg.text}
                   </div>
                   <span className="msg-time">{msg.timestamp}</span>
                 </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
               <button type="button" className="attach-btn"><span className="material-symbols-outlined">attach_file</span></button>
               <input 
                 type="text" 
                 placeholder="Type a message..." 
                 value={inputText} 
                 onChange={e => setInputText(e.target.value)} 
               />
               <button type="submit" className="send-btn"><span className="material-symbols-outlined">send</span></button>
            </form>
          </>
        ) : (
          <div className="empty-state">
            <span className="material-symbols-outlined icon">forum</span>
            <h3>Select a conversation</h3>
            <p>Choose a chat from the left to start messaging</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .chat-container { display: flex; height: calc(100vh - 120px); background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
        
        /* Sidebar */
        .chat-sidebar { width: 320px; border-right: 1px solid #eee; display: flex; flex-direction: column; }
        .sidebar-header { padding: 1.5rem; border-bottom: 1px solid #eee; }
        .sidebar-header h2 { margin: 0; font-family: var(--font-playfair); color: #1a1a1a; font-size: 1.4rem; }
        .chat-list { flex: 1; overflow-y: auto; }
        
        .chat-item { display: flex; gap: 1rem; padding: 1rem; cursor: pointer; border-bottom: 1px solid #f9f9f9; transition: background 0.2s; }
        .chat-item:hover { background: #f5f5f5; }
        .chat-item.active { background: #fef2f2; border-left: 3px solid #d32f2f; }
        
        .chat-avatar { width: 40px; height: 40px; background: #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #555; font-size: 1.1rem; }
        .chat-item.active .chat-avatar { background: #d32f2f; color: white; }
        
        .chat-info { flex: 1; overflow: hidden; }
        .chat-top { display: flex; justify-content: space-between; margin-bottom: 0.25rem; }
        .name { font-weight: 600; color: #333; font-size: 0.95rem; }
        .time { font-size: 0.75rem; color: #888; }
        .chat-bottom { display: flex; justify-content: space-between; align-items: center; }
        .preview { margin: 0; font-size: 0.85rem; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
        .unread .preview { color: #1a1a1a; font-weight: 500; }
        .badge { background: #d32f2f; color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 10px; min-width: 18px; text-align: center; }

        /* Main Area */
        .chat-main { flex: 1; display: flex; flex-direction: column; background: #fafafa; }
        
        .chat-header { padding: 1rem 1.5rem; background: white; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .header-info h3 { margin: 0; font-size: 1.1rem; color: #333; }
        .status { font-size: 0.8rem; color: #4caf50; display: flex; align-items: center; gap: 4px; }
        .status::before { content: ''; display: block; width: 6px; height: 6px; background: #4caf50; border-radius: 50%; }
        .delete-btn { background: none; border: none; color: #999; cursor: pointer; }
        .delete-btn:hover { color: #d32f2f; }

        .messages-area { flex: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; }
        .message { display: flex; flex-direction: column; max-width: 70%; }
        .message.user { align-self: flex-start; }
        .message.admin { align-self: flex-end; align-items: flex-end; }
        
        .bubble { padding: 0.8rem 1rem; border-radius: 12px; font-size: 0.95rem; line-height: 1.4; position: relative; }
        .user .bubble { background: white; border: 1px solid #eee; border-bottom-left-radius: 2px; color: #333; }
        .admin .bubble { background: #d32f2f; color: white; border-bottom-right-radius: 2px; }
        
        .msg-time { font-size: 0.7rem; color: #999; margin-top: 0.25rem; padding: 0 0.5rem; }

        .chat-input-area { padding: 1rem; background: white; border-top: 1px solid #eee; display: flex; gap: 0.5rem; align-items: center; }
        .chat-input-area input { flex: 1; padding: 0.8rem; border: 1px solid #ddd; border-radius: 24px; outline: none; transition: border 0.2s; }
        .chat-input-area input:focus { border-color: #d32f2f; }
        
        .attach-btn, .send-btn { width: 40px; height: 40px; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
        .attach-btn { background: #f5f5f5; color: #666; }
        .attach-btn:hover { background: #e0e0e0; }
        .send-btn { background: #d32f2f; color: white; }
        .send-btn:hover { background: #b71c1c; }

        .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; }
        .empty-state .icon { font-size: 4rem; margin-bottom: 1rem; color: #ddd; }
        .empty-state h3 { margin: 0; color: #333; }
        .empty-state p { font-size: 0.9rem; }
      `}</style>
    </div>
  );
}
