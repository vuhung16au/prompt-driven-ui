document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('btn-start');
    const btnViewAll = document.getElementById('btn-view-all');
    const btnViewAllFooter = document.querySelector('.btn-view-all-footer');
    const stackContainer = document.getElementById('stack-container');
    const cards = document.querySelectorAll('.step-card');
    const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');

    // Handle Checkbox State Persistence
    const loadChecklistState = () => {
        checkboxes.forEach(checkbox => {
            const isChecked = sessionStorage.getItem(checkbox.name) === 'true';
            checkbox.checked = isChecked;
        });
    };

    const saveChecklistState = (e) => {
        const checkbox = e.target;
        sessionStorage.setItem(checkbox.name, checkbox.checked);
    };

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveChecklistState);
    });

    loadChecklistState();

    // Scroll to start
    btnStart.addEventListener('click', () => {
        const firstCard = document.getElementById('step-1');
        if (firstCard) {
            firstCard.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // View All Mode
    const toggleViewAll = () => {
        document.body.classList.add('view-all');
        btnViewAll.textContent = 'Đang xem toàn bộ';
        btnViewAll.disabled = true;
    };

    btnViewAll.addEventListener('click', toggleViewAll);
    if (btnViewAllFooter) {
        btnViewAllFooter.addEventListener('click', toggleViewAll);
    }

    // Parallax/Scale Effect for Sticky Stack
    // Only apply if not reduced motion and not in view-all mode
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const updateStackEffect = () => {
            if (document.body.classList.contains('view-all') || window.innerWidth <= 768 || window.innerHeight <= 700) {
                cards.forEach(card => card.style.transform = 'none');
                return;
            }

            const scrollY = window.scrollY;
            
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardTop = rect.top;
                const stickyTop = parseInt(getComputedStyle(card).top);

                // If the card is at its sticky position (or above due to scrolling), scale it down
                if (cardTop <= stickyTop + 1) {
                    // Calculate how deep it is in the stack based on next cards overlapping it
                    let depth = 0;
                    for (let i = index + 1; i < cards.length; i++) {
                        const nextCard = cards[i];
                        const nextRect = nextCard.getBoundingClientRect();
                        const nextStickyTop = parseInt(getComputedStyle(nextCard).top);
                        
                        if (nextRect.top <= nextStickyTop + 1) {
                            depth++;
                        } else {
                            // Partial overlap
                            const overlap = (nextStickyTop + 500) - nextRect.top; // Approximation
                            if (overlap > 0) {
                                depth += Math.min(overlap / 500, 1);
                            }
                        }
                    }
                    
                    // Max scale down to 0.96 (4% reduction)
                    const scale = Math.max(0.96, 1 - (depth * 0.015));
                    card.style.transform = `scale(${scale})`;
                } else {
                    card.style.transform = 'scale(1)';
                }
            });
        };

        window.addEventListener('scroll', updateStackEffect, { passive: true });
        window.addEventListener('resize', updateStackEffect, { passive: true });
        // Initial call
        updateStackEffect();
    }
});
