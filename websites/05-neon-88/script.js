document.addEventListener('DOMContentLoaded', () => {
    // Schedule interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    const scheduleImg = document.getElementById('schedule-img');
    const scheduleTitle = document.getElementById('schedule-title');
    const scheduleDesc = document.getElementById('schedule-desc');

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const time = item.getAttribute('data-time');

            // Generate image color based on title to vary
            let color = 'FF00FF';
            if (title === 'Neon Fields') color = '00FFFF';
            if (title === 'Afterimage') color = 'FF9900';

            scheduleImg.src = `https://via.placeholder.com/600x400/${color}/090014?text=${title.toUpperCase().replace(' ', '+')}`;
            scheduleTitle.textContent = title;
            scheduleDesc.textContent = desc;
        });
    });

    // Ticket Selection
    const ticketRadios = document.querySelectorAll('input[name="slot"]');
    const ticketStatus = document.getElementById('ticket-status');
    const viewSelectionBtn = document.getElementById('view-selection-btn');

    let selectedSlot = null;

    ticketRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedSlot = e.target.value;
            viewSelectionBtn.disabled = false;
            ticketStatus.textContent = `> Đã chọn suất: ${e.target.nextElementSibling.querySelector('h3').textContent}. Chưa tạo vé hoặc giữ chỗ.`;
        });
    });

    // Reduce Motion / Disable Effects
    const toggleEffectsBtn = document.getElementById('toggle-effects-btn');
    const body = document.body;
    
    // Check session storage
    if (sessionStorage.getItem('neon88_reduced_motion') === 'true') {
        body.classList.add('reduced-motion');
        toggleEffectsBtn.textContent = '[Bật hiệu ứng]';
    }

    toggleEffectsBtn.addEventListener('click', () => {
        body.classList.toggle('reduced-motion');
        const isReduced = body.classList.contains('reduced-motion');
        sessionStorage.setItem('neon88_reduced_motion', isReduced);
        toggleEffectsBtn.textContent = isReduced ? '[Bật hiệu ứng]' : '[Tắt hiệu ứng]';
    });
});
