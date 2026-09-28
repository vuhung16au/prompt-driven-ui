const START_HOUR = 8;
const END_HOUR = 18;
const ROW_HEIGHT = 60; // px

let selectedEventId = null;
let lastDeletedEvent = null;
let notificationTimeout = null;

const timelineContainer = document.getElementById('timeline-container');
const detailContent = document.getElementById('detail-content');
const btnAddEvent = document.getElementById('btn-add-event');
const toggleTransparency = document.getElementById('reduce-transparency');
const notification = document.getElementById('notification');
const btnUndo = document.getElementById('btn-undo');

function init() {
    renderTimelineBackground();
    renderEvents();
    
    btnAddEvent.addEventListener('click', showAddForm);
    toggleTransparency.addEventListener('change', (e) => {
        if(e.target.checked) {
            document.body.classList.add('no-glass');
        } else {
            document.body.classList.remove('no-glass');
        }
    });

    btnUndo.addEventListener('click', () => {
        if (lastDeletedEvent) {
            events.push(lastDeletedEvent);
            lastDeletedEvent = null;
            hideNotification();
            renderEvents();
            showEmptyDetail();
        }
    });
}

function renderTimelineBackground() {
    timelineContainer.innerHTML = '';
    
    for (let h = START_HOUR; h <= END_HOUR; h++) {
        const row = document.createElement('div');
        row.className = 'time-slot-row';
        
        const label = document.createElement('div');
        label.className = 'time-label';
        label.textContent = `${h}:00`;
        
        const line = document.createElement('div');
        line.className = 'time-slot-line';
        
        row.appendChild(label);
        row.appendChild(line);
        timelineContainer.appendChild(row);
    }

    const eventsLayer = document.createElement('div');
    eventsLayer.className = 'events-layer';
    eventsLayer.id = 'events-layer';
    timelineContainer.appendChild(eventsLayer);
}

function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

function formatTime(timeStr) {
    return timeStr; // For now keep format
}

function detectConflicts() {
    // reset conflicts
    events.forEach(e => e.conflict = false);
    
    for(let i=0; i<events.length; i++) {
        for(let j=i+1; j<events.length; j++) {
            const e1 = events[i];
            const e2 = events[j];
            
            const start1 = timeToMinutes(e1.start);
            const end1 = timeToMinutes(e1.end);
            const start2 = timeToMinutes(e2.start);
            const end2 = timeToMinutes(e2.end);
            
            if (start1 < end2 && start2 < end1) {
                e1.conflict = true;
                e2.conflict = true;
            }
        }
    }
}

function renderEvents() {
    const layer = document.getElementById('events-layer');
    if(!layer) return;
    layer.innerHTML = '';
    
    detectConflicts();
    
    const startMinOfDay = START_HOUR * 60;
    
    let conflictGroups = [];
    
    events.forEach(event => {
        const startMins = timeToMinutes(event.start);
        const endMins = timeToMinutes(event.end);
        
        // ensure within timeline bounds
        let renderStart = Math.max(startMins, startMinOfDay);
        let renderEnd = Math.min(endMins, END_HOUR * 60);
        
        if (renderEnd <= renderStart) return; // outside bounds or invalid
        
        const topPx = ((renderStart - startMinOfDay) / 60) * ROW_HEIGHT;
        const heightPx = ((renderEnd - renderStart) / 60) * ROW_HEIGHT;
        
        const card = document.createElement('div');
        card.className = 'event-card';
        if (event.id === selectedEventId) {
            card.classList.add('selected');
        }
        
        // Simple conflict visualization
        if (event.conflict) {
            // we randomly push some to right to show overlap, in a real app this is more complex
            if(events.indexOf(event) % 2 !== 0) {
                card.classList.add('conflict-next');
            } else {
                card.classList.add('conflict');
            }
        }
        
        card.style.top = `${topPx}px`;
        card.style.height = `${heightPx}px`;
        
        const titleEl = document.createElement('div');
        titleEl.className = 'event-title';
        titleEl.textContent = event.title;
        
        const timeEl = document.createElement('div');
        timeEl.className = 'event-time';
        timeEl.textContent = `${event.start} - ${event.end}`;
        
        if(event.conflict) {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = I18N.conflictLabel;
            timeEl.appendChild(badge);
        }
        
        card.appendChild(titleEl);
        card.appendChild(timeEl);
        
        card.addEventListener('click', () => {
            selectedEventId = event.id;
            renderEvents(); // Re-render to update selected state
            showEventDetail(event);
        });
        
        layer.appendChild(card);
    });
}

