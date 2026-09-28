document.addEventListener('DOMContentLoaded', () => {
  // Motion Toggle
  const motionToggle = document.getElementById('motion-toggle');
  let isMotionPaused = false;

  motionToggle.addEventListener('click', () => {
    isMotionPaused = !isMotionPaused;
    document.body.classList.toggle('motion-paused', isMotionPaused);
    motionToggle.setAttribute('aria-pressed', isMotionPaused);
    motionToggle.textContent = isMotionPaused ? 'TIẾP TỤC CHUYỂN ĐỘNG' : 'TẠM DỪNG CHUYỂN ĐỘNG';
  });

  // Play/Pause Study Demos
  const playBtns = document.querySelectorAll('.play-btn');
  
  playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Prevent button default
      e.preventDefault();
      
      const card = btn.closest('.card');
      const previewBox = card.querySelector('.preview-box');
      
      // Toggle play state
      const isPlaying = previewBox.classList.contains('is-playing');
      
      // Stop all others
      document.querySelectorAll('.preview-box').forEach(box => {
        box.classList.remove('is-playing');
      });
      document.querySelectorAll('.play-btn').forEach(b => {
        b.textContent = 'PHÁT';
      });

      if (!isPlaying) {
        previewBox.classList.add('is-playing');
        btn.textContent = 'DỪNG';
      }
    });
  });

  // Brief Form Preview
  const messageInput = document.getElementById('message');
  const previewText = document.getElementById('preview-text');
  const charCount = document.getElementById('char-count');
  const briefForm = document.getElementById('brief-form');

  if(messageInput && previewText) {
    messageInput.addEventListener('input', (e) => {
      const val = e.target.value;
      charCount.textContent = `${val.length}/50`;
      previewText.textContent = val || '...';
      
      // Simple random kinetic animation trigger on typing
      previewText.style.animation = 'none';
      void previewText.offsetWidth; // trigger reflow
      if(val.length > 0) {
        previewText.style.animation = 'emphasize 1s ease-in-out';
      }
    });
  }

  if(briefForm) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Bản xem trước đã cập nhật. Đây là thử nghiệm, không có dữ liệu nào được gửi.');
    });
  }

  // Accessibility: Check prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    isMotionPaused = true;
    document.body.classList.add('motion-paused');
    motionToggle.setAttribute('aria-pressed', 'true');
    motionToggle.textContent = 'CHẾ ĐỘ GIẢM CHUYỂN ĐỘNG ĐANG BẬT';
  }
});
