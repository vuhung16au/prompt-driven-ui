import os

# --- Vietnamese Content ---
html_vi = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NIGHT SHIFT - Game Jam</title>
  <meta name="description" content="Một game jam cuối tuần dành cho người làm hình, âm thanh và lập trình.">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="scanlines"></div>
  <main class="container">
    <header class="hero cyber-chamfer-lg">
      <h1 class="glitch cyber-glitch" data-text="NIGHT SHIFT">NIGHT SHIFT<br><span class="subtitle">DỰNG THỨ BẠN MUỐN CHƠI</span></h1>
      <p class="lead">Một game jam cuối tuần dành cho người làm hình, âm thanh và lập trình. Thông tin cộng đồng trên trang là minh họa.</p>
      
      <div class="role-tags">
        <span class="tag tag-green">LẬP TRÌNH</span>
        <span class="tag tag-magenta">HÌNH ẢNH</span>
        <span class="tag tag-cyan">ÂM THANH</span>
      </div>

      <a href="#teams" class="btn btn-primary glitch-btn">
        <span aria-hidden="true">></span> TÌM ĐỘI MẪU <span class="blink">_</span>
      </a>
    </header>

    <section class="mission terminal-panel cyber-chamfer">
      <div class="terminal-header">
        <div class="dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="terminal-title">MISSION_BRIEFING.EXE</div>
      </div>
      <div class="terminal-body">
        <h2 class="section-title">ĐỀ BÀI VÀ GIỚI HẠN</h2>
        <ul class="mission-list">
          <li><span class="accent">></span> <strong>Mục tiêu:</strong> Làm một game ngắn xoay quanh "Ánh Sáng".</li>
          <li><span class="accent">></span> <strong>Thời gian:</strong> 48 giờ cuối tuần.</li>
          <li><span class="accent">></span> <strong>Tài sản:</strong> Tự làm hoặc dùng tài sản miễn phí hợp lệ.</li>
          <li><span class="accent">></span> <strong>Đầu ra:</strong> Bản chơi thử trên web hoặc file tải về độc lập.</li>
        </ul>
      </div>
    </section>

    <section id="teams" class="teams">
      <h2 class="section-title">TÌM ĐỘI</h2>
      <div class="filters">
        <button class="btn btn-outline filter-btn active" data-filter="all">TẤT CẢ</button>
        <button class="btn btn-outline filter-btn" data-filter="dev">LẬP TRÌNH</button>
        <button class="btn btn-outline filter-btn" data-filter="art">HÌNH ẢNH</button>
        <button class="btn btn-outline filter-btn" data-filter="audio">ÂM THANH</button>
      </div>

      <div class="team-grid">
        <article class="card cyber-chamfer holographic" data-need="dev">
          <div class="corner-accents"></div>
          <h3>TEAM NEON_DREAM</h3>
          <p class="idea">Game trốn tìm trong thành phố neon.</p>
          <div class="needs">Cần: <span class="tag tag-green">LẬP TRÌNH</span></div>
          <button class="btn btn-ghost team-view-btn">XEM HỒ SƠ</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="art">
          <div class="corner-accents"></div>
          <h3>TEAM CHROME_HEARTS</h3>
          <p class="idea">Platformer 2D nhịp độ cao.</p>
          <div class="needs">Cần: <span class="tag tag-magenta">HÌNH ẢNH</span></div>
          <button class="btn btn-ghost team-view-btn">XEM HỒ SƠ</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="audio">
          <div class="corner-accents"></div>
          <h3>TEAM VOID_RUNNER</h3>
          <p class="idea">Trải nghiệm âm thanh 3D kinh dị.</p>
          <div class="needs">Cần: <span class="tag tag-cyan">ÂM THANH</span></div>
          <button class="btn btn-ghost team-view-btn">XEM HỒ SƠ</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="dev">
          <div class="corner-accents"></div>
          <h3>TEAM SYNTH_WAVE</h3>
          <p class="idea">Game bắn súng nhịp điệu arcade.</p>
          <div class="needs">Cần: <span class="tag tag-green">LẬP TRÌNH</span></div>
          <button class="btn btn-ghost team-view-btn">XEM HỒ SƠ</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="art">
          <div class="corner-accents"></div>
          <h3>TEAM MECHA_SOUL</h3>
          <p class="idea">Game đối kháng robot pixel.</p>
          <div class="needs">Cần: <span class="tag tag-magenta">HÌNH ẢNH</span></div>
          <button class="btn btn-ghost team-view-btn">XEM HỒ SƠ</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="audio">
          <div class="corner-accents"></div>
          <h3>TEAM GLITCH_PUNK</h3>
          <p class="idea">Giải đố bằng việc thao túng thời gian.</p>
          <div class="needs">Cần: <span class="tag tag-cyan">ÂM THANH</span></div>
          <button class="btn btn-ghost team-view-btn">XEM HỒ SƠ</button>
        </article>
      </div>
    </section>

    <section class="progress">
      <h2 class="section-title">BẢNG TIẾN ĐỘ: TEAM NEON_DREAM</h2>
      <div class="timeline">
        <div class="phase completed">
          <div class="phase-marker">01</div>
          <div class="phase-content">
            <h4>Ý TƯỞNG</h4>
            <p>Đã chốt concept ánh sáng và bóng tối.</p>
          </div>
        </div>
        <div class="phase active">
          <div class="phase-marker">02</div>
          <div class="phase-content">
            <h4>BẢN CHƠI THỬ</h4>
            <p>Đang lập trình cơ chế đổ bóng.</p>
          </div>
        </div>
        <div class="phase">
          <div class="phase-marker">03</div>
          <div class="phase-content">
            <h4>TRÌNH DIỄN</h4>
            <p>Chờ nộp bài.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="profile">
      <h2 class="section-title">HỒ SƠ THAM GIA MẪU</h2>
      <form class="profile-form cyber-chamfer" id="profileForm">
        <div class="input-group">
          <label for="role">VAI TRÒ CỦA BẠN</label>
          <div class="select-wrapper">
             <span class="prefix">></span>
             <select id="role" class="cyber-input" required>
               <option value="" disabled selected>CHỌN VAI TRÒ...</option>
               <option value="dev">LẬP TRÌNH VIÊN</option>
               <option value="art">HỌA SĨ 2D/3D</option>
               <option value="audio">THIẾT KẾ ÂM THANH</option>
             </select>
          </div>
        </div>
        <div class="input-group">
          <label for="idea">ĐIỀU BẠN MUỐN LÀM</label>
          <div class="textarea-wrapper">
            <span class="prefix">></span>
            <textarea id="idea" class="cyber-input" rows="3" placeholder="Ví dụ: Tôi muốn làm game pixel art..." required></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-secondary">TẠO HỒ SƠ THỬ</button>
        <p class="form-note">Dữ liệu chỉ hiển thị tạm thời, không gửi thật.</p>
      </form>
    </section>
  </main>
  
  <div id="teamModal" class="modal hidden">
    <div class="modal-content cyber-chamfer terminal-panel">
       <div class="terminal-header">
        <div class="dots">
          <span class="dot red close-modal"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="terminal-title">TEAM_PROFILE.DAT</div>
      </div>
      <div class="modal-body">
        <h3 id="modalTeamName">TÊN ĐỘI</h3>
        <p id="modalTeamIdea">Ý tưởng...</p>
        <p><strong>Lịch dự kiến:</strong></p>
        <ul>
          <li>Tối T6: Họp chốt ý tưởng</li>
          <li>Thứ 7: Làm prototype</li>
          <li>Sáng CN: Hoàn thiện âm thanh & hình</li>
          <li>Chiều CN: Test và nộp bài</li>
        </ul>
        <button class="btn btn-outline close-modal-btn">ĐÓNG</button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
