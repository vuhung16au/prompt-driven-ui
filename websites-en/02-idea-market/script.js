const booths = [
  { id: 1, name: 'Weird Pottery', category: 'objects', desc: 'Cups like no other.', color: 'var(--c1)' },
  { id: 2, name: 'Recycled Paper Notes', category: 'objects', desc: 'Unique editions from discarded paper.', color: 'var(--c2)' },
  { id: 3, name: 'Wind Words', category: 'words', desc: 'Self-published poetry and essays.', color: 'var(--c3)' },
  { id: 4, name: 'Street Zine', category: 'words', desc: 'Handcrafted street magazine.', color: 'var(--c4)' },
  { id: 5, name: 'Sound Lab', category: 'sounds', desc: 'Instruments made from old materials.', color: 'var(--c5)' },
  { id: 6, name: 'Old Cassettes', category: 'sounds', desc: 'Curated mixtapes from the 90s.', color: 'var(--c1)' },
  { id: 7, name: 'Wood Puzzles', category: 'objects', desc: 'Handcrafted wooden toys.', color: 'var(--c3)' },
  { id: 8, name: 'Reading Station', category: 'words', desc: 'Independent authors meet & greet.', color: 'var(--c2)' },
  { id: 9, name: 'Fabric Crafts', category: 'objects', desc: 'Bags recycled from tarps.', color: 'var(--c4)' },
  { id: 10, name: 'Soundscape', category: 'sounds', desc: 'Recordings of natural sounds.', color: 'var(--c1)' },
  { id: 11, name: 'Silk Printers', category: 'words', desc: 'Artistic silkscreen posters.', color: 'var(--c5)' },
  { id: 12, name: 'Clay Corner', category: 'objects', desc: 'Custom mini clay sculptures.', color: 'var(--c2)' }
];

const events = [
  { id: 'e1', time: '09:00', title: 'Fair Opening', tag: 'General', color: 'var(--c1)' },
  { id: 'e2', time: '10:00', title: 'Silkscreen Workshop', tag: 'Words', color: 'var(--c5)' },
  { id: 'e3', time: '10:00', title: 'Indie Authors Meet & Greet', tag: 'Words', color: 'var(--c3)' }, // Conflict with e2
  { id: 'e4', time: '14:00', title: 'DIY Instruments Performance', tag: 'Sounds', color: 'var(--c2)' },
  { id: 'e5', time: '16:00', title: 'Pottery Auction', tag: 'Objects', color: 'var(--c4)' },
  { id: 'e6', time: '16:00', title: 'Book Signing', tag: 'Words', color: 'var(--c1)' }, // Conflict with e5
  { id: 'e7', time: '19:00', title: 'Closing & Minishow', tag: 'General', color: 'var(--c3)' }
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
        BOOTH ILLUSTRATION
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
          ${isSaved ? 'SAVED' : 'SAVE'}
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
      alert('You can only save up to 4 events.');
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
    list.innerHTML = '<li style="justify-content: center; opacity: 0.5;">No activities saved yet.</li>';
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
      <button onclick="removeEvent('${ev.id}')">Drop</button>
    `;
    list.appendChild(li);
  });
  
  if (hasConflict) {
    alertBox.classList.add('show');
  } else {
    alertBox.classList.remove('show');
  }
}
