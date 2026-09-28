document.addEventListener('DOMContentLoaded', () => {
  // Before & After Toggle Logic
  const btnBefore = document.getElementById('btn-before');
  const btnAfter = document.getElementById('btn-after');
  const text1 = document.getElementById('text-1');
  const text2 = document.getElementById('text-2');

  const content = {
    before: {
      t1: '"Giải pháp toàn diện giúp tối ưu hóa quy trình làm việc và tăng hiệu suất doanh nghiệp."',
      t2: '"Cam kết mang đến dịch vụ vận chuyển nhanh chóng, an toàn và uy tín hàng đầu."'
    },
    after: {
      t1: '"Bớt 2 giờ làm báo cáo mỗi ngày. Không cần thêm nhân sự."',
      t2: '"Giao hỏa tốc trong 2 giờ. Trễ 1 phút, miễn phí đơn hàng."'
    }
  };

  function updateContent(state) {
    if (state === 'before') {
      text1.textContent = content.before.t1;
      text2.textContent = content.before.t2;
      text1.classList.remove('accent-text');
      text2.classList.remove('accent-text');
      btnBefore.setAttribute('aria-pressed', 'true');
      btnAfter.setAttribute('aria-pressed', 'false');
    } else {
      text1.textContent = content.after.t1;
      text2.textContent = content.after.t2;
      text1.classList.add('accent-text');
      text2.classList.add('accent-text');
      btnBefore.setAttribute('aria-pressed', 'false');
      btnAfter.setAttribute('aria-pressed', 'true');
    }
  }

  btnBefore.addEventListener('click', () => updateContent('before'));
  btnAfter.addEventListener('click', () => updateContent('after'));

  // Brief Form Logic
  const form = document.getElementById('brief-form');
  const btnReset = document.getElementById('btn-reset');
  const btnSubmit = form.querySelector('button[type="submit"]');
  const resultDiv = document.getElementById('brief-result');
  const outBrand = document.getElementById('out-brand');
  const outGoal = document.getElementById('out-goal');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const brand = document.getElementById('brandName').value.trim();
    const goal = document.getElementById('brandGoal').value.trim();
    
    if (brand && goal) {
      outBrand.textContent = brand;
      outGoal.textContent = goal;
      
      resultDiv.classList.add('active');
      btnSubmit.style.display = 'none';
      btnReset.style.display = 'inline-flex';
    }
  });

  btnReset.addEventListener('click', () => {
    resultDiv.classList.remove('active');
    setTimeout(() => {
      outBrand.textContent = '';
      outGoal.textContent = '';
      btnSubmit.style.display = 'inline-flex';
      btnReset.style.display = 'none';
    }, 150); // wait for fade out if we were doing css transition on height/opacity, but active toggles display in basic css, though animation is on enter.
  });
});
