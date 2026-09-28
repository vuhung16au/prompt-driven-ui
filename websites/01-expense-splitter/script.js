const initialMembers = [
    { id: '1', name: 'An' },
    { id: '2', name: 'Bình' },
    { id: '3', name: 'Chi' }
];

let members = [...initialMembers];
let expenses = [
    { id: 'e1', name: 'Tiền taxi', amount: 150000, payerId: '1' },
    { id: 'e2', name: 'Ăn tối', amount: 450000, payerId: '2' }
];

const colors = [
    ['#93C5FD', '#3B82F6'],
    ['#F9A8D4', '#EC4899'],
    ['#A78BFA', '#8B5CF6'],
    ['#6EE7B7', '#10B981'],
    ['#FCD34D', '#F59E0B'],
    ['#99F6E4', '#14B8A6']
];

function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + ' đ';
}

function getAvatarColor(index) {
    return colors[index % colors.length];
}

function getInitial(name) {
    return name.charAt(0).toUpperCase();
}

function renderMembers() {
    const list = document.getElementById('members-list');
    list.innerHTML = '';
    
    members.forEach((member, index) => {
        const [color1, color2] = getAvatarColor(index);
        const el = document.createElement('div');
        el.className = 'member-avatar shadow-clay-pressed';
        el.innerHTML = `
            <div class="avatar-circle shadow-clay-orb" style="background: linear-gradient(135deg, ${color1}, ${color2})">
                ${getInitial(member.name)}
            </div>
            <span class="member-name">${member.name}</span>
            <button class="member-remove" onclick="removeMember('${member.id}')" aria-label="Xoá thành viên">&times;</button>
        `;
        list.appendChild(el);
    });

    updatePayerSelect();
    calculateSplit();
}

function renderExpenses() {
    const list = document.getElementById('expenses-list');
    list.innerHTML = '';

    expenses.forEach((expense) => {
        const payer = members.find(m => m.id === expense.payerId);
        const payerName = payer ? payer.name : 'Không rõ';

        const el = document.createElement('div');
        el.className = 'expense-item shadow-clay-pressed';
        el.innerHTML = `
            <div class="expense-details">
                <div class="expense-title">${expense.name}</div>
                <div class="expense-meta">${payerName} đã trả</div>
            </div>
            <div class="expense-amount">${formatCurrency(expense.amount)}</div>
            <button class="clay-btn btn-outline btn-small" onclick="removeExpense('${expense.id}')">Xoá</button>
        `;
        list.appendChild(el);
    });

    calculateSplit();
}

function updatePayerSelect() {
    const select = document.getElementById('expense-payer');
    const currentVal = select.value;
    select.innerHTML = '<option value="" disabled selected>Người trả...</option>';
    
    members.forEach(member => {
        const opt = document.createElement('option');
        opt.value = member.id;
        opt.textContent = member.name;
        select.appendChild(opt);
    });

    if (members.find(m => m.id === currentVal)) {
        select.value = currentVal;
    } else if (members.length > 0) {
        select.value = members[0].id;
    }
}

function calculateSplit() {
    if (members.length === 0) {
        document.getElementById('total-amount').textContent = '0 đ';
        document.getElementById('results-list').innerHTML = '';
        return;
    }

    let total = 0;
    const balances = {};
    
    members.forEach(m => {
        balances[m.id] = { name: m.name, paid: 0, share: 0 };
    });

    expenses.forEach(e => {
        total += e.amount;
        if (balances[e.payerId]) {
            balances[e.payerId].paid += e.amount;
        }
    });

    document.getElementById('total-amount').textContent = formatCurrency(total);

    const baseShare = Math.floor(total / members.length);
    let remainder = total % members.length;

    // Distribute remainder 1 by 1
    members.forEach(m => {
        balances[m.id].share = baseShare;
        if (remainder > 0) {
            balances[m.id].share += 1;
            remainder -= 1;
        }
    });

    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    members.forEach((m, index) => {
        const bal = balances[m.id];
        const diff = bal.paid - bal.share;
        
        const [color1, color2] = getAvatarColor(index);
        
        let actionHtml = '';
        if (diff > 0) {
            actionHtml = `<div class="result-action action-receive shadow-clay-pressed">Nhận lại: ${formatCurrency(diff)}</div>`;
        } else if (diff < 0) {
            actionHtml = `<div class="result-action action-pay shadow-clay-pressed">Cần góp: ${formatCurrency(Math.abs(diff))}</div>`;
        } else {
            actionHtml = `<div class="result-action shadow-clay-pressed" style="background:#f3f4f6">Đã hoà</div>`;
        }

        const el = document.createElement('div');
        el.className = 'result-card shadow-clay-card';
        el.innerHTML = `
            <div class="avatar-circle result-avatar shadow-clay-orb" style="background: linear-gradient(135deg, ${color1}, ${color2})">
                ${getInitial(m.name)}
            </div>
            <div class="result-name">${m.name}</div>
            <div class="result-share">Phần phải chịu: ${formatCurrency(bal.share)}</div>
            ${actionHtml}
        `;
        resultsList.appendChild(el);
    });
}

