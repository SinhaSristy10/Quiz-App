/**
 * Quiz App - Main Application Logic & State Machine
 * Implements Questions, Timer, Scoring Engine, Lifelines, and Results Review.
 */

// Global State
const appState = {
  view: "start", // 'start' | 'quiz' | 'results' | 'leaderboard'
  selectedCategory: "all",
  selectedDifficulty: "all",
  questionCount: 10,
  timerDuration: 15, // seconds per question, 0 for untimed
  quiz: {
    questions: [],
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    streak: 0,
    maxStreak: 0,
    timeRemaining: 15,
    timerInterval: null,
    isAnswered: false,
    startTime: null,
    endTime: null,
    totalTimeSpent: 0,
    lifelines: {
      fiftyFifty: true,
      skip: true,
      extraTime: true
    },
    answers: []
  }
};

// DOM Elements
const elements = {
  // Screens
  screens: {
    start: document.getElementById("screen-start"),
    quiz: document.getElementById("screen-quiz"),
    results: document.getElementById("screen-results"),
    leaderboard: document.getElementById("screen-leaderboard")
  },
  // Audio toggle
  soundToggle: document.getElementById("sound-toggle"),
  soundIcon: document.getElementById("sound-icon"),

  // Start screen elements
  categoryList: document.getElementById("category-list"),
  difficultyPills: document.querySelectorAll(".diff-pill"),
  countPills: document.querySelectorAll(".count-pill"),
  timerPills: document.querySelectorAll(".timer-pill"),
  startBtn: document.getElementById("start-quiz-btn"),
  viewLeaderboardBtn: document.getElementById("view-leaderboard-btn"),
  totalQuestionsAvailable: document.getElementById("total-questions-count"),

  // Quiz screen elements
  quitQuizBtn: document.getElementById("quit-quiz-btn"),
  progressText: document.getElementById("progress-text"),
  progressBar: document.getElementById("quiz-progress-bar"),
  scoreDisplay: document.getElementById("current-score"),
  streakBadge: document.getElementById("streak-badge"),
  streakCount: document.getElementById("streak-count"),
  timerDisplay: document.getElementById("timer-display"),
  timerCircle: document.getElementById("timer-svg-circle"),
  timerContainer: document.getElementById("timer-container"),
  
  // Lifelines
  lifelineFifty: document.getElementById("lifeline-fifty"),
  lifelineSkip: document.getElementById("lifeline-skip"),
  lifelineTime: document.getElementById("lifeline-time"),

  // Question Card
  questionBadgeCategory: document.getElementById("question-category-badge"),
  questionBadgeDiff: document.getElementById("question-diff-badge"),
  questionText: document.getElementById("question-text"),
  optionsContainer: document.getElementById("options-container"),
  explanationBox: document.getElementById("explanation-box"),
  explanationText: document.getElementById("explanation-text"),
  nextBtn: document.getElementById("next-question-btn"),

  // Results Screen
  resultScoreBadge: document.getElementById("result-score-badge"),
  resultScoreText: document.getElementById("result-score-text"),
  resultScorePct: document.getElementById("result-score-pct"),
  resultCircle: document.getElementById("result-svg-circle"),
  resultTitle: document.getElementById("result-title"),
  resultSubtitle: document.getElementById("result-subtitle"),
  statCorrect: document.getElementById("stat-correct"),
  statAccuracy: document.getElementById("stat-accuracy"),
  statTime: document.getElementById("stat-time"),
  statMaxStreak: document.getElementById("stat-max-streak"),
  saveScoreForm: document.getElementById("save-score-form"),
  playerNameInput: document.getElementById("player-name-input"),
  saveScoreBtn: document.getElementById("save-score-btn"),
  saveMessage: document.getElementById("save-message"),
  playAgainBtn: document.getElementById("play-again-btn"),
  returnHomeBtn: document.getElementById("return-home-btn"),
  reviewFilterBtns: document.querySelectorAll(".review-filter-btn"),
  reviewList: document.getElementById("review-list"),

  // Leaderboard Screen
  leaderboardTableBody: document.getElementById("leaderboard-body"),
  leaderboardEmpty: document.getElementById("leaderboard-empty"),
  leaderboardHomeBtn: document.getElementById("leaderboard-home-btn"),
  clearLeaderboardBtn: document.getElementById("clear-leaderboard-btn"),

  // Quit Modal
  modalBackdrop: document.getElementById("modal-backdrop"),
  modalConfirmQuit: document.getElementById("confirm-quit-btn"),
  modalCancelQuit: document.getElementById("cancel-quit-btn")
};