"""

# --- English Content ---
html_en = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NIGHT SHIFT - Game Jam</title>
  <meta name="description" content="A weekend game jam for artists, sound designers, and programmers.">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="scanlines"></div>
  <main class="container">
    <header class="hero cyber-chamfer-lg">
      <h1 class="glitch cyber-glitch" data-text="NIGHT SHIFT">NIGHT SHIFT<br><span class="subtitle">BUILD WHAT YOU WANT TO PLAY</span></h1>
      <p class="lead">A weekend game jam for artists, sound designers, and programmers. Community information on the page is illustrative.</p>
      
      <div class="role-tags">
        <span class="tag tag-green">PROGRAMMING</span>
        <span class="tag tag-magenta">ART</span>
        <span class="tag tag-cyan">AUDIO</span>
      </div>

      <a href="#teams" class="btn btn-primary glitch-btn">
        <span aria-hidden="true">></span> FIND SAMPLE TEAM <span class="blink">_</span>
      </a>
    </header>

    <section class="mission terminal-panel cyber-chamfer">
      <div class="terminal-header">
        <div class="dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="terminal-title">MISSION_BRIEFING.EXE</div>
      </div>
      <div class="terminal-body">
        <h2 class="section-title">PROMPT AND CONSTRAINTS</h2>
        <ul class="mission-list">
          <li><span class="accent">></span> <strong>Objectives:</strong> Make a short game revolving around "Light".</li>
          <li><span class="accent">></span> <strong>Time Limits:</strong> 48 hours over the weekend.</li>
          <li><span class="accent">></span> <strong>Allowed Assets:</strong> Create your own or use valid free assets.</li>
          <li><span class="accent">></span> <strong>Deliverables:</strong> Web-playable build or standalone download file.</li>
        </ul>
      </div>
    </section>

    <section id="teams" class="teams">
      <h2 class="section-title">TEAM FINDER</h2>
      <div class="filters">
        <button class="btn btn-outline filter-btn active" data-filter="all">ALL</button>
        <button class="btn btn-outline filter-btn" data-filter="dev">PROGRAMMING</button>
        <button class="btn btn-outline filter-btn" data-filter="art">ART</button>
        <button class="btn btn-outline filter-btn" data-filter="audio">AUDIO</button>
      </div>

      <div class="team-grid">
        <article class="card cyber-chamfer holographic" data-need="dev">
          <div class="corner-accents"></div>
          <h3>TEAM NEON_DREAM</h3>
          <p class="idea">Hide and seek game in a neon city.</p>
          <div class="needs">Needs: <span class="tag tag-green">PROGRAMMING</span></div>
          <button class="btn btn-ghost team-view-btn">VIEW PROFILE</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="art">
          <div class="corner-accents"></div>
          <h3>TEAM CHROME_HEARTS</h3>
          <p class="idea">High-paced 2D platformer.</p>
          <div class="needs">Needs: <span class="tag tag-magenta">ART</span></div>
          <button class="btn btn-ghost team-view-btn">VIEW PROFILE</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="audio">
          <div class="corner-accents"></div>
          <h3>TEAM VOID_RUNNER</h3>
          <p class="idea">3D horror audio experience.</p>
          <div class="needs">Needs: <span class="tag tag-cyan">AUDIO</span></div>
          <button class="btn btn-ghost team-view-btn">VIEW PROFILE</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="dev">
          <div class="corner-accents"></div>
          <h3>TEAM SYNTH_WAVE</h3>
          <p class="idea">Arcade rhythm shooter.</p>
          <div class="needs">Needs: <span class="tag tag-green">PROGRAMMING</span></div>
          <button class="btn btn-ghost team-view-btn">VIEW PROFILE</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="art">
          <div class="corner-accents"></div>
          <h3>TEAM MECHA_SOUL</h3>
          <p class="idea">Pixel robot fighting game.</p>
          <div class="needs">Needs: <span class="tag tag-magenta">ART</span></div>
          <button class="btn btn-ghost team-view-btn">VIEW PROFILE</button>
        </article>
        <article class="card cyber-chamfer holographic" data-need="audio">
          <div class="corner-accents"></div>
          <h3>TEAM GLITCH_PUNK</h3>
          <p class="idea">Time-manipulation puzzle.</p>
          <div class="needs">Needs: <span class="tag tag-cyan">AUDIO</span></div>
          <button class="btn btn-ghost team-view-btn">VIEW PROFILE</button>
        </article>
      </div>
    </section>

    <section class="progress">
      <h2 class="section-title">PROGRESS BOARD: TEAM NEON_DREAM</h2>
      <div class="timeline">
        <div class="phase completed">
          <div class="phase-marker">01</div>
          <div class="phase-content">
            <h4>CONCEPT</h4>
            <p>Finalized light and shadow concept.</p>
          </div>
        </div>
        <div class="phase active">
          <div class="phase-marker">02</div>
          <div class="phase-content">
            <h4>PLAYABLE BUILD</h4>
            <p>Programming dynamic shadows.</p>
          </div>
        </div>
        <div class="phase">
          <div class="phase-marker">03</div>
          <div class="phase-content">
            <h4>SHOWCASE</h4>
            <p>Waiting for submission.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="profile">
      <h2 class="section-title">SAMPLE PARTICIPANT PROFILE</h2>
      <form class="profile-form cyber-chamfer" id="profileForm">
        <div class="input-group">
          <label for="role">YOUR ROLE</label>
          <div class="select-wrapper">
             <span class="prefix">></span>
             <select id="role" class="cyber-input" required>
               <option value="" disabled selected>SELECT ROLE...</option>
               <option value="dev">PROGRAMMER</option>
               <option value="art">2D/3D ARTIST</option>
               <option value="audio">SOUND DESIGNER</option>
             </select>
          </div>
        </div>
        <div class="input-group">
          <label for="idea">WHAT YOU WANT TO BUILD</label>
          <div class="textarea-wrapper">
             <span class="prefix">></span>
             <textarea id="idea" class="cyber-input" rows="3" placeholder="Example: I want to make a pixel art game..." required></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-secondary">CREATE TEST PROFILE</button>
        <p class="form-note">Data is displayed temporarily, not sent anywhere.</p>
      </form>
    </section>
  </main>
  
  <div id="teamModal" class="modal hidden">
    <div class="modal-content cyber-chamfer terminal-panel">
       <div class="terminal-header">
        <div class="dots">
          <span class="dot red close-modal"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="terminal-title">TEAM_PROFILE.DAT</div>
      </div>
      <div class="modal-body">
        <h3 id="modalTeamName">TEAM NAME</h3>
        <p id="modalTeamIdea">Idea...</p>
        <p><strong>Tentative Schedule:</strong></p>
        <ul>
          <li>Fri Night: Concept lockdown</li>
          <li>Saturday: Prototype dev</li>
          <li>Sun Morning: Polish art & audio</li>
          <li>Sun Afternoon: Test and submit</li>
        </ul>
        <button class="btn btn-outline close-modal-btn">CLOSE</button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
"""

