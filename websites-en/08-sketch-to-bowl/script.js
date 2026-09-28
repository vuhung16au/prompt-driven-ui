document.addEventListener('DOMContentLoaded', () => {
    // Shape Selection Logic
    const shapeBtns = document.querySelectorAll('.tab-btn');
    const shapeImg = document.getElementById('shape-img');
    const shapeDesc = document.getElementById('shape-desc');

    const shapeData = {
        'bowl': {
            imgText: 'Bowl sketch photo',
            desc: 'Round bowl shape, fits perfectly in your palm.'
        },
        'cup': {
            imgText: 'Cup sketch photo',
            desc: 'Tall cylindrical cup with a smooth curved handle.'
        },
        'plate': {
            imgText: 'Plate sketch photo',
            desc: 'Flat plate with naturally wavy edges.'
        }
    };

    shapeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            shapeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            const shape = btn.getAttribute('data-shape');
            if (shapeData[shape]) {
                shapeImg.textContent = shapeData[shape].imgText;
                shapeImg.setAttribute('aria-label', shapeData[shape].imgText);
                shapeDesc.textContent = shapeData[shape].desc;
                
                // Add a small jiggle effect to show it updated
                shapeImg.parentElement.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    shapeImg.parentElement.style.transform = '';
                }, 100);
            }
        });
    });

    // Form logic
    const saveBtn = document.getElementById('save-idea-btn');
    const ideaText = document.getElementById('idea-text');
    const formMsg = document.getElementById('form-msg');

    // Load saved note if any
    const savedIdea = sessionStorage.getItem('sketchToBowlIdeaEn');
    if (savedIdea) {
        ideaText.value = savedIdea;
    }

    // Auto-save on input
    ideaText.addEventListener('input', () => {
        sessionStorage.setItem('sketchToBowlIdeaEn', ideaText.value);
    });

    saveBtn.addEventListener('click', () => {
        if (ideaText.value.trim() === '') {
            formMsg.textContent = 'Please jot down some ideas first!';
            formMsg.style.color = 'var(--accent-red)';
            return;
        }

        formMsg.textContent = 'Idea drafted to browser. Real submission will be integrated later.';
        formMsg.style.color = 'var(--accent-blue)';
        sessionStorage.setItem('sketchToBowlIdeaEn', ideaText.value);
        
        setTimeout(() => {
            formMsg.textContent = '';
        }, 5000);
    });
});
