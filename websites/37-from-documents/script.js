const docData = {
  invoice: {
    title: "HÓA ĐƠN BÁN HÀNG",
    fields: [
      { id: "id", name: "Số phiếu", value: "INV-2023-0891", actual: "INV-2023-0891", status: "verified", rect: { top: 75, left: 32, width: 200, height: 28 } },
      { id: "date", name: "Ngày", value: "12/10/2023", actual: "12/10/2023", status: "verified", rect: { top: 105, left: 32, width: 200, height: 28 } },
      { id: "total", name: "Tổng tiền", value: "1.100.000", actual: "1.200.000", status: "warning", rect: { top: 215, left: 32, width: 250, height: 32 } }
    ]
  },
  delivery: {
    title: "PHIẾU GIAO HÀNG",
    fields: [
      { id: "id", name: "Số phiếu", value: "DLV-9921", actual: "DLV-9921", status: "verified", rect: { top: 75, left: 32, width: 200, height: 28 } },
      { id: "date", name: "Ngày", value: "15/10/2023", actual: "15/10/2023", status: "verified", rect: { top: 105, left: 32, width: 200, height: 28 } },
      { id: "total", name: "Trọng lượng", value: "15.0 kg", actual: "18.5 kg", status: "warning", rect: { top: 215, left: 32, width: 250, height: 32 } }
    ]
  },
  receipt: {
    title: "BIÊN NHẬN",
    fields: [
      { id: "id", name: "Số phiếu", value: "REC-441", actual: "REC-441", status: "verified", rect: { top: 75, left: 32, width: 200, height: 28 } },
      { id: "date", name: "Ngày", value: "20/10/2023", actual: "20/10/2023", status: "verified", rect: { top: 105, left: 32, width: 200, height: 28 } },
      { id: "total", name: "Tổng tiền", value: "500.000", actual: "600.000", status: "warning", rect: { top: 215, left: 32, width: 250, height: 32 } }
    ]
  }
};

let currentDoc = 'invoice';
let currentData = JSON.parse(JSON.stringify(docData));

function renderWorkspace() {
  document.querySelectorAll('.doc-selector button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.doc === currentDoc);
  });
  
  const doc = currentData[currentDoc];
  
  const mockDoc = document.querySelector('.mock-doc');
  mockDoc.innerHTML = `<div class="mock-highlight" id="mock-highlight"></div>
    <h2>${doc.title}</h2>
    <p>Số: <span class="doc-text">${doc.fields[0].actual}</span></p>
    <p>Ngày: <span class="doc-text">${doc.fields[1].actual}</span></p>
    <table class="mock-table">
      <tr><td>Sản phẩm A</td><td>1</td><td>500.000</td></tr>
      <tr><td>Sản phẩm B</td><td>2</td><td>${doc.title === 'PHIẾU GIAO HÀNG' ? '15.5 kg' : '700.000'}</td></tr>
    </table>
    <p class="mock-total">${doc.fields[2].name}: <span class="doc-text">${doc.fields[2].actual}</span></p>`;
    
  const dataTable = document.querySelector('.data-table');
  dataTable.innerHTML = `
    <div class="data-header">
      <div class="col-name">Trường</div>
      <div class="col-value">Giá trị trích xuất</div>
      <div class="col-status">Trạng thái</div>
      <div class="col-action"></div>
    </div>
  ` + doc.fields.map(f => `
    <div class="data-row" data-field="${f.id}" data-rect='${JSON.stringify(f.rect)}'>
      <div class="col-name">${f.name}</div>
      <div class="col-value">
        <span class="val-text">${f.value}</span>
        <div class="edit-form">
          <input type="text" class="input-val" value="${f.value}">
          <button class="btn-save">Lưu</button>
          <button class="btn-cancel">Hủy</button>
        </div>
      </div>
      <div class="col-status">
        <span class="badge ${f.status === 'verified' ? 'verified' : 'warning'}">
          ${f.status === 'verified' ? 'Đã xác nhận' : 'Cần kiểm'}
        </span>
      </div>
      <div class="col-action"><button class="btn-edit" aria-label="Sửa">Sửa</button></div>
    </div>
  `).join('');
  
  attachEvents();
  updateExport();
}

function attachEvents() {
  document.querySelectorAll('.data-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if(e.target.closest('button') || e.target.closest('input')) return;
      document.querySelectorAll('.data-row').forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');
      
      const rect = JSON.parse(row.dataset.rect);
      const hl = document.getElementById('mock-highlight');
      hl.style.top = rect.top + 'px';
      hl.style.left = rect.left + 'px';
      hl.style.width = rect.width + 'px';
      hl.style.height = rect.height + 'px';
      hl.classList.add('active');
    });
    
    const btnEdit = row.querySelector('.btn-edit');
    const btnCancel = row.querySelector('.btn-cancel');
    const btnSave = row.querySelector('.btn-save');
    const input = row.querySelector('.input-val');
    
    if (btnEdit) {
      btnEdit.addEventListener('click', (e) => {
        e.stopPropagation();
        row.classList.add('editing');
        input.focus();
      });
    }
    
    if (btnCancel) {
      btnCancel.addEventListener('click', (e) => {
        e.stopPropagation();
        row.classList.remove('editing');
        input.value = row.querySelector('.val-text').textContent;
      });
    }
    
    if (btnSave) {
      btnSave.addEventListener('click', (e) => {
        e.stopPropagation();
        const fieldId = row.dataset.field;
        const field = currentData[currentDoc].fields.find(f => f.id === fieldId);
        
        // Prevent validation of NaN for totals (simple check for empty)
        if(input.value.trim() === '') {
          alert('Giá trị không được để trống.');
          return;
        }

        field.value = input.value;
        if(field.value === field.actual) {
          field.status = 'verified';
        } else {
          field.status = 'warning';
        }
        renderWorkspace();
      });
    }
  });
}

function updateExport() {
  const doc = currentData[currentDoc];
  const exp = {
    documentId: doc.title,
    fields: {}
  };
  doc.fields.forEach(f => {
    exp.fields[f.id] = f.value;
  });
  document.getElementById('json-output').textContent = JSON.stringify(exp, null, 2);
}

document.querySelectorAll('.doc-selector button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentDoc = btn.dataset.doc;
    renderWorkspace();
  });
});

document.getElementById('btn-reset').addEventListener('click', () => {
  currentData = JSON.parse(JSON.stringify(docData));
  document.getElementById('mock-highlight').classList.remove('active');
  renderWorkspace();
});

document.getElementById('btn-copy').addEventListener('click', (e) => {
  const text = document.getElementById('json-output').textContent;
  if(navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = e.target;
      btn.textContent = 'Đã chép';
      setTimeout(() => btn.textContent = 'Copy', 2000);
    }).catch(() => {
      const btn = e.target;
      btn.textContent = 'Lỗi copy';
    });
  } else {
    // Fallback for non-HTTPS or non-supported clipboard
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      const btn = e.target;
      btn.textContent = 'Đã chép';
      setTimeout(() => btn.textContent = 'Copy', 2000);
    } catch (err) {
      const btn = e.target;
      btn.textContent = 'Lỗi copy';
    }
    document.body.removeChild(textArea);
  }
});

document.querySelectorAll('.mobile-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mobile-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById(btn.dataset.tab + '-panel').classList.add('active');
  });
});

document.querySelector('.primary-action')?.addEventListener('click', () => {
  document.querySelector('.workspace').scrollIntoView({ behavior: 'smooth' });
});

renderWorkspace();