css_content = """/* style.css */
*, *::before, *::after {
  box-sizing: border-box;
}

:root {
  --background: #0a0a0f;
  --foreground: #e0e0e0;
  --card: #12121a;
  --muted: #1c1c2e;
  --mutedForeground: #6b7280;
  --accent: #00ff88;
  --accentSecondary: #ff00ff;
  --accentTertiary: #00d4ff;
  --border: #2a2a3a;
  --input: #12121a;
  --destructive: #ff3366;
  
  --font-heading: "Orbitron", "Share Tech Mono", monospace;
  --font-body: "JetBrains Mono", "Fira Code", monospace;
  --font-accent: "Share Tech Mono", monospace;

  --neon: 0 0 5px var(--accent), 0 0 10px #00ff8840;
  --neon-lg: 0 0 10px var(--accent), 0 0 20px #00ff8860, 0 0 40px #00ff8830;
  --neon-secondary: 0 0 5px var(--accentSecondary), 0 0 20px #ff00ff60;
  --neon-tertiary: 0 0 5px var(--accentTertiary), 0 0 20px #00d4ff60;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

body {
  margin: 0;
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-body);
  line-height: 1.6;
  background-image:
    linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  overflow-x: hidden;
}

.scanlines {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.3) 2px,
    rgba(0, 0, 0, 0.3) 4px
  );
  pointer-events: none;
  z-index: 9999;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  text-transform: uppercase;
  margin-top: 0;
}

h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  position: relative;
  display: inline-block;
}

/* Chromatic aberration glitch */
.cyber-glitch {
  position: relative;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}
.cyber-glitch::before, .cyber-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  pointer-events: none;
}
.cyber-glitch::before {
  left: -2px;
  text-shadow: -2px 0 var(--accentSecondary);
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}
.cyber-glitch::after {
  left: 2px;
  text-shadow: -2px 0 var(--accentTertiary);
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0% { clip-path: inset(20% 0 80% 0); }
  20% { clip-path: inset(60% 0 10% 0); }
  40% { clip-path: inset(40% 0 50% 0); }
  60% { clip-path: inset(80% 0 5% 0); }
  80% { clip-path: inset(10% 0 70% 0); }
  100% { clip-path: inset(30% 0 50% 0); }
}
@keyframes glitch-anim-2 {
  0% { clip-path: inset(10% 0 60% 0); }
  20% { clip-path: inset(30% 0 20% 0); }
  40% { clip-path: inset(70% 0 10% 0); }
  60% { clip-path: inset(20% 0 50% 0); }
  80% { clip-path: inset(50% 0 30% 0); }
  100% { clip-path: inset(5% 0 80% 0); }
}

h1 .subtitle {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  display: block;
  color: var(--accent);
  text-shadow: none;
  margin-top: 0.5rem;
}

h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: var(--foreground);
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

h3 {
  font-size: 1.25rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.125rem;
  max-width: 60ch;
  color: var(--mutedForeground);
  margin-bottom: 2rem;
}

/* Utilities */
.cyber-chamfer {
  clip-path: polygon(
    0 10px, 10px 0,
    calc(100% - 10px) 0, 100% 10px,
    100% calc(100% - 10px), calc(100% - 10px) 100%,
    10px 100%, 0 calc(100% - 10px)
  );
}
.cyber-chamfer-lg {
  clip-path: polygon(
    0 20px, 20px 0,
    calc(100% - 20px) 0, 100% 20px,
    100% calc(100% - 20px), calc(100% - 20px) 100%,
    20px 100%, 0 calc(100% - 20px)
  );
}

.blink {
  animation: blink 1s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }

/* Buttons */
.btn {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  min-height: 44px;
  text-decoration: none;
}
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--accent), var(--neon);
}

.btn-primary {
  background: transparent;
  border: 2px solid var(--accent);
  color: var(--accent);
  clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
}
.btn-primary:hover {
  background: var(--accent);
  color: var(--background);
  box-shadow: var(--neon);
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--accentSecondary);
  color: var(--accentSecondary);
  clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
}
.btn-secondary:hover {
  background: var(--accentSecondary);
  color: var(--foreground);
  box-shadow: var(--neon-secondary);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--foreground);
}
.btn-outline:hover, .btn-outline.active {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: var(--neon);
}

.btn-ghost {
  background: transparent;
  border: none;
  color: var(--mutedForeground);
}
.btn-ghost:hover {
  background: rgba(0, 255, 136, 0.1);
  color: var(--accent);
}

.glitch-btn:hover {
  filter: brightness(1.2);
  transform: translate(-1px, 1px);
}

/* Tags */
.tag {
  font-family: var(--font-accent);
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
}
.tag-green { color: var(--accent); border-color: var(--accent); }
.tag-magenta { color: var(--accentSecondary); border-color: var(--accentSecondary); }
.tag-cyan { color: var(--accentTertiary); border-color: var(--accentTertiary); }

/* Layout sections */
section {
  margin-top: 4rem;
  margin-bottom: 4rem;
}

/* Hero */
.hero {
  border: 1px solid var(--accent);
  padding: 3rem 2rem;
  background: rgba(28, 28, 46, 0.4);
  backdrop-filter: blur(4px);
  margin-bottom: 4rem;
  box-shadow: var(--neon-sm);
}
.hero .role-tags {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Terminal Panel */
.terminal-panel {
  background: var(--background);
  border: 1px solid var(--border);
}
.terminal-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--card);
}
.terminal-header .dots {
  display: flex;
  gap: 0.5rem;
  margin-right: 1rem;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot.red { background: var(--destructive); }
.dot.yellow { background: #ffcc00; }
.dot.green { background: var(--accent); }
.terminal-title {
  font-family: var(--font-accent);
  font-size: 0.875rem;
  color: var(--mutedForeground);
}
.terminal-body {
  padding: 2rem;
}

.mission-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.mission-list li {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}
.mission-list .accent {
  color: var(--accent);
  font-weight: bold;
}

/* Teams */
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  .team-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .team-grid { grid-template-columns: repeat(3, 1fr); }
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  padding: 1.5rem;
  transition: all 300ms;
  position: relative;
  display: flex;
  flex-direction: column;
}
.card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: var(--neon-sm);
}
.card.holographic {
  background: rgba(28, 28, 46, 0.3);
  border-color: rgba(0, 255, 136, 0.3);
  backdrop-filter: blur(4px);
}
.corner-accents {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
}
.corner-accents::before, .corner-accents::after {
  content: "";
  position: absolute;
  width: 10px; height: 10px;
  border: 1px solid var(--accent);
}
.corner-accents::before { top: 0; left: 0; border-right: none; border-bottom: none; }
.corner-accents::after { bottom: 0; right: 0; border-left: none; border-top: none; }

.card .idea {
  color: var(--mutedForeground);
  flex-grow: 1;
  margin-bottom: 1.5rem;
}
.card .needs {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-left: 2px solid var(--border);
  padding-left: 1.5rem;
  margin-left: 1rem;
}
.phase {
  position: relative;
}
.phase-marker {
  position: absolute;
  left: -2.5rem;
  top: 0;
  width: 2rem;
  height: 2rem;
  background: var(--card);
  border: 2px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  color: var(--mutedForeground);
}
.phase.completed .phase-marker {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: var(--neon-sm);
}
.phase.active .phase-marker {
  border-color: var(--accentSecondary);
  color: var(--accentSecondary);
  box-shadow: var(--neon-secondary);
}
.phase h4 { margin: 0 0 0.5rem 0; font-size: 1.125rem; }
.phase p { margin: 0; color: var(--mutedForeground); }

/* Forms */
.profile-form {
  background: var(--card);
  border: 1px solid var(--border);
  padding: 2rem;
}
.input-group {
  margin-bottom: 1.5rem;
}
.input-group label {
  display: block;
  font-family: var(--font-accent);
  margin-bottom: 0.5rem;
  color: var(--foreground);
}
.select-wrapper, .textarea-wrapper {
  position: relative;
}
.prefix {
  position: absolute;
  left: 1rem;
  top: 0.75rem;
  color: var(--accent);
  font-family: var(--font-body);
}
.cyber-input {
  width: 100%;
  background: var(--input);
  border: 1px solid var(--border);
  color: var(--accent);
  font-family: var(--font-body);
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  clip-path: polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px));
  transition: all 200ms;
}
.cyber-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: var(--neon-sm);
}
.cyber-input option {
  background: var(--input);
  color: var(--accent);
}
.form-note {
  font-size: 0.875rem;
  color: var(--mutedForeground);
  margin-top: 1rem;
}

/* Modal */
.modal {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal.hidden {
  display: none;
}
.modal-content {
  width: 100%;
  max-width: 500px;
  background: var(--background);
}
.modal-body {
  padding: 2rem;
}
.modal-body ul {
  padding-left: 1.25rem;
  color: var(--mutedForeground);
}
.modal-body ul li {
  margin-bottom: 0.5rem;
}
.close-modal-btn {
  margin-top: 1.5rem;
  width: 100%;
}
.close-modal { cursor: pointer; }

@media (max-width: 640px) {
  h1 { font-size: 2.5rem; }
  .filters { flex-direction: column; }
  .btn { width: 100%; }
}
"""

