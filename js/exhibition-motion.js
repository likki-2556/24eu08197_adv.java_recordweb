// exhibition-motion.js - Source-Emitter Physics, Scroll-Reactive Topic Suspension & Spatial Parallax
(function () {
  'use strict';

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------
  // REUSABLE PRECISION SOURCE EMITTER CLASS
  // -------------------------------------------------------------
  class SourceEmitter {
    constructor(options = {}) {
      this.sourceElement = options.source || null;
      this.vocabulary = options.vocabulary || ['01', '10', '101', 'JDBC', ';'];
      this.maxParticles = options.maxParticles || 4;
      this.burstInterval = options.burstInterval || 180; // ms between particles in a burst
      this.spreadX = options.spreadX || 28; // max horizontal drift from origin in px
      this.activeParticles = new Set();
      this.activeTimers = [];
      this.activeRafs = new Set();
    }

    setSource(el) {
      this.sourceElement = el;
    }

    burst(customWords = null, count = null) {
      if (!this.sourceElement || isReducedMotion) return;

      const words = customWords || this.vocabulary;
      const n = count || Math.min(this.maxParticles, words.length);

      // Trigger subtle pulse cue on the source element
      this.triggerSourcePulse();

      for (let i = 0; i < n; i++) {
        const timer = setTimeout(() => {
          if (!this.sourceElement || !document.contains(this.sourceElement)) return;
          this.spawnParticle(words[i % words.length], i, n);
        }, i * this.burstInterval + 60);
        this.activeTimers.push(timer);
      }
    }

    triggerSourcePulse() {
      if (!this.sourceElement) return;
      this.sourceElement.classList.remove('emitter-source-pulse');
      void this.sourceElement.offsetWidth; // force reflow
      this.sourceElement.classList.add('emitter-source-pulse');
      setTimeout(() => {
        if (this.sourceElement) this.sourceElement.classList.remove('emitter-source-pulse');
      }, 480);
    }

    spawnParticle(text, index, total) {
      if (!this.sourceElement) return;

      const rect = this.sourceElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return; // Element hidden/unrendered

      // PRECISE SOURCE ORIGIN: Center of element, bottom edge + 2px
      const originX = rect.left + rect.width * 0.5;
      const originY = rect.bottom + 2;

      const particle = document.createElement('div');
      particle.className = 'emitter-particle';
      particle.textContent = text;

      // Classify particle weight and styling
      let baseSpeed = 1.0;
      if (/^[01]+$/.test(text)) {
        particle.classList.add('emitter-particle--binary');
        baseSpeed = 0.85;
      } else if (text === ';' || text === '{}' || text.length <= 2) {
        particle.classList.add('emitter-particle--syntax');
        baseSpeed = 0.75;
      } else if (text.length > 8 || text.startsWith('Prepared') || text.startsWith('Callable')) {
        particle.classList.add('emitter-particle--heavy');
        baseSpeed = 1.2;
      } else {
        particle.classList.add('emitter-particle--code');
        baseSpeed = 1.05;
      }

      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      particle.style.position = 'fixed';
      particle.style.zIndex = '10002';
      particle.style.pointerEvents = 'none';

      document.body.appendChild(particle);
      this.activeParticles.add(particle);

      // Trajectory parameters
      const driftX = (Math.random() - 0.5) * (this.spreadX * 2);
      const startRot = (Math.random() - 0.5) * 6;
      const endRot = startRot + (Math.random() - 0.5) * 12;
      const fallDistance = 65 + Math.random() * 45; // px
      const duration = (2100 + Math.random() * 700) / baseSpeed; // ms
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1.0);

        // Physics: gravity curve (acceleration downward)
        const easeY = progress * progress * 0.65 + progress * 0.35;
        const currY = easeY * fallDistance;
        const currX = Math.sin(progress * Math.PI) * driftX;
        const currRot = startRot + progress * (endRot - startRot);

        // Opacity envelope: 0 -> 0.75 -> 0
        let opacity = 0;
        if (progress < 0.15) {
          opacity = (progress / 0.15) * 0.75;
        } else if (progress < 0.65) {
          opacity = 0.75;
        } else {
          opacity = ((1.0 - progress) / 0.35) * 0.75;
        }

        particle.style.transform = `translate3d(calc(-50% + ${currX}px), ${currY}px, 0) rotate(${currRot}deg)`;
        particle.style.opacity = opacity;

        if (progress < 1.0 && document.body.contains(particle)) {
          const rafId = requestAnimationFrame(update);
          this.activeRafs.add(rafId);
        } else {
          this.removeParticle(particle);
        }
      };

      const rafId = requestAnimationFrame(update);
      this.activeRafs.add(rafId);
    }

    removeParticle(particle) {
      if (particle && particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
      this.activeParticles.delete(particle);
    }

    cleanup() {
      this.activeTimers.forEach(clearTimeout);
      this.activeTimers = [];
      this.activeRafs.forEach(cancelAnimationFrame);
      this.activeRafs.clear();
      this.activeParticles.forEach(p => {
        if (p && p.parentNode) p.parentNode.removeChild(p);
      });
      this.activeParticles.clear();
      if (this.sourceElement) {
        this.sourceElement.classList.remove('emitter-source-pulse');
      }
    }

    destroy() {
      this.cleanup();
      this.sourceElement = null;
    }
  }

  // -------------------------------------------------------------
  // EXHIBITION MOTION ORCHESTRATOR
  // -------------------------------------------------------------
  class ExhibitionMotionOrchestrator {
    constructor() {
      this.scrollY = window.scrollY || 0;
      this.lastScrollY = this.scrollY;
      this.scrollVelocity = 0;
      this.directionalVelocity = 0;
      this.ticking = false;
      this.totalExhibits = 13;

      this.emitters = new Map();
      this.searchEmitter = null;

      this.initElements();
      this.initHeroEntrance();

      if (!isReducedMotion) {
        this.initScrollParallax();
        this.initExhibitReveals();
        this.initArchiveRail();
        this.initEmitters();
        this.initCardRigInteractions();
        this.initCursorSyntaxTrail();
      } else {
        this.enableReducedMotionFallbacks();
      }
    }

    // -------------------------------------------------------------
    // CURSOR SYNTAX TRAIL ANIMATION (RANDOM FALLING SYNTAX TAIL)
    // -------------------------------------------------------------
    initCursorSyntaxTrail() {
      const syntaxTokens = [
        ',', '<', '>', '.', '/', ';', "'",
        '{', '}', '[', ']', '(', ')',
        ':', '+', '*', '=', '!', '&', '|', '~', '?'
      ];

      const colors = [
        '#3b49df', // Celestial Indigo
        '#b88d57', // Bronze / Warm Gold
        '#10b981', // Emerald
        '#6366f1', // Electric Indigo
        '#8b5cf6', // Violet
        '#059669', // Mint Forest
        '#d97706', // Amber Gold
        '#64748b'  // Technical Slate
      ];

      let lastX = 0;
      let lastY = 0;
      let lastTime = 0;
      const minDistance = 12; // Min distance (px) between particle spawns
      const minInterval = 28; // Min ms between particle bursts

      const onPointerMove = (e) => {
        if (e.pointerType === 'touch') return; // Skip touch screens for clean mobile UX

        // Do not spawn particles over open document viewer or passport modal
        if (document.getElementById('viewer-backdrop')?.classList.contains('active') ||
            document.getElementById('profile-modal-backdrop')?.classList.contains('active')) {
          return;
        }

        const now = performance.now();
        if (now - lastTime < minInterval) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distSq = dx * dx + dy * dy;

        if (distSq < minDistance * minDistance) return;

        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;

        // Spawn 1 to 2 falling syntax tokens
        const count = Math.random() < 0.28 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          this.spawnCursorParticle(e.clientX, e.clientY, syntaxTokens, colors);
        }
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    spawnCursorParticle(x, y, tokens, colors) {
      const el = document.createElement('span');
      el.className = 'cursor-syntax-particle';
      el.textContent = tokens[Math.floor(Math.random() * tokens.length)];

      const color = colors[Math.floor(Math.random() * colors.length)];
      const fontSize = 13 + Math.floor(Math.random() * 6); // 13px - 18px
      const driftX = (Math.random() - 0.5) * 36; // -18px to +18px drift
      const dropY = 38 + Math.random() * 45; // falls 38px to 83px
      const rotStart = (Math.random() - 0.5) * 26;
      const rotEnd = rotStart + (Math.random() - 0.5) * 55;
      const duration = 0.7 + Math.random() * 0.38; // 0.7s to 1.08s

      // Position slightly behind/beneath the cursor tip
      const offsetX = (Math.random() - 0.5) * 10;
      const offsetY = 12 + Math.random() * 8;

      el.style.left = `${x + offsetX}px`;
      el.style.top = `${y + offsetY}px`;
      el.style.color = color;
      el.style.fontSize = `${fontSize}px`;
      el.style.setProperty('--drift-x', `${driftX}px`);
      el.style.setProperty('--drop-y', `${dropY}px`);
      el.style.setProperty('--rot', `${rotStart}deg`);
      el.style.setProperty('--rot-end', `${rotEnd}deg`);
      el.style.setProperty('--dur', `${duration}s`);

      document.body.appendChild(el);

      setTimeout(() => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, duration * 1000 + 40);
    }

    initElements() {
      this.heroSection = document.getElementById('room-entrance');
      this.heroTitle = document.getElementById('hero-title-main');
      this.javaLogoContainer = document.getElementById('java-logo-hero-container');
      this.studentBadge = document.getElementById('student-badge');
      this.archiveFactHero = document.getElementById('archive-fact-hero');
      this.suspendedArchive = document.getElementById('hero-suspended-archive');
      this.archiveRail = document.getElementById('archive-rail');
      this.railDot = document.getElementById('rail-dot');
      this.railActiveNum = document.getElementById('rail-active-num');
      this.showcaseSection = document.getElementById('room-showcase');
      this.exhibitsContainer = document.getElementById('exhibition-units');
      this.viewerBackdrop = document.getElementById('viewer-backdrop');
      this.dockSearchPanel = document.querySelector('.dock-search-panel');

      this.initSuspendedArchiveInteractions();
    }

    initSuspendedArchiveInteractions() {
      if (!this.suspendedArchive || isReducedMotion) return;
      const anchors = this.suspendedArchive.querySelectorAll('.suspended-anchor');

      window.addEventListener('mousemove', (e) => {
        if (this.scrollY > 450) return; // Only when near hero
        anchors.forEach(anchor => {
          const rect = anchor.getBoundingClientRect();
          const anchorCenterX = rect.left + rect.width / 2;
          const dist = e.clientX - anchorCenterX;
          if (Math.abs(dist) < 70 && Math.abs(e.clientY - rect.top) < 260) {
            const force = (1 - Math.abs(dist) / 70) * (dist > 0 ? -3.5 : 3.5);
            const ornament = anchor.querySelector('.tech-ornament');
            if (ornament) {
              ornament.style.transform = `translateX(${force}px) rotate(${force * 0.7}deg)`;
              clearTimeout(anchor._airResetTimer);
              anchor._airResetTimer = setTimeout(() => {
                ornament.style.transform = '';
              }, 700);
            }
          }
        });
      }, { passive: true });
    }

    // -------------------------------------------------------------
    // 1. HERO EDITORIAL REVEAL
    // -------------------------------------------------------------
    initHeroEntrance() {
      if (!this.heroSection) return;

      const revealHero = () => {
        this.heroSection.classList.add('hero-revealed');
        const staggers = this.heroSection.querySelectorAll('.stagger-in');
        staggers.forEach((el, idx) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, idx * 70);
        });
      };

      // Synchronize with coding preloader completion
      if (document.getElementById('coding-preloader')) {
        const checkLoaded = () => {
          if (document.body.classList.contains('exhibition-loaded')) {
            revealHero();
          } else {
            setTimeout(checkLoaded, 40);
          }
        };
        checkLoaded();
      } else {
        requestAnimationFrame(() => {
          setTimeout(revealHero, 80);
        });
      }
    }

    // -------------------------------------------------------------
    // 2. PRECISION SOURCE EMITTERS SETUP
    // -------------------------------------------------------------
    initEmitters() {
      // Viewer Search Bar Emitter
      if (this.dockSearchPanel) {
        this.searchEmitter = new SourceEmitter({
          source: this.dockSearchPanel,
          vocabulary: ['01', 'JDBC', '101', 'PreparedStatement', 'ResultSet', ';'],
          spreadX: 32,
          maxParticles: 4
        });
      }

      // Listen for PDF viewer backdrop state changes
      if (this.viewerBackdrop) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              const isActive = this.viewerBackdrop.classList.contains('active');
              if (isActive) {
                this.onViewerOpened();
              } else {
                this.onViewerClosed();
              }
            }
          });
        });
        observer.observe(this.viewerBackdrop, { attributes: true });
      }
    }

    onViewerOpened() {
      if (!this.searchEmitter || isReducedMotion) return;

      const searchPanel = document.querySelector('.dock-search-panel');
      if (searchPanel) this.searchEmitter.setSource(searchPanel);

      // Pulse 1: 450ms after viewer frame settles
      setTimeout(() => {
        if (this.viewerBackdrop && this.viewerBackdrop.classList.contains('active')) {
          this.searchEmitter.burst(['01', 'JDBC', '10'], 3);
        }
      }, 450);

      // Pulse 2: Sparse follow-up burst after 4.8 seconds
      setTimeout(() => {
        if (this.viewerBackdrop && this.viewerBackdrop.classList.contains('active')) {
          this.searchEmitter.burst(['101', 'PreparedStatement', ';'], 3);
        }
      }, 4800);
    }

    onViewerClosed() {
      if (this.searchEmitter) {
        this.searchEmitter.cleanup();
      }
    }

    // -------------------------------------------------------------
    // 3. SMOOTH SPATIAL SCROLL PARALLAX & TOPIC RIG PHYSICS
    // -------------------------------------------------------------
    initScrollParallax() {
      const onScroll = () => {
        this.scrollY = window.scrollY || window.pageYOffset;
        this.directionalVelocity = this.scrollY - this.lastScrollY;
        this.scrollVelocity = Math.abs(this.directionalVelocity);
        this.lastScrollY = this.scrollY;

        if (!this.ticking) {
          requestAnimationFrame(() => {
            this.renderParallax();
            this.updateCardSuspensionRigs();
            this.ticking = false;
          });
          this.ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
    }

    renderParallax() {
      const scroll = this.scrollY;

      // Parallax on Hero elements
      if (scroll < window.innerHeight * 1.3) {
        if (this.heroTitle) {
          this.heroTitle.style.transform = `translate3d(0, ${scroll * 0.22}px, 0)`;
        }
        if (this.javaLogoContainer) {
          this.javaLogoContainer.style.transform = `translate3d(0, ${scroll * 0.16}px, 0)`;
        }
        if (this.studentBadge) {
          this.studentBadge.style.transform = `translate3d(0, ${scroll * -0.05}px, 0)`;
        }
        if (this.archiveFactHero) {
          this.archiveFactHero.style.transform = `translate3d(0, ${scroll * 0.12}px, 0)`;
        }
        if (this.suspendedArchive) {
          this.suspendedArchive.style.transform = `translate3d(0, ${scroll * 0.45}px, 0)`;
        }
      }

      // Parallax on cards foreground artifacts & Swipe-Zoom Focal Emphasis
      const cards = document.querySelectorAll('.exhibit-card.visible');
      let nearestCard = null;
      let minDistance = Infinity;
      const opticalCenter = window.innerHeight * 0.48;

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const cardCenter = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenter - opticalCenter);
          if (dist < minDistance && dist < rect.height * 0.72) {
            minDistance = dist;
            nearestCard = card;
          }
          const delta = (cardCenter - window.innerHeight / 2) * 0.04;
          const artifactCol = card.querySelector('.comp-artifact-col');
          if (artifactCol) {
            artifactCol.style.transform = `translate3d(0, ${-delta}px, 0)`;
          }
        }
      });

      cards.forEach(card => {
        if (card === nearestCard) {
          card.classList.add('focal-active');
        } else {
          card.classList.remove('focal-active');
        }
      });

      this.updateArchiveRail(scroll);
    }

    // -------------------------------------------------------------
    // SCROLL-VELOCITY REACTIVE SUSPENDED TOPIC SYSTEM
    // -------------------------------------------------------------
    updateCardSuspensionRigs() {
      const stages = document.querySelectorAll('.exhibit-stage');
      if (stages.length === 0) return;

      const vel = this.directionalVelocity;
      const absVel = Math.abs(vel);
      const speedFactor = Math.min(1.0, absVel / 22.0); // 0 to 1

      stages.forEach(stage => {
        const rect = stage.getBoundingClientRect();
        // Only update if stage is near or within viewport
        if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
          const topics = stage.querySelectorAll('.suspended-topic');
          topics.forEach(topic => {
            const mass = parseFloat(topic.style.getPropertyValue('--mass') || '1.0');

            let targetDrop = 0;
            let targetRot = 0;
            let targetSway = 0;

            if (absVel > 1.2) {
              targetDrop = speedFactor * 24 * mass * (vel > 0 ? 1 : -0.55);
              targetRot = speedFactor * 3.8 * mass * (vel > 0 ? 1 : -1);
              targetSway = speedFactor * 5.2 * (vel > 0 ? 1 : -1);
            }

            // Smooth spring damping interpolation
            topic._drop = (topic._drop || 0) + (targetDrop - (topic._drop || 0)) * 0.18;
            topic._rot = (topic._rot || 0) + (targetRot - (topic._rot || 0)) * 0.15;
            topic._sway = (topic._sway || 0) + (targetSway - (topic._sway || 0)) * 0.15;

            // Apply transform
            topic.style.transform = `translate3d(${topic._sway.toFixed(2)}px, ${topic._drop.toFixed(2)}px, 0) rotate(${topic._rot.toFixed(2)}deg)`;
          });
        }
      });
    }

    initCardRigInteractions() {
      // Subtle card hover interaction: topic tags slightly lift and highlight
      document.addEventListener('mouseover', (e) => {
        const stage = e.target.closest('.exhibit-stage');
        if (stage) {
          const layer = stage.querySelector('.suspended-topic-layer');
          if (layer) {
            layer.style.opacity = '1';
          }
        }
      });
    }

    // -------------------------------------------------------------
    // 4. SCROLL-TRIGGERED EXHIBIT ENTRANCES & DYNAMIC SWIPE-ZOOM
    // -------------------------------------------------------------
    initExhibitReveals() {
      // Intersection observer for card swipe-up entrance
      const entranceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            card.classList.add('visible');

            // Stagger card topic layer entrance
            const stage = card.closest('.exhibit-stage');
            if (stage) {
              const layer = stage.querySelector('.suspended-topic-layer');
              if (layer && !layer.classList.contains('layer-entered')) {
                layer.classList.add('layer-entered');
                const topics = layer.querySelectorAll('.suspended-topic');
                topics.forEach((topEl, tIdx) => {
                  topEl.style.opacity = '0';
                  topEl.style.transform = 'translateY(-24px)';
                  setTimeout(() => {
                    topEl.style.transition = 'opacity 0.6s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
                    topEl.style.opacity = '1';
                    topEl.style.transform = 'translateY(0)';
                  }, tIdx * 80 + 120);
                });
              }
            }
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

      const checkAndObserveCards = () => {
        const cards = document.querySelectorAll('.exhibit-card');
        if (cards.length > 0) {
          cards.forEach((card, idx) => {
            card.setAttribute('data-index', idx);
            entranceObserver.observe(card);
          });
        } else {
          setTimeout(checkAndObserveCards, 120);
        }
      };

      checkAndObserveCards();
    }

    // -------------------------------------------------------------
    // 5. MINIMAL VERTICAL ARCHIVE RAIL
    // -------------------------------------------------------------
    initArchiveRail() {
      if (!this.archiveRail) return;
    }

    updateArchiveRail(scroll) {
      if (!this.archiveRail || !this.railDot || !this.railActiveNum) return;

      const heroH = this.heroSection ? this.heroSection.offsetHeight : 600;

      if (scroll > heroH * 0.6) {
        this.archiveRail.classList.add('rail-visible');
      } else {
        this.archiveRail.classList.remove('rail-visible');
        return;
      }

      const cards = document.querySelectorAll('.exhibit-card');
      if (cards.length === 0) return;

      let currentActive = 1;
      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          currentActive = idx + 1;
        }
      });

      this.railActiveNum.textContent = String(currentActive).padStart(2, '0');

      const progress = (currentActive - 1) / Math.max(1, this.totalExhibits - 1);
      const trackHeight = 120; // px
      this.railDot.style.transform = `translate3d(0, ${progress * trackHeight}px, 0)`;
    }

    enableReducedMotionFallbacks() {
      if (this.heroSection) {
        this.heroSection.classList.add('hero-revealed');
      }
      document.querySelectorAll('.stagger-in').forEach(el => el.classList.add('visible'));
      document.querySelectorAll('.suspended-topic').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }

  // Export SourceEmitter globally for custom hooks
  window.SourceEmitter = SourceEmitter;

  // Instantiate Orchestrator when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.ExhibitionMotion = new ExhibitionMotionOrchestrator();
    });
  } else {
    window.ExhibitionMotion = new ExhibitionMotionOrchestrator();
  }
})();
