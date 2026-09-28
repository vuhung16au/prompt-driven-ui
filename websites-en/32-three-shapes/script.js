/**
 * Bauhaus Layout Workshop - Three Shapes
 * Interactive Script (English Version)
 */

document.addEventListener('DOMContentLoaded', () => {
  initPresets();
  initSessions();
  initForm();
  initWorksModal();
  initAccordion();
  initMobileMenu();
  initBackToTop();
});

/* ==========================================================================
   1. Interactive Layout Presets
   ========================================================================== */
const presetsData = {
  'balanced': {
    title: 'Balanced',
    explanation: 'Forms rely on each other around a central axis, creating a static and harmonious feel.',
    circle: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1) rotate(0deg)' },
    square: { top: '22%', left: '22%', transform: 'translate(0, 0) scale(1) rotate(0deg)' },
    triangle: { top: '54%', left: '58%', transform: 'translate(0, 0) scale(1) rotate(0deg)' }
  },
  'off-center': {
    title: 'Off-center',
    explanation: 'Weight is shifted to one side, generating visual tension and implied movement.',
    circle: { top: '65%', left: '72%', transform: 'translate(-50%, -50%) scale(1.35) rotate(0deg)' },
    square: { top: '15%', left: '15%', transform: 'translate(0, 0) scale(0.85) rotate(45deg)' },
    triangle: { top: '55%', left: '12%', transform: 'translate(0, 0) scale(1.15) rotate(-15deg)' }
  },
  'rhythmic': {
    title: 'Rhythmic',
    explanation: 'Organized in a parallel grid, suggesting continuous repetition.',
    circle: { top: '24%', left: '22%', transform: 'translate(-50%, -50%) scale(0.9) rotate(0deg)' },
    square: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1) rotate(0deg)' },
    triangle: { top: '76%', left: '76%', transform: 'translate(-50%, -50%) scale(1.1) rotate(90deg)' }
  }
};

let currentPreset = 'balanced';
let isRotated = false;

function initPresets() {
  const presetButtons = document.querySelectorAll('.preset-btn');
  const explanationEl = document.getElementById('canvas-explanation');
  const badgeEl = document.getElementById('canvas-preset-name');
  const resetBtn = document.getElementById('btn-reset-preset');
  const rotateBtn = document.getElementById('btn-rotate-shapes');

  function applyPreset(presetKey) {
    const data = presetsData[presetKey];
    if (!data) return;

    currentPreset = presetKey;
    isRotated = false;

    // Apply styles to shapes
    const circle = document.getElementById('shape-circle');
    const square = document.getElementById('shape-square');
    const triangle = document.getElementById('shape-triangle-wrapper');

    if (circle) {
      circle.style.top = data.circle.top;
      circle.style.left = data.circle.left;
      circle.style.transform = data.circle.transform;
    }
    if (square) {
      square.style.top = data.square.top;
      square.style.left = data.square.left;
      square.style.transform = data.square.transform;
    }
    if (triangle) {
      triangle.style.top = data.triangle.top;
      triangle.style.left = data.triangle.left;
      triangle.style.transform = data.triangle.transform;
    }

    // Update text & badges
    if (explanationEl) explanationEl.textContent = data.explanation;
    if (badgeEl) badgeEl.textContent = data.title.toUpperCase();

    // Update button states
    presetButtons.forEach(btn => {
      const match = btn.getAttribute('data-preset') === presetKey;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-pressed', match ? 'true' : 'false');
    });
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-preset');
      applyPreset(key);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      applyPreset('balanced');
    });
  }

  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      isRotated = !isRotated;
      const angle = isRotated ? '45deg' : '0deg';
      const square = document.getElementById('shape-square');
      if (square) {
        square.style.transform = `scale(1) rotate(${angle})`;
      }
    });
  }

  // Initial preset
  applyPreset('balanced');
}

/* ==========================================================================
   2. Session Selection
   ========================================================================== */
function initSessions() {
  const scheduleCards = document.querySelectorAll('.schedule-option-card');
  const selectedPill = document.getElementById('form-selected-session');

  scheduleCards.forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      scheduleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const sessionLabel = card.getAttribute('data-session-label');
      if (selectedPill && sessionLabel) {
        selectedPill.textContent = sessionLabel;
      }
    });
  });
}

/* ==========================================================================
   3. Registration Form & Simulated Confirmation
   ========================================================================== */
