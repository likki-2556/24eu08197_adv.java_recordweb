// physics-hover.js - Tactile Magnetic Buttons & Subtle 3D Spring Tilt
(function() {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. MAGNETIC ACTION BUTTONS
  class MagneticButton {
    constructor(element) {
      if (isTouchDevice || prefersReducedMotion || !element) return;
      this.el = element;
      this.bounds = this.el.getBoundingClientRect();
      this.x = 0;
      this.y = 0;
      
      this.bindEvents();
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        if (this.el) this.bounds = this.el.getBoundingClientRect();
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.el) return;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const btnX = this.bounds.left + this.bounds.width / 2;
        const btnY = this.bounds.top + this.bounds.height / 2;
        
        const dx = mouseX - btnX;
        const dy = mouseY - btnY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Magnetic radius (85px)
        if (dist < 85) {
          const force = (85 - dist) / 85;
          this.x = dx * 0.35 * force;
          this.y = dy * 0.35 * force;
          
          this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scale(1.02)`;
          this.el.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.8, 0.25, 1)';
        } else {
          this.x = 0;
          this.y = 0;
          this.el.style.transform = `translate3d(0, 0, 0) scale(1)`;
          this.el.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
      });
      
      this.el.addEventListener('mouseenter', () => {
        this.bounds = this.el.getBoundingClientRect();
      });
    }
  }

  // 2. SUBTLE 3D SPRING TILT FOR EXHIBIT CARDS
  class SpringTilt {
    constructor(elements) {
      if (isTouchDevice || prefersReducedMotion || !elements) return;
      this.elements = Array.from(elements);
      this.isScrolling = false;
      this.scrollTimer = null;
      this.bindScrollGuard();
      this.init();
    }

    bindScrollGuard() {
      window.addEventListener('scroll', () => {
        this.isScrolling = true;
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => {
          this.isScrolling = false;
        }, 120);
      }, { passive: true });
    }

    init() {
      this.elements.forEach(card => {
        card.addEventListener('mousemove', (e) => this.onMove(e, card));
        card.addEventListener('mouseleave', () => this.onLeave(card));
      });
    }

    onMove(e, card) {
      if (this.isScrolling) return;
      if (card.classList.contains('expanded')) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const px = (x / rect.width) * 2 - 1; // -1 to 1
      const py = (y / rect.height) * 2 - 1;
      
      const maxTilt = 2.4; // Subtle, refined catalog tilt
      
      const rotateX = (-py * maxTilt).toFixed(2);
      const rotateY = (px * maxTilt).toFixed(2);
      
      card.style.setProperty('--tilt-rx', `${rotateX}deg`);
      card.style.setProperty('--tilt-ry', `${rotateY}deg`);
    }

    onLeave(card) {
      card.style.setProperty('--tilt-rx', '0deg');
      card.style.setProperty('--tilt-ry', '0deg');
    }
  }

  window.MagneticButton = MagneticButton;
  window.SpringTilt = SpringTilt;
})();
