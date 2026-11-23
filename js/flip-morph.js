// flip-morph.js - FLIP (First, Last, Invert, Play) Layout Transitions for Exhibit Cards
(function() {
  class FlipMorpher {
    constructor(cards) {
      this.cards = Array.from(cards);
      this.init();
    }

    init() {
      this.cards.forEach(card => {
        const expandBtn = card.querySelector('.btn-catalog-expand');
        
        if (expandBtn) {
          expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle(card);
          });
        }

        // Clicking anywhere on card (except interactive links/buttons) toggles catalog details
        card.addEventListener('click', (e) => {
          if (
            e.target.closest('.btn-open-record-primary') ||
            e.target.closest('.btn-catalog-expand') ||
            e.target.closest('a') ||
            e.target.closest('input')
          ) {
            return;
          }
          this.toggle(card);
        });
      });
    }

    toggle(card) {
      const isExpanded = card.classList.contains('expanded');
      const expandBtn = card.querySelector('.btn-catalog-expand');
      
      // 1. FIRST: Capture initial layout bounding rect
      const firstRect = card.getBoundingClientRect();
      
      // Toggle expanded state
      if (isExpanded) {
        card.classList.remove('expanded');
        if (expandBtn) expandBtn.setAttribute('aria-expanded', 'false');
      } else {
        card.classList.add('expanded');
        if (expandBtn) expandBtn.setAttribute('aria-expanded', 'true');
      }

      // 2. LAST: Capture target bounding rect
      const lastRect = card.getBoundingClientRect();

      // 3. INVERT: Calculate position & dimension deltas
      const deltaX = firstRect.left - lastRect.left;
      const deltaY = firstRect.top - lastRect.top;
      const deltaH = firstRect.height / Math.max(lastRect.height, 1);

      // Apply invert transform without animation delay
      card.style.transition = 'none';
      card.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      card.style.transformOrigin = 'top center';

      // 4. PLAY: Animate smoothly to target state
      requestAnimationFrame(() => {
        card.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.65s';
        card.style.transform = 'translate3d(0, 0, 0)';
        card.style.transformOrigin = '';

        if (!isExpanded) {
          setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 250);
        }
      });
    }

    collapseImmediate(card) {
      card.classList.remove('expanded');
      const expandBtn = card.querySelector('.btn-catalog-expand');
      if (expandBtn) expandBtn.setAttribute('aria-expanded', 'false');
      card.style.transform = '';
      card.style.transition = '';
    }
  }

  window.FlipMorpher = FlipMorpher;
})();
