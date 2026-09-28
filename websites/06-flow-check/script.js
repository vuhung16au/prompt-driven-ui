document.addEventListener('DOMContentLoaded', () => {
    const btnRun = document.getElementById('btn-run');
    const btnReset = document.getElementById('btn-reset');
    const btnFix = document.getElementById('btn-fix');
    const btnCopy = document.getElementById('btn-copy');
    
    const logOutput = document.getElementById('log-output');
    const fixPanel = document.getElementById('fix-panel');
    const reportPane = document.getElementById('report-pane');
    const reportContent = document.getElementById('report-content');
    const emailFixInput = document.getElementById('email-fix');
    const datasetPre = document.getElementById('dataset');
    
    let isRunning = false;
    let stepTimer = null;
    
    const initialDatasetText = datasetPre.innerText;

    const runSimulation = (isRerun = false) => {
        if (isRunning) return;
        isRunning = true;
        
        btnRun.disabled = true;
        
        if (!isRerun) {
            logOutput.innerHTML = '';
            fixPanel.classList.add('hidden');
            reportPane.classList.add('hidden');
        } else {
            logOutput.innerHTML += '<p class="muted">---</p>';
        }

        const steps = [
            { text: "> init_ingest...", delay: 600 },
            { text: "[OK] Đã nhận 3 bản ghi dữ liệu.", delay: 800 },
            { text: "> validate_schema...", delay: 600 }
        ];

        let hasError = false;
        
        if (!isRerun) {
            steps.push({ text: "[ERR] Bản ghi 2: Trường 'email' bị thiếu (null).", delay: 800, error: true });
            steps.push({ text: "> HALT: Không thể tạo báo cáo khi có lỗi schema.", delay: 400, warn: true });
            hasError = true;
        } else {
            steps.push({ text: "[OK] Schema hợp lệ cho 3 bản ghi.", delay: 800 });
            steps.push({ text: "> generate_report...", delay: 600 });
            steps.push({ text: "[OK] Báo cáo tạo thành công.", delay: 800 });
            hasError = false;
        }

        let currentStep = 0;
        
        const processStep = () => {
            if (!isRunning) return; // if reset was clicked

            if (currentStep >= steps.length) {
                isRunning = false;
                btnReset.classList.remove('hidden');
                
                if (hasError) {
                    fixPanel.classList.remove('hidden');
                    emailFixInput.focus();
                } else {
                    showReport();
                }
                return;
            }

            const step = steps[currentStep];
            const p = document.createElement('p');
            p.innerText = step.text;
            
            if (step.error) p.className = 'error-text';
            else if (step.warn) p.className = 'warn-text';
            else if (step.text.startsWith('[OK]')) p.className = 'ok-text';
            
            logOutput.appendChild(p);
            logOutput.scrollTop = logOutput.scrollHeight;
            
            currentStep++;
            const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : step.delay;
            stepTimer = setTimeout(processStep, delay);
        };

        processStep();
    };

    const showReport = () => {
        reportPane.classList.remove('hidden');
        reportContent.innerHTML = `
<pre>
=============================
  BÁO CÁO KIỂM DỮ LIỆU
=============================
Trạng thái: THÀNH CÔNG
Tổng số bản ghi: 3
Hợp lệ: 3
Lỗi: 0
Thời gian: ${new Date().toISOString()}
=============================
</pre>
        `;
    };

    btnRun.addEventListener('click', () => runSimulation(false));
    
    btnFix.addEventListener('click', () => {
        const email = emailFixInput.value.trim();
        if (email === '' || !email.includes('@')) {
            alert('Vui lòng nhập định dạng email hợp lệ (vd: b@example.com).');
            return;
        }
        
        fixPanel.classList.add('hidden');
        datasetPre.innerText = datasetPre.innerText.replace('"email": null', `"email": "${email}"`);
        
        runSimulation(true);
    });

    btnReset.addEventListener('click', () => {
        if (isRunning || stepTimer) {
            clearTimeout(stepTimer);
            isRunning = false;
        }
        
        logOutput.innerHTML = '<p class="muted">Waiting for execution...</p>';
        fixPanel.classList.add('hidden');
        reportPane.classList.add('hidden');
        emailFixInput.value = '';
        datasetPre.innerText = initialDatasetText;
        
        btnRun.disabled = false;
        btnReset.classList.add('hidden');
    });

    btnCopy.addEventListener('click', async () => {
        const textToCopy = reportContent.innerText;
        try {
            await navigator.clipboard.writeText(textToCopy);
            const originalText = btnCopy.innerText;
            btnCopy.innerText = '[ ĐÃ SAO CHÉP ]';
            setTimeout(() => btnCopy.innerText = originalText, 2000);
        } catch (err) {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            textArea.remove();
            
            const originalText = btnCopy.innerText;
            btnCopy.innerText = '[ ĐÃ SAO CHÉP ]';
            setTimeout(() => btnCopy.innerText = originalText, 2000);
        }
    });
});
