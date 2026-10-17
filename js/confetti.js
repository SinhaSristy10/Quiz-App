/**
 * Quiz App - Canvas Confetti Animation Engine
 * Lightweight, self-contained particle celebration engine.
 */

class ConfettiLauncher {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animId = null;
    this.active = false;
  }

  ensureCanvas() {
    if (!this.canvas) {
      this.canvas = document.createElement("canvas");
      this.canvas.id = "confetti-canvas";
      this.canvas.style.position = "fixed";
      this.canvas.style.top = "0";
      this.canvas.style.left = "0";
      this.canvas.style.width = "100vw";
      this.canvas.style.height = "100vh";
      this.canvas.style.pointerEvents = "none";
      this.canvas.style.zIndex = "9999";
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext("2d");

      window.addEventListener("resize", () => {
        if (this.canvas) {
          this.canvas.width = window.innerWidth * window.devicePixelRatio;
          this.canvas.height = window.innerHeight * window.devicePixelRatio;
          if (this.ctx) this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
      });
    }

    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;
    this.ctx.resetTransform();
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  launch(durationMs = 4000, particleCount = 120) {
    this.ensureCanvas();
    this.stop();
    this.active = true;

    const colors = [
      "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b",
      "#10b981", "#06b6d4", "#3b82f6", "#f43f5e"
    ];

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * 200,
        y: height * 0.45 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 6,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        drag: 0.96,
        gravity: 0.38,
        shape: Math.random() > 0.4 ? "rect" : "circle",
        opacity: 1
      });
    }

    const startTime = performance.now();

    const loop = (time) => {
      if (!this.active) return;
      const elapsed = time - startTime;

      this.ctx.clearRect(0, 0, width, height);

      this.particles.forEach((p) => {
        p.vx *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (elapsed > durationMs - 1200) {
          p.opacity = Math.max(0, (durationMs - elapsed) / 1200);
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      });

      if (elapsed < durationMs) {
        this.animId = requestAnimationFrame(loop);
      } else {
        this.stop();
      }
    };

    this.animId = requestAnimationFrame(loop);
  }

  stop() {
    this.active = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

const Confetti = new ConfettiLauncher();
