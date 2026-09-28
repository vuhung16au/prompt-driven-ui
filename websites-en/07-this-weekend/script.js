document.addEventListener('DOMContentLoaded', () => {
    const ageFilters = document.querySelectorAll('.filter-btn');
    const activityCards = document.querySelectorAll('.activity-card');
    const emptyState = document.getElementById('emptyState');
    const resetBtn = document.getElementById('resetBtn');
    
    const selectionSummary = document.getElementById('selectionSummary');
    const summaryActivity = document.getElementById('summaryActivity');
    const summaryAge = document.getElementById('summaryAge');
    const changeBtn = document.getElementById('changeBtn');
    const confirmBtn = document.getElementById('confirmBtn');

    let currentAge = 'all';

    // Highlight filter buttons
    const updateActiveFilterBtn = () => {
        ageFilters.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.age === currentAge);
        });
    };

    // Filter cards
    const filterCards = () => {
        let visibleCount = 0;
        
        activityCards.forEach(card => {
            const cardAges = card.dataset.ages.split(',');
            if (currentAge === 'all' || cardAges.includes(currentAge)) {
                card.classList.remove('hidden');
                visibleCount++;
                
                // Add tiny bounce animation
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    card.style.animation = 'none';
                    card.offsetHeight; // trigger reflow
                    card.style.animation = 'bounceIn 0.3s cubic-bezier(0.34,1.56,0.64,1)';
                }
            } else {
                card.classList.add('hidden');
            }
        });

        if (visibleCount === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    };

    // Age filter click
    ageFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            currentAge = btn.dataset.age;
            updateActiveFilterBtn();
            filterCards();
        });
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
        currentAge = 'all';
        updateActiveFilterBtn();
        filterCards();
    });

    // Select activity
    activityCards.forEach(card => {
        const selectBtn = card.querySelector('.action-select');
        selectBtn.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            let displayAge = currentAge === 'all' ? 'No age group selected' : 
                document.querySelector(`.filter-btn[data-age="${currentAge}"]`).textContent;

            summaryActivity.textContent = title;
            summaryAge.textContent = displayAge;
            
            selectionSummary.classList.remove('hidden');
            selectionSummary.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Change activity
    changeBtn.addEventListener('click', () => {
        selectionSummary.classList.add('hidden');
        document.getElementById('activities').scrollIntoView({ behavior: 'smooth' });
    });

    // Confirm mock
    confirmBtn.addEventListener('click', () => {
        alert('This is a prototype interface. In a real application, this would redirect to booking or payment.');
    });

    // Init
    updateActiveFilterBtn();
    
    // Add keyframes dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes bounceIn {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});
