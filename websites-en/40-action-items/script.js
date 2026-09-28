const records = [
    { id: "RUN-1052", workflow: "Sync Orders", time: "14:02:01", status: "error", duration: 1150 },
    { id: "RUN-1051", workflow: "Send Welcome Email", time: "13:58:22", status: "success", duration: 420 },
    { id: "RUN-1050", workflow: "Update Inventory", time: "13:45:10", status: "success", duration: 890 },
    { id: "RUN-1049", workflow: "Sync Orders", time: "13:30:05", status: "error", duration: 1205 },
    { id: "RUN-1048", workflow: "Send Welcome Email", time: "13:15:00", status: "success", duration: 380 },
    { id: "RUN-1047", workflow: "Update Inventory", time: "13:00:12", status: "success", duration: 910 },
    { id: "RUN-1046", workflow: "Sync Orders", time: "12:45:33", status: "success", duration: 1050 },
    { id: "RUN-1045", workflow: "Send Welcome Email", time: "12:30:01", status: "success", duration: 410 },
    { id: "RUN-1044", workflow: "Sync Orders", time: "12:15:45", status: "success", duration: 1120 },
    { id: "RUN-1043", workflow: "Update Inventory", time: "12:00:00", status: "success", duration: 850 },
];

const tbody = document.getElementById('table-body');
const panel = document.getElementById('run-detail');
const btnClose = document.getElementById('btn-close-detail');
const detailId = document.getElementById('detail-id');
const btnRetry = document.getElementById('btn-retry');
const timelineContainer = document.getElementById('timeline');
const rows = [];

records.forEach((rec, index) => {
    const tr = document.createElement('tr');
    tr.tabIndex = 0;
    tr.onclick = () => openDetail(rec.id, rec.status, tr);
    tr.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDetail(rec.id, rec.status, tr);
        }
    };
    
    const statusHtml = rec.status === 'success' 
        ? `<span class="status-badge status-success"><span class="status-dot"></span>Success</span>`
        : `<span class="status-badge status-error"><span class="status-dot"></span>Needs attention</span>`;

    tr.innerHTML = `
        <td data-label="Workflow">${rec.workflow}</td>
        <td data-label="Time" class="tabular">${rec.time}</td>
        <td data-label="Status">${statusHtml}</td>
        <td data-label="Duration (ms)" class="text-right tabular">${rec.duration}</td>
    `;
    tbody.appendChild(tr);
    rows.push(tr);
});

function openDetail(id, status, rowElement) {
    // Update active row style
    rows.forEach(r => r.classList.remove('active-row'));
    if(rowElement) rowElement.classList.add('active-row');

    detailId.textContent = id;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    
    // Render timeline based on status
    timelineContainer.innerHTML = '';
    
    // Step 1: always success
    timelineContainer.innerHTML += `
        <div class="timeline-item success">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <strong>Receive webhook</strong>
                <div class="timeline-meta tabular">14:02:01.000</div>
            </div>
        </div>
    `;

    // Step 2
    if (status === 'success') {
        timelineContainer.innerHTML += `
            <div class="timeline-item success">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <strong>Process data</strong>
                    <div class="timeline-meta tabular">14:02:01.120</div>
                </div>
            </div>
            <div class="timeline-item success">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <strong>Send email</strong>
                    <div class="timeline-meta tabular">14:02:02.150</div>
                </div>
            </div>
        `;
    } else {
        timelineContainer.innerHTML += `
            <div class="timeline-item error">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <strong>Send email</strong>
                    <div class="timeline-meta tabular">14:02:02.150</div>
                    <div class="timeline-error">
                        Error: Missing 'to' email address in input payload. Destination unresponsive.
                    </div>
                </div>
            </div>
        `;
    }
}

btnClose.onclick = () => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    rows.forEach(r => r.classList.remove('active-row'));
};

btnRetry.onclick = () => {
    btnRetry.textContent = 'Simulating...';
    btnRetry.disabled = true;
    setTimeout(() => {
        btnRetry.textContent = 'Simulate Rerun';
        btnRetry.disabled = false;
        alert('Created new run record (Simulated). The original error run is kept.');
    }, 600);
};

document.getElementById('btn-export').onclick = () => {
    alert('CSV Exported successfully based on current filters (Simulated).');
};

document.getElementById('btn-reset').onclick = () => {
    alert('Filters reset.');
};

document.getElementById('btn-edit').onclick = () => {
    alert('Open edit sample data dialog (Simulated).');
};
