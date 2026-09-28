document.addEventListener('DOMContentLoaded', () => {
    // Shape Selection Logic
    const shapeBtns = document.querySelectorAll('.tab-btn');
    const shapeImg = document.getElementById('shape-img');
    const shapeDesc = document.getElementById('shape-desc');

    const shapeData = {
        'chen': {
            imgText: 'Ảnh phác thảo chén',
            desc: 'Dáng chén tròn, vừa vặn trong lòng bàn tay.'
        },
        'coc': {
            imgText: 'Ảnh phác thảo cốc',
            desc: 'Cốc trụ cao đứng thẳng, tay cầm cong mềm mại.'
        },
        'dia': {
            imgText: 'Ảnh phác thảo đĩa',
            desc: 'Đĩa phẳng viền lượn sóng tự nhiên.'
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
    const savedIdea = sessionStorage.getItem('sketchToBowlIdea');
    if (savedIdea) {
        ideaText.value = savedIdea;
    }

    // Auto-save on input
    ideaText.addEventListener('input', () => {
        sessionStorage.setItem('sketchToBowlIdea', ideaText.value);
    });

    saveBtn.addEventListener('click', () => {
        if (ideaText.value.trim() === '') {
            formMsg.textContent = 'Vui lòng ghi lại chút ý tưởng trước nhé!';
            formMsg.style.color = 'var(--accent-red)';
            return;
        }

        formMsg.textContent = 'Đã lưu nháp ý tưởng vào trình duyệt. Tính năng gửi thực tế sẽ được tích hợp sau.';
        formMsg.style.color = 'var(--accent-blue)';
        sessionStorage.setItem('sketchToBowlIdea', ideaText.value);
        
        setTimeout(() => {
            formMsg.textContent = '';
        }, 5000);
    });
});
