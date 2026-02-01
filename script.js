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
    "https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif",  // Happy celebration
    "https://media.giphy.com/media/kyLYXonQYYfwYDIeZl/giphy.gif",  // Excited yes
    "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",       // Celebration dance
    "https://media.giphy.com/media/5xtDarmwsuR9sDRObyU/giphy.gif", // Happy dance
    "https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif",  // Yay celebration
    "https://media.giphy.com/media/LZElUsjl1Bu6c/giphy.gif",        // Excited celebration
    "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif",       // Happy yes
    "https://media.giphy.com/media/Is1O1TWV0LEJi/giphy.gif"         // Celebration confetti
];

const CAT_GIF = "https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif"; // Animated T-Rex eating
const CONFETTI_COLORS = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#ffd89b'];
const MAX_JUMPS = 4;
const MAX_NO_CLICKS = 10;
const CONFETTI_COUNT = 80;

// State
let messageIndex = 0;
let noBtnClickCount = 0;
let noButtonJumpCount = 0;
let catEaten = false;

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
    const yesRect = yesBtn.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // More conservative margins to stay within card
    const margin = 40;
    const minX = card.left + margin;
    const minY = card.top + margin + 150; // Start below the question text
    const maxX = card.right - btnWidth - margin;
    const maxY = card.bottom - btnHeight - margin - 100; // Stay above bottom
    
    if (maxX <= minX || maxY <= minY) return;
    
    let randomX, randomY;
    let attempts = 0;
    const maxAttempts = 10;
    
    // Try to find a position that doesn't overlap with Yes button
    do {
        randomX = clamp(random(minX, maxX), minX, maxX);
        randomY = clamp(random(minY, maxY), minY, maxY);
        attempts++;
        
        // Check if this position would overlap with Yes button
        const wouldOverlap = !(
            randomX + btnWidth < yesRect.left - 20 ||
            randomX > yesRect.right + 20 ||
            randomY + btnHeight < yesRect.top - 20 ||
            randomY > yesRect.bottom + 20
        );
        
        if (!wouldOverlap || attempts >= maxAttempts) break;
    } while (attempts < maxAttempts);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

function summonCat() {
    catEaten = true;
    
    // Create animated cat element
    const cat = document.createElement('img');
    cat.src = CAT_GIF;
    cat.className = 'cat';
    cat.alt = 'Cat eating the No button';
    
    // Position cat near the No button
    const btnRect = noBtn.getBoundingClientRect();
    cat.style.position = 'fixed';
    cat.style.left = `${btnRect.left - 100}px`;
    cat.style.top = `${btnRect.top - 50}px`;
    cat.style.width = '200px';
    cat.style.zIndex = '9999';
    cat.style.opacity = '0';
    cat.style.transform = 'scale(0.5)';
    cat.style.transition = 'all 0.5s ease';
    
    document.body.appendChild(cat);
    
    // Animate cat appearing
    setTimeout(() => {
        cat.style.opacity = '1';
        cat.style.transform = 'scale(1)';
    }, 50);
    
    // Animate eating the button
    setTimeout(() => {
        noBtn.style.transform = 'scale(0) rotate(180deg)';
        noBtn.style.opacity = '0';
        pleaseText.innerHTML = "😺 The cat ate the No button!<br>Only Yes remains! 😺";
        pleaseText.style.color = '#f5576c';
        pleaseText.style.fontWeight = '700';
    }, 800);
    
    // Remove button and cat
    setTimeout(() => {
        noBtn.style.display = 'none';
        cat.style.opacity = '0';
    }, 2000);
    
    setTimeout(() => {
        cat.remove();
    }, 2500);
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
// Handle both desktop hover and mobile touch for No button movement
function handleNoButtonInteraction(e) {
    if (catEaten) return;
    
    if (noButtonJumpCount >= MAX_JUMPS) {
        pleaseText.textContent = "Okay fine, you can click it now... 😔";
        return;
    }
    
    // On mobile tap/click (first 4 times), prevent default and move button
    if (e.type === 'touchstart') {
        e.preventDefault();
        e.stopPropagation();
    }
    
    moveNoButton();
    noButtonJumpCount++;
    showPleaseMessage();
    yesBtn.style.transform = 'scale(1.1)';
}

// Desktop: move on hover
noBtn.addEventListener('mouseover', handleNoButtonInteraction);

// Mobile: move on touch (first 4 times)
noBtn.addEventListener('touchstart', handleNoButtonInteraction, { passive: false });

// Click handler for after button stops moving (desktop and mobile)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (catEaten) return;
    
    // If still jumping (less than 4 jumps), just move the button
    if (noButtonJumpCount < MAX_JUMPS) {
        handleNoButtonInteraction(e);
        return;
    }
    
    noBtnClickCount++;
    
    // Check if cat should appear
    if (noBtnClickCount >= MAX_NO_CLICKS) {
        summonCat();
        return;
    }
    
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
