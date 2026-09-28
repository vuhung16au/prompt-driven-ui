document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panelContents = document.querySelectorAll('.panel-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.add('text-[#8A8F98]');
                b.classList.remove('text-[#EDEDEF]');
            });
            panelContents.forEach(p => {
                p.classList.add('hidden');
                // subtle animation reset
                p.style.opacity = '0';
                p.style.transform = 'translateY(5px)';
            });

            // Add active to clicked
            btn.classList.add('active');
            btn.classList.remove('text-[#8A8F98]');
            btn.classList.add('text-[#EDEDEF]');

            // Show target panel
            const targetId = btn.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
                // Trigger reflow for animation
                void targetPanel.offsetWidth;
                targetPanel.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                targetPanel.style.opacity = '1';
                targetPanel.style.transform = 'translateY(0)';
            }
        });
    });

    // 2. Version Comparison Logic
    const btnV1 = document.getElementById('btn-v1');
    const btnV2 = document.getElementById('btn-v2');
    const viewV1 = document.getElementById('view-v1');
    const viewV2 = document.getElementById('view-v2');

    if (btnV1 && btnV2) {
        btnV1.addEventListener('click', () => {
            btnV1.classList.replace('text-[#8A8F98]', 'text-white');
            btnV1.classList.replace('hover:text-[#EDEDEF]', 'bg-gray-700');
            btnV2.classList.remove('bg-[#5E6AD2]', 'text-white');
            btnV2.classList.add('text-[#8A8F98]', 'hover:text-[#EDEDEF]');

            viewV1.classList.remove('hidden');
            viewV1.classList.add('flex');
            viewV2.classList.add('hidden');
            viewV2.classList.remove('flex');
        });

        btnV2.addEventListener('click', () => {
            btnV2.classList.add('bg-[#5E6AD2]', 'text-white');
            btnV2.classList.remove('text-[#8A8F98]', 'hover:text-[#EDEDEF]');
            btnV1.classList.add('text-[#8A8F98]', 'hover:text-[#EDEDEF]');
            btnV1.classList.remove('text-white', 'bg-gray-700');

            viewV2.classList.remove('hidden');
            viewV2.classList.add('flex');
            viewV1.classList.add('hidden');
            viewV1.classList.remove('flex');
        });
    }

    // 3. Feedback Resolution Logic
    const checkboxes = document.querySelectorAll('.feedback-checkbox');
    const resolvedCountEl = document.getElementById('resolved-count');
    const counterBadge = document.querySelector('.feedback-counter');

    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const item = e.target.closest('.feedback-item');
            const title = item.querySelector('h4');
            
            if (e.target.checked) {
                title.classList.add('line-through', 'text-[#8A8F98]');
                title.classList.remove('text-[#EDEDEF]');
                item.classList.add('opacity-70');
            } else {
                title.classList.remove('line-through', 'text-[#8A8F98]');
                title.classList.add('text-[#EDEDEF]');
                item.classList.remove('opacity-70');
            }

            const checkedCount = document.querySelectorAll('.feedback-checkbox:checked').length;
            resolvedCountEl.textContent = checkedCount;
            counterBadge.textContent = `${checkedCount}/3`;
        });
    });

    // 4. Spotlight Effect for Cards
    const glassCards = document.querySelectorAll('.glass-card, .glass-surface');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // We use inline styles for the variables instead of pseudo-elements directly in JS
            // A common technique is to set CSS vars on the element
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        // Ensure class is added for the CSS to pick up
        card.classList.add('spotlight-card');
    });

    // 5. Scroll Parallax / Reveal Effect
    const heroSection = document.querySelector('.scroll-reveal');
    window.addEventListener('scroll', () => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const scrollY = window.scrollY;
            if (scrollY < 400 && heroSection) {
                heroSection.style.opacity = 1 - (scrollY / 400);
                heroSection.style.transform = `translateY(${scrollY * 0.15}px) scale(${1 - scrollY * 0.0002})`;
            }
        }
    });

    // 6. Smooth scroll to workspace
    const openBtn = document.getElementById('open-workspace-btn');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            document.getElementById('workspace').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 7. Modal Logic
    const reportBtn = document.getElementById('btn-report');
    const modal = document.getElementById('report-modal');
    const closeModal = document.getElementById('close-modal');
    const modalContent = modal?.querySelector('div');

    if (reportBtn && modal && closeModal) {
        reportBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            // small delay for transition
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);
        });

        closeModal.addEventListener('click', () => {
            modal.classList.add('opacity-0');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        });
    }
});
