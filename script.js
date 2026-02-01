// DOM Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const pleaseText = document.getElementById('pleaseText');
const questionCard = document.querySelector('.question-card');
const celebration = document.getElementById('celebration');

// Configuration
const PLEASE_MESSAGES = [
    "Please? 🥺", "Are you sure? 💔", "Think again! 💭", "Really? 😢",
    "Just say yes! 💕", "Pretty please? 🙏", "Don't break my heart! 💔",
    "Come on! 😊", "You know you want to say yes! 😄", "One more chance? 🤞"
];

const MEME_URLS = [
    "https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif",
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    "https://media.giphy.com/media/kyLYXonQYYfwYDIeZl/giphy.gif",
    "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
    "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
    "https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif",
    "https://media.giphy.com/media/5xtDarmwsuR9sDRObyU/giphy.gif",
    "https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"
];

const CONFETTI_COLORS = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#ffd89b'];
const MAX_JUMPS = 4;
const CONFETTI_COUNT = 80;

// State
let messageIndex = 0;
let noBtnClickCount = 0;
let noButtonJumpCount = 0;

// Initialize No button
noBtn.style.position = 'relative';
noBtn.style.transition = 'all 0.3s ease';

// Helper Functions
const clamp = (num, min, max) => Math.max(min, Math.min(num, max));
const random = (min, max) => Math.random() * (max - min) + min;

function showPleaseMessage() {
    pleaseText.textContent = PLEASE_MESSAGES[messageIndex];
    messageIndex = (messageIndex + 1) % PLEASE_MESSAGES.length;
}

function moveNoButton() {
    const card = questionCard.getBoundingClientRect();
    const margin = 20;
    
    const maxX = card.left + card.width - noBtn.offsetWidth - margin;
    const maxY = card.top + card.height - noBtn.offsetHeight - margin;
    const minX = card.left + margin;
    const minY = card.top + margin;
    
    if (maxX <= minX || maxY <= minY) return;
    
    const randomX = clamp(random(minX, maxX), minX, maxX);
    const randomY = clamp(random(minY, maxY), minY, maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

function displayRandomMeme() {
    const memeContainer = document.getElementById('memeContainer');
    const memeImg = document.createElement('img');
    
    memeImg.src = MEME_URLS[Math.floor(Math.random() * MEME_URLS.length)];
    memeImg.alt = 'Celebration meme';
    memeImg.style.opacity = '0';
    
    memeImg.onerror = () => {
        memeImg.alt = '🎉 Celebration! 🎉';
        memeImg.style.fontSize = '3rem';
    };
    
    memeContainer.appendChild(memeImg);
    setTimeout(() => {
        memeImg.style.transition = 'opacity 0.5s ease-in';
        memeImg.style.opacity = '1';
    }, 100);
}

function createConfetti() {
    const container = document.querySelector('.confetti-container');
    
    for (let i = 0; i < CONFETTI_COUNT; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
            confetti.style.animationDuration = `${random(2.5, 3.5)}s`;
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3500);
        }, i * 15);
    }
}

// Event Listeners
noBtn.addEventListener('mouseover', () => {
    if (noButtonJumpCount >= MAX_JUMPS) {
        pleaseText.textContent = "Okay fine, you can click it now... 😔";
        return;
    }
    
    moveNoButton();
    noButtonJumpCount++;
    showPleaseMessage();
    yesBtn.style.transform = 'scale(1.1)';
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (noButtonJumpCount < MAX_JUMPS) return;
    
    noBtnClickCount++;
    showPleaseMessage();
    
    const yesScale = Math.min(1.1 + noBtnClickCount * 0.1, 1.5);
    const noScale = Math.max(1 - noBtnClickCount * 0.1, 0.5);
    
    yesBtn.style.transform = `scale(${yesScale})`;
    noBtn.style.transform = `scale(${noScale})`;
});

yesBtn.addEventListener('click', () => {
    questionCard.style.display = 'none';
    celebration.classList.remove('hidden');
    
    displayRandomMeme();
    createConfetti();
    
    setTimeout(() => celebration.style.transform = 'scale(1.1)', 100);
});
