document.addEventListener('DOMContentLoaded', () => {
    // Initialize icons
    lucide.createIcons();
    
    // Dataset
    const initialData = [
        { id: 1, name: 'Banner mùa thu', assignee: 'Mai', deadline: '20/10', status: 'pending', logs: [] },
        { id: 2, name: 'Video giới thiệu', assignee: 'Nam', deadline: '22/10', status: 'revision', logs: [] },
        { id: 3, name: 'Bài PR báo', assignee: 'Linh', deadline: '18/10', status: 'approved', logs: [] },
        { id: 4, name: 'Landing page sự kiện', assignee: 'Tuấn', deadline: '25/10', status: 'pending', logs: [] },
        { id: 5, name: 'Email marketing', assignee: 'Mai', deadline: '19/10', status: 'approved', logs: [] },
        { id: 6, name: 'Kịch bản TikTok', assignee: 'Nam', deadline: '24/10', status: 'revision', logs: [] }
    ];
    
    let data = JSON.parse(JSON.stringify(initialData));
    let selectedId = null;
    let currentFilter = 'all';
    let currentQuery = '';

    // DOM Elements
    const tableBody = document.getElementById('table-body');
    const panel = document.getElementById('detail-panel');
    const detailContent = document.getElementById('detail-content');
    const listView = document.getElementById('list-view');
    const backBtn = document.getElementById('back-btn');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearFilterBtn = document.getElementById('clear-filter-btn');
    const historyList = document.getElementById('history-list');
    const resetBtn = document.getElementById('reset-btn');
    const historyContainer = document.getElementById('history-container');

    // Utility
    const formatTime = () => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    const addHistoryLog = (action, detail) => {
        const li = document.createElement('li');
        li.className = 'flex gap-4';
        li.innerHTML = `
            <div class="relative mt-1">
                <div class="w-5 h-5 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center z-10 relative">
                    <div class="w-2 h-2 rounded-full bg-indigo-600"></div>
                </div>
            </div>
            <div class="flex-grow">
                <div class="flex items-center gap-2">
                    <p class="text-sm font-semibold text-slate-900">${action}</p>
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">Trong phiên thử</span>
                </div>
                <p class="text-sm text-slate-600 mt-1">${detail}</p>
                <p class="text-xs text-slate-400 mt-1">${formatTime()}</p>
            </div>
        `;
        historyList.prepend(li);
        
        // Scroll to top of history
        historyContainer.scrollTop = 0;
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Chờ duyệt</span>';
            case 'revision': return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200">Đang sửa</span>';
            case 'approved': return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">Đã duyệt</span>';
            default: return '';
        }
    };

    const updateCounts = () => {
        const pending = data.filter(d => d.status === 'pending').length;
        const revision = data.filter(d => d.status === 'revision').length;
        document.getElementById('count-all').textContent = data.length;
        document.getElementById('count-pending').textContent = pending;
        document.getElementById('count-revision').textContent = revision;
    };

    // Rendering
    const renderTable = () => {
        tableBody.innerHTML = '';
        const filtered = data.filter(item => {
            const matchSearch = item.name.toLowerCase().includes(currentQuery.toLowerCase());
            const matchFilter = currentFilter === 'all' || item.status === currentFilter;
            return matchSearch && matchFilter;
        });

        if (filtered.length === 0) {
            document.getElementById('empty-search').classList.remove('hidden');
        } else {
            document.getElementById('empty-search').classList.add('hidden');
            filtered.forEach(item => {
                const tr = document.createElement('tr');
                tr.className = `border-b border-slate-100 cursor-pointer transition-colors ${selectedId === item.id ? 'bg-indigo-50 highlight-row' : 'hover:bg-slate-50'}`;
                tr.innerHTML = `
                    <td class="py-4 px-4 font-medium text-slate-900">${item.name}</td>
                    <td class="py-4 px-4 text-slate-500 hidden sm:table-cell">${item.assignee}</td>
                    <td class="py-4 px-4 text-slate-500 hidden sm:table-cell">${item.deadline}</td>
                    <td class="py-4 px-4">${getStatusBadge(item.status)}</td>
                `;
                tr.onclick = () => selectRequest(item.id);
                tableBody.appendChild(tr);
            });
        }
        updateCounts();
    };

    const renderDetailPanel = () => {
        if (!selectedId) {
            detailContent.innerHTML = `
                <div class="flex-grow flex flex-col items-center justify-center text-center text-slate-500 h-full">
                    <i data-lucide="inbox" class="w-12 h-12 mb-4 text-slate-300"></i>
                    <p>Chọn một yêu cầu để xem chi tiết</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        const item = data.find(d => d.id === selectedId);
        
        let actionsHtml = '';
        if (item.status === 'pending' || item.status === 'revision') {
            actionsHtml = `
                <div class="mt-8 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <h4 class="font-semibold text-sm text-slate-900 mb-3">Quyết định</h4>
                    <textarea id="review-note" rows="2" class="w-full text-sm border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-3" placeholder="Ghi chú (bắt buộc nếu yêu cầu sửa)..."></textarea>
                    <div class="flex gap-2">
                        <button id="btn-approve" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex justify-center items-center gap-1">
                            <i data-lucide="check" class="w-4 h-4"></i> Duyệt
                        </button>
                        <button id="btn-revise" class="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex justify-center items-center gap-1">
                            <i data-lucide="alert-circle" class="w-4 h-4"></i> Yêu cầu sửa
                        </button>
                    </div>
                    <p id="action-error" class="text-rose-600 text-xs mt-2 hidden">Vui lòng nhập lý do yêu cầu sửa.</p>
                </div>
            `;
        } else {
            actionsHtml = `
                <div class="mt-8 bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                    <div class="mx-auto w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                        <i data-lucide="check" class="w-5 h-5 text-emerald-600"></i>
                    </div>
                    <h4 class="font-semibold text-emerald-900">Yêu cầu đã được duyệt</h4>
                    <p class="text-sm text-emerald-700 mt-1">Không cần hành động thêm.</p>
                </div>
            `;
        }

        // Demo feedback data based on id
        let feedbackHtml = '';
        if (item.id === 1) {
            feedbackHtml = `
                <div class="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800 flex gap-2 mb-4">
                    <i data-lucide="alert-triangle" class="w-4 h-4 shrink-0 mt-0.5"></i>
                    <span><strong>Lỗi phát hiện:</strong> Thiếu ngày diễn ra sự kiện trên banner.</span>
                </div>
            `;
        }

        detailContent.innerHTML = `
            <div>
                <h2 class="text-2xl font-bold text-slate-900 leading-tight">${item.name}</h2>
                <div class="flex gap-2 mt-3">
                    ${getStatusBadge(item.status)}
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        Hạn: ${item.deadline}
                    </span>
                </div>
            </div>
            
            <div class="border-t border-slate-200 pt-4">
                <h4 class="font-semibold text-sm text-slate-900 mb-2">Thông tin chung</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-slate-500 block mb-1">Phụ trách</span>
                        <span class="font-medium text-slate-900 flex items-center gap-1">
                            <div class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">${item.assignee.charAt(0)}</div>
                            ${item.assignee}
                        </span>
                    </div>
                    <div>
                        <span class="text-slate-500 block mb-1">Tệp đính kèm</span>
                        <a href="#" class="text-indigo-600 hover:underline flex items-center gap-1"><i data-lucide="paperclip" class="w-3 h-3"></i> design-v2.fig</a>
                    </div>
                </div>
            </div>

            <div class="border-t border-slate-200 pt-4">
                <h4 class="font-semibold text-sm text-slate-900 mb-3">Luồng phản hồi</h4>
                ${feedbackHtml}
                <div class="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent hidden">
                    <!-- For a more complex demo we could render real logs here -->
                </div>
                <div class="text-sm text-slate-500 italic">Chưa có phản hồi nào trước đó.</div>
            </div>

            ${actionsHtml}
        `;
        
        lucide.createIcons();

        // Bind action buttons if they exist
        const btnApprove = document.getElementById('btn-approve');
        const btnRevise = document.getElementById('btn-revise');
        const noteInput = document.getElementById('review-note');
        const errorMsg = document.getElementById('action-error');

        if (btnApprove) {
            btnApprove.addEventListener('click', () => {
                const note = noteInput.value.trim();
                changeStatus(item.id, 'approved', note ? `Kèm ghi chú: "${note}"` : 'Đã duyệt yêu cầu.');
            });
        }

        if (btnRevise) {
            btnRevise.addEventListener('click', () => {
                const note = noteInput.value.trim();
                if (!note) {
                    errorMsg.classList.remove('hidden');
                    noteInput.focus();
                    return;
                }
                errorMsg.classList.add('hidden');
                changeStatus(item.id, 'revision', `Yêu cầu sửa: "${note}"`);
            });
        }
    };

    const changeStatus = (id, newStatus, logDetail) => {
        const item = data.find(d => d.id === id);
        if(item) {
            item.status = newStatus;
            addHistoryLog(`Đã cập nhật: ${item.name}`, logDetail);
            
            // Re-render table and detail
            renderTable();
            renderDetailPanel();
        }
    };

    const selectRequest = (id) => {
        selectedId = id;
        
        // Mobile view logic
        if (window.innerWidth < 768) {
            listView.classList.add('hidden');
            panel.classList.remove('hidden');
            panel.classList.add('flex');
        }

        renderTable();
        renderDetailPanel();
    };

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value;
        renderTable();
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('tab-active');
                b.classList.add('tab-inactive');
            });
            btn.classList.add('tab-active');
            btn.classList.remove('tab-inactive');
            currentFilter = btn.dataset.filter;
            
            // When filtering away from the selected item, deselect it
            const item = data.find(d => d.id === selectedId);
            if(item && currentFilter !== 'all' && item.status !== currentFilter) {
                selectedId = null;
                renderDetailPanel();
            }

            renderTable();
        });
    });

    clearFilterBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentQuery = '';
        document.querySelector('[data-filter="all"]').click();
    });

    backBtn.addEventListener('click', () => {
        panel.classList.add('hidden');
        panel.classList.remove('flex');
        listView.classList.remove('hidden');
    });

    resetBtn.addEventListener('click', () => {
        data = JSON.parse(JSON.stringify(initialData));
        selectedId = null;
        currentFilter = 'all';
        currentQuery = '';
        searchInput.value = '';
        
        filterButtons.forEach(b => {
            b.classList.remove('tab-active');
            b.classList.add('tab-inactive');
        });
        document.querySelector('[data-filter="all"]').classList.add('tab-active');
        document.querySelector('[data-filter="all"]').classList.remove('tab-inactive');

        // Restore list view on mobile
        panel.classList.add('hidden');
        panel.classList.remove('flex');
        listView.classList.remove('hidden');
        
        addHistoryLog('Đã đặt lại bản mẫu', 'Dữ liệu được khôi phục về trạng thái ban đầu.');
        
        renderTable();
        renderDetailPanel();
    });

    // Window resize handler for mobile responsiveness
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            listView.classList.remove('hidden');
            panel.classList.remove('hidden');
            panel.classList.add('flex');
        } else if (!selectedId) {
            panel.classList.add('hidden');
            panel.classList.remove('flex');
            listView.classList.remove('hidden');
        } else {
            listView.classList.add('hidden');
            panel.classList.remove('hidden');
            panel.classList.add('flex');
        }
    });

    // Initial render
    renderTable();
    renderDetailPanel();
});
