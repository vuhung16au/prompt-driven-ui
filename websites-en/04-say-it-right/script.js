document.addEventListener('DOMContentLoaded', () => {
  // Before & After Toggle Logic
  const btnBefore = document.getElementById('btn-before');
  const btnAfter = document.getElementById('btn-after');
  const text1 = document.getElementById('text-1');
  const text2 = document.getElementById('text-2');

  const content = {
    before: {
      t1: '"A comprehensive solution to optimize workflows and increase enterprise performance."',
      t2: '"Committed to providing fast, safe, and top-tier shipping services."'
    },
    after: {
      t1: '"Save 2 hours on reporting daily. No extra headcount needed."',
      t2: '"Express delivery in 2 hours. 1 minute late, your order is free."'
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
    }, 150); // wait for fade out
  });
});