// SVG circumference constants
const TIMER_RADIUS = 26;
const TIMER_CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS; // ~163.36
const RESULT_RADIUS = 68;
const RESULT_CIRCUMFERENCE = 2 * Math.PI * RESULT_RADIUS; // ~427.25

/**
 * INITIALIZATION
 */
function initApp() {
  renderCategorySelection();
  updateTotalAvailableQuestions();
  setupEventListeners();
  updateSoundIcon();
  setScreen("start");
}

/**
 * STATE & SCREEN NAVIGATION
 */
function setScreen(screenName) {
  appState.view = screenName;
  Object.keys(elements.screens).forEach((name) => {
    const el = elements.screens[name];
    if (el) {
      if (name === screenName) {
        el.classList.remove("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.classList.add("hidden");
        el.setAttribute("aria-hidden", "true");
      }
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * START SCREEN SETUP & CATEGORIES
 */
function renderCategorySelection() {
  if (!elements.categoryList) return;
  elements.categoryList.innerHTML = "";

  QUIZ_CATEGORIES.forEach((cat) => {
    const count = cat.id === "all" 
      ? QUIZ_QUESTIONS.length 
      : QUIZ_QUESTIONS.filter(q => q.category === cat.id).length;

    const card = document.createElement("button");
    card.type = "button";
    card.className = `category-card ${cat.id === appState.selectedCategory ? "selected" : ""}`;
    card.dataset.category = cat.id;

    // SVG icon mapping
    let iconSvg = "";
    switch (cat.icon) {
      case "code":
        iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
        break;
      case "atom":
        iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2.5 8a15.3 15.3 0 0 1 10 4 15.3 15.3 0 0 1 10-4 15.3 15.3 0 0 1-10 4 15.3 15.3 0 0 1-10-4z"></path></svg>`;
        break;
      case "globe":
        iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
        break;
      case "film":
        iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`;
        break;
      default: // sparkles
        iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`;
    }

    card.innerHTML = `
      <div class="category-icon-wrapper">${iconSvg}</div>
      <div class="category-info">
        <div class="category-name">${cat.name}</div>
        <div class="category-meta">${count} questions • ${cat.description}</div>
      </div>
      <div class="category-check">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
    `;

    card.addEventListener("click", () => {
      Sound.playClick();
      appState.selectedCategory = cat.id;
      document.querySelectorAll(".category-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      updateTotalAvailableQuestions();
    });

    elements.categoryList.appendChild(card);
  });
}

function updateTotalAvailableQuestions() {
  let pool = QUIZ_QUESTIONS;
  if (appState.selectedCategory !== "all") {
    pool = pool.filter(q => q.category === appState.selectedCategory);
  }
  if (appState.selectedDifficulty !== "all") {
    pool = pool.filter(q => q.difficulty === appState.selectedDifficulty);
  }
  if (elements.totalQuestionsAvailable) {
    elements.totalQuestionsAvailable.textContent = pool.length;
  }
}

/**
 * QUIZ INITIALIZATION & LIFECYCLE
 */
function startQuiz() {
  Sound.playClick();

  // 1. Filter Questions
  let filtered = [...QUIZ_QUESTIONS];
  if (appState.selectedCategory !== "all") {
    filtered = filtered.filter(q => q.category === appState.selectedCategory);
  }
  if (appState.selectedDifficulty !== "all") {
    filtered = filtered.filter(q => q.difficulty === appState.selectedDifficulty);
  }

  // Fallback if filter yields fewer than expected
  if (filtered.length === 0) {
    filtered = [...QUIZ_QUESTIONS];
  }

  // 2. Shuffle questions using Fisher-Yates
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }

  // 3. Slice according to user count and shuffle options per question
  const count = Math.min(appState.questionCount, filtered.length);
  const quizQuestions = filtered.slice(0, count).map(q => {
    // Pair each option with whether it's correct
    const paired = q.options.map((opt, idx) => ({ text: opt, isCorrect: idx === q.correct }));
    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }
    return {
      ...q,
      options: paired.map(p => p.text),
      correct: paired.findIndex(p => p.isCorrect)
    };
  });

  // 4. Reset quiz state
  appState.quiz = {
    questions: quizQuestions,
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    streak: 0,
    maxStreak: 0,
    timeRemaining: appState.timerDuration,
    timerInterval: null,
    isAnswered: false,
    startTime: Date.now(),
    endTime: null,
    totalTimeSpent: 0,
    lifelines: {
      fiftyFifty: true,
      skip: true,
      extraTime: true
    },
    answers: []
  };

  // Reset Lifeline buttons
  resetLifelinesUI();

  // Show Quiz View
  setScreen("quiz");
  loadQuestion(0);
}

function resetLifelinesUI() {
  [
    { btn: elements.lifelineFifty, active: true },
    { btn: elements.lifelineSkip, active: true },
    { btn: elements.lifelineTime, active: appState.timerDuration > 0 }
  ].forEach(item => {
    if (item.btn) {
      item.btn.disabled = !item.active;
      item.btn.classList.toggle("disabled", !item.active);
      item.btn.classList.remove("used");
    }
  });

  // If untimed, hide or disable timer container
  if (elements.timerContainer) {
    elements.timerContainer.style.display = appState.timerDuration === 0 ? "none" : "flex";
  }
}

/**
 * LOAD & RENDER QUESTION
 */
function loadQuestion(index) {
  const q = appState.quiz.questions[index];
  if (!q) {
    finishQuiz();
    return;
  }

  appState.quiz.isAnswered = false;
  clearInterval(appState.quiz.timerInterval);

  // Update Header Progress
  const currentNum = index + 1;
  const total = appState.quiz.questions.length;
  elements.progressText.textContent = `Question ${currentNum} of ${total}`;
  const pct = (index / total) * 100;
  elements.progressBar.style.width = `${pct}%`;

  // Update Score & Streak
  elements.scoreDisplay.textContent = appState.quiz.score.toLocaleString();
  updateStreakBadge();

  // Question Category & Difficulty Badges
  const catObj = QUIZ_CATEGORIES.find(c => c.id === q.category);
  elements.questionBadgeCategory.textContent = catObj ? catObj.name : q.category;
  elements.questionBadgeDiff.textContent = q.difficulty.toUpperCase();
  elements.questionBadgeDiff.className = `badge-difficulty badge-${q.difficulty}`;

  // Question Text
  elements.questionText.textContent = q.question;

  // Render Options
  renderOptions(q);

  // Hide Explanation & Next button
  elements.explanationBox.classList.add("hidden");
  elements.nextBtn.classList.add("hidden");
  elements.nextBtn.textContent = index === total - 1 ? "See Results →" : "Next Question →";

  // Start Timer
  if (appState.timerDuration > 0) {
    startTimer();
  }
}

function renderOptions(question) {
  elements.optionsContainer.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  question.options.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.dataset.index = idx;
    btn.innerHTML = `
      <span class="option-letter">${letters[idx]}</span>
      <span class="option-text">${escapeHtml(optText)}</span>
      <span class="option-icon"></span>
    `;

    btn.addEventListener("click", () => {
      if (!appState.quiz.isAnswered) {
        handleOptionSelect(idx);
      }
    });

    elements.optionsContainer.appendChild(btn);
  });
}

/**
 * TIMER ENGINE
 */
function startTimer() {
  clearInterval(appState.quiz.timerInterval);
  appState.quiz.timeRemaining = appState.timerDuration;
  updateTimerUI(appState.quiz.timeRemaining);

  appState.quiz.timerInterval = setInterval(() => {
    appState.quiz.timeRemaining -= 1;
    updateTimerUI(appState.quiz.timeRemaining);

    // Audio cue on critical seconds
    if (appState.quiz.timeRemaining <= 4 && appState.quiz.timeRemaining > 0) {
      Sound.playTick();
    }

    if (appState.quiz.timeRemaining <= 0) {
      clearInterval(appState.quiz.timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function updateTimerUI(seconds) {
  if (elements.timerDisplay) {
    elements.timerDisplay.textContent = Math.max(0, seconds);
  }

  if (elements.timerCircle && appState.timerDuration > 0) {
    const fraction = Math.max(0, seconds) / appState.timerDuration;
    const offset = TIMER_CIRCUMFERENCE - (fraction * TIMER_CIRCUMFERENCE);
    elements.timerCircle.style.strokeDashoffset = offset;

    // Color gradient shifts
    if (fraction <= 0.25) {
      elements.timerCircle.style.stroke = "#ef4444"; // Red
      elements.timerContainer.classList.add("pulse-urgent");
    } else if (fraction <= 0.5) {
      elements.timerCircle.style.stroke = "#f59e0b"; // Amber
      elements.timerContainer.classList.remove("pulse-urgent");
    } else {
      elements.timerCircle.style.stroke = "#10b981"; // Emerald green
      elements.timerContainer.classList.remove("pulse-urgent");
    }
  }
}

/**
 * ANSWER EVALUATION & SCORING
 */
function handleOptionSelect(selectedIndex) {
  if (appState.quiz.isAnswered) return;
  appState.quiz.isAnswered = true;
  clearInterval(appState.quiz.timerInterval);

  const q = appState.quiz.questions[appState.quiz.currentIndex];
  const isCorrect = selectedIndex === q.correct;
  const timeSpent = appState.timerDuration > 0 
    ? (appState.timerDuration - appState.quiz.timeRemaining) 
    : 0;

  // Options DOM styling
  const optionButtons = elements.optionsContainer.querySelectorAll(".option-btn");
  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add("correct");
      btn.querySelector(".option-icon").innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    }
    if (idx === selectedIndex && !isCorrect) {
      btn.classList.add("wrong");
      btn.querySelector(".option-icon").innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    }
  });

  // Calculate points
  if (isCorrect) {
    appState.quiz.correctCount++;
    appState.quiz.streak++;
    if (appState.quiz.streak > appState.quiz.maxStreak) {
      appState.quiz.maxStreak = appState.quiz.streak;
    }

    // Scoring formula: Base (100) + Speed Bonus (up to 50) * Streak Multiplier
    const basePoints = 100;
    const speedRatio = appState.timerDuration > 0 ? (appState.quiz.timeRemaining / appState.timerDuration) : 0.5;
    const speedBonus = Math.round(speedRatio * 50);
    const streakMultiplier = getStreakMultiplier(appState.quiz.streak);
    const earnedPoints = Math.round((basePoints + speedBonus) * streakMultiplier);

    appState.quiz.score += earnedPoints;

    Sound.playCorrect();
    if (appState.quiz.streak >= 3) {
      setTimeout(() => Sound.playStreak(), 250);
    }

    showScoreToast(`+${earnedPoints} pts! ${appState.quiz.streak >= 2 ? `(${streakMultiplier}x Streak)` : ""}`, "success");
  } else {
    appState.quiz.wrongCount++;
    appState.quiz.streak = 0;
    Sound.playWrong();
    showScoreToast("Incorrect", "error");
  }

  // Save answer to session history
  appState.quiz.answers.push({
    questionId: q.id,
    question: q.question,
    selectedOption: selectedIndex,
    correctOption: q.correct,
    isCorrect: isCorrect,
    timeSpent: timeSpent,
    options: q.options,
    explanation: q.explanation
  });

  // Update UI stats
  elements.scoreDisplay.textContent = appState.quiz.score.toLocaleString();
  updateStreakBadge();

  // Show explanation
  if (q.explanation) {
    elements.explanationText.textContent = q.explanation;
    elements.explanationBox.classList.remove("hidden");
  }

  // Reveal Next button
  elements.nextBtn.classList.remove("hidden");
  elements.nextBtn.focus();
}

function handleTimeout() {
  if (appState.quiz.isAnswered) return;
  appState.quiz.isAnswered = true;

  const q = appState.quiz.questions[appState.quiz.currentIndex];
  appState.quiz.wrongCount++;
  appState.quiz.streak = 0;
  updateStreakBadge();

  // Disable options and show correct answer
  const optionButtons = elements.optionsContainer.querySelectorAll(".option-btn");
  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add("correct");
      btn.querySelector(".option-icon").innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    }
  });

  Sound.playTimeout();
  showScoreToast("Time's Up!", "timeout");

  // Save timeout answer
  appState.quiz.answers.push({
    questionId: q.id,
    question: q.question,
    selectedOption: -1, // Timed out
    correctOption: q.correct,
    isCorrect: false,
    timeSpent: appState.timerDuration,
    options: q.options,
    explanation: q.explanation
  });

  if (q.explanation) {
    elements.explanationText.textContent = q.explanation;
    elements.explanationBox.classList.remove("hidden");
  }

  elements.nextBtn.classList.remove("hidden");
  elements.nextBtn.focus();
}

function nextQuestion() {
  Sound.playClick();
  appState.quiz.currentIndex++;
  if (appState.quiz.currentIndex < appState.quiz.questions.length) {
    loadQuestion(appState.quiz.currentIndex);
  } else {
    finishQuiz();
  }
}

/**
 * LIFELINES
 */
function useFiftyFifty() {
  if (appState.quiz.isAnswered || !appState.quiz.lifelines.fiftyFifty) return;
  appState.quiz.lifelines.fiftyFifty = false;
  elements.lifelineFifty.disabled = true;
  elements.lifelineFifty.classList.add("used");
  Sound.playLifeline();

  const q = appState.quiz.questions[appState.quiz.currentIndex];
  const incorrectIndices = [0, 1, 2, 3].filter(i => i !== q.correct);

  // Shuffle incorrect to eliminate 2 random wrong ones
  for (let i = incorrectIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [incorrectIndices[i], incorrectIndices[j]] = [incorrectIndices[j], incorrectIndices[i]];
  }

  const toRemove = incorrectIndices.slice(0, 2);
  const optionButtons = elements.optionsContainer.querySelectorAll(".option-btn");
  toRemove.forEach(idx => {
    const btn = optionButtons[idx];
    if (btn) {
      btn.classList.add("dimmed");
      btn.disabled = true;
    }
  });

  showScoreToast("50:50 Lifeline Activated!", "info");
}

function useSkipQuestion() {
  if (appState.quiz.isAnswered || !appState.quiz.lifelines.skip) return;
  appState.quiz.lifelines.skip = false;
  elements.lifelineSkip.disabled = true;
  elements.lifelineSkip.classList.add("used");
  Sound.playLifeline();

  clearInterval(appState.quiz.timerInterval);

  showScoreToast("Question Skipped!", "info");

  // Move to next without penalty
  appState.quiz.currentIndex++;
  if (appState.quiz.currentIndex < appState.quiz.questions.length) {
    loadQuestion(appState.quiz.currentIndex);
  } else {
    finishQuiz();
  }
}

function useExtraTime() {
  if (appState.quiz.isAnswered || !appState.quiz.lifelines.extraTime || appState.timerDuration === 0) return;
  appState.quiz.lifelines.extraTime = false;
  elements.lifelineTime.disabled = true;
  elements.lifelineTime.classList.add("used");
  Sound.playLifeline();

  appState.quiz.timeRemaining += 10;
  updateTimerUI(appState.quiz.timeRemaining);
  showScoreToast("+10 Seconds Added!", "info");
}

/**
 * STREAK HELPERS
 */
function getStreakMultiplier(streak) {
  if (streak >= 5) return 2.0;
  if (streak >= 4) return 1.75;
  if (streak >= 3) return 1.5;
  if (streak >= 2) return 1.25;
  return 1.0;
}

function updateStreakBadge() {
  const streak = appState.quiz.streak;
  if (streak >= 2) {
    elements.streakCount.textContent = `${streak}x 🔥`;
    elements.streakBadge.classList.add("active");
  } else {
    elements.streakBadge.classList.remove("active");
  }
}

/**
 * TOAST NOTIFICATIONS
 */
function showScoreToast(text, type = "info") {
  const existing = document.querySelector(".score-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `score-toast toast-${type}`;
  toast.textContent = text;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 1600);
}

/**
 * RESULTS SCREEN GENERATOR
 */
function finishQuiz() {
  clearInterval(appState.quiz.timerInterval);
  appState.quiz.endTime = Date.now();
  const durationSec = Math.round((appState.quiz.endTime - appState.quiz.startTime) / 1000);
  appState.quiz.totalTimeSpent = durationSec;

  const total = appState.quiz.questions.length;
  const correct = appState.quiz.correctCount;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Final progress bar
  elements.progressBar.style.width = "100%";

  // Results Screen Data
  elements.resultScoreText.textContent = `${appState.quiz.score.toLocaleString()} PTS`;
  elements.resultScorePct.textContent = `${pct}%`;
  elements.statCorrect.textContent = `${correct} / ${total}`;
  elements.statAccuracy.textContent = `${pct}%`;
  elements.statTime.textContent = formatDuration(durationSec);
  elements.statMaxStreak.textContent = `${appState.quiz.maxStreak}x`;

  // Circular gauge fill
  const strokeOffset = RESULT_CIRCUMFERENCE - (pct / 100) * RESULT_CIRCUMFERENCE;
  elements.resultCircle.style.strokeDashoffset = strokeOffset;

  // Grade Assessment
  let title = "";
  let subtitle = "";
  let badgeColor = "#6366f1";

  if (pct === 100) {
    title = "Perfection! 🏆";
    subtitle = "Flawless mastery. You scored every single question right!";
    badgeColor = "#10b981";
  } else if (pct >= 80) {
    title = "Quiz Master! 🌟";
    subtitle = "Exceptional intellect! You nailed almost every challenge.";
    badgeColor = "#10b981";
  } else if (pct >= 60) {
    title = "Well Done! 💡";
    subtitle = "Solid performance! With a little more review, you'll be unstoppable.";
    badgeColor = "#3b82f6";
  } else if (pct >= 40) {
    title = "Good Effort! 📚";
    subtitle = "Nice try! Review the breakdown below and sharpen your edge.";
    badgeColor = "#f59e0b";
  } else {
    title = "Keep Practicing! 🎯";
    subtitle = "Every master was once a beginner. Try another round to improve!";
    badgeColor = "#ef4444";
  }

  elements.resultTitle.textContent = title;
  elements.resultSubtitle.textContent = subtitle;
  elements.resultCircle.style.stroke = badgeColor;

  // Sound & Confetti
  if (pct >= 70) {
    Sound.playVictory();
    Confetti.launch(4500, 140);
  }

  // Build Detailed Review
  renderQuestionReview("all");

  // Reset Save Form
  elements.saveScoreForm.style.display = "block";
  elements.saveMessage.textContent = "";
  elements.playerNameInput.value = localStorage.getItem("quiz_last_player_name") || "";

  setScreen("results");
}

function renderQuestionReview(filter = "all") {
  elements.reviewList.innerHTML = "";
  const answers = appState.quiz.answers;

  const filteredAnswers = answers.filter(a => {
    if (filter === "correct") return a.isCorrect;
    if (filter === "wrong") return !a.isCorrect;
    return true;
  });

  if (filteredAnswers.length === 0) {
    elements.reviewList.innerHTML = `<div class="review-empty">No questions found in this filter.</div>`;
    return;
  }

  const letters = ["A", "B", "C", "D"];

  filteredAnswers.forEach((ans, idx) => {
    const item = document.createElement("div");
    item.className = `review-card ${ans.isCorrect ? "review-correct" : "review-wrong"}`;

    const userSelectedText = ans.selectedOption === -1 
      ? "Timed Out (No Answer)" 
      : `${letters[ans.selectedOption]}: ${ans.options[ans.selectedOption]}`;

    const correctText = `${letters[ans.correctOption]}: ${ans.options[ans.correctOption]}`;

    item.innerHTML = `
      <div class="review-header">
        <span class="review-status-badge ${ans.isCorrect ? "badge-success" : "badge-error"}">
          ${ans.isCorrect ? "✓ Correct" : ans.selectedOption === -1 ? "⏱ Timed Out" : "✗ Incorrect"}
        </span>
        <span class="review-qnum">#${idx + 1}</span>
      </div>
      <div class="review-question">${escapeHtml(ans.question)}</div>
      <div class="review-answers-grid">
        <div class="review-answer-pill ${ans.isCorrect ? "pill-user-correct" : "pill-user-wrong"}">
          <span class="pill-label">Your Choice:</span>
          <span class="pill-val">${escapeHtml(userSelectedText)}</span>
        </div>
        ${!ans.isCorrect ? `
          <div class="review-answer-pill pill-correct">
            <span class="pill-label">Correct Answer:</span>
            <span class="pill-val">${escapeHtml(correctText)}</span>
          </div>
        ` : ""}
      </div>
      ${ans.explanation ? `
        <div class="review-explanation">
          <span class="explanation-icon">💡</span>
          <span>${escapeHtml(ans.explanation)}</span>
        </div>
      ` : ""}
    `;

    elements.reviewList.appendChild(item);
  });
}

/**
 * LEADERBOARD & STORAGE
 */
function saveScore() {
  const name = elements.playerNameInput.value.trim() || "Anonymous Hero";
  localStorage.setItem("quiz_last_player_name", name);

  const entry = {
    id: Date.now(),
    name: name,
    score: appState.quiz.score,
    accuracy: Math.round((appState.quiz.correctCount / appState.quiz.questions.length) * 100),
    category: appState.selectedCategory,
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    timeSpent: appState.quiz.totalTimeSpent
  };

  const records = getLeaderboardRecords();
  records.push(entry);
  records.sort((a, b) => b.score - a.score || b.accuracy - a.accuracy);
  
  // Keep top 20
  const trimmed = records.slice(0, 20);
  localStorage.setItem("quiz_leaderboard", JSON.stringify(trimmed));

  elements.saveMessage.textContent = "✓ Score saved to Leaderboard!";
  elements.saveMessage.style.color = "#10b981";
  elements.saveScoreBtn.disabled = true;

  setTimeout(() => {
    loadLeaderboard();
    setScreen("leaderboard");
  }, 800);
}

function getLeaderboardRecords() {
  try {
    const raw = localStorage.getItem("quiz_leaderboard");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function loadLeaderboard() {
  const records = getLeaderboardRecords();
  elements.leaderboardTableBody.innerHTML = "";

  if (records.length === 0) {
    elements.leaderboardEmpty.classList.remove("hidden");
    return;
  }

  elements.leaderboardEmpty.classList.add("hidden");

  records.forEach((rec, idx) => {
    const tr = document.createElement("tr");
    let rankBadge = `${idx + 1}`;
    if (idx === 0) rankBadge = `<span class="rank-medal gold">🥇 1st</span>`;
    else if (idx === 1) rankBadge = `<span class="rank-medal silver">🥈 2nd</span>`;
    else if (idx === 2) rankBadge = `<span class="rank-medal bronze">🥉 3rd</span>`;

    const catObj = QUIZ_CATEGORIES.find(c => c.id === rec.category);
    const catName = catObj ? catObj.name : rec.category;

    tr.innerHTML = `
      <td>${rankBadge}</td>
      <td class="player-name">${escapeHtml(rec.name)}</td>
      <td class="player-score">${rec.score.toLocaleString()}</td>
      <td>${rec.accuracy}%</td>
      <td><span class="table-cat-badge">${catName}</span></td>
      <td>${rec.date}</td>
    `;
    elements.leaderboardTableBody.appendChild(tr);
  });
}

function clearLeaderboard() {
  if (confirm("Are you sure you want to clear all high scores?")) {
    localStorage.removeItem("quiz_leaderboard");
    loadLeaderboard();
  }
}

/**
 * AUDIO ICON TOGGLE
 */
function updateSoundIcon() {
  const muted = Sound.isMuted();
  if (elements.soundIcon) {
    elements.soundIcon.innerHTML = muted
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
  }
}

/**
 * MODALS & DIALOGS
 */
function showQuitModal() {
  elements.modalBackdrop.classList.remove("hidden");
}

function hideQuitModal() {
  elements.modalBackdrop.classList.add("hidden");
}

function confirmQuitQuiz() {
  clearInterval(appState.quiz.timerInterval);
  hideQuitModal();
  setScreen("start");
}

/**
 * EVENT LISTENERS SETUP
 */
function setupEventListeners() {
  // Sound button
  if (elements.soundToggle) {
    elements.soundToggle.addEventListener("click", () => {
      Sound.toggleMute();
      updateSoundIcon();
    });
  }

  // Difficulty Pills
  elements.difficultyPills.forEach(pill => {
    pill.addEventListener("click", () => {
      Sound.playClick();
      elements.difficultyPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      appState.selectedDifficulty = pill.dataset.difficulty;
      updateTotalAvailableQuestions();
    });
  });

  // Question Count Pills
  elements.countPills.forEach(pill => {
    pill.addEventListener("click", () => {
      Sound.playClick();
      elements.countPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      appState.questionCount = parseInt(pill.dataset.count, 10);
    });
  });

  // Timer Pills
  elements.timerPills.forEach(pill => {
    pill.addEventListener("click", () => {
      Sound.playClick();
      elements.timerPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      appState.timerDuration = parseInt(pill.dataset.timer, 10);
    });
  });

  // Start & Leaderboard buttons
  if (elements.startBtn) elements.startBtn.addEventListener("click", startQuiz);
  if (elements.viewLeaderboardBtn) {
    elements.viewLeaderboardBtn.addEventListener("click", () => {
      Sound.playClick();
      loadLeaderboard();
      setScreen("leaderboard");
    });
  }

  // Quiz Lifelines
  if (elements.lifelineFifty) elements.lifelineFifty.addEventListener("click", useFiftyFifty);
  if (elements.lifelineSkip) elements.lifelineSkip.addEventListener("click", useSkipQuestion);
  if (elements.lifelineTime) elements.lifelineTime.addEventListener("click", useExtraTime);

  // Next Question Button
  if (elements.nextBtn) elements.nextBtn.addEventListener("click", nextQuestion);

  // Quit modal triggers
  if (elements.quitQuizBtn) elements.quitQuizBtn.addEventListener("click", showQuitModal);
  if (elements.modalCancelQuit) elements.modalCancelQuit.addEventListener("click", hideQuitModal);
  if (elements.modalConfirmQuit) elements.modalConfirmQuit.addEventListener("click", confirmQuitQuiz);

  // Results screen buttons
  if (elements.playAgainBtn) elements.playAgainBtn.addEventListener("click", startQuiz);
  if (elements.returnHomeBtn) {
    elements.returnHomeBtn.addEventListener("click", () => {
      Sound.playClick();
      setScreen("start");
    });
  }
  if (elements.saveScoreForm) {
    elements.saveScoreForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveScore();
    });
  }

  // Review Filter Tabs
  elements.reviewFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      Sound.playClick();
      elements.reviewFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderQuestionReview(btn.dataset.filter);
    });
  });

  // Leaderboard buttons
  if (elements.leaderboardHomeBtn) {
    elements.leaderboardHomeBtn.addEventListener("click", () => {
      Sound.playClick();
      setScreen("start");
    });
  }
  if (elements.clearLeaderboardBtn) {
    elements.clearLeaderboardBtn.addEventListener("click", clearLeaderboard);
  }

  // Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    // Only in quiz screen
    if (appState.view !== "quiz") return;

    if (e.key === "Escape") {
      showQuitModal();
      return;
    }

    if (!appState.quiz.isAnswered) {
      if (e.key === "1" || e.key.toLowerCase() === "a") handleOptionSelect(0);
      else if (e.key === "2" || e.key.toLowerCase() === "b") handleOptionSelect(1);
      else if (e.key === "3" || e.key.toLowerCase() === "c") handleOptionSelect(2);
      else if (e.key === "4" || e.key.toLowerCase() === "d") handleOptionSelect(3);
    } else {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        nextQuestion();
      }
    }
  });
}

/**
 * UTILITIES
 */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
