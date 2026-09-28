const data = {
    meeting: {
        notes: [
            { id: "n1", text: "Trang bảo cần thêm màu xanh vào logo." },
            { id: "n2", text: "Hải nói ngân sách không đủ cho đợt review tháng sau." },
            { id: "n3", text: "Chốt là sẽ dùng font Inter cho toàn bộ app." },
            { id: "n4", text: "Ai sẽ lo phần hosting nhỉ?" }
        ],
        summary: {
            decisions: [
                { id: "d1", text: "Sử dụng font Inter cho toàn bộ app", source: "n3" }
            ],
            actions: [
                { id: "a1", text: "Thêm màu xanh vào logo (Trang yêu cầu)", source: "n1" },
                { id: "a2", text: "Xem xét lại ngân sách cho đợt review tháng sau", source: "n2" }
            ],
            questions: [
                { id: "q1", text: "Ai sẽ chịu trách nhiệm phần hosting?", source: "n4" }
            ]
        }
    },
    article: {
        notes: [
            { id: "n1", text: "Mở bài nên kể câu chuyện lúc bắt đầu startup." },
            { id: "n2", text: "Nhớ chèn số liệu tăng trưởng tháng 3." },
            { id: "n3", text: "Có nên nhắc tới đối thủ không?" },
            { id: "n4", text: "Kết luận: Kêu gọi đăng ký dùng thử." }
        ],
        summary: {
            decisions: [
                { id: "d1", text: "Kêu gọi đăng ký dùng thử ở phần kết luận", source: "n4" }
            ],
            actions: [
                { id: "a1", text: "Viết mở bài bằng câu chuyện bắt đầu startup", source: "n1" },
                { id: "a2", text: "Chèn số liệu tăng trưởng tháng 3 vào bài", source: "n2" }
            ],
            questions: [
                { id: "q1", text: "Có nên nhắc tới đối thủ trong bài viết không?", source: "n3" }
            ]
        }
    },
    plan: {
        notes: [
            { id: "n1", text: "Phải hoàn thành báo cáo thuế vào thứ Tư." },
            { id: "n2", text: "Gửi email cho team thiết kế về UI mới." },
            { id: "n3", text: "Chưa biết bao giờ gặp khách hàng A." }
        ],
        summary: {
            decisions: [],
            actions: [
                { id: "a1", text: "Hoàn thành báo cáo thuế trước thứ Tư", source: "n1" },
                { id: "a2", text: "Gửi email phản hồi UI cho team thiết kế", source: "n2" }
            ],
            questions: [
                { id: "q1", text: "Lịch hẹn gặp khách hàng A là khi nào?", source: "n3" }
            ]
        }
    }
};

const notesList = document.getElementById('notesList');
const outputContent = document.getElementById('outputContent');
const tabBtns = document.querySelectorAll('.tab-btn');
const copyBtn = document.getElementById('copyBtn');
const motionToggle = document.querySelector('.motion-toggle');

let currentDataset = 'meeting';

function render() {
    // Render Notes
    notesList.innerHTML = '';
    data[currentDataset].notes.forEach(note => {
        const li = document.createElement('li');
        li.className = 'note-item';
        li.id = `note-${note.id}`;
        li.innerHTML = `<div class="note-id">#${note.id}</div><div class="note-text">${note.text}</div>`;
        notesList.appendChild(li);
    });

    // Render Summary
    outputContent.style.opacity = 0;
    
    setTimeout(() => {
        outputContent.innerHTML = '';
        const summary = data[currentDataset].summary;
        
        const groups = [
            { key: 'decisions', title: 'Quyết định' },
            { key: 'actions', title: 'Việc làm' },
            { key: 'questions', title: 'Cần hỏi lại' }
        ];
        
        groups.forEach(group => {
            const groupData = summary[group.key];
            const div = document.createElement('div');
            div.className = 'output-group';
            div.innerHTML = `<h3>${group.title}</h3>`;
            
            if (groupData.length === 0) {
                div.innerHTML += `<div class="empty-state">Không có trong ghi chú</div>`;
            } else {
                const ul = document.createElement('ul');
                groupData.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'output-item';
                    li.tabIndex = 0;
                    li.textContent = item.text;
                    li.dataset.source = item.source;
                    
                    const highlight = () => {
                        document.querySelectorAll('.note-item').forEach(n => n.classList.remove('highlighted'));
                        document.getElementById(`note-${item.source}`).classList.add('highlighted');
                    };
                    const removeHighlight = () => {
                        document.getElementById(`note-${item.source}`).classList.remove('highlighted');
                    };
                    
                    li.addEventListener('mouseenter', highlight);
                    li.addEventListener('focus', highlight);
                    li.addEventListener('mouseleave', removeHighlight);
                    li.addEventListener('blur', removeHighlight);
                    
                    ul.appendChild(li);
                });
                div.appendChild(ul);
            }
            outputContent.appendChild(div);
        });
        
        outputContent.style.opacity = 1;
    }, 250);
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        const target = e.currentTarget;
        target.classList.add('active');
        target.setAttribute('aria-selected', 'true');
        currentDataset = target.dataset.dataset;
        render();
    });
});

copyBtn.addEventListener('click', () => {
    const summary = data[currentDataset].summary;
    let md = '';
    
    if (summary.decisions.length) {
        md += '### Quyết định\n' + summary.decisions.map(d => `- ${d.text}`).join('\n') + '\n\n';
    }
    if (summary.actions.length) {
        md += '### Việc làm\n' + summary.actions.map(d => `- ${d.text}`).join('\n') + '\n\n';
    }
    if (summary.questions.length) {
        md += '### Cần hỏi lại\n' + summary.questions.map(d => `- ${d.text}`).join('\n') + '\n\n';
    }
    
    // Fallback if clipboard API is blocked
    if (!navigator.clipboard) {
        prompt("Copy to clipboard: Ctrl+C, Enter", md.trim());
        return;
    }

    navigator.clipboard.writeText(md.trim()).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Đã chép!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    }).catch(() => {
        alert('Không thể sao chép. Vui lòng thử lại.');
    });
});

motionToggle.addEventListener('click', () => {
    document.body.classList.toggle('paused');
    const isPaused = document.body.classList.contains('paused');
    motionToggle.textContent = isPaused ? '▶' : '⏸';
    motionToggle.title = isPaused ? 'Phát chuyển động' : 'Dừng chuyển động';
});

// Initial render
render();
