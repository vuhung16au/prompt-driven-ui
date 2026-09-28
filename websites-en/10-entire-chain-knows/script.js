// State Management
const initialState = {
  block2Title: "Contract A",
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
  block2TitleDisplay.textContent = state.block2Title !== initialState.block2Title ? "Hand over to Alice (Edited)" : "Hand over to Alice";
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
    block3Status.textContent = "Matched";
    block3Status.className = "status-badge ok";
    block4Status.textContent = "Matched";
    block4Status.className = "status-badge ok";

    resultText.innerHTML = '<p>All links are secure. Try changing the document name and verify to see what happens to the succeeding blocks.</p>';
  } 
  else if (state.status === "edited") {
    btnVerify.disabled = false;
    
    // Clear previous check markers
    link2.classList.remove("broken");
    link3.classList.remove("broken");
    link2.classList.add("valid");
    link3.classList.add("valid");
    
    block3Status.textContent = "Pending";
    block3Status.className = "status-badge";
    block3Status.style.background = "transparent";
    block3Status.style.border = "1px solid rgba(255,255,255,0.2)";
    block3Status.style.color = "white";

    block4Status.textContent = "Pending";
    block4Status.className = "status-badge";
    block4Status.style.background = "transparent";
    block4Status.style.border = "1px solid rgba(255,255,255,0.2)";
    block4Status.style.color = "white";

    resultText.innerHTML = '<p>Data has been modified, but the network hasn\'t verified it yet. Please click <strong>Verify Linkage</strong>.</p>';
  }
  else if (state.status === "checked") {
    btnVerify.disabled = true;
    
    // Highlight broken links
    if (state.block2Hash !== initialState.block2Hash) {
      link2.classList.remove("valid");
      link2.classList.add("broken");
      
      block3Status.textContent = "Link Error";
      block3Status.className = "status-badge error";
      block3Status.style = ""; // Clear inline styles
      
      // Since block 3 is invalid, block 4 is conceptually orphaned or invalid too
      link3.classList.remove("valid");
      link3.classList.add("broken");
      block4Status.textContent = "Link Error";
      block4Status.className = "status-badge error";
      block4Status.style = "";

      resultText.innerHTML = '<p class="text-red-400"><strong>Breakage detected!</strong> Block 2\'s hash changed to <span class="font-mono text-white">' + state.block2Hash + '</span>, but Block 3 is still looking for the old hash <span class="font-mono text-white">' + initialState.block2Hash + '</span>. The chain immediately rejects this modified data block.</p>';
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
    btnVerify.textContent = "Scanning...";
    
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
