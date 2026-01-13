'use client';

import { useState, useRef } from 'react';

export default function SocialPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
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
      alert('Successfully Uploaded Reel to Instagram! 📸');
      setFile(null);
      setPreviewUrl(null);
      setCaption('');
    }, 2500);
  };

  return (
    <div className="social-page">
      <div className="header">
        <div>
           <h1 className="page-title">Social Media Manager</h1>
           <p className="subtitle">Create and schedule posts for your social channels.</p>
        </div>
        <button 
          className={`connect-btn ${isConnected ? 'connected' : ''}`}
          onClick={() => setIsConnected(!isConnected)}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="Insta" width="24" />
          {isConnected ? 'Connected (@adavakkad)' : 'Connect Instagram'}
        </button>
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

      <style jsx>{`
        .social-page { padding-bottom: 2rem; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 2rem; margin: 0; color: #1a1a1a; }
        .subtitle { color: #666; margin: 0.5rem 0 0 0; }
        
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
        .file-info .icon { color: #10b981; }

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
      `}</style>
    </div>
  );
}