// Handlers
document.getElementById('btn-add-member').addEventListener('click', () => {
    const input = document.getElementById('new-member-name');
    const name = input.value.trim();
    const errorEl = document.getElementById('member-error');
    
    if (!name) {
        errorEl.textContent = 'Vui lòng nhập tên thành viên.';
        return;
    }
    if (members.length >= 6) {
        errorEl.textContent = 'Chỉ hỗ trợ tối đa 6 thành viên.';
        return;
    }
    if (members.some(m => m.name.toLowerCase() === name.toLowerCase())) {
        errorEl.textContent = 'Tên thành viên đã tồn tại.';
        return;
    }
    
    errorEl.textContent = '';
    const newId = Date.now().toString();
    members.push({ id: newId, name });
    input.value = '';
    renderMembers();
});

function removeMember(id) {
    if (members.length <= 2) {
        document.getElementById('member-error').textContent = 'Cần ít nhất 2 thành viên.';
        return;
    }
    if (expenses.some(e => e.payerId === id)) {
        document.getElementById('member-error').textContent = 'Người này đang có khoản chi, vui lòng xoá khoản chi trước.';
        return;
    }
    document.getElementById('member-error').textContent = '';
    members = members.filter(m => m.id !== id);
    renderMembers();
}

document.getElementById('expense-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value.trim();
    const amount = parseInt(document.getElementById('expense-amount').value, 10);
    const payerId = document.getElementById('expense-payer').value;

    if (!name || isNaN(amount) || amount <= 0 || !payerId) return;

    expenses.push({
        id: 'e' + Date.now(),
        name,
        amount,
        payerId
    });

    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    renderExpenses();
});

function removeExpense(id) {
    expenses = expenses.filter(e => e.id !== id);
    renderExpenses();
}

document.getElementById('btn-reset').addEventListener('click', () => {
    if(confirm('Bạn có chắc muốn làm mới toàn bộ dữ liệu?')) {
        members = [...initialMembers];
        expenses = [];
        renderMembers();
        renderExpenses();
    }
});

document.getElementById('btn-copy-summary').addEventListener('click', () => {
    if (expenses.length === 0) {
        alert('Chưa có khoản chi nào để sao chép.');
        return;
    }
    
    let text = 'TÓM TẮT CHI PHÍ\n\n';
    let total = 0;
    expenses.forEach(e => {
        const payer = members.find(m => m.id === e.payerId)?.name || 'Ai đó';
        text += `- ${e.name}: ${formatCurrency(e.amount)} (${payer} trả)\n`;
        total += e.amount;
    });
    
    text += `\nTỔNG CỘNG: ${formatCurrency(total)}\n\n`;
    text += 'KẾT QUẢ CHIA:\n';
    
    const baseShare = Math.floor(total / members.length);
    let remainder = total % members.length;
    const balances = {};
    members.forEach(m => balances[m.id] = { name: m.name, paid: 0, share: baseShare });
    members.forEach(m => {
        if (remainder > 0) { balances[m.id].share++; remainder--; }
    });
    expenses.forEach(e => {
        if(balances[e.payerId]) balances[e.payerId].paid += e.amount;
    });
    
    members.forEach(m => {
        const bal = balances[m.id];
        const diff = bal.paid - bal.share;
        if (diff > 0) {
            text += `${m.name} nhận lại: ${formatCurrency(diff)}\n`;
        } else if (diff < 0) {
            text += `${m.name} cần góp: ${formatCurrency(Math.abs(diff))}\n`;
        } else {
            text += `${m.name} đã hoà\n`;
        }
    });

    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btn-copy-summary');
        const oldText = btn.textContent;
        btn.textContent = 'Đã sao chép!';
        setTimeout(() => btn.textContent = oldText, 2000);
    });
});

// Init
renderMembers();
renderExpenses();