function initForm() {
  const form = document.getElementById('workshop-registration-form');
  const modal = document.getElementById('feedback-modal');
  const modalSummary = document.getElementById('modal-summary-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const resetBtn = document.getElementById('modal-reset-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const sessionLabel = document.getElementById('form-selected-session').textContent;

    let valid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your full name.');
      valid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      showError(emailInput, 'Please enter a valid email address (e.g., name@domain.com).');
      valid = false;
    } else {
      clearError(emailInput);
    }

    if (!valid) return;

    // Show simulated result in accessible modal
    if (modalSummary) {
      modalSummary.innerHTML = `
        <div style="background-color: #F4F1EA; border: 3px solid #121212; padding: 1.25rem; margin-bottom: 1.25rem;">
          <p style="font-weight: 900; text-transform: uppercase; font-size: 0.875rem; letter-spacing: 0.05em; color: #D02020; margin-bottom: 0.5rem;">SAMPLE REGISTRATION CONFIRMATION</p>
          <p><strong>Participant:</strong> ${escapeHtml(nameInput.value.trim())}</p>
          <p><strong>Contact Email:</strong> ${escapeHtml(emailVal)}</p>
          <p><strong>Selected Session:</strong> ${escapeHtml(sessionLabel)}</p>
          <p><strong>Duration:</strong> 180 Minutes Hands-on Physical Layout</p>
        </div>
        <p style="font-size: 0.9375rem; line-height: 1.5; color: #121212;">
          <strong>Notice:</strong> This is an interactive demo prototype. Your submission does not send messages, create orders, or execute external workflows.
        </p>
      `;
    }

    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn?.focus();
    }
  });

  function showError(input, msg) {
    input.classList.add('is-invalid');
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('visible');
    }
  }

  function clearError(input) {
    input.classList.remove('is-invalid');
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  // Clear errors on input
  ['reg-name', 'reg-email'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(el));
    }
  });

  // Modal close
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  closeBtn?.addEventListener('click', closeModal);

  resetBtn?.addEventListener('click', () => {
    form.reset();
    closeModal();
    const defaultRadio = document.querySelector('input[name="session"]');
    if (defaultRadio) {
      defaultRadio.checked = true;
      const card = defaultRadio.closest('.schedule-option-card');
      document.querySelectorAll('.schedule-option-card').forEach(c => c.classList.remove('selected'));
      card?.classList.add('selected');
      const label = card?.getAttribute('data-session-label');
      const selectedPill = document.getElementById('form-selected-session');
      if (selectedPill && label) selectedPill.textContent = label;
    }
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. Practice Works Modal
   ========================================================================== */
const worksDetails = {
  'compression': {
    title: 'Compression',
    rule: 'Asymmetric collision between sharp angular square and circular curve',
    analysis: 'The 14-degree tilted red rectangle cuts horizontally across the upper space, pressing the yellow circle into the lower right corner. The multiply blend creates a distinct third layer, achieving three-dimensional depth purely through primary color layering without soft blurred drop shadows.'
  },
  'cutting-edge': {
    title: 'Cutting Edge',
    rule: 'Triangular point piercing the continuous black baseline',
    analysis: 'The 32-degree rotated blue triangle forms a decisive apex thrusting through the solid black field below. Visual tension erupts at the contact vertex, embodying the constructivist philosophy of directional force.'
  },
  'concentric': {
    title: 'Concentric',
    rule: 'Central diamond held in equilibrium by a four-corner forcefield',
    analysis: 'The 45-degree yellow diamond at the center is locked into absolute equilibrium by four circular red corner anchors. Equal spatial distances generate simultaneous centrifugal and centripetal forces, demonstrating classic Bauhaus grid discipline.'
  },
  'polarity': {
    title: 'Polarity',
    rule: 'Splitting space through contrast of solid-void and straight-curve',
    analysis: 'Half the canvas is a dense architectural blue plane, while the other half presents a stark hollow black ring. The work crystallizes the dual Bauhaus dialectic: solid versus void, rectilinear geometry versus organic curvature.'
  }
};

function initWorksModal() {
  const modal = document.getElementById('work-detail-modal');
  const titleEl = document.getElementById('work-modal-title');
  const bodyEl = document.getElementById('work-modal-body');
  const closeBtn = document.getElementById('work-modal-close-btn');
  const workCards = document.querySelectorAll('.work-card');

  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const workKey = card.getAttribute('data-work-key');
      const data = worksDetails[workKey];
      if (!data || !modal) return;

      if (titleEl) titleEl.textContent = data.title;
      if (bodyEl) {
        bodyEl.innerHTML = `
          <div style="background-color: #F4F1EA; border: 3px solid #121212; padding: 1.25rem; margin-bottom: 1rem;">
            <p style="font-size: 0.875rem; font-weight: 900; text-transform: uppercase; color: #1040C0; margin-bottom: 0.25rem;">STRUCTURAL PRINCIPLE</p>
            <p style="font-weight: 700; font-size: 1.125rem;">${escapeHtml(data.rule)}</p>
          </div>
          <p style="font-size: 1.0625rem; line-height: 1.6; color: #121212;">
            ${escapeHtml(data.analysis)}
          </p>
        `;
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn?.focus();
    });
  });

  function closeWorkModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  closeBtn?.addEventListener('click', closeWorkModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeWorkModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeWorkModal();
    }
  });
}

/* ==========================================================================
   5. Bauhaus Accordion (FAQ)
   ========================================================================== */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('is-open');

      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherHeader = other.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('is-open', !isOpen);
      header.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });
}

/* ==========================================================================
   6. Mobile Navigation
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    navMenu.classList.toggle('open', !isOpen);
    toggleBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    toggleBtn.textContent = !isOpen ? 'CLOSE ✕' : 'MENU ☰';
  });

  // Close on nav link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.textContent = 'MENU ☰';
    });
  });
}

/* ==========================================================================
   7. Back to Top
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('btn-back-to-top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Utility helper to prevent XSS
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
