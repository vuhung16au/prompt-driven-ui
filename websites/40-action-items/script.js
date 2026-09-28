const records = [
    { id: "RUN-1052", workflow: "Đồng bộ đơn hàng", time: "14:02:01", status: "error", duration: 1150 },
    { id: "RUN-1051", workflow: "Gửi email chào mừng", time: "13:58:22", status: "success", duration: 420 },
    { id: "RUN-1050", workflow: "Cập nhật tồn kho", time: "13:45:10", status: "success", duration: 890 },
    { id: "RUN-1049", workflow: "Đồng bộ đơn hàng", time: "13:30:05", status: "error", duration: 1205 },
    { id: "RUN-1048", workflow: "Gửi email chào mừng", time: "13:15:00", status: "success", duration: 380 },
    { id: "RUN-1047", workflow: "Cập nhật tồn kho", time: "13:00:12", status: "success", duration: 910 },
    { id: "RUN-1046", workflow: "Đồng bộ đơn hàng", time: "12:45:33", status: "success", duration: 1050 },
    { id: "RUN-1045", workflow: "Gửi email chào mừng", time: "12:30:01", status: "success", duration: 410 },
    { id: "RUN-1044", workflow: "Đồng bộ đơn hàng", time: "12:15:45", status: "success", duration: 1120 },
    { id: "RUN-1043", workflow: "Cập nhật tồn kho", time: "12:00:00", status: "success", duration: 850 },
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
        ? `<span class="status-badge status-success"><span class="status-dot"></span>Thành công</span>`
        : `<span class="status-badge status-error"><span class="status-dot"></span>Cần xử lý</span>`;

    tr.innerHTML = `
        <td data-label="Quy trình">${rec.workflow}</td>
        <td data-label="Thời gian" class="tabular">${rec.time}</td>
        <td data-label="Trạng thái">${statusHtml}</td>
        <td data-label="Thời lượng (ms)" class="text-right tabular">${rec.duration}</td>
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
                <strong>Nhận webhook</strong>
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
                    <strong>Xử lý dữ liệu</strong>
                    <div class="timeline-meta tabular">14:02:01.120</div>
                </div>
            </div>
            <div class="timeline-item success">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <strong>Gửi email</strong>
                    <div class="timeline-meta tabular">14:02:02.150</div>
                </div>
            </div>
        `;
    } else {
        timelineContainer.innerHTML += `
            <div class="timeline-item error">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <strong>Gửi email</strong>
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
    btnRetry.textContent = 'Đang chạy...';
    btnRetry.disabled = true;
    setTimeout(() => {
        btnRetry.textContent = 'Chạy lại mô phỏng';
        btnRetry.disabled = false;
        alert('Đã tạo lượt chạy mới (Mô phỏng). Lượt chạy lỗi cũ vẫn được giữ nguyên.');
    }, 600);
};

document.getElementById('btn-export').onclick = () => {
    alert('Xuất CSV thành công theo bộ lọc hiện tại (Mô phỏng).');
};

document.getElementById('btn-reset').onclick = () => {
    alert('Đã reset bộ lọc.');
};

document.getElementById('btn-edit').onclick = () => {
    alert('Mở chức năng sửa dữ liệu mẫu (Mô phỏng).');
};
