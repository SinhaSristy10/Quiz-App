# ⚡ QuizNova - Interactive Knowledge Arena

A modern, responsive, and feature-rich Quiz Web Application built strictly around the core learning objectives: **State, Conditional UI, and Application Logic**.

---

## 🌟 Features Implemented (Matching Project Requirements)

| Core Requirement | Implementation Details |
| :--- | :--- |
| **Questions** | • **60 Comprehensive Questions** across 4 categories: *Tech & Coding*, *Science & Space*, *World & Geography*, and *Pop Culture & Film* (plus "All Categories" mixed mode).<br>• **3 Difficulty Tiers**: Easy, Medium, and Hard.<br>• **Dynamic Randomization**: Fisher-Yates shuffle applied to questions and individual options for fresh playthroughs every time.<br>• **Lifelines Support**: 50:50 (removes two incorrect options), Skip Question (pass without penalty), and +10s Time Boost.<br>• **Deep Explanations**: Every question includes educational reasoning shown immediately after answering and in the final review. |
| **Timer** | • **Circular Animated SVG Countdown Ring** with smooth `stroke-dashoffset` interpolation.<br>• **Visual Urgency Indicators**: Meter shifts dynamically from Emerald Green (safe) to Amber (warning) to Crimson (urgent pulse).<br>• **Audio Ticking**: Ticks on final 4 seconds with audio cues.<br>• **Flexible Timer Options**: Choose between 10s (Blitz), 15s (Standard), 30s (Relaxed), or Untimed mode.<br>• **Timeout Handling**: Automatically reveals correct answer and transitions smoothly when time expires. |
| **Scoring** | • **Base Score**: 100 points for each correct answer.<br>• **Speed Bonus**: Up to 50 additional bonus points based on remaining time.<br>• **Streak Multiplier**: Consecutive correct answers activate the streak flame (from 1.25x up to 2.0x multiplier 🔥).<br>• **Live HUD**: Instant score display and real-time floating score toast notifications. |
| **Results Screen** | • **Animated Circular Gauge**: Visual representation of total accuracy percentage (0% - 100%).<br>• **Dynamic Assessment Badges**: "Perfection! 🏆", "Quiz Master! 🌟", "Well Done! 💡", "Good Effort! 📚", or "Keep Practicing! 🎯".<br>• **4-Card Stat Matrix**: Total correct count, overall accuracy %, total time elapsed, and maximum streak.<br>• **Interactive Question Review**: Filter review cards by *All*, *Correct*, or *Incorrect*, with side-by-side comparison of user choice vs correct answer and explanations. |
| **State & Persistence** | • **Robust State Machine**: Seamless conditional UI transitions between `start`, `quiz`, `results`, and `leaderboard` screens.<br>• **Hall of Fame (Leaderboard)**: Persistent local storage saving player handles, scores, accuracy %, category, and dates with 🥇 Gold, 🥈 Silver, and 🥉 Bronze medals.<br>• **Quit Modal Dialog**: Prevents accidental abandonment during an active quiz session. |

---

## 🎨 UI & Aesthetics

- **Glassmorphism & Dark Luxury Theme**: Deep navy/slate background with dual ambient radial glows and glass cards (`backdrop-filter: blur(16px)`).
- **Zero-Dependency Web Audio API**: Crisp synthetic tones for clicks, correct answers (major triad chime), wrong answers, timer ticks, and victory fanfare. Works 100% offline with zero external audio assets!
- **Celebration Particle Engine**: Custom canvas confetti burst upon scoring 70%+ on results.
- **Full Keyboard Accessibility**:
  - `1`, `2`, `3`, `4` or `A`, `B`, `C`, `D`: Select options
  - `Enter` or `Space`: Advance to next question
  - `Esc`: Open exit confirmation dialog

---

## 📁 File Structure

```text
Quiz App/
├── index.html          # Semantic HTML5 markup with all 4 screens & modals
├── css/
│   └── style.css       # Complete modern styling, glassmorphism, animations & responsiveness
├── js/
│   ├── questions.js    # 60 questions dataset with categories, difficulties, and explanations
│   ├── audio.js        # Pure Web Audio API synthesized sound engine & mute toggle
│   ├── confetti.js     # Lightweight HTML5 Canvas particle confetti engine
│   └── app.js          # Core state machine, scoring engine, lifelines, timer & storage
└── README.md           # Documentation and guide
```

---

## 🚀 How to Run

Because this app uses clean standard web technologies (HTML5, CSS3, JavaScript ES6) with zero runtime dependencies:

1. **Directly in Browser**:
   - Double-click `index.html` to open it immediately in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

2. **Or with a Local Static Server** (optional):
   ```bash
   npx serve .
   ```
   or using any VS Code / IDE Live Server extension.
