document.addEventListener('DOMContentLoaded', () => {
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
