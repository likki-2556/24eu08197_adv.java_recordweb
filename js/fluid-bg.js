// fluid-bg.js - Museum Gallery Ambient Lighting with Optimized Frame Lifecycle
(function() {
  class MuseumAmbientBackground {
    constructor() {
      // Check reduced motion preference
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      this.canvas = document.createElement('canvas');
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.zIndex = '0';
      this.canvas.style.pointerEvents = 'none';
      document.body.prepend(this.canvas);
      
      this.ctx = this.canvas.getContext('2d', { alpha: false });
      this.particles = [];
      this.numParticles = 4; // 4 subtle, museum illumination nodes
      this.mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000 };
      this.isRunning = true;
      
      this.init();
      this.bindEvents();
      if (!this.reducedMotion) {
        this.animate();
      } else {
        this.renderStatic();
      }
    }

    init() {
      this.resize();
      
      // Museum illumination palette: subtle warm ochre, faint celestial indigo, and soft ivory
      const colors = [
        'rgba(184, 141, 87, 0.08)',  // Warm Java Ochre
        'rgba(66, 85, 212, 0.06)',   // Faint Celestial Indigo
        'rgba(184, 141, 87, 0.05)',  // Ambient Golden Ivory
        'rgba(13, 148, 136, 0.04)'   // Faint Emerald Tint
      ];

      this.particles = [];
      for (let i = 0; i < this.numParticles; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.25, // Gentle museum drift
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 300 + 260,
          color: colors[i % colors.length]
        });
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.resize();
        if (this.reducedMotion) this.renderStatic();
      });

      // Pointer tracking
      window.addEventListener('mousemove', (e) => {
        this.mouse.tx = e.clientX;
        this.mouse.ty = e.clientY;
      });

      // Page visibility optimization (pause when tab is inactive)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.isRunning = false;
        } else {
          this.isRunning = true;
          if (!this.reducedMotion) {
            requestAnimationFrame(() => this.animate());
          }
        }
      });
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      this.canvas.width = window.innerWidth * dpr;
      this.canvas.height = window.innerHeight * dpr;
      this.ctx.scale(dpr, dpr);
    }

    renderStatic() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.ctx.fillStyle = '#f6f5f1';
      this.ctx.fillRect(0, 0, w, h);

      this.particles.forEach(p => {
        const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'rgba(246, 245, 241, 0)');
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = grad;
        this.ctx.fill();
      });
    }

    animate() {
      if (!this.isRunning) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Smooth interpolation for spotlight
      this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.05;

      // Clear base with warm museum ivory
      this.ctx.fillStyle = '#f6f5f1';
      this.ctx.fillRect(0, 0, w, h);

      // Render floating light nodes
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -p.radius || p.x > w + p.radius) p.vx *= -1;
        if (p.y < -p.radius || p.y > h + p.radius) p.vy *= -1;

        const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'rgba(246, 245, 241, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = grad;
        this.ctx.fill();
      });

      // Subtle cursor illumination (refined museum flashlight effect)
      if (this.mouse.x > -500) {
        const glowRadius = 240;
        const cursorGrad = this.ctx.createRadialGradient(
          this.mouse.x, this.mouse.y, 0,
          this.mouse.x, this.mouse.y, glowRadius
        );
        cursorGrad.addColorStop(0, 'rgba(66, 85, 212, 0.06)');
        cursorGrad.addColorStop(0.6, 'rgba(184, 141, 87, 0.03)');
        cursorGrad.addColorStop(1, 'rgba(246, 245, 241, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, glowRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = cursorGrad;
        this.ctx.fill();
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new MuseumAmbientBackground();
  });
})();
