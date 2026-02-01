// Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const pleaseText = document.getElementById('pleaseText');
const questionCard = document.querySelector('.question-card');
const celebration = document.getElementById('celebration');
// Messages to display when trying to click No
const pleaseMessages = [
    "Please? 🥺",
    "Are you sure? 💔",
    "Think again! 💭",
    "Really? 😢",
    "Just say yes! 💕",
    "Pretty please? 🙏",
    "Don't break my heart! 💔",
    "Come on! 😊",
    "You know you want to say yes! 😄",
    "One more chance? 🤞"
];
let messageIndex = 0;
let noBtnClickCount = 0;
// Make the No button run away from the cursor
noBtn.addEventListener('mouseover', (e) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    // Calculate random position
    const randomX = Math.random() * (windowWidth - btnWidth - 100) + 50;
    const randomY = Math.random() * (windowHeight - btnHeight - 100) + 50;
    // Move button to random position
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    // Show a random message
    showPleaseMessage();
    // Make Yes button bigger to encourage clicking
    yesBtn.style.transform = 'scale(1.1)';
    // Shake the question slightly
    questionCard.style.animation = 'shake 0.5s';
    setTimeout(() => {
        questionCard.style.animation = '';
    }, 500);
});
// If somehow No button is clicked, show messages
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noBtnClickCount++;
    showPleaseMessage();
    // Make Yes button even bigger
    const scale = 1.1 + (noBtnClickCount * 0.1);
    yesBtn.style.transform = `scale(${Math.min(scale, 1.5)})`;
    // Make No button smaller
    const noScale = 1 - (noBtnClickCount * 0.1);
    noBtn.style.transform = `scale(${Math.max(noScale, 0.5)})`;
});
// Show random "please" message
function showPleaseMessage() {
    pleaseText.textContent = pleaseMessages[messageIndex];
    messageIndex = (messageIndex + 1) % pleaseMessages.length;
}
// Yes button click - Show celebration
yesBtn.addEventListener('click', () => {
    questionCard.style.display = 'none';
    celebration.classList.remove('hidden');
    // Create confetti
    createConfetti();
    // Play celebration animation
    setTimeout(() => {
        celebration.style.transform = 'scale(1.1)';
    }, 100);
});
// Create confetti effect
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#ffd89b'];
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
            confettiContainer.appendChild(confetti);
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 20);
    }
}
// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