js_vi = """document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card[data-need]');
  const modal = document.getElementById('teamModal');
  const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
  const teamViewBtns = document.querySelectorAll('.team-view-btn');
  const profileForm = document.getElementById('profileForm');

  // Filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-need') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal
  teamViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const name = card.querySelector('h3').textContent;
      const idea = card.querySelector('.idea').textContent;
      
      document.getElementById('modalTeamName').textContent = name;
      document.getElementById('modalTeamIdea').textContent = idea;
      
      modal.classList.remove('hidden');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  });

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Form submit
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Hồ sơ thử đã được tạo! (Đây là chức năng minh họa)');
      profileForm.reset();
    });
  }
});
"""

js_en = """document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card[data-need]');
  const modal = document.getElementById('teamModal');
  const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
  const teamViewBtns = document.querySelectorAll('.team-view-btn');
  const profileForm = document.getElementById('profileForm');

  // Filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-need') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal
  teamViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const name = card.querySelector('h3').textContent;
      const idea = card.querySelector('.idea').textContent;
      
      document.getElementById('modalTeamName').textContent = name;
      document.getElementById('modalTeamIdea').textContent = idea;
      
      modal.classList.remove('hidden');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  });

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Form submit
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Test profile created! (This is an illustrative feature)');
      profileForm.reset();
    });
  }
});
"""

