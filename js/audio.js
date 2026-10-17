/**
 * Quiz App - Synthetic Audio Engine (Web Audio API)
 * Pure synthesized sound effects with zero external audio assets.
 * Guarantees instant playback, offline capability, and zero asset loading failures.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("quiz_sound_muted") === "true";
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("quiz_sound_muted", this.muted);
    return this.muted;
  }

  playTone(freq, type, duration, startTime = 0, gainLevel = 0.15) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      // Graceful fallback for restricted audio contexts
    }
  }

  playClick() {
    this.playTone(600, "sine", 0.05, 0, 0.08);
  }

  playCorrect() {
    if (this.muted) return;
    this.init();
    // Radiant major chord arpeggio: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, "triangle", 0.22, idx * 0.06, 0.15);
    });
  }

  playWrong() {
    if (this.muted) return;
    this.init();
    // Low double buzz
    this.playTone(180, "sawtooth", 0.14, 0, 0.12);
    this.playTone(140, "sawtooth", 0.22, 0.1, 0.12);
  }

  playTimeout() {
    if (this.muted) return;
    this.init();
    this.playTone(280, "square", 0.15, 0, 0.1);
    this.playTone(220, "square", 0.25, 0.16, 0.1);
  }

  playStreak() {
    if (this.muted) return;
    this.init();
    // Sparkle high chime
    [784, 988, 1175, 1568].forEach((freq, i) => {
      this.playTone(freq, "sine", 0.2, i * 0.05, 0.12);
    });
  }

  playLifeline() {
    if (this.muted) return;
    this.init();
    // Swell chime
    [440, 554, 659, 880].forEach((freq, i) => {
      this.playTone(freq, "triangle", 0.25, i * 0.07, 0.12);
    });
  }

  playTick() {
    this.playTone(900, "sine", 0.03, 0, 0.06);
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    // Grand victory fanfare
    const fanfare = [
      { f: 523.25, d: 0.12, t: 0.00 },
      { f: 523.25, d: 0.12, t: 0.13 },
      { f: 523.25, d: 0.12, t: 0.26 },
      { f: 659.25, d: 0.28, t: 0.39 },
      { f: 783.99, d: 0.45, t: 0.68 }
    ];
    fanfare.forEach(note => {
      this.playTone(note.f, "triangle", note.d, note.t, 0.18);
    });
  }
}

const Sound = new SoundController();
