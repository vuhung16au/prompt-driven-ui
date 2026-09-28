const data = {
    meeting: {
        notes: [
            { id: "n1", text: "Trang said we need to add blue to the logo." },
            { id: "n2", text: "Hai mentioned the budget isn't enough for next month's review." },
            { id: "n3", text: "Decided to use Inter font for the entire app." },
            { id: "n4", text: "Who will handle the hosting part?" }
        ],
        summary: {
            decisions: [
                { id: "d1", text: "Use Inter font for the entire app", source: "n3" }
            ],
            actions: [
                { id: "a1", text: "Add blue to the logo (Trang requested)", source: "n1" },
                { id: "a2", text: "Review budget for next month's review", source: "n2" }
            ],
            questions: [
                { id: "q1", text: "Who is responsible for hosting?", source: "n4" }
            ]
        }
    },
    article: {
        notes: [
            { id: "n1", text: "Intro should tell the startup beginning story." },
            { id: "n2", text: "Remember to insert March growth metrics." },
            { id: "n3", text: "Should we mention competitors?" },
            { id: "n4", text: "Conclusion: Call to action for free trial sign up." }
        ],
        summary: {
            decisions: [
                { id: "d1", text: "Call to action for free trial sign up in the conclusion", source: "n4" }
            ],
            actions: [
                { id: "a1", text: "Write intro telling the startup beginning story", source: "n1" },
                { id: "a2", text: "Insert March growth metrics into the article", source: "n2" }
            ],
            questions: [
                { id: "q1", text: "Should we mention competitors in the article?", source: "n3" }
            ]
        }
    },
    plan: {
        notes: [
            { id: "n1", text: "Must complete tax report by Wednesday." },
            { id: "n2", text: "Send email to design team regarding the new UI." },
            { id: "n3", text: "Not sure when to meet client A." }
        ],
        summary: {
            decisions: [],
            actions: [
                { id: "a1", text: "Complete tax report by Wednesday", source: "n1" },
                { id: "a2", text: "Send UI feedback email to design team", source: "n2" }
            ],
            questions: [
                { id: "q1", text: "When is the meeting schedule with client A?", source: "n3" }
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
            { key: 'decisions', title: 'Decisions' },
            { key: 'actions', title: 'Action Items' },
            { key: 'questions', title: 'Follow-up Questions' }
        ];
        
        groups.forEach(group => {
            const groupData = summary[group.key];
            const div = document.createElement('div');
            div.className = 'output-group';
            div.innerHTML = `<h3>${group.title}</h3>`;
            
            if (groupData.length === 0) {
                div.innerHTML += `<div class="empty-state">Not in notes</div>`;
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
        md += '### Decisions\n' + summary.decisions.map(d => `- ${d.text}`).join('\n') + '\n\n';
    }
    if (summary.actions.length) {
        md += '### Action Items\n' + summary.actions.map(d => `- ${d.text}`).join('\n') + '\n\n';
    }
    if (summary.questions.length) {
        md += '### Follow-up Questions\n' + summary.questions.map(d => `- ${d.text}`).join('\n') + '\n\n';
    }
    
    // Fallback if clipboard API is blocked
    if (!navigator.clipboard) {
        prompt("Copy to clipboard: Ctrl+C, Enter", md.trim());
        return;
    }

    navigator.clipboard.writeText(md.trim()).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    }).catch(() => {
        alert('Failed to copy. Please try again.');
    });
});

motionToggle.addEventListener('click', () => {
    document.body.classList.toggle('paused');
    const isPaused = document.body.classList.contains('paused');
    motionToggle.textContent = isPaused ? '▶' : '⏸';
    motionToggle.title = isPaused ? 'Play motion' : 'Pause motion';
});

// Initial render
render();
