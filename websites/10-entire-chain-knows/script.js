// State Management
const initialState = {
  block2Title: "Hợp đồng A",
  block2Hash: "e5f6g7h8",
  status: "original" // original, edited, checked
};

let state = { ...initialState };

// DOM Elements
const docTitleInput = document.getElementById("doc-title");
const btnUpdate = document.getElementById("btn-update");
const btnVerify = document.getElementById("btn-verify");
const btnReset = document.getElementById("btn-reset");

const block2TitleDisplay = document.getElementById("block-2-title-display");
const block2DocName = document.getElementById("block-2-doc-name");
const block2HashDisplay = document.getElementById("block-2-hash");

const block3PrevHash = document.getElementById("block-3-prev-hash");
const block4PrevHash = document.getElementById("block-4-prev-hash");

const link2 = document.getElementById("link-2");
const link3 = document.getElementById("link-3");

const block3Status = document.getElementById("block-3-status");
const block4Status = document.getElementById("block-4-status");
const resultText = document.getElementById("result-text");

// Simple pseudo-hash function for demo
function pseudoHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).substring(0, 8).padStart(8, '0');
}

// UI Update Function
function render() {
  // Update Block 2 content
  block2TitleDisplay.textContent = state.block2Title !== initialState.block2Title ? "Giao cho Alice (Đã sửa)" : "Giao cho Alice";
  block2DocName.textContent = state.block2Title;
  block2HashDisplay.textContent = state.block2Hash;
  block2HashDisplay.title = state.block2Hash;

  if (state.status === "original") {
    btnVerify.disabled = true;
    docTitleInput.value = initialState.block2Title;
    
    // Reset visual links
    link2.classList.remove("broken");
    link3.classList.remove("broken");
    link2.classList.add("valid");
    link3.classList.add("valid");

    // Reset badges
    block3Status.textContent = "Khớp";
    block3Status.className = "status-badge ok";
    block4Status.textContent = "Khớp";
    block4Status.className = "status-badge ok";

    resultText.innerHTML = '<p>Mọi liên kết đang an toàn. Thử đổi tên tài liệu và kiểm tra xem điều gì sẽ xảy ra với các khối tiếp theo.</p>';
  } 
  else if (state.status === "edited") {
    btnVerify.disabled = false;
    
    // Clear previous check markers
    link2.classList.remove("broken");
    link3.classList.remove("broken");
    link2.classList.add("valid");
    link3.classList.add("valid");
    
    block3Status.textContent = "Chờ kiểm";
    block3Status.className = "status-badge";
    block3Status.style.background = "transparent";
    block3Status.style.border = "1px solid rgba(255,255,255,0.2)";
    block3Status.style.color = "white";

    block4Status.textContent = "Chờ kiểm";
    block4Status.className = "status-badge";
    block4Status.style.background = "transparent";
    block4Status.style.border = "1px solid rgba(255,255,255,0.2)";
    block4Status.style.color = "white";

    resultText.innerHTML = '<p>Dữ liệu đã bị sửa, nhưng mạng chưa đối chiếu. Hãy bấm <strong>Kiểm tra liên kết</strong>.</p>';
  }
  else if (state.status === "checked") {
    btnVerify.disabled = true;
    
    // Highlight broken links
    if (state.block2Hash !== initialState.block2Hash) {
      link2.classList.remove("valid");
      link2.classList.add("broken");
      
      block3Status.textContent = "Lỗi liên kết";
      block3Status.className = "status-badge error";
      block3Status.style = ""; // Clear inline styles
      
      // Since block 3 is invalid, block 4 is conceptually orphaned or invalid too
      link3.classList.remove("valid");
      link3.classList.add("broken");
      block4Status.textContent = "Lỗi liên kết";
      block4Status.className = "status-badge error";
      block4Status.style = "";

      resultText.innerHTML = '<p class="text-red-400"><strong>Phát hiện đứt gãy!</strong> Mã của Khối 2 đã thay đổi thành <span class="font-mono text-white">' + state.block2Hash + '</span>, nhưng Khối 3 vẫn đang tìm mã cũ <span class="font-mono text-white">' + initialState.block2Hash + '</span>. Chuỗi ngay lập tức từ chối khối dữ liệu bị sửa đổi này.</p>';
    } else {
      // If user typed the exact original back and checked
      state.status = "original";
      render();
    }
  }
}

// Event Listeners
btnUpdate.addEventListener("click", () => {
  const newTitle = docTitleInput.value.trim();
  if (!newTitle) return;

  if (newTitle === initialState.block2Title) {
    state.block2Hash = initialState.block2Hash;
  } else {
    // Generate a different hash. For demo stability, deterministic pseudo-hash.
    state.block2Hash = pseudoHash(newTitle);
  }
  
  state.block2Title = newTitle;
  state.status = "edited";
  render();
});

btnVerify.addEventListener("click", () => {
  if (state.status === "edited") {
    // Simulate slight delay for checking
    const originalText = btnVerify.textContent;
    btnVerify.textContent = "Đang quét...";
    
    setTimeout(() => {
      state.status = "checked";
      btnVerify.textContent = originalText;
      render();
    }, 400);
  }
});

btnReset.addEventListener("click", () => {
  state = { ...initialState };
  render();
});

// Disclosure functionality
window.toggleDisclosure = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle("open");
  }
};

// Initial Render
render();
