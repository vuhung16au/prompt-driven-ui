const booths = [
  { id: 1, name: 'Lò Gốm Dị', category: 'do', desc: 'Những chiếc cốc không giống ai.', color: 'var(--c1)' },
  { id: 2, name: 'Sổ Tay Giấy Tái Chế', category: 'do', desc: 'Độc bản từ giấy bỏ đi.', color: 'var(--c2)' },
  { id: 3, name: 'Chữ Của Gió', category: 'chu', desc: 'Thơ ca và tản văn tự xuất bản.', color: 'var(--c3)' },
  { id: 4, name: 'Zine Đường Phố', category: 'chu', desc: 'Tạp chí thủ công về đường phố.', color: 'var(--c4)' },
  { id: 5, name: 'Xưởng Âm Thể', category: 'am', desc: 'Nhạc cụ tự chế từ vật liệu cũ.', color: 'var(--c5)' },
  { id: 6, name: 'Băng Cassette Cũ', category: 'am', desc: 'Mixtape chọn lọc từ thập niên 90.', color: 'var(--c1)' },
  { id: 7, name: 'Gỗ Ghép', category: 'do', desc: 'Đồ chơi gỗ thủ công.', color: 'var(--c3)' },
  { id: 8, name: 'Trạm Đọc', category: 'chu', desc: 'Giao lưu tác giả độc lập.', color: 'var(--c2)' },
  { id: 9, name: 'Vải Vóc', category: 'do', desc: 'Túi xách tái chế từ bạt.', color: 'var(--c4)' },
  { id: 10, name: 'Soundscape', category: 'am', desc: 'Bản thu âm âm thanh tự nhiên.', color: 'var(--c1)' },
  { id: 11, name: 'Nhà In Lụa', category: 'chu', desc: 'Poster in lụa nghệ thuật.', color: 'var(--c5)' },
  { id: 12, name: 'Khu Đất Sét', category: 'do', desc: 'Nặn tượng mini theo yêu cầu.', color: 'var(--c2)' }
];

const events = [
  { id: 'e1', time: '09:00', title: 'Mở cửa Hội chợ', tag: 'Chung', color: 'var(--c1)' },
  { id: 'e2', time: '10:00', title: 'Workshop In Lụa', tag: 'Chữ', color: 'var(--c5)' },
  { id: 'e3', time: '10:00', title: 'Giao lưu Tác giả Độc lập', tag: 'Chữ', color: 'var(--c3)' }, // Trùng giờ với e2
  { id: 'e4', time: '14:00', title: 'Trình diễn Nhạc cụ Tự chế', tag: 'Âm thanh', color: 'var(--c2)' },
  { id: 'e5', time: '16:00', title: 'Đấu giá Đồ Gốm', tag: 'Đồ vật', color: 'var(--c4)' },
  { id: 'e6', time: '16:00', title: 'Ký tặng Sách', tag: 'Chữ', color: 'var(--c1)' }, // Trùng giờ với e5
  { id: 'e7', time: '19:00', title: 'Bế mạc & Minishow', tag: 'Chung', color: 'var(--c3)' }
];

let savedEvents = [];

document.addEventListener('DOMContentLoaded', () => {
  renderBooths('all');
  renderTimeline();
  updateSavedScheduleUI();

  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderBooths(e.target.dataset.filter);
    });
  });

  // Reset Schedule
  document.getElementById('reset-schedule').addEventListener('click', () => {
    savedEvents = [];
    updateSavedScheduleUI();
    renderTimeline(); // Update button states
  });
});

function renderBooths(filter) {
  const container = document.getElementById('booth-container');
  container.innerHTML = '';
  
  const filteredBooths = filter === 'all' ? booths : booths.filter(b => b.category === filter);
  
  filteredBooths.forEach((booth, index) => {
    const isTranslate = index % 2 === 1 ? 'translate-y-4' : '';
    const rotation = index % 3 === 0 ? 'rotate-1' : index % 3 === 1 ? 'rotate-neg-1' : 'rotate-2';
    
    const card = document.createElement('div');
    card.className = `card ${isTranslate} ${rotation}`;
    card.style.borderColor = booth.color;
    
    card.innerHTML = `
      <div class="card-header" style="border-color: ${booth.color}">
        <div class="card-title ts-1">${booth.name}</div>
      </div>
      <div class="card-img-placeholder" style="border-color: ${booth.color}">
        MINH HỌA GIAN HÀNG
      </div>
      <p>${booth.desc}</p>
    `;
    container.appendChild(card);
  });
}

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  container.innerHTML = '';
  
  events.forEach(ev => {
    const isSaved = savedEvents.some(s => s.id === ev.id);
    
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.style.borderColor = ev.color;
    
    item.innerHTML = `
      <div class="timeline-time">${ev.time}</div>
      <div class="timeline-content">
        <h3 class="text-h3" style="margin-bottom: 0.5rem; text-transform: uppercase;">${ev.title}</h3>
        <span style="background: ${ev.color}; color: var(--bg); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">${ev.tag}</span>
      </div>
      <div>
        <button class="btn btn-outline" style="height: 48px; padding: 0 24px; font-size: 1rem;" onclick="toggleSaveEvent('${ev.id}')">
          ${isSaved ? 'ĐÃ LƯU' : 'LƯU'}
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

window.toggleSaveEvent = function(id) {
  const event = events.find(e => e.id === id);
  const exists = savedEvents.findIndex(e => e.id === id);
  
  if (exists > -1) {
    savedEvents.splice(exists, 1);
  } else {
    if (savedEvents.length >= 4) {
      alert('Chỉ được lưu tối đa 4 sự kiện.');
      return;
    }
    savedEvents.push(event);
  }
  
  updateSavedScheduleUI();
  renderTimeline(); // Re-render to update button text
}

window.removeEvent = function(id) {
  savedEvents = savedEvents.filter(e => e.id !== id);
  updateSavedScheduleUI();
  renderTimeline();
}

function updateSavedScheduleUI() {
  const list = document.getElementById('saved-schedule-list');
  const count = document.getElementById('saved-count');
  const alertBox = document.getElementById('conflict-alert');
  
  count.innerText = savedEvents.length;
  list.innerHTML = '';
  
  if (savedEvents.length === 0) {
    list.innerHTML = '<li style="justify-content: center; opacity: 0.5;">Chưa có hoạt động nào được lưu.</li>';
    alertBox.classList.remove('show');
    return;
  }
  
  // Check for conflicts
  let hasConflict = false;
  const times = {};
  
  savedEvents.sort((a, b) => a.time.localeCompare(b.time)).forEach(ev => {
    if (times[ev.time]) {
      hasConflict = true;
    }
    times[ev.time] = true;
    
    const li = document.createElement('li');
    li.style.borderColor = ev.color;
    li.innerHTML = `
      <div>
        <strong>${ev.time}</strong> - ${ev.title}
      </div>
      <button onclick="removeEvent('${ev.id}')">Bỏ</button>
    `;
    list.appendChild(li);
  });
  
  if (hasConflict) {
    alertBox.classList.add('show');
  } else {
    alertBox.classList.remove('show');
  }
}
