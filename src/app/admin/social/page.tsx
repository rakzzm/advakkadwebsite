'use client';

import { useState, useRef } from 'react';

  // Mock Social Profile Data
  const [profile, setProfile] = useState<{followers: string; posts: string} | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleConnectClick = () => {
    if (isConnected) {
      if (confirm('Are you sure you want to disconnect?')) {
        setIsConnected(false);
        setProfile(null);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulate auth API
    setTimeout(() => {
       setIsLoggingIn(false);
       setShowLoginModal(false);
       setIsConnected(true);
       setProfile({ followers: '12.4k', posts: '342' });
    }, 1500);
  };

  const handlePost = () => {
    if (!isConnected) {
        alert('Please connect your Instagram account first.');
        return;
    }
    if (!file) return;

    setIsPosting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsPosting(false);
      alert('Successfully Uploaded Reel to Instagram! 📸\nCheck your feed in a few seconds.');
      setFile(null);
      setPreviewUrl(null);
      setCaption('');
      // Update mock posts count
      if (profile) setProfile({...profile, posts: (parseInt(profile.posts) + 1).toString()});
    }, 2500);
  };

  return (
    <div className="social-page">
      <div className="header">
        <div>
           <h1 className="page-title">Social Media Manager</h1>
           <p className="subtitle">Create and schedule posts for your social channels.</p>
        </div>
        <div className="account-status">
            {isConnected && profile && (
              <div className="stats-badge">
                 <span><strong>{profile.followers}</strong> Followers</span>
                 <span><strong>{profile.posts}</strong> Posts</span>
              </div>
            )}
            <button 
              className={`connect-btn ${isConnected ? 'connected' : ''}`}
              onClick={handleConnectClick}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="Insta" width="24" />
              {isConnected ? 'Connected (@adavakkad)' : 'Connect Instagram'}
            </button>
        </div>
      </div>

      <div className="grid-layout">
        {/* Creator Studio */}
        <div className="creator-card">
          <h2>Create New Reel</h2>
          
          <div 
             className="upload-area" 
             onClick={() => fileInputRef.current?.click()}
             style={{ borderColor: file ? '#10b981' : '#ddd' }}
          >
             <input 
               type="file" 
               accept="video/*" 
               hidden 
               ref={fileInputRef} 
               onChange={handleFileSelect} 
             />
             {file ? (
               <div className="file-info">
                  <span className="material-symbols-outlined icon">check_circle</span>
                  <p>{file.name}</p>
                  <button onClick={(e) => { e.stopPropagation(); setFile(null); setPreviewUrl(null); }} className="remove-btn">Change Video</button>
               </div>
             ) : (
               <div className="placeholder">
                  <span className="material-symbols-outlined icon">movie</span>
                  <p>Click to upload video</p>
                  <span>MP4 or MOV recommended</span>
               </div>
             )}
          </div>

          <div className="form-group">
            <label>Caption</label>
            <textarea 
               value={caption} 
               onChange={(e) => setCaption(e.target.value)} 
               placeholder="Write a catchy caption... #fashion #saree"
               rows={5}
            ></textarea>
            <div className="char-count">{caption.length}/2200</div>
          </div>

          <button 
            className="post-btn" 
            disabled={!file || isPosting}
            onClick={handlePost}
          >
             {isPosting ? 'Posting...' : 'Post to Instagram'}
          </button>
        </div>

        {/* Mobile Preview */}
        <div className="preview-section">
           <div className="phone-mockup">
              <div className="notch"></div>
              <div className="screen">
                 <div className="screen-header">
                    <img src="/logo/admin-logo.jpg" alt="Profile" className="avatar" />
                    <span>adavakkad_collections</span>
                    <span className="material-symbols-outlined more">more_horiz</span>
                 </div>
                 <div className="screen-content">
                    {previewUrl ? (
                      <video src={previewUrl} autoPlay loop muted className="video-preview"></video>
                    ) : (
                      <div className="empty-state">Preview</div>
                    )}
                 </div>
                 <div className="screen-actions">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="material-symbols-outlined">mode_comment</span>
                    <span className="material-symbols-outlined">send</span>
                 </div>
                 <div className="screen-caption">
                    <span className="username">adavakkad_collections</span> {caption || 'Your caption will appear here...'}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Mock Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="login-modal">
             <div className="modal-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" alt="Instagram" width="120" />
             </div>
             <form onSubmit={handleLoginSubmit}>
               <input type="text" placeholder="Phone number, username, or email" required defaultValue="adavakkad_collections" />
               <input type="password" placeholder="Password" required />
               <button type="submit" disabled={isLoggingIn}>
                 {isLoggingIn ? 'Logging in...' : 'Log In'}
               </button>
               <div className="divider">OR</div>
               <button type="button" className="facebook-login">Log in with Facebook</button>
               <p className="forgot-password">Forgot password?</p>
             </form>
             <button className="close-modal" onClick={() => setShowLoginModal(false)}>Close Simulation</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .social-page { padding-bottom: 2rem; position: relative; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .page-title { font-family: var(--font-playfair); font-size: 2rem; margin: 0; color: #1a1a1a; }
        .subtitle { color: #666; margin: 0.5rem 0 0 0; }
        
        .account-status { display: flex; align-items: center; gap: 1.5rem; }
        .stats-badge { display: flex; gap: 1rem; color: #333; font-size: 0.9rem; background: white; padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid #eee; }
        
        .connect-btn { 
          display: flex; align-items: center; gap: 0.8rem; 
          border: 1px solid #ddd; background: white; 
          padding: 0.8rem 1.5rem; border-radius: 50px; 
          font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .connect-btn.connected { border-color: #d32f2f; color: #d32f2f; background: #fff5f5; }
        
        .grid-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 3rem; align-items: start; }
        @media (max-width: 900px) { .grid-layout { grid-template-columns: 1fr; } }

        .creator-card { background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .creator-card h2 { margin-top: 0; margin-bottom: 1.5rem; font-size: 1.2rem; }

        .upload-area { border: 2px dashed #ddd; border-radius: 12px; padding: 3rem; text-align: center; cursor: pointer; transition: all 0.2s; margin-bottom: 2rem; }
        .upload-area:hover { border-color: #999; background: #fafafa; }
        .upload-area .icon { font-size: 3rem; color: #ccc; margin-bottom: 1rem; display: block; }
        .upload-area p { margin: 0; font-weight: 500; color: #333; }
        .upload-area span { font-size: 0.8rem; color: #999; }
        .file-info { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .file-info .icon { color: #10b981; font-size: 2rem; margin: 0; }
        .remove-btn { background: none; border: 1px solid #ddd; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; margin-top: 0.5rem; }

        .form-group { margin-bottom: 2rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333; }
        .form-group textarea { width: 100%; padding: 1rem; border: 1px solid #eee; border-radius: 8px; font-family: var(--font-outfit); resize: vertical; outline: none; }
        .form-group textarea:focus { border-color: #333; }
        .char-count { text-align: right; font-size: 0.8rem; color: #999; margin-top: 0.5rem; }

        .post-btn { width: 100%; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: white; border: none; padding: 1rem; border-radius: 8px; font-weight: 600; cursor: pointer; opacity: 1; transition: opacity 0.2s; }
        .post-btn:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(100%); }

        /* Mockup */
        .phone-mockup { width: 300px; height: 600px; background: #1a1a1a; border-radius: 30px; padding: 12px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .notch { height: 25px; width: 150px; background: #1a1a1a; position: absolute; top: 0; left: 50%; transform: translateX(-50%); border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
        .screen { background: white; width: 100%; height: 100%; border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; position: relative; }
        
        .screen-header { padding: 1rem; display: flex; align-items: center; gap: 0.8rem; border-bottom: 1px solid #eee; }
        .avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
        .screen-header span { font-size: 0.9rem; font-weight: 600; }
        .more { margin-left: auto; color: #333; }

        .screen-content { flex: 1; background: #f0f0f0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .video-preview { width: 100%; height: 100%; object-fit: cover; }
        .empty-state { color: #999; }

        .screen-actions { padding: 0.8rem; display: flex; gap: 1rem; }
        .screen-actions span { font-size: 1.5rem; }

        .screen-caption { padding: 0 0.8rem 1rem; font-size: 0.85rem; line-height: 1.4; }
        .username { font-weight: 600; margin-right: 0.5rem; }

        /* Login Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .login-modal { background: white; width: 350px; padding: 2.5rem 2rem; border-radius: 4px; text-align: center; border: 1px solid #ddd; }
        .modal-header { margin-bottom: 2rem; }
        .login-modal input { width: 100%; padding: 0.5rem 0.8rem; margin-bottom: 0.6rem; border: 1px solid #ddd; border-radius: 3px; font-size: 0.85rem; background: #fafafa; }
        .login-modal button[type="submit"] { width: 100%; background: #0095f6; color: white; border: none; padding: 0.5rem; border-radius: 4px; font-weight: 600; cursor: pointer; margin-top: 1rem; font-size: 0.9rem; }
        .login-modal button[type="submit"]:disabled { opacity: 0.7; }
        
        .divider { margin: 1.5rem 0; font-size: 0.8rem; color: #999; font-weight: 600; display: flex; align-items: center; gap: 1rem; }
        .divider::before, .divider::after { content: ''; height: 1px; background: #ddd; flex: 1; }
        
        .facebook-login { background: none; border: none; color: #385185; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: block; width: 100%; margin-bottom: 1rem; }
        .forgot-password { font-size: 0.75rem; color: #00376b; cursor: pointer; }
        
        .close-modal { margin-top: 2rem; background: none; border: none; color: #999; font-size: 0.8rem; cursor: pointer; text-decoration: underline; }
      `}</style>
    </div>
  );
}
