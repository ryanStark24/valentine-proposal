# Valentine's Day Proposal 💕

A beautiful, interactive single-page application to ask that special someone to be your Valentine!

## Features

- 🎨 Beautiful gradient background with floating hearts
- 💫 Interactive "No" button that runs away from the cursor
- 🎉 Celebration screen with confetti when "Yes" is clicked
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 💕 Romantic color scheme

## How to Run

### Option 1: Simple (No Build Required)

1. Compile TypeScript to JavaScript:
   ```bash
   npm install
   npm run build
   ```
2. Open `index.html` in your browser

### Option 2: With Local Server

```bash
npm install
npm run build
npm run serve
```

Then open the URL shown in your terminal (usually http://localhost:3000)

### Option 3: Development Mode with Watch

```bash
npm install
npm run watch
```

This will watch for TypeScript changes and automatically recompile.

## How It Works

- The **Yes** button works normally and leads to a celebration
- The **No** button will:
  - Run away from your cursor when you hover over it
  - Show pleading messages
  - Make the Yes button bigger
  - Get smaller itself with each attempt
- Even if clicked, the No button will show messages encouraging you to choose Yes!

Good luck with your proposal! 💕