readme_vi = """# NIGHT SHIFT - Game Jam
Website giới thiệu và tìm đội cho sự kiện game jam "NIGHT SHIFT".

## Thiết kế
- **Phong cách**: Cyberpunk
- **Màu sắc**: #0a0a0f (Nền), #00ff88 (Nhấn chính), #ff00ff (Nhấn phụ), #00d4ff.
- **Font chữ**: Orbitron, Share Tech Mono, JetBrains Mono.
- **Thành phần đặc trưng**: Scanlines, Glitch Text, Neon Glow, Chamfered Corners.

## Chức năng
- Lọc đội tìm thành viên theo vai trò.
- Xem chi tiết lịch trình của đội (Modal).
- Form minh họa tạo hồ sơ tham gia.

## Cách chạy
Mở file `index.html` bằng trình duyệt bất kỳ.
"""

readme_en = """# NIGHT SHIFT - Game Jam
Introduction and team-finding website for the "NIGHT SHIFT" game jam.

## Design
- **Style**: Cyberpunk
- **Colors**: #0a0a0f (Background), #00ff88 (Primary accent), #ff00ff (Secondary accent), #00d4ff.
- **Typography**: Orbitron, Share Tech Mono, JetBrains Mono.
- **Key signatures**: Scanlines, Glitch Text, Neon Glow, Chamfered Corners.

## Features
- Filter teams seeking members by role.
- View detailed team schedules (Modal).
- Illustrative form for creating participant profile.

## How to run
Open the `index.html` file in any web browser.
"""

def write_files(base_path, html, css, js, readme):
    with open(os.path.join(base_path, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    with open(os.path.join(base_path, 'style.css'), 'w', encoding='utf-8') as f:
        f.write(css)
    with open(os.path.join(base_path, 'script.js'), 'w', encoding='utf-8') as f:
        f.write(js)
    with open(os.path.join(base_path, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(readme)

write_files('/Users/vuhung/Desktop/website-design/websites/03-night-shift/', html_vi, css_content, js_vi, readme_vi)
write_files('/Users/vuhung/Desktop/website-design/websites-en/03-night-shift/', html_en, css_content, js_en, readme_en)

print("Files generated successfully.")
