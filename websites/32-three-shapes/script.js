/**
 * Bauhaus Layout Workshop - Three Shapes
 * Interactive Script
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
    title: 'Cân bằng',
    explanation: 'Các khối hình nương tựa vào nhau quanh trục trung tâm, tạo cảm giác tĩnh tại và ổn định trường lực.',
    circle: { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1) rotate(0deg)' },
    square: { top: '22%', left: '22%', transform: 'translate(0, 0) scale(1) rotate(0deg)' },
    triangle: { top: '54%', left: '58%', transform: 'translate(0, 0) scale(1) rotate(0deg)' }
  },
  'off-center': {
    title: 'Lệch tâm',
    explanation: 'Dồn trọng lượng thị giác về một phía, tạo sức căng bất đối xứng và hướng chuyển động chéo mạnh mẽ.',
    circle: { top: '65%', left: '72%', transform: 'translate(-50%, -50%) scale(1.35) rotate(0deg)' },
    square: { top: '15%', left: '15%', transform: 'translate(0, 0) scale(0.85) rotate(45deg)' },
    triangle: { top: '55%', left: '12%', transform: 'translate(0, 0) scale(1.15) rotate(-15deg)' }
  },
  'rhythmic': {
    title: 'Nhịp lặp',
    explanation: 'Tổ chức theo trật tự phân tầng song song, gợi sự tiếp nối tuần hoàn và nhịp điệu đồ họa có chủ đích.',
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
    if (badgeEl) badgeEl.textContent = data.title;

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
    card.addEventListener('click', (e) => {
      // Check radio
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      // Update UI active card
      scheduleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      // Update Form display
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
      showError(nameInput, 'Vui lòng nhập họ và tên của bạn.');
      valid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      showError(emailInput, 'Vui lòng nhập định dạng email hợp lệ (ví dụ: ban@domain.com).');
      valid = false;
    } else {
      clearError(emailInput);
    }

    if (!valid) return;

    // Show simulated result in accessible modal
    if (modalSummary) {
      modalSummary.innerHTML = `
        <div style="background-color: #F4F1EA; border: 3px solid #121212; padding: 1.25rem; margin-bottom: 1.25rem;">
          <p style="font-weight: 900; text-transform: uppercase; font-size: 0.875rem; letter-spacing: 0.05em; color: #D02020; margin-bottom: 0.5rem;">DỮ LIỆU ĐĂNG KÝ MẪU</p>
          <p><strong>Người tham gia:</strong> ${escapeHtml(nameInput.value.trim())}</p>
          <p><strong>Email liên hệ:</strong> ${escapeHtml(emailVal)}</p>
          <p><strong>Buổi đã chọn:</strong> ${escapeHtml(sessionLabel)}</p>
          <p><strong>Thời lượng:</strong> 180 phút thực hành giấy & bố cục</p>
        </div>
        <p style="font-size: 0.9375rem; line-height: 1.5; color: #121212;">
          <strong>Lưu ý:</strong> Đây là bản trình diễn giao diện tương tác (mockup prototype). Dữ liệu của bạn không được gửi đến máy chủ ngoài hoặc lưu trữ vào cơ sở dữ liệu.
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
    title: 'Lực Nén (Compression)',
    rule: 'Sự chèn ép bất đối xứng giữa khối vuông góc cạnh và đường tròn',
    analysis: 'Khối đỏ xiên 14 độ cắt ngang không gian trên, dồn ép khối tròn vàng vào góc dưới bên phải. Điểm hòa trộn multiply tạo ra một lớp thị giác thứ ba, biến hai màu đơn thành cấu trúc ba chiều mà không cần dùng bóng mờ đổ mềm.'
  },
  'cutting-edge': {
    title: 'Lưỡi Cắt (Cutting Edge)',
    rule: 'Mũi nhọn tam giác phá vỡ sự đặc tuyến của nền đen',
    analysis: 'Khối tam giác xanh dương xoay 32 độ tạo mũi lao trực diện đâm xuyên qua đường phân tuyến đen phía dưới. Sự căng thẳng thị giác phát sinh tại tiếp điểm giữa đỉnh nhọn và dải màu tối, thể hiện triết lý kiến tạo động lực thị giác.'
  },
  'concentric': {
    title: 'Đồng Tâm (Concentric)',
    rule: 'Khối thoi trung tâm được neo giữ bởi trường lực 4 góc',
    analysis: 'Hình thoi vàng 45 độ đặt tại tâm điểm được neo giữ thăng bằng nhờ bốn chấm tròn đỏ tại bốn góc vuông. Mối liên hệ khoảng cách đều đặn tạo ra lực ly tâm và hướng tâm song song, tượng trưng cho tính chuẩn mực của hệ thống lưới Bauhaus.'
  },
  'polarity': {
    title: 'Phân Cực (Polarity)',
    rule: 'Phân đôi không gian bằng tương phản đặc - rỗng và thẳng - cong',
    analysis: 'Một nửa khung hình là mảng xanh dương đặc, nửa kia là vòng tròn đen dạng khung rỗng. Tác phẩm thể hiện trực quan cặp phạm trù nhị nguyên: đặc và rỗng, đường thẳng kiến trúc và đường cong sinh học.'
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
            <p style="font-size: 0.875rem; font-weight: 900; text-transform: uppercase; color: #1040C0; margin-bottom: 0.25rem;">NGUYÊN LÝ TỔ CHỨC</p>
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
    toggleBtn.textContent = !isOpen ? 'ĐÓNG ✕' : 'MENU ☰';
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
