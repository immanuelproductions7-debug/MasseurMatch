// Consolidated script.js — Chat widget with optional Firebase lead saving
// Firebase configuration should not be embedded in client-side source directly.
// Prefer injecting a `window.FIREBASE_CONFIG` object during deployment or fetching from a secure endpoint.

const firebaseConfig = window.FIREBASE_CONFIG || null;

let db = null;
let canSave = false;

async function tryInitFirebase() {
  try {
    if (!firebaseConfig || !firebaseConfig.apiKey) return;
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js');
    const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    canSave = true;
    console.info('Firebase initialized — leads will be saved.');
  } catch (err) {
    console.warn('Firebase not initialized or failed to load:', err);
    canSave = false;
  }
}

async function saveLead(data) {
  if (!canSave || !db) return false;
  try {
    const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
    await addDoc(collection(db, 'leads'), data);
    return true;
  } catch (err) {
    console.error('Failed to save lead:', err);
    return false;
  }
}

// DOM refs
const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');
const chatForm = document.getElementById('chatForm');

// Conversation state
let step = 0;
let userData = {};

function appendTextWithLineBreaks(parent, text) {
  const parts = text.split('\n');
  parent.appendChild(document.createTextNode(parts.shift()));
  parts.forEach(part => {
    parent.appendChild(document.createElement('br'));
    parent.appendChild(document.createTextNode(part));
  });
}

function appendMessage(text, sender = 'bot') {
  if (!chatBody) return;
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'user-msg' : 'bot-msg';

  // Safely parse a very small whitelist of HTML (<strong>) by extracting segments
  const strongRegex = /<strong>(.*?)<\/strong>/gi;
  let lastIndex = 0;
  let match;
  const frag = document.createDocumentFragment();

  while ((match = strongRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      appendTextWithLineBreaks(frag, text.slice(lastIndex, match.index));
    }
    const strong = document.createElement('strong');
    strong.textContent = match[1];
    frag.appendChild(strong);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    appendTextWithLineBreaks(frag, text.slice(lastIndex));
  }

  div.appendChild(frag);
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function validateEmail(email) {
  // Use HTML5 email validation via a temporary input element
  try {
    const input = document.createElement('input');
    input.type = 'email';
    input.value = email;
    if (input.checkValidity()) {
      // Additional practical regex for stronger validation
      const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return re.test(email);
    }
    return false;
  } catch (e) {
    // Fallback
    return /\S+@\S+\.\S+/.test(email);
  }
}

async function processMessage(text) {
  const value = String(text || '').trim();
  if (!value) return;

  appendMessage(value, 'user');

  if (step === 0) {
    appendMessage("Awesome! What's your name?");
    step = 1;
    return;
  }

  if (step === 1) {
    userData.name = value;
    appendMessage(`Nice to meet you, <strong>${escapeHtml(value)}</strong>! Can I get your email?`);
    step = 2;
    return;
  }

  if (step === 2) {
    if (!validateEmail(value)) {
      appendMessage("That doesn't look like a valid email. Please enter a valid email address.");
      return;
    }
    userData.email = value;
    appendMessage('Got it! Would you like to leave any message or interest note?');
    step = 3;
    return;
  }

  if (step === 3) {
    userData.message = value;
    appendMessage('Thanks! Saving your info...');
    const saved = await saveLead(userData);
    if (saved) appendMessage("You're all set. We'll reach out when we launch 🚀");
    else appendMessage("Thanks — we couldn't save your info right now, but we'll try to reach you.");
    step = 0;
    userData = {};
    return;
  }
}

// Event wiring
if (chatForm && userInput) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    processMessage(userInput.value);
    userInput.value = '';
    userInput.focus();
  });

  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      userInput.value = '';
      userInput.blur();
    }
  });

  userInput.setAttribute('aria-label', 'Type a message');
}

// Initialize Firebase (if configured)
tryInitFirebase();
