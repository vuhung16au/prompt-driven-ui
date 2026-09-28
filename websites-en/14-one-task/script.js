document.addEventListener('DOMContentLoaded', () => {
    // State
    let state = {
        status: 'idle', // idle, running, paused, finished
        taskName: '',
        duration: 0, // in seconds
        remaining: 0,
        endTime: null,
        timerId: null,
        history: JSON.parse(localStorage.getItem('focusHistoryEn')) || []
    };

    // Elements
    const views = {
        setup: document.getElementById('setup-view'),
        timer: document.getElementById('timer-view'),
        completed: document.getElementById('completed-view')
    };
    
    const form = document.getElementById('focus-form');
    const customDurationRadios = document.querySelectorAll('input[name="duration"]');
    const customDurationContainer = document.getElementById('custom-duration-container');
    const customDurationInput = document.getElementById('custom-duration');
    
    const timeDisplay = document.getElementById('time-left');
    const currentTaskName = document.getElementById('current-task-name');
    const completedTaskName = document.getElementById('completed-task-name');
    
    const btnToggle = document.getElementById('btn-toggle');
    const btnReset = document.getElementById('btn-reset');
    const btnNewSession = document.getElementById('btn-new-session');
    
    const historyList = document.getElementById('history-list');
    const btnClearHistory = document.getElementById('btn-clear-history');

    // UI Updates
    function switchView(viewName) {
        Object.values(views).forEach(v => v.classList.add('hidden'));
        views[viewName].classList.remove('hidden');
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        timeDisplay.textContent = formatTime(state.remaining);
    }

    // Logic
    function calculateRemaining() {
        if (state.status === 'running') {
            const now = Date.now();
            const diff = Math.max(0, Math.ceil((state.endTime - now) / 1000));
            state.remaining = diff;
            
            if (diff === 0) {
                finishSession();
            } else {
                updateTimerDisplay();
            }
        }
    }

    function startTimer() {
        if (state.status === 'paused' || state.status === 'idle') {
            state.status = 'running';
            state.endTime = Date.now() + (state.remaining * 1000);
            
            btnToggle.textContent = 'Pause';
            
            state.timerId = setInterval(calculateRemaining, 200);
        }
    }

    function pauseTimer() {
        if (state.status === 'running') {
            state.status = 'paused';
            clearInterval(state.timerId);
            calculateRemaining(); // update remaining one last time
            btnToggle.textContent = 'Resume';
        }
    }

    function resetTimer() {
        if (state.status === 'running' || state.status === 'paused') {
            const confirmed = confirm('Are you sure you want to reset this session? Progress will be lost.');
            if (confirmed) {
                clearInterval(state.timerId);
                state.status = 'idle';
                switchView('setup');
            }
        }
    }

    function finishSession() {
        clearInterval(state.timerId);
        state.status = 'finished';
        
        // Save to history
        state.history.unshift({
            task: state.taskName,
            duration: state.duration,
            date: new Date().toISOString()
        });
        
        // Keep max 3 items
        if (state.history.length > 3) {
            state.history = state.history.slice(0, 3);
        }
        
        saveHistory();
        renderHistory();
        
        completedTaskName.textContent = state.taskName;
        switchView('completed');
    }

    // History
    function saveHistory() {
        localStorage.setItem('focusHistoryEn', JSON.stringify(state.history));
    }

    function renderHistory() {
        if (state.history.length === 0) {
            historyList.innerHTML = '<p class="empty-state">No completed sessions yet.</p>';
            btnClearHistory.classList.add('hidden');
            return;
        }
        
        historyList.innerHTML = state.history.map(item => `
            <div class="history-item">
                <span class="history-task">${escapeHTML(item.task)}</span>
                <span class="history-duration">${item.duration} min</span>
            </div>
        `).join('');
        
        btnClearHistory.classList.remove('hidden');
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Event Listeners
    customDurationRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                customDurationContainer.classList.remove('hidden');
                customDurationInput.required = true;
                customDurationInput.focus();
            } else {
                customDurationContainer.classList.add('hidden');
                customDurationInput.required = false;
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const taskName = document.getElementById('task-name').value.trim();
        if (!taskName) return;
        
        const durationSelection = document.querySelector('input[name="duration"]:checked').value;
        let durationMinutes = 0;
        
        if (durationSelection === 'custom') {
            durationMinutes = parseInt(customDurationInput.value, 10);
            if (isNaN(durationMinutes) || durationMinutes < 1 || durationMinutes > 120) {
                alert('Please enter a valid duration (1-120 minutes).');
                return;
            }
        } else {
            durationMinutes = parseInt(durationSelection, 10);
        }
        
        state.taskName = taskName;
        state.duration = durationMinutes;
        state.remaining = durationMinutes * 60;
        
        currentTaskName.textContent = taskName;
        updateTimerDisplay();
        
        switchView('timer');
        startTimer();
    });

    btnToggle.addEventListener('click', () => {
        if (state.status === 'running') {
            pauseTimer();
        } else if (state.status === 'paused') {
            startTimer();
        }
    });

    btnReset.addEventListener('click', resetTimer);

    btnNewSession.addEventListener('click', () => {
        state.status = 'idle';
        form.reset();
        document.querySelector('input[name="duration"][value="25"]').checked = true;
        customDurationContainer.classList.add('hidden');
        customDurationInput.required = false;
        switchView('setup');
    });

    btnClearHistory.addEventListener('click', () => {
        if (confirm('Clear all demo session history?')) {
            state.history = [];
            saveHistory();
            renderHistory();
        }
    });

    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && state.status === 'running') {
            calculateRemaining();
        }
    });

    // Init
    renderHistory();
});
