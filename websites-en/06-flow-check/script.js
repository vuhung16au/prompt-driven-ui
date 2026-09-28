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
            { text: "[OK] Ingested 3 data records.", delay: 800 },
            { text: "> validate_schema...", delay: 600 }
        ];

        let hasError = false;
        
        if (!isRerun) {
            steps.push({ text: "[ERR] Record 2: Field 'email' is missing (null).", delay: 800, error: true });
            steps.push({ text: "> HALT: Cannot generate report with schema errors.", delay: 400, warn: true });
            hasError = true;
        } else {
            steps.push({ text: "[OK] Schema valid for 3 records.", delay: 800 });
            steps.push({ text: "> generate_report...", delay: 600 });
            steps.push({ text: "[OK] Report successfully generated.", delay: 800 });
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
  DATA VALIDATION REPORT
=============================
Status: SUCCESS
Total Records: 3
Valid: 3
Errors: 0
Timestamp: ${new Date().toISOString()}
=============================
</pre>
        `;
    };

    btnRun.addEventListener('click', () => runSimulation(false));
    
    btnFix.addEventListener('click', () => {
        const email = emailFixInput.value.trim();
        if (email === '' || !email.includes('@')) {
            alert('Please enter a valid email format (e.g., jane@example.com).');
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
            btnCopy.innerText = '[ COPIED ]';
            setTimeout(() => btnCopy.innerText = originalText, 2000);
        } catch (err) {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            textArea.remove();
            
            const originalText = btnCopy.innerText;
            btnCopy.innerText = '[ COPIED ]';
            setTimeout(() => btnCopy.innerText = originalText, 2000);
        }
    });
});