function showEmptyDetail() {
    selectedEventId = null;
    detailContent.innerHTML = `
        <div class="empty-state">
            <p class="metadata">${I18N.emptySelect}</p>
        </div>
    `;
    renderEvents(); // re-render to clear selection
}

function showEventDetail(event) {
    const isEdit = !!event.id;
    const titleVal = event.title || '';
    const startVal = event.start || '08:00';
    const endVal = event.end || '09:00';
    
    detailContent.innerHTML = `
        <div class="panel-header">
            <h2>${isEdit ? I18N.editTitle : I18N.addTitle}</h2>
        </div>
        <form id="event-form">
            <div class="form-group">
                <label for="event-title">${I18N.titleLabel}</label>
                <input type="text" id="event-title" class="form-control" value="${titleVal}" required>
                <div class="form-error" id="title-error">${I18N.errRequired}</div>
            </div>
            <div class="form-group">
                <label for="event-start">${I18N.startLabel}</label>
                <input type="time" id="event-start" class="form-control" value="${startVal}" required>
            </div>
            <div class="form-group">
                <label for="event-end">${I18N.endLabel}</label>
                <input type="time" id="event-end" class="form-control" value="${endVal}" required>
                <div class="form-error" id="time-error">${I18N.errStartEnd}</div>
            </div>
            
            <div class="btn-group">
                <button type="submit" class="btn-primary">${I18N.saveBtn}</button>
                <button type="button" class="btn-secondary" id="btn-cancel">${I18N.cancelBtn}</button>
                ${isEdit ? `<button type="button" class="btn-danger" id="btn-delete" style="margin-left:auto;">${I18N.deleteBtn}</button>` : ''}
            </div>
        </form>
    `;
    
    const form = document.getElementById('event-form');
    const btnCancel = document.getElementById('btn-cancel');
    const btnDelete = document.getElementById('btn-delete');
    
    btnCancel.addEventListener('click', () => {
        showEmptyDetail();
    });
    
    if (btnDelete) {
        btnDelete.addEventListener('click', () => {
            deleteEvent(event.id);
        });
    }
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveEvent(event.id);
    });
}

function showAddForm() {
    selectedEventId = null;
    renderEvents();
    showEventDetail({});
}

function saveEvent(id) {
    const titleInput = document.getElementById('event-title');
    const startInput = document.getElementById('event-start');
    const endInput = document.getElementById('event-end');
    const timeError = document.getElementById('time-error');
    
    timeError.style.display = 'none';
    endInput.classList.remove('error');
    
    const startVal = startInput.value;
    const endVal = endInput.value;
    
    if (timeToMinutes(endVal) <= timeToMinutes(startVal)) {
        timeError.style.display = 'block';
        endInput.classList.add('error');
        return;
    }
    
    if (!titleInput.value.trim()) {
        return; // native validation will catch it, but just in case
    }
    
    if (id) {
        // edit
        const ev = events.find(e => e.id === id);
        if (ev) {
            ev.title = titleInput.value;
            ev.start = startVal;
            ev.end = endVal;
        }
    } else {
        // add
        events.push({
            id: 'e' + Date.now(),
            title: titleInput.value,
            start: startVal,
            end: endVal
        });
    }
    
    showEmptyDetail();
}

function deleteEvent(id) {
    const idx = events.findIndex(e => e.id === id);
    if(idx > -1) {
        lastDeletedEvent = events[idx];
        events.splice(idx, 1);
        showEmptyDetail();
        showNotification(I18N.deletedMsg);
    }
}

function showNotification(msg) {
    const textEl = document.getElementById('notif-text');
    textEl.textContent = msg;
    notification.classList.add('show');
    
    if (notificationTimeout) clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    notification.classList.remove('show');
}

init();
