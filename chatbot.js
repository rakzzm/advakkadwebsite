// Smart Local Chatbot Logic

// Knowledge Base Data
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

class ChatBot {
  constructor() {
    this.createChatWidget();
    this.toggler = document.querySelector(".chatbot-toggler");
    this.chatbox = document.querySelector(".chatbox");
    this.chatInput = document.querySelector(".chat-input textarea");
    this.sendBtn = document.querySelector(".chat-input span");
    
    this.bindEvents();
  }

  createChatWidget() {
    const html = `
      <button class="chatbot-toggler">
        <span class="material-symbols-outlined">chat_bubble</span>
        <span class="material-symbols-outlined">close</span>
      </button>
      <div class="chatbot">
        <header>
          <h2>Adavakkad AI</h2>
          <span class="close-btn material-symbols-outlined" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; display: none;">close</span>
        </header>
        <ul class="chatbox">
          <li class="chat incoming">
            <span class="material-symbols-outlined">smart_toy</span>
            <p>Hi there! 👋<br>I'm your AI assistant. Ask me anything about our products, delivery, or policies!</p>
          </li>
        </ul>
        <div class="chat-input">
          <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
          <span id="send-btn" class="material-symbols-outlined">send</span>
        </div>
      </div>
    `;
    
    // Add Google Icons link if not present
    if (!document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0';
      document.head.appendChild(link);
    }

    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);
  }

  bindEvents() {
    this.toggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
    this.sendBtn.addEventListener("click", () => this.handleChat());
    this.chatInput.addEventListener("keydown", (e) => {
      if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        this.handleChat();
      }
    });
  }

  generateResponse(userMessage) {
    const input = userMessage.toLowerCase();
    
    // 1. Check Greetings
    for (const item of KNOWLEDGE_BASE.greetings) {
      if (item.keywords.some(k => input.includes(k))) return item.response;
    }

    // 2. Check Policies (High Priority)
    for (const item of KNOWLEDGE_BASE.policies) {
      if (item.keywords.some(k => input.includes(k))) return item.response;
    }

    // 3. Check Products
    for (const item of KNOWLEDGE_BASE.products) {
      if (item.keywords.some(k => input.includes(k))) return item.response;
    }

    // 4. Fallback + Smart Context
    return KNOWLEDGE_BASE.fallback;
  }

  handleChat() {
    const userMessage = this.chatInput.value.trim();
    if(!userMessage) return;

    // Reset height
    this.chatInput.value = "";
    this.chatInput.style.height = "auto";

    // Append User Message
    this.chatbox.appendChild(this.createChatLi(userMessage, "outgoing"));
    this.chatbox.scrollTo(0, this.chatbox.scrollHeight);

    // Simulate Thinking...
    setTimeout(() => {
      const incomingLi = this.createChatLi("Thinking...", "incoming");
      this.chatbox.appendChild(incomingLi);
      this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
      
      const response = this.generateResponse(userMessage);
      
      setTimeout(() => {
        incomingLi.querySelector("p").textContent = response;
      }, 600); // Small natural delay
    }, 600);
  }

  createChatLi(message, className) {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
  }
}

// Initialize Bot when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  new ChatBot();
});
