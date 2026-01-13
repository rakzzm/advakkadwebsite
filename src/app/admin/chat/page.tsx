'use client';

import { useState } from 'react';

export default function AdminChat() {
  const [activeChat, setActiveChat] = useState(1);
  const chats = [
    { id: 1, name: 'Rahul Krishna', message: 'Is this item available in size L?', time: '2m ago', unread: true },
    { id: 2, name: 'Sarah Jones', message: 'Thanks for the quick delivery!', time: '1h ago', unread: false },
    { id: 3, name: 'Support Bot', message: 'New ticket #492 created.', time: '1d ago', unread: false },
  ];

  return (
    <div className="chat-app">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2>Messages</h2>
          <button className="new-chat"><span className="material-symbols-outlined">edit_square</span></button>
        </div>
        <div className="chat-list">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="avatar">{chat.name[0]}</div>
              <div className="chat-info">
                <div className="chat-top">
                  <span className="name">{chat.name}</span>
                  <span className="time">{chat.time}</span>
                </div>
                <p className="preview">{chat.message}</p>
              </div>
              {chat.unread && <div className="unread-dot"></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <div className="avatar">R</div>
          <div className="header-info">
            <h3>Rahul Krishna</h3>
            <span className="status">Online</span>
          </div>
          <div className="header-actions">
            <button><span className="material-symbols-outlined">phone</span></button>
            <button><span className="material-symbols-outlined">videocam</span></button>
            <button><span className="material-symbols-outlined">more_vert</span></button>
          </div>
        </div>
        
        <div className="messages-area">
          <div className="message received">
            <p>Hi, I wanted to ask about the Assam Silk Saree.</p>
            <span className="msg-time">10:30 AM</span>
          </div>
          <div className="message received">
            <p>Is this item available in size L?</p>
            <span className="msg-time">10:31 AM</span>
          </div>
          <div className="message sent">
            <p>Hello Rahul! Yes, we have size L in stock.</p>
            <span className="msg-time">10:32 AM</span>
          </div>
        </div>

        <div className="chat-input-area">
          <button className="attach-btn"><span className="material-symbols-outlined">attach_file</span></button>
          <input type="text" placeholder="Type a message..." />
          <button className="send-btn"><span className="material-symbols-outlined">send</span></button>
        </div>
      </div>

      <style jsx>{`
        .chat-app { display: flex; height: calc(100vh - 100px); background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
        
        .chat-sidebar { width: 320px; border-right: 1px solid #eee; display: flex; flex-direction: column; }
        .sidebar-header { padding: 1.5rem; border-bottom: 1px solid #1a1a1a; display: flex; justify-content: space-between; align-items: center; }
        .sidebar-header h2 { font-size: 1.25rem; font-family: var(--font-playfair); margin: 0; }
        .new-chat { border: none; background: none; color: #1a1a1a; cursor: pointer; }

        .chat-list { flex: 1; overflow-y: auto; }
        .chat-item { padding: 1rem; display: flex; gap: 1rem; border-bottom: 1px solid #f5f5f5; cursor: pointer; transition: background 0.2s; position: relative; }
        .chat-item:hover, .chat-item.active { background: #f9fafb; }
        
        .avatar { width: 40px; height: 40px; background: #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #666; }
        .chat-item.active .avatar { background: #d32f2f; color: white; }

        .chat-info { flex: 1; overflow: hidden; }
        .chat-top { display: flex; justify-content: space-between; margin-bottom: 0.25rem; }
        .name { font-weight: 500; font-size: 0.95rem; }
        .time { font-size: 0.75rem; color: #999; }
        .preview { font-size: 0.85rem; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; }
        .unread-dot { width: 8px; height: 8px; background: #d32f2f; border-radius: 50%; position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); }

        .chat-main { flex: 1; display: flex; flex-direction: column; }
        .chat-header { padding: 1rem 1.5rem; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 1rem; }
        .header-info h3 { margin: 0; font-size: 1rem; }
        .status { font-size: 0.8rem; color: #047857; }
        .header-actions { margin-left: auto; display: flex; gap: 0.5rem; }
        .header-actions button { border: none; background: none; color: #666; cursor: pointer; }

        .messages-area { flex: 1; padding: 1.5rem; background: #f8fafc; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; }
        .message { max-width: 60%; padding: 0.75rem 1rem; border-radius: 12px; font-size: 0.95rem; position: relative; }
        .message.received { background: white; align-self: flex-start; border-bottom-left-radius: 2px; }
        .message.sent { background: #1a1a1a; color: white; align-self: flex-end; border-bottom-right-radius: 2px; }
        .msg-time { font-size: 0.7rem; color: #999; display: block; margin-top: 0.25rem; text-align: right; }
        .message.sent .msg-time { color: #888; }

        .chat-input-area { padding: 1rem; bg: white; border-top: 1px solid #eee; display: flex; gap: 1rem; align-items: center; }
        .chat-input-area input { flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 24px; outline: none; }
        .chat-input-area button { border: none; background: none; cursor: pointer; color: #666; }
        .send-btn { color: #d32f2f !important; }
      `}</style>
    </div>
  );
}
