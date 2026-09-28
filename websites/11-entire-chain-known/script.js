document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const originalData = {
    fileName: 'tailieu_v2.pdf',
    hash: 'e5f6g7h8'
  };

  const inputEl = document.getElementById('file-name-input');
  const hashEl = document.getElementById('block-2-hash');
  const btnCheck = document.getElementById('btn-check');
  const btnReset = document.getElementById('btn-reset');
  const resultPanel = document.getElementById('result-panel');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  
  const block3 = document.getElementById('block-3');
  const block4 = document.getElementById('block-4');
  const block3Prev = document.getElementById('block-3-prev');
  const line2to3 = document.getElementById('line-2-3');
  const iconLink3 = document.getElementById('icon-link-3');

  let currentState = 'original'; // original, edited, checked

  // Simple string hash function for simulation
  function simulateHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Return a hex-like string, pad to 8 chars
    return Math.abs(hash).toString(16).padEnd(8, '0').substring(0, 8);
  }

  inputEl.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val !== originalData.fileName) {
      currentState = 'edited';
      // Calculate a new fake hash based on input
      const newHash = simulateHash(val);
      hashEl.textContent = newHash;
      hashEl.classList.add('text-gold');
      hashEl.classList.remove('text-orange');
      
      // Reset validation visuals if edited after checked
      resetValidationVisuals();
    } else {
      currentState = 'original';
      hashEl.textContent = originalData.hash;
      hashEl.classList.add('text-orange');
      hashEl.classList.remove('text-gold');
      resetValidationVisuals();
    }
  });

  btnCheck.addEventListener('click', () => {
    if (currentState === 'edited') {
      currentState = 'checked';
      const currentHash = hashEl.textContent;
      const expectedPrev = block3Prev.textContent;
      
      if (currentHash !== expectedPrev) {
        // Break the chain
        line2to3.classList.add('broken');
        block3.classList.add('border-red-500/50');
        block4.classList.add('border-red-500/50', 'opacity-50');
        
        iconLink3.setAttribute('data-lucide', 'link-2-off');
        iconLink3.classList.remove('text-muted');
        iconLink3.classList.add('text-red-500');
        lucide.createIcons();

        // Show result
        resultTitle.innerHTML = `<i data-lucide="alert-triangle" class="text-red-500 w-6 h-6"></i> Liên kết bị đứt gãy`;
        resultTitle.classList.add('text-red-500');
        resultTitle.classList.remove('text-orange');
        resultDesc.innerHTML = `Khối 3 mong đợi Prev Hash là <span class="font-mono text-white">${expectedPrev}</span>, nhưng Khối 2 hiện tại có Hash là <span class="font-mono text-gold">${currentHash}</span>. Sự không khớp này khiến Khối 3 và tất cả các khối sau nó bị vô hiệu hóa. Đây là cách chuỗi phát hiện sự can thiệp dữ liệu.`;
      }
    } else {
      // Original state
      resultTitle.innerHTML = `<i data-lucide="check-circle" class="text-orange w-6 h-6"></i> Chuỗi hợp lệ`;
      resultTitle.classList.remove('text-red-500');
      resultTitle.classList.add('text-orange');
      resultDesc.innerHTML = `Tất cả các khối đều liên kết khớp với nhau.`;
    }
    
    resultPanel.classList.remove('hidden');
    // slight delay for animation
    setTimeout(() => {
      resultPanel.classList.remove('opacity-0');
    }, 50);
    lucide.createIcons();
  });

  btnReset.addEventListener('click', () => {
    inputEl.value = originalData.fileName;
    hashEl.textContent = originalData.hash;
    hashEl.classList.add('text-orange');
    hashEl.classList.remove('text-gold');
    currentState = 'original';
    
    resetValidationVisuals();
  });

  function resetValidationVisuals() {
    line2to3.classList.remove('broken');
    block3.classList.remove('border-red-500/50');
    block4.classList.remove('border-red-500/50', 'opacity-50');
    
    iconLink3.setAttribute('data-lucide', 'link');
    iconLink3.classList.add('text-muted');
    iconLink3.classList.remove('text-red-500');
    
    resultPanel.classList.add('opacity-0');
    setTimeout(() => {
      resultPanel.classList.add('hidden');
    }, 500);
    
    lucide.createIcons();
  }
});
