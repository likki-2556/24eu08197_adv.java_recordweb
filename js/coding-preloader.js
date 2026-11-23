// coding-preloader.js - OpenJDK 26 HotSpot Compiler Telemetry & Coding Preloader Engine
(function () {
  'use strict';

  const SYNTAX_SNIPPETS = [
    'public class AdvancedJavaRecord {',
    'void main(String[] args)',
    'Connection conn = DriverManager.getConnection(...)',
    'PreparedStatement ps = conn.prepareStatement(sql);',
    'ResultSet rs = ps.executeQuery();',
    'import net.ucanaccess.jdbc.UcanaccessDriver;',
    'import com.mysql.cj.jdbc.Driver;',
    '@SpringBootApplication',
    'public interface StudentRepo extends JpaRepository<Student, String>',
    'class HttpServlet extends GenericServlet',
    'resp.setContentType("text/html");',
    'SELECT * FROM student WHERE regd_no = ?',
    'new StPageFlip(mountNode, { size: "fixed" });',
    '24IT303 // ADVANCED JAVA PROGRAMMING',
    '24EU08197 // LIKHITTHSAI VEMULAPALLI',
    'SAHE // SIDDHARTHA ACADEMY OF HIGHER EDUCATION',
    'EVAL: Dr. Ramesh Mande · Assoc. Prof, IT',
    'try (var session = HibernateUtil.openSession()) {',
    '<T, R> Function<T, R> lambda = (val) -> process(val);',
    'CompletableFuture.supplyAsync(() -> fetchArchivalRecord());'
  ];

  // Rich Terminal Stream Sequence including user-requested installation, student, roll, class, and evaluator telemetry
  const TERMINAL_LOGS = [
    {
      pct: 3,
      html: '<span class="cmd-prompt">$</span> <span class="cmd-str">sudo apt update &amp;&amp; apt install -y openjdk-26-jdk maven mysql-server</span>'
    },
    {
      pct: 10,
      html: '<span class="t-dim">[INSTALL]</span> Unpacking openjdk-26-jdk:amd64 (26.0.1+10-Debian) ... <span class="t-green">done</span>'
    },
    {
      pct: 16,
      html: '<span class="t-dim">[HOTSPOT]</span> OpenJDK 64-Bit Server VM initialized (build 26-ea+14, mixed mode)'
    },
    {
      pct: 22,
      html: '<span class="cmd-prompt">$</span> <span class="cmd-str">systemctl start mysql &amp;&amp; mysql -u root -p -e "CONNECT sahe_db_c;"</span>'
    },
    {
      pct: 28,
      html: '<span class="t-dim">[MYSQL]</span> Connection established to 127.0.0.1:3306 [SOCKET TCP OPEN]'
    },
    {
      pct: 35,
      html: '<span class="t-dim">[DRIVER]</span> Loaded <span class="t-cyan">com.mysql.cj.jdbc.Driver</span> &amp; <span class="t-gold">ucanaccess-5.0.1.jar</span>'
    },
    {
      pct: 42,
      html: '<span class="cmd-prompt">$</span> <span class="cmd-str">git config user.name "Likhithsai Vemulapalli" &amp;&amp; git branch -M main</span>'
    },
    {
      pct: 48,
      html: '<span class="t-dim">[STUDENT]</span> Name: <span class="t-cyan">Likhithsai Vemulapalli</span> | Regd No: <span class="t-cyan">24EU08197</span>'
    },
    {
      pct: 54,
      html: '<span class="t-dim">[CLASS]</span> <span class="t-purple">B.Tech Information Technology - Section C</span>'
    },
    {
      pct: 60,
      html: '<span class="t-dim">[ACADEMIC]</span> III/IV B.Tech V Semester (2026–27) · <span class="t-gold">SAHE Deemed University</span>'
    },
    {
      pct: 66,
      html: '<span class="t-dim">[EVALUATOR]</span> Submitted To: <span class="t-purple">Dr. Ramesh Mande</span> (Assoc. Professor, Dept of IT)'
    },
    {
      pct: 72,
      html: '<span class="cmd-prompt">$</span> <span class="cmd-str">mvn clean compile -Dcourse="24IT303" -Dlab="Advanced-Java"</span>'
    },
    {
      pct: 78,
      html: '<span class="t-dim">[TOMCAT]</span> Apache Tomcat 10.1 Catalina engine running on port 8080'
    },
    {
      pct: 84,
      html: '<span class="t-dim">[SPRING]</span> Started AdvancedJavaApplication in 1.18 seconds (JVM running for 1.82s)'
    },
    {
      pct: 90,
      html: '<span class="t-dim">[ARCHIVE]</span> Verified 13 Laboratory Modules · 129 Ultra-HD 4K Exhibits'
    },
    {
      pct: 96,
      html: '<span class="t-green" style="font-weight: 800;">[BUILD SUCCESSFUL]</span> Digital Exhibition Ready · Click Launch to Run Project...'
    }
  ];

  // Data Chunk Preloader Registry for zero-latency instant record viewing
  window.__PRELOADED_PAGE_ASSETS__ = window.__PRELOADED_PAGE_ASSETS__ || new Map();

  const PRELOAD_CHUNKS = [
    {
      pct: 32,
      label: 'Chunk 1/3 (Weeks 01–04 Record Folios)',
      files: [
        'weeks/week1/pages/page-01.jpg',
        'weeks/week1/pages/page-02.jpg',
        'weeks/week2/pages/page-01.jpg',
        'weeks/week2/pages/page-02.jpg',
        'weeks/week3/pages/page-01.jpg',
        'weeks/week4/pages/page-01.jpg'
      ]
    },
    {
      pct: 62,
      label: 'Chunk 2/3 (Weeks 05–08 Record Folios)',
      files: [
        'weeks/week5/pages/page-01.jpg',
        'weeks/week5/pages/page-02.jpg',
        'weeks/week6/pages/page-01.jpg',
        'weeks/week7/pages/page-01.jpg',
        'weeks/week8/pages/page-01.jpg'
      ]
    },
    {
      pct: 88,
      label: 'Chunk 3/3 (Weeks 09–13 Record Folios & Spring Suite)',
      files: [
        'weeks/week9/pages/page-01.jpg',
        'weeks/week10/pages/page-01.jpg',
        'weeks/week11/pages/page-01.jpg',
        'weeks/week12/pages/page-01.jpg',
        'weeks/week13/pages/page-01.jpg'
      ]
    }
  ];

  class CodingPreloaderEngine {
    constructor() {
      this.preloader = document.getElementById('coding-preloader');
      this.rainContainer = document.getElementById('preloader-syntax-rain');
      this.terminalBody = document.getElementById('preloader-terminal-body');
      this.progressBar = document.getElementById('preloader-progress-bar');
      this.counter = document.getElementById('preloader-counter');
      this.statusLabel = document.getElementById('preloader-status-text');
      this.readyBadge = document.getElementById('hud-ready-badge');
      this.replayBtn = document.getElementById('btn-replay-loader');
      this.actionArea = document.getElementById('hud-action-area');
      this.launchBtn = document.getElementById('btn-hud-launch');
      this.timerBadge = document.getElementById('hud-timer-badge');
      this.countdownNum = document.getElementById('hud-countdown-num');

      this.rainInterval = null;
      this.countdownInterval = null;
      this.isRunning = false;
      this.renderedIndices = new Set();
      this.loadedChunks = new Set();

      this.init();
    }

    init() {
      if (!this.preloader) return;

      // Start preloader immediately
      this.runBootSequence();

      // Bind replay button
      if (this.replayBtn) {
        this.replayBtn.addEventListener('click', () => {
          this.replay();
        });
      }

      // Bind Launch button
      if (this.launchBtn) {
        this.launchBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.clearCountdown();
          this.finish();
        });
      }

      // Expose globally
      window.replayCodingPreloader = () => this.replay();
    }

    clearCountdown() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
    }

    startSyntaxRain() {
      if (!this.rainContainer || window.innerWidth < 768) return;
      this.rainContainer.innerHTML = '';

      const spawnGlyph = () => {
        if (!this.isRunning || !this.rainContainer) return;

        const el = document.createElement('span');
        el.className = 'rain-glyph';
        el.textContent = SYNTAX_SNIPPETS[Math.floor(Math.random() * SYNTAX_SNIPPETS.length)];

        const x = Math.random() * 92 + 4; // 4% to 96%
        const y = Math.random() * 70; // 0px to 70px
        const duration = 2.0 + Math.random() * 1.2;

        el.style.left = `${x}%`;
        el.style.top = `${y}px`;
        el.style.animationDuration = `${duration}s`;

        this.rainContainer.appendChild(el);

        setTimeout(() => {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, duration * 1000 + 100);
      };

      // Initial batch
      for (let i = 0; i < 7; i++) {
        setTimeout(spawnGlyph, i * 140);
      }

      this.rainInterval = setInterval(spawnGlyph, 240);
    }

    stopSyntaxRain() {
      if (this.rainInterval) {
        clearInterval(this.rainInterval);
        this.rainInterval = null;
      }
    }

    runBootSequence() {
      this.isRunning = true;
      this.renderedIndices.clear();
      this.loadedChunks.clear();
      this.clearCountdown();

      if (this.actionArea) {
        this.actionArea.classList.remove('ready');
      }

      if (this.preloader) {
        this.preloader.classList.remove('preloader-finished');
      }
      document.body.style.overflow = 'hidden';

      // Reset Terminal Body
      if (this.terminalBody) {
        this.terminalBody.innerHTML = '';
      }

      this.startSyntaxRain();

      if (this.progressBar) this.progressBar.style.width = '0%';
      if (this.counter) this.counter.textContent = '00%';
      if (this.statusLabel) this.statusLabel.textContent = 'INSTALLING OPENJDK 26 & PACKAGES...';
      if (this.readyBadge) {
        this.readyBadge.textContent = 'STANDBY';
        this.readyBadge.style.color = '#f59e0b';
      }

      const totalDuration = 2200; // ms: fast, crisp compilation progression
      const startTime = performance.now();

      const updateProgress = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1.0, elapsed / totalDuration);

        // Smooth cubic ease-out
        const ease = 1 - Math.pow(1 - progress, 2.2);
        const percent = Math.floor(ease * 100);

        if (this.progressBar) this.progressBar.style.width = `${percent}%`;
        if (this.counter) this.counter.textContent = `${String(percent).padStart(2, '0')}%`;

        // Check and render new terminal lines
        TERMINAL_LOGS.forEach((logItem, idx) => {
          if (percent >= logItem.pct && !this.renderedIndices.has(idx)) {
            this.renderedIndices.add(idx);
            this.appendTerminalLine(logItem.html);
          }
        });

        // Trigger Chunk Preloading for record assets
        PRELOAD_CHUNKS.forEach((chunk) => {
          if (percent >= chunk.pct && !this.loadedChunks.has(chunk.label)) {
            this.preloadChunk(chunk);
          }
        });

        // Dynamic status bar labels
        if (percent < 24 && this.statusLabel) {
          this.statusLabel.textContent = 'INSTALLING OPENJDK 26 & PACKAGES...';
        } else if (percent >= 24 && percent < 45 && this.statusLabel) {
          this.statusLabel.textContent = 'CONNECTING MYSQL & DATABASE ENGINES...';
        } else if (percent >= 45 && percent < 72 && this.statusLabel) {
          this.statusLabel.textContent = 'AUTHENTICATING LIKHITTHSAI VEMULAPALLI (24EU08197)...';
        } else if (percent >= 72 && percent < 90 && this.statusLabel) {
          this.statusLabel.textContent = 'STARTING TOMCAT & SPRING BOOT RUNTIME...';
        } else if (percent >= 90 && percent < 100 && this.statusLabel) {
          this.statusLabel.textContent = 'VERIFYING 129 ULTRA-HD LABORATORY EXHIBITS...';
        }

        if (progress < 1.0) {
          requestAnimationFrame(updateProgress);
        } else {
          // Finished 100%
          if (this.progressBar) this.progressBar.style.width = '100%';
          if (this.counter) this.counter.textContent = '100%';
          if (this.statusLabel) {
            this.statusLabel.textContent = 'COMPILATION COMPLETE · AWAITING LAUNCH COMMAND';
            this.statusLabel.style.color = '#38bdf8';
          }
          if (this.readyBadge) {
            this.readyBadge.textContent = 'READY';
            this.readyBadge.style.color = '#10b981';
          }

          // Activate Launch Button & 15s Countdown
          this.activateLaunchReady();
        }
      };

      requestAnimationFrame(updateProgress);
    }

    preloadChunk(chunk) {
      if (this.loadedChunks.has(chunk.label)) return;
      this.loadedChunks.add(chunk.label);
      let count = 0;
      chunk.files.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          window.__PRELOADED_PAGE_ASSETS__.set(src, img);
          count++;
          if (count === chunk.files.length) {
            this.appendTerminalLine(
              `<span class="t-dim">[PRELOAD]</span> Cached <span class="t-cyan">${chunk.label}</span> ... <span class="t-green">done</span>`
            );
          }
        };
        img.onerror = () => {
          count++;
        };
        img.src = src;
      });
    }

    activateLaunchReady() {
      if (this.actionArea) {
        this.actionArea.classList.add('ready');
      }

      let secondsLeft = 15;
      if (this.timerBadge) this.timerBadge.textContent = `${secondsLeft}s`;
      if (this.countdownNum) this.countdownNum.textContent = String(secondsLeft);

      this.clearCountdown();
      this.countdownInterval = setInterval(() => {
        secondsLeft--;
        if (this.timerBadge) this.timerBadge.textContent = `${secondsLeft}s`;
        if (this.countdownNum) this.countdownNum.textContent = String(secondsLeft);

        if (secondsLeft <= 0) {
          this.clearCountdown();
          this.finish();
        }
      }, 1000);
    }

    appendTerminalLine(html) {
      if (!this.terminalBody) return;
      const line = document.createElement('div');
      line.className = 'terminal-log-line active';
      line.innerHTML = html;
      this.terminalBody.appendChild(line);

      // Auto-scroll to the bottom of the terminal window
      this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
    }

    finish() {
      this.clearCountdown();
      if (this.actionArea) {
        this.actionArea.classList.remove('ready');
      }
      this.stopSyntaxRain();
      if (this.rainContainer) {
        this.rainContainer.innerHTML = '';
      }
      this.isRunning = false;

      if (this.preloader) {
        this.preloader.classList.add('preloader-finished');
      }

      document.body.style.overflow = '';
      document.body.classList.add('exhibition-loaded');

      // Trigger landing hero entrance animation and reveal all page components
      const heroSection = document.getElementById('room-entrance');
      if (heroSection) {
        heroSection.classList.add('hero-revealed');
      }
      document.querySelectorAll('.stagger-in, .exhibit-card, .roadmap-phase-card').forEach(el => {
        el.classList.add('visible');
      });
    }

    replay() {
      this.clearCountdown();
      if (this.actionArea) {
        this.actionArea.classList.remove('ready');
      }
      const heroSection = document.getElementById('room-entrance');
      if (heroSection) {
        heroSection.classList.remove('hero-revealed');
        heroSection.querySelectorAll('.stagger-in').forEach(el => el.classList.remove('visible'));
      }
      this.runBootSequence();
    }
  }

  // Self-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CodingPreloaderEngine());
  } else {
    new CodingPreloaderEngine();
  }
})();
