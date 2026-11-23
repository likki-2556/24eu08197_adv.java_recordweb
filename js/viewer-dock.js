// viewer-dock.js - Master Document Viewer & StPageFlip Flipbook Orchestrator
(function () {
  // Netlify Image CDN helper with fallback for accelerated mobile/WebP delivery
  function getOptimizedImageUrl(imgPath, targetWidth = 1000) {
    if (!imgPath) return '';
    const isNetlify = window.location.hostname.includes('netlify.app') ||
      window.location.hostname.includes('netlify.live') ||
      document.querySelector('meta[name="netlify-image-cdn"]');
    if (isNetlify) {
      const cleanPath = '/' + imgPath.replace(/^\.?\/?/, '');
      return `/.netlify/images?url=${encodeURIComponent(cleanPath)}&w=${targetWidth}&fm=webp&q=82`;
    }
    return imgPath;
  }

  class ExhibitionPDFViewer {
    constructor() {
      this.pdfDoc = null;
      this.pageFlip = null;
      this.currentPage = 1; // 1-based page index
      this.totalPages = 1;
      this.zoomLevel = 1.0;
      this.pdfPath = '';
      this.pdfTitle = '';
      this.currentRecord = null;
      this.isFullscreen = false;
      this.pageAspectRatio = 0.7071; // Dynamically computed per PDF

      this.outline = [];
      this.searchMatches = [];
      this.activeRenderTasks = new Map();

      this.initElements();
      this.bindEvents();
    }

    ensurePdfLib() {
      if (window.pdfjsLib) {
        return Promise.resolve(window.pdfjsLib);
      }
      return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'js/pdf.min.js';
        s.onload = () => {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = (window.location.protocol === 'file:')
              ? 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
              : 'js/pdf.worker.min.js';
            resolve(window.pdfjsLib);
          } else {
            reject(new Error('PDF.js library failed to initialize'));
          }
        };
        s.onerror = () => {
          const cdn = document.createElement('script');
          cdn.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          cdn.onload = () => {
            if (window.pdfjsLib) {
              window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              resolve(window.pdfjsLib);
            } else {
              reject(new Error('CDN PDF.js fallback failed to initialize'));
            }
          };
          cdn.onerror = () => reject(new Error('CDN PDF fallback failed'));
          document.head.appendChild(cdn);
        };
        document.head.appendChild(s);
      });
    }

    initElements() {
      this.backdrop = document.getElementById('viewer-backdrop');
      this.frame = document.getElementById('viewer-frame');
      this.canvasWrapper = document.getElementById('document-canvas-space');
      this.loadingIndicator = document.getElementById('viewer-loading');
      this.flipbookContainer = document.getElementById('viewer-flipbook-container');
      this.mountNode = document.getElementById('viewer-pageflip-mount');

      // Control Dock Buttons
      this.closeBtn = document.getElementById('dock-close');
      this.prevBtn = document.getElementById('dock-prev');
      this.nextBtn = document.getElementById('dock-next');
      this.pageInput = document.getElementById('dock-page-num');
      this.totalPagesText = document.getElementById('dock-total-pages');
      this.zoomInBtn = document.getElementById('dock-zoom-in');
      this.zoomOutBtn = document.getElementById('dock-zoom-out');
      this.fitWidthBtn = document.getElementById('dock-fit-width');
      this.fitPageBtn = document.getElementById('dock-fit-page');
      this.fullscreenBtn = document.getElementById('dock-fullscreen');
      this.downloadBtn = document.getElementById('dock-download');

      // Floating Mobile Navigation Chevron Buttons
      this.mobilePrevArrow = document.getElementById('mobile-arrow-prev');
      this.mobileNextArrow = document.getElementById('mobile-arrow-next');

      // Sidebar Index & Search
      this.sidebar = document.getElementById('viewer-sidebar');
      this.sidebarToggle = document.getElementById('dock-sidebar-toggle');
      this.bookmarkList = document.getElementById('viewer-index-links');
      this.searchInput = document.getElementById('dock-search-input');

      // Top Title Label & Badge
      this.titleDisplay = document.getElementById('viewer-doc-title');
      this.topBadge = document.querySelector('.viewer-top-badge');

      // Sealed Envelope / Document Placeholder Elements
      this.placeholder = document.getElementById('viewer-sealed-envelope');
      this.placeholderTitle = this.placeholder ? this.placeholder.querySelector('.sealed-title') : null;
      this.placeholderDesc = this.placeholder ? this.placeholder.querySelector('.sealed-desc') : null;
      this.placeholderPath = document.getElementById('viewer-sealed-path');
      this.filePicker = document.getElementById('viewer-file-picker');
    }

    resetMountNode() {
      if (this.flipbookContainer) {
        this.flipbookContainer.innerHTML = '<div id="viewer-pageflip-mount" class="flipbook-mount-node"></div>';
        this.mountNode = document.getElementById('viewer-pageflip-mount');
      }
    }

    flipNext() {
      if (!this.pageFlip) return;
      const total = this.totalPages || (this.pageFlip.getPageCount ? this.pageFlip.getPageCount() : 1);
      const cur = this.currentPage || 1;
      if (cur >= total) return;

      const isMobile = window.innerWidth <= 768 || (this.canvasWrapper && this.canvasWrapper.clientWidth <= 620);

      if (isMobile) {
        // Mobile single-page mode: directly turn to next page with zero delay or collision
        try {
          this.pageFlip.turnToNextPage();
        } catch (err) {
          try {
            const nextIdx = Math.min(cur, total - 1);
            this.pageFlip.turnToPage(nextIdx);
          } catch (_) { }
        }
      } else {
        // Desktop two-page spread: attempt corner fold animation, fallback to turnToNextPage
        try {
          this.pageFlip.flipNext('bottom');
        } catch (err) {
          try { this.pageFlip.turnToNextPage(); } catch (_) { }
        }
      }
    }

    flipPrev() {
      if (!this.pageFlip) return;
      const cur = this.currentPage || 1;
      if (cur <= 1) return;

      const isMobile = window.innerWidth <= 768 || (this.canvasWrapper && this.canvasWrapper.clientWidth <= 620);

      if (isMobile) {
        // Mobile single-page mode: directly turn to previous page with zero delay or collision
        try {
          this.pageFlip.turnToPrevPage();
        } catch (err) {
          try {
            const prevIdx = Math.max(0, cur - 2);
            this.pageFlip.turnToPage(prevIdx);
          } catch (_) { }
        }
      } else {
        // Desktop two-page spread: attempt corner fold animation, fallback to turnToPrevPage
        try {
          this.pageFlip.flipPrev('bottom');
        } catch (err) {
          try { this.pageFlip.turnToPrevPage(); } catch (_) { }
        }
      }
    }

    setupMobileTouchNavigation() {
      if (!this.canvasWrapper) return;

      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      this.canvasWrapper.addEventListener('touchstart', (e) => {
        if (!this.backdrop || !this.backdrop.classList.contains('active')) return;
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();
        }
      }, { passive: true });

      this.canvasWrapper.addEventListener('touchend', (e) => {
        if (!this.backdrop || !this.backdrop.classList.contains('active')) return;
        if (!this.pageFlip) return;
        if (e.changedTouches.length === 1) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const deltaX = touchEndX - touchStartX;
          const deltaY = touchEndY - touchStartY;
          const deltaTime = Date.now() - touchStartTime;

          // 1. Horizontal Swipe: swipe left for next page, swipe right for prev page
          if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15 && deltaTime < 650) {
            if (deltaX < 0) {
              this.flipNext();
            } else {
              this.flipPrev();
            }
            return;
          }

          // 2. Direct Side Edge Taps: tap left 22% of screen -> prev, tap right 22% -> next
          if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15 && deltaTime < 350) {
            const vw = window.innerWidth;
            if (touchEndX < vw * 0.22) {
              this.flipPrev();
            } else if (touchEndX > vw * 0.78) {
              this.flipNext();
            }
          }
        }
      }, { passive: true });
    }

    bindEvents() {
      // Exit viewer
      if (this.backdrop) {
        this.backdrop.addEventListener('click', (e) => {
          if (e.target === this.backdrop) this.close();
        });
      }
      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());

      // Floating Mobile Chevron Buttons
      if (this.mobilePrevArrow) {
        this.mobilePrevArrow.addEventListener('click', (e) => {
          e.stopPropagation();
          this.flipPrev();
        });
      }
      if (this.mobileNextArrow) {
        this.mobileNextArrow.addEventListener('click', (e) => {
          e.stopPropagation();
          this.flipNext();
        });
      }

      // Pagination Controls
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.flipPrev();
        });
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.flipNext();
        });
      }

      this.setupMobileTouchNavigation();
      if (this.pageInput) {
        this.pageInput.addEventListener('change', () => {
          if (!this.pageFlip || !this.pdfDoc) return;
          const page = parseInt(this.pageInput.value, 10);
          if (!isNaN(page) && page >= 1 && page <= this.totalPages) {
            this.pageFlip.turnToPage(page - 1);
          } else {
            this.updateControlsState();
          }
        });
      }

      // Zooming Controls
      if (this.zoomInBtn) this.zoomInBtn.addEventListener('click', () => this.zoom(0.15));
      if (this.zoomOutBtn) this.zoomOutBtn.addEventListener('click', () => this.zoom(-0.15));
      if (this.fitWidthBtn) this.fitWidthBtn.addEventListener('click', () => this.fitToWidth());
      if (this.fitPageBtn) this.fitPageBtn.addEventListener('click', () => this.fitToPage());

      // Fullscreen & Download
      if (this.fullscreenBtn) this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
      if (this.downloadBtn) this.downloadBtn.addEventListener('click', () => this.download());

      // Sidebar Index Toggle
      if (this.sidebarToggle) {
        this.sidebarToggle.addEventListener('click', () => {
          if (this.sidebar) {
            this.sidebar.classList.toggle('collapsed');
            if (this.frame) {
              this.frame.classList.toggle('sidebar-collapsed', this.sidebar.classList.contains('collapsed'));
            }
          }
        });
      }

      // Live Text Search
      if (this.searchInput) {
        let searchDebounce = null;
        this.searchInput.addEventListener('input', (e) => {
          clearTimeout(searchDebounce);
          searchDebounce = setTimeout(() => {
            this.search(e.target.value);
          }, 280);
        });
      }

      // Window Resize Listener
      window.addEventListener('resize', () => {
        if ((this.pdfDoc || (this.currentRecord && this.totalPages > 0)) && this.backdrop && this.backdrop.classList.contains('active') && this.pageFlip) {
          this.recalculateFlipbook();
        }
      });

      // Keyboard Shortcuts
      window.addEventListener('keydown', (e) => {
        if (!this.backdrop || !this.backdrop.classList.contains('active') || !this.pageFlip) return;

        if (e.key === 'Escape') {
          this.close();
        } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          this.flipNext();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          this.flipPrev();
        } else if (e.key === '+' || e.key === '=') {
          this.zoom(0.15);
        } else if (e.key === '-') {
          this.zoom(-0.15);
        }
      });

      // Fullscreen State Listener
      document.addEventListener('fullscreenchange', () => {
        this.isFullscreen = !!document.fullscreenElement;
        this.updateFullscreenIcon();
        if (this.pageFlip) {
          setTimeout(() => this.recalculateFlipbook(), 150);
        }
      });

      // Sealed Envelope Drag & Drop / File Picker Listeners
      if (this.placeholder) {
        this.placeholder.addEventListener('click', (e) => {
          if (e.target !== this.filePicker && this.filePicker) {
            this.filePicker.click();
          }
        });

        this.placeholder.addEventListener('dragover', (e) => {
          e.preventDefault();
          this.placeholder.classList.add('drag-over');
        });

        this.placeholder.addEventListener('dragleave', () => {
          this.placeholder.classList.remove('drag-over');
        });

        this.placeholder.addEventListener('drop', (e) => {
          e.preventDefault();
          this.placeholder.classList.remove('drag-over');
          const file = e.dataTransfer.files[0];
          if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf'))) {
            this.loadLocalFile(file);
          }
        });
      }

      if (this.filePicker) {
        this.filePicker.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            this.loadLocalFile(file);
          }
        });
      }
    }

    // -------------------------------------------------------------
    // MASTER DOCUMENT ROUTING & LIFECYCLE (AUTHORITATIVE API)
    // -------------------------------------------------------------
    openRecord(record, initialPage = 1) {
      if (!record) return;
      this.currentRecord = record;
      const source = record.source || record.pdfPath || '';
      const title = record.title || 'Digital Publication Exhibit';
      const week = record.week || record.category || 'ARCHIVAL RECORD';
      const docType = record.documentType || (source.toLowerCase().endsWith('.docx') ? 'DOCX' : (source.toLowerCase().endsWith('.pdf') ? 'PDF' : 'UNAVAILABLE'));

      console.log(`[DOCUMENT OPEN] ${week} | ${title} | ${docType} | ${source}`);

      this.pdfPath = source;
      this.pdfTitle = title;
      if (this.titleDisplay) this.titleDisplay.textContent = title;
      if (this.topBadge) this.topBadge.textContent = week;

      this.currentPage = Math.max(1, parseInt(initialPage, 10) || 1);
      this.zoomLevel = 1.0;
      this.searchMatches = [];
      if (this.searchInput) this.searchInput.value = '';
      this.hideLoading();

      if (this.backdrop) this.backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.querySelectorAll('.cursor-syntax-particle').forEach(p => p.remove());

      // On mobile screens, automatically collapse the sidebar so the document is immediately visible
      if (window.innerWidth <= 768 && this.sidebar) {
        this.sidebar.classList.add('collapsed');
        if (this.frame) this.frame.classList.add('sidebar-collapsed');
      }

      // Update URL hash for deep linking
      const rawNum = record.number || (record.id ? String(record.id).replace(/\D/g, '') : '1');
      const weekNum = parseInt(rawNum, 10) || 1;
      const targetHash = `#week-${weekNum}/page-${this.currentPage}`;
      if (window.location.hash !== targetHash) {
        if (history.replaceState) {
          history.replaceState(null, '', targetHash);
        } else {
          window.location.hash = targetHash;
        }
      }

      // ROUTE BY PRE-RENDERED HIGH-RES PAGES (Zero CORS, Works everywhere offline)
      let pages = record.pages || (record.record && record.record.pages) || null;
      if ((!pages || pages.length === 0) && (record.number || record.id)) {
        const pCount = record.pageCount || (record.record && record.record.pageCount) || (record.specs && record.specs['Page Count']) || 5;
        if (weekNum >= 1 && weekNum <= 13) {
          pages = Array.from({ length: pCount }, (_, i) => `weeks/week${weekNum}/pages/page-${String(i + 1).padStart(2, '0')}.jpg`);
        }
      }
      if (pages && Array.isArray(pages) && pages.length > 0) {
        this.loadFromPageImages(pages, title);
      } else if (docType === 'DOCX') {
        this.showDocxReader(record);
      } else if (docType === 'UNAVAILABLE' || !source) {
        this.showUnavailableState(week, source || '');
      } else {
        // PDF DOCUMENT (via PDF.js)
        this.loadPdfFromPath(source, title);
      }
    }

    open(pdfPath, title = 'Digital Publication Exhibit', initialPage = 1) {
      this.openRecord({
        source: pdfPath,
        title: title,
        week: 'ARCHIVAL RECORD',
        documentType: (pdfPath && pdfPath.toLowerCase().endsWith('.docx')) ? 'DOCX' : (pdfPath ? 'PDF' : 'UNAVAILABLE')
      }, initialPage);
    }

    close() {
      if (this.backdrop) this.backdrop.classList.remove('active');
      document.body.style.overflow = '';
      this.hideLoading();
      this.cleanup();

      // Clean page indicator from URL hash on close
      if (window.location.hash && window.location.hash.includes('/page-')) {
        const weekOnly = window.location.hash.split('/')[0];
        if (history.replaceState) {
          history.replaceState(null, '', weekOnly || '#');
        } else {
          window.location.hash = weekOnly || '';
        }
      }
    }

    showLoading() {
      if (this.loadingIndicator) this.loadingIndicator.classList.remove('hidden');
    }

    hideLoading() {
      if (this.loadingIndicator) this.loadingIndicator.classList.add('hidden');
    }

    cleanup() {
      // Cancel active PDF renders
      this.activeRenderTasks.forEach(task => {
        try { task.cancel(); } catch (_) { }
      });
      this.activeRenderTasks.clear();

      // Destroy old PageFlip instance
      if (this.pageFlip) {
        try {
          this.pageFlip.destroy();
        } catch (_) { }
        this.pageFlip = null;
      }

      // Always restore a clean, fresh mount node inside the container
      this.resetMountNode();

      this.pdfDoc = null;
      this.outline = [];
      this.totalPages = 1;

      if (this.placeholder) this.placeholder.classList.add('hidden');
      if (this.canvasWrapper) this.canvasWrapper.classList.remove('hidden');
    }

    // -------------------------------------------------------------
    // HIGH-RES IMAGE-BACKED FLIPBOOK LOADER (ZERO CORS, WORKS ON file://)
    // -------------------------------------------------------------
    loadFromPageImages(pages, docTitle) {
      this.cleanup();

      if (!pages || pages.length === 0) {
        this.showUnavailableState('Document', this.pdfPath || '');
        return;
      }

      if (this.canvasWrapper) this.canvasWrapper.classList.remove('hidden');
      if (this.placeholder) this.placeholder.classList.add('hidden');
      this.showLoading();

      this.totalPages = pages.length;
      this.pageAspectRatio = 1191 / 1684;

      this.initFlipbookFromImages(pages).then(() => {
        this.buildSidebarOutlineFromRecord();
        this.hideLoading();
      }).catch(err => {
        console.error('Error loading flipbook from images:', err);
        this.hideLoading();
        this.showErrorState(this.pdfPath, err.message);
      });
    }

    async initFlipbookFromImages(pages) {
      if (!window.St || !window.St.PageFlip) {
        throw new Error('StPageFlip library not ready');
      }

      this.resetMountNode();
      const { dispW, dispH, isPortrait } = this.calculateDimensions();

      const isMobile = window.innerWidth <= 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targetW = isMobile ? 800 : 1200;
      const optimizedPages = pages.map(p => getOptimizedImageUrl(p, targetW));

      const imageList = [...optimizedPages];
      if (imageList.length % 2 !== 0 && !isPortrait) {
        imageList.push(this.createBlankPageDataUrl(dispW, dispH));
      }

      const startIdx = Math.max(0, Math.min((this.currentPage || 1) - 1, imageList.length - 1));

      this.pageFlip = new window.St.PageFlip(this.mountNode, {
        width: dispW,
        height: dispH,
        size: 'fixed',
        minWidth: 240,
        maxWidth: 3600,
        minHeight: 340,
        maxHeight: 4800,
        maxShadowOpacity: prefersReducedMotion ? 0 : 0.35,
        showCover: false,
        mobileScrollSupport: false,
        flippingTime: prefersReducedMotion ? 0 : (isMobile ? 380 : 650),
        usePortrait: isPortrait,
        startPage: startIdx,
        drawShadow: !prefersReducedMotion,
        autoSize: true,
        useMouseEvents: true,
        swipeDistance: 25
      });

      this.pageFlip.loadFromImages(imageList);

      // Enforce high-DPI canvas smoothing
      setTimeout(() => {
        const canvases = this.mountNode ? this.mountNode.querySelectorAll('canvas') : [];
        canvases.forEach(c => {
          const ctx = c.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
          }
        });
      }, 40);

      this.pageFlip.on('flip', (e) => {
        this.currentPage = e.data + 1;
        this.updateControlsState();
        if (this.currentRecord) {
          const rawNum = this.currentRecord.number || (this.currentRecord.id ? String(this.currentRecord.id).replace(/\D/g, '') : '1');
          const weekNum = parseInt(rawNum, 10) || 1;
          const targetHash = `#week-${weekNum}/page-${this.currentPage}`;
          if (history.replaceState) {
            history.replaceState(null, '', targetHash);
          }
        }
      });

      this.pageFlip.on('changeOrientation', (e) => {
        this.updateControlsState();
      });

      this.currentPage = startIdx + 1;
      this.updateControlsState();
    }

    // -------------------------------------------------------------
    // PDF.JS DOCUMENT LOADER (ON-DEMAND ASYNC LIBRARY INITIALIZATION)
    // -------------------------------------------------------------
    async loadPdfFromPath(sourcePath, docTitle) {
      this.cleanup();

      if (!sourcePath) {
        this.showUnavailableState('Document', sourcePath || 'No source specified');
        return;
      }

      if (this.canvasWrapper) this.canvasWrapper.classList.remove('hidden');
      if (this.placeholder) this.placeholder.classList.add('hidden');
      this.showLoading();

      try {
        await this.ensurePdfLib();
      } catch (err) {
        console.error('[PDF ENGINE LOAD ERROR]', err);
        this.hideLoading();
        this.showErrorState(sourcePath, 'PDF viewing engine failed to load: ' + err.message);
        return;
      }

      // Safe URL resolution relative to document.baseURI with spaces properly encoded
      const resolvedUrl = new URL(sourcePath, document.baseURI).href;
      console.log(`[DOCUMENT RESOLVED URL] ${resolvedUrl}`);

      const loadingTask = window.pdfjsLib.getDocument({
        url: resolvedUrl,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      });

      loadingTask.promise.then(pdf => {
        this.pdfDoc = pdf;
        this.totalPages = pdf.numPages;
        console.log(`[DOCUMENT LOAD SUCCESS] ${sourcePath} (${pdf.numPages} pages)`);

        return pdf.getPage(1).then(page1 => {
          const vp = page1.getViewport({ scale: 1.0 });
          this.pageAspectRatio = vp.width / vp.height; // Dynamically measured from this specific PDF!

          return this.initFlipbookEngine();
        }).then(() => {
          this.buildSidebarOutline();
          this.hideLoading();
        });
      }).catch(err => {
        console.error(`[DOCUMENT LOAD ERROR] ${sourcePath}:`, err);
        this.hideLoading();
        this.showErrorState(sourcePath, err.message || 'Unable to open PDF document at this path.');
      });
    }

    async loadLocalFile(file) {
      this.cleanup();

      if (!this.canvasWrapper || !this.placeholder) return;
      this.canvasWrapper.classList.remove('hidden');
      this.placeholder.classList.add('hidden');
      this.showLoading();

      try {
        await this.ensurePdfLib();
      } catch (err) {
        this.hideLoading();
        this.showErrorState(file.name, 'PDF library failed to load.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const typedarray = new Uint8Array(e.target.result);
        const loadingTask = window.pdfjsLib.getDocument({ data: typedarray });
        loadingTask.promise.then(pdf => {
          this.pdfDoc = pdf;
          this.totalPages = pdf.numPages;
          return pdf.getPage(1).then(page1 => {
            const vp = page1.getViewport({ scale: 1.0 });
            this.pageAspectRatio = vp.width / vp.height;

            this.currentPage = 1;
            return this.initFlipbookEngine();
          }).then(() => {
            this.buildSidebarOutline();
            this.hideLoading();
          });
        }).catch(err => {
          console.error('Error rendering local PDF buffer:', err);
          this.hideLoading();
          this.showErrorState(file.name, 'Invalid local PDF buffer.');
        });
      };
      reader.readAsArrayBuffer(file);
    }

    // -------------------------------------------------------------
    // STPAGEFLIP INITIALIZATION & RENDERING (IMAGE-BACKED ENGINE)
    // -------------------------------------------------------------
    calculateDimensions() {
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;

      const cw = (this.canvasWrapper && this.canvasWrapper.clientWidth > 0)
        ? this.canvasWrapper.clientWidth
        : (isMobile ? window.innerWidth : (window.innerWidth - 320));
      const ch = (this.canvasWrapper && this.canvasWrapper.clientHeight > 0)
        ? this.canvasWrapper.clientHeight
        : (window.innerHeight - 90);

      const stageW = isMobile
        ? Math.max(260, Math.min(cw, window.innerWidth - (isSmallMobile ? 12 : 24)))
        : Math.max(500, cw - 40);
      const stageH = isMobile
        ? Math.max(360, ch - (isSmallMobile ? 85 : 95))
        : Math.max(500, ch - 70);

      const ratio = this.pageAspectRatio || 0.7071;
      const isPortrait = isMobile || (stageW <= 620);

      let dispW, dispH;

      if (isPortrait) {
        // Single Page Mode (Mobile default & narrow screens)
        const maxW = Math.min(stageW * (isMobile ? 0.98 : 0.94), 1200) * this.zoomLevel;
        const maxH = (stageH * (isMobile ? 0.96 : 0.92)) * this.zoomLevel;
        if (maxW / ratio <= maxH) {
          dispW = maxW;
          dispH = maxW / ratio;
        } else {
          dispH = maxH;
          dispW = maxH * ratio;
        }
      } else {
        // Two-Page Spread Mode (Desktop landscape)
        const maxSpreadW = Math.min(stageW * 0.96, 2400) * this.zoomLevel;
        const maxSpreadH = (stageH * 0.92) * this.zoomLevel;
        const maxSingleW = (maxSpreadW - 2) / 2;

        if (maxSingleW / ratio <= maxSpreadH) {
          dispW = maxSingleW;
          dispH = maxSingleW / ratio;
        } else {
          dispH = maxSpreadH;
          dispW = maxSpreadH * ratio;
        }
      }

      dispW = Math.floor(dispW);
      dispH = Math.floor(dispH);

      return { dispW, dispH, isPortrait };
    }

    async initFlipbookEngine() {
      if (!this.pdfDoc || !window.St || !window.St.PageFlip) {
        throw new Error('Flipbook dependencies not ready');
      }

      this.resetMountNode();
      const { dispW, dispH, isPortrait } = this.calculateDimensions();
      const numPages = this.pdfDoc.numPages;

      // 1. Render all PDF pages into high-DPI Data URLs
      const pageImages = [];
      for (let i = 1; i <= numPages; i++) {
        const imgData = await this.renderPdfPageToDataUrl(i, dispW, dispH);
        pageImages.push(imgData);
      }

      // If odd page count in two-page spread mode, add a clean blank white page
      if (numPages % 2 !== 0 && !isPortrait) {
        pageImages.push(this.createBlankPageDataUrl(dispW, dispH));
      }

      const isMobile = window.innerWidth <= 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const startIdx = Math.max(0, Math.min((this.currentPage || 1) - 1, pageImages.length - 1));

      // 2. Initialize St.PageFlip on the fresh mount node
      this.pageFlip = new window.St.PageFlip(this.mountNode, {
        width: dispW,
        height: dispH,
        size: 'fixed',
        minWidth: 240,
        maxWidth: 3600,
        minHeight: 340,
        maxHeight: 4800,
        maxShadowOpacity: prefersReducedMotion ? 0 : 0.35,
        showCover: false,
        mobileScrollSupport: false,
        flippingTime: prefersReducedMotion ? 0 : (isMobile ? 380 : 650),
        usePortrait: isPortrait,
        startPage: startIdx,
        drawShadow: !prefersReducedMotion,
        autoSize: true,
        useMouseEvents: true,
        swipeDistance: 25
      });

      this.pageFlip.loadFromImages(pageImages);

      // Bind StPageFlip Events
      this.pageFlip.on('flip', (e) => {
        this.currentPage = e.data + 1;
        this.updateControlsState();
        if (this.currentRecord) {
          const rawNum = this.currentRecord.number || (this.currentRecord.id ? String(this.currentRecord.id).replace(/\D/g, '') : '1');
          const weekNum = parseInt(rawNum, 10) || 1;
          const targetHash = `#week-${weekNum}/page-${this.currentPage}`;
          if (history.replaceState) {
            history.replaceState(null, '', targetHash);
          }
        }
      });

      this.pageFlip.on('changeOrientation', (e) => {
        this.updateControlsState();
      });

      this.currentPage = startIdx + 1;
      this.updateControlsState();
    }

    renderPdfPageToDataUrl(pageNum, targetWidth, targetHeight) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const canvas = document.createElement('canvas');
      canvas.width = Math.floor(targetWidth * dpr);
      canvas.height = Math.floor(targetHeight * dpr);

      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      return this.pdfDoc.getPage(pageNum).then(page => {
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const scale = Math.min(targetWidth / unscaledViewport.width, targetHeight / unscaledViewport.height);
        const viewport = page.getViewport({ scale: scale });

        const renderW = Math.floor(viewport.width);
        const renderH = Math.floor(viewport.height);
        const offsetX = Math.max(0, Math.floor((targetWidth - renderW) / 2));
        const offsetY = Math.max(0, Math.floor((targetHeight - renderH) / 2));

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
          transform: [1, 0, 0, 1, offsetX, offsetY]
        };

        const renderTask = page.render(renderContext);
        this.activeRenderTasks.set(canvas, renderTask);

        return renderTask.promise.then(() => {
          this.activeRenderTasks.delete(canvas);
          return canvas.toDataURL('image/jpeg', 0.95);
        }).catch(err => {
          if (err && err.name !== 'RenderingCancelledException') {
            console.warn(`PDF render note on page ${pageNum}:`, err);
          }
          return canvas.toDataURL('image/jpeg', 0.95);
        });
      }).catch(err => {
        console.warn(`PDF page ${pageNum} fetch note:`, err);
        return this.createBlankPageDataUrl(targetWidth, targetHeight);
      });
    }

    createBlankPageDataUrl(targetWidth, targetHeight) {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      return canvas.toDataURL('image/jpeg', 0.9);
    }

    recalculateFlipbook() {
      if (!this.pageFlip) return;
      const targetPage = this.currentPage;
      const pages = (this.currentRecord && (this.currentRecord.pages || (this.currentRecord.record && this.currentRecord.record.pages))) || null;

      if (pages && pages.length > 0) {
        this.initFlipbookFromImages(pages).then(() => {
          if (this.pageFlip && targetPage > 1) {
            this.pageFlip.turnToPage(Math.min(targetPage - 1, pages.length - 1));
          }
        });
      } else if (this.pdfDoc) {
        this.initFlipbookEngine().then(() => {
          if (this.pageFlip && targetPage > 1) {
            this.pageFlip.turnToPage(targetPage - 1);
          }
        });
      }
    }

    // -------------------------------------------------------------
    // CONTROLS & UI SYNCHRONIZATION
    // -------------------------------------------------------------
    updateControlsState() {
      if (!this.pageFlip) return;

      const curr = this.currentPage;
      const total = this.totalPages;
      const isPortrait = this.canvasWrapper ? this.canvasWrapper.clientWidth <= 620 : false;

      if (this.pageInput) {
        this.pageInput.value = curr;
      }

      if (this.totalPagesText) {
        if (!isPortrait && curr < total) {
          const nextP = curr + 1;
          const lStr = String(curr).padStart(2, '0');
          const rStr = String(nextP).padStart(2, '0');
          const tStr = String(total).padStart(2, '0');
          this.totalPagesText.textContent = `— ${rStr} / ${tStr}`;
        } else {
          const tStr = String(total).padStart(2, '0');
          this.totalPagesText.textContent = `/ ${tStr}`;
        }
      }

      if (this.prevBtn) {
        this.prevBtn.disabled = (curr <= 1);
      }
      if (this.nextBtn) {
        this.nextBtn.disabled = (curr >= total);
      }

      if (this.mobilePrevArrow) {
        this.mobilePrevArrow.disabled = (curr <= 1);
        this.mobilePrevArrow.style.opacity = (curr <= 1) ? '0.22' : '1';
        this.mobilePrevArrow.style.pointerEvents = (curr <= 1) ? 'none' : 'auto';
      }
      if (this.mobileNextArrow) {
        this.mobileNextArrow.disabled = (curr >= total);
        this.mobileNextArrow.style.opacity = (curr >= total) ? '0.22' : '1';
        this.mobileNextArrow.style.pointerEvents = (curr >= total) ? 'none' : 'auto';
      }

      if (this.bookmarkList) {
        const items = this.bookmarkList.querySelectorAll('.index-link-item');
        items.forEach(el => {
          const p = parseInt(el.getAttribute('data-page-num'), 10);
          const isActive = (p === curr || (!isPortrait && p === curr + 1));
          el.classList.toggle('active', isActive);
        });
      }
    }

    // -------------------------------------------------------------
    // ZOOM & FIT ACTIONS
    // -------------------------------------------------------------
    zoom(delta) {
      this.zoomLevel = Math.min(Math.max(this.zoomLevel + delta, 0.5), 2.5);
      this.recalculateFlipbook();
    }

    fitToWidth() {
      this.zoomLevel = 1.15;
      this.recalculateFlipbook();
    }

    fitToPage() {
      this.zoomLevel = 1.0;
      this.recalculateFlipbook();
    }

    toggleFullscreen() {
      if (!this.frame) return;
      if (!document.fullscreenElement) {
        this.frame.requestFullscreen().catch(err => {
          console.warn(`Fullscreen unavailable: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }

    updateFullscreenIcon() {
      if (this.fullscreenBtn) {
        this.fullscreenBtn.style.color = this.isFullscreen ? 'var(--celestial-indigo)' : '';
      }
    }

    download() {
      if (!this.pdfPath) return;
      const a = document.createElement('a');
      a.href = new URL(this.pdfPath, document.baseURI).href;
      a.download = (this.pdfTitle || 'Advanced_Java_Record').replace(/[^a-zA-Z0-9_-]/g, '_') + (this.pdfPath.endsWith('.docx') ? '.docx' : '.pdf');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    // -------------------------------------------------------------
    // OUTLINE HANDLING (GENUINE BOOKMARKS & SECTION SYNC)
    // -------------------------------------------------------------
    buildSidebarOutline() {
      if (!this.pdfDoc || !this.bookmarkList) return;
      this.bookmarkList.innerHTML = '';

      this.pdfDoc.getOutline().then(outline => {
        this.outline = outline || [];
        if (this.outline.length > 0) {
          this.outline.forEach(item => {
            const li = document.createElement('li');
            li.className = 'index-link-item';
            li.innerHTML = `<span>§</span> ${item.title}`;
            li.addEventListener('click', () => {
              this.navigateToDest(item.dest);
            });
            this.bookmarkList.appendChild(li);
          });
        } else {
          // Check if record has keyConcepts or sections
          const sections = (this.currentRecord && this.currentRecord.record && this.currentRecord.record.keyConcepts) || [];
          const total = this.totalPages;

          if (sections.length > 0 && sections.length <= total + 4) {
            sections.forEach((sec, sIdx) => {
              const targetP = Math.min(total, Math.max(1, Math.round((sIdx / sections.length) * total) + 1));
              const li = document.createElement('li');
              li.className = `index-link-item ${sIdx === 0 ? 'active' : ''}`;
              li.setAttribute('data-page-num', targetP);
              li.innerHTML = `<span>${String(sIdx + 1).padStart(2, '0')}</span> ${sec.replace(/^\d+[\.\-\:]\s*/, '')}`;
              li.addEventListener('click', () => {
                if (this.pageFlip) this.pageFlip.turnToPage(targetP - 1);
              });
              this.bookmarkList.appendChild(li);
            });
          } else {
            for (let i = 1; i <= total; i++) {
              const li = document.createElement('li');
              li.className = `index-link-item ${i === 1 ? 'active' : ''}`;
              li.setAttribute('data-page-num', i);
              li.innerHTML = `<span>${String(i).padStart(2, '0')}</span> Page ${String(i).padStart(2, '0')}`;
              li.addEventListener('click', () => {
                if (this.pageFlip) this.pageFlip.turnToPage(i - 1);
              });
              this.bookmarkList.appendChild(li);
            }
          }
        }
        this.updateControlsState();
      });
    }

    buildSidebarOutlineFromRecord() {
      if (!this.bookmarkList) return;
      this.bookmarkList.innerHTML = '';

      const sections = (this.currentRecord && this.currentRecord.record && this.currentRecord.record.keyConcepts) || [];
      const total = this.totalPages;

      if (sections.length > 0) {
        sections.forEach((sec, sIdx) => {
          const targetP = Math.min(total, Math.max(1, Math.round((sIdx / sections.length) * total) + 1));
          const li = document.createElement('li');
          li.className = `index-link-item ${sIdx === 0 ? 'active' : ''}`;
          li.setAttribute('data-page-num', targetP);
          li.innerHTML = `<span>${String(sIdx + 1).padStart(2, '0')}</span> ${sec.replace(/^\d+[\.\-\:]\s*/, '')}`;
          li.addEventListener('click', () => {
            if (this.pageFlip) this.pageFlip.turnToPage(targetP - 1);
          });
          this.bookmarkList.appendChild(li);
        });
      } else {
        for (let i = 1; i <= total; i++) {
          const li = document.createElement('li');
          li.className = `index-link-item ${i === 1 ? 'active' : ''}`;
          li.setAttribute('data-page-num', i);
          li.innerHTML = `<span>${String(i).padStart(2, '0')}</span> Page ${String(i).padStart(2, '0')}`;
          li.addEventListener('click', () => {
            if (this.pageFlip) this.pageFlip.turnToPage(i - 1);
          });
          this.bookmarkList.appendChild(li);
        }
      }
      this.updateControlsState();
    }

    navigateToDest(dest) {
      if (!this.pdfDoc || !dest || !this.pageFlip) return;
      if (typeof dest === 'string') {
        this.pdfDoc.getDestination(dest).then(resDest => {
          this.goToResolvedDest(resDest);
        });
      } else {
        this.goToResolvedDest(dest);
      }
    }

    goToResolvedDest(resolvedDest) {
      if (resolvedDest && resolvedDest[0] && this.pageFlip) {
        this.pdfDoc.getPageIndex(resolvedDest[0]).then(index => {
          this.pageFlip.turnToPage(index);
        });
      }
    }

    // -------------------------------------------------------------
    // LIVE TEXT SEARCH
    // -------------------------------------------------------------
    search(query) {
      if (!this.pdfDoc || !query) {
        this.searchMatches = [];
        return;
      }

      const q = query.toLowerCase().trim();
      if (q.length < 2) return;

      const matchPromises = [];
      for (let i = 1; i <= this.pdfDoc.numPages; i++) {
        matchPromises.push(
          this.pdfDoc.getPage(i).then(page => {
            return page.getTextContent().then(content => {
              const text = content.items.map(item => item.str).join(' ').toLowerCase();
              return text.includes(q) ? i : null;
            });
          })
        );
      }

      Promise.all(matchPromises).then(results => {
        this.searchMatches = results.filter(res => res !== null);
        if (this.searchMatches.length > 0 && this.pageFlip) {
          this.pageFlip.turnToPage(this.searchMatches[0] - 1);
        }
      });
    }

    // -------------------------------------------------------------
    // SPECIAL DOCUMENT STATES (DOCX READER & UNAVAILABLE/SEALED)
    // -------------------------------------------------------------
    showDocxReader(record) {
      this.cleanup();
      if (this.canvasWrapper) this.canvasWrapper.classList.add('hidden');
      if (this.placeholder) {
        this.placeholder.classList.remove('hidden');
        if (this.placeholderTitle) {
          this.placeholderTitle.textContent = record.title || 'Java Week 7 (DOCX Document)';
        }
        if (this.placeholderDesc) {
          this.placeholderDesc.textContent = 'This verified laboratory record is provided in Word Document (.docx) format covering Java Servlets, HTML, Generic & HTTP Servlets in Apache Tomcat. Click below or download to view.';
        }
        if (this.placeholderPath) {
          this.placeholderPath.textContent = record.source || 'weeks/week7/Java Week 7.docx';
        }
      }

      // Build outline for Week 7 tasks
      if (this.bookmarkList) {
        this.bookmarkList.innerHTML = '';
        const docxTasks = [
          '1. Simple Web Application using HTML',
          '2. Simple Web Application using Servlet',
          '3. Simple Web Application using Generic Servlet',
          '4. Simple Web Application using HTTP Servlet',
          '5. How to Run a Servlet using Apache Tomcat'
        ];
        docxTasks.forEach((task, idx) => {
          const li = document.createElement('li');
          li.className = `index-link-item ${idx === 0 ? 'active' : ''}`;
          li.innerHTML = `<span>0${idx + 1}</span> ${task}`;
          this.bookmarkList.appendChild(li);
        });
      }
    }

    showUnavailableState(weekLabel, path) {
      this.cleanup();
      if (this.canvasWrapper) this.canvasWrapper.classList.add('hidden');
      if (this.placeholder) {
        this.placeholder.classList.remove('hidden');
        if (this.placeholderTitle) {
          this.placeholderTitle.textContent = `${weekLabel || 'Week 05'} — Document Not Available`;
        }
        if (this.placeholderDesc) {
          this.placeholderDesc.textContent = 'No PDF is currently present for this week in the archival repository. When a PDF is added to the folder, it will automatically load.';
        }
        if (this.placeholderPath) {
          this.placeholderPath.textContent = path || 'weeks/week5';
        }
      }
      if (this.bookmarkList) {
        this.bookmarkList.innerHTML = '<li class="index-link-item"><span>—</span> Document Pending</li>';
      }
    }

    showErrorState(sourcePath, errMsg) {
      this.cleanup();
      if (this.canvasWrapper) this.canvasWrapper.classList.add('hidden');
      if (this.placeholder) {
        this.placeholder.classList.remove('hidden');
        if (this.placeholderTitle) {
          this.placeholderTitle.textContent = 'Document Archival View';
        }
        const safePath = (sourcePath && !sourcePath.trim().toLowerCase().startsWith('javascript:')) ? encodeURI(sourcePath) : '#';
        if (this.placeholderDesc) {
          this.placeholderDesc.innerHTML = `
            <p style="margin-bottom: 0.8rem;">Note: If viewing directly via <code>file://</code> protocol in Chrome/Edge, browser security policies restrict direct JavaScript canvas fetching.</p>
            <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
              <a href="${safePath}" target="_blank" rel="noopener noreferrer" class="btn-luxury-action" style="padding: 0.65rem 1.4rem; font-size: 0.8rem; text-decoration: none;">
                <span>Open PDF in Tab</span>
                <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: currentColor;"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
              </a>
              <button onclick="window.ExhibitionPDFViewer.download()" class="btn-catalog-expand" style="padding: 0.65rem 1.4rem; font-size: 0.8rem;">
                <span>Download PDF</span>
              </button>
            </div>
            <p style="font-size: 0.78rem; color: var(--ink-tertiary); margin-top: 0.8rem;">Or run <code>start_server.bat</code> in the project folder to enable the complete 3D interactive flipbook.</p>
          `;
        }
        if (this.placeholderPath) {
          this.placeholderPath.textContent = sourcePath;
        }
      }
    }
  }

  // Singleton instance & global open handler
  window.ExhibitionPDFViewer = new ExhibitionPDFViewer();

  window.openRecordDocument = function (record, initialPage = 1) {
    if (!record) return;
    window.ExhibitionPDFViewer.openRecord(record, initialPage);
  };
})();
