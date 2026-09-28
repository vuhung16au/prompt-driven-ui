function submitForm() {
    const email = document.getElementById('contactEmail').value;
    const errorMsg = document.getElementById('emailError');
    const successMsg = document.getElementById('formSuccess');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
        errorMsg.classList.remove('hidden');
        successMsg.classList.add('hidden');
        document.getElementById('contactEmail').classList.add('border-red-400');
    } else {
        errorMsg.classList.add('hidden');
        document.getElementById('contactEmail').classList.remove('border-red-400');
        successMsg.classList.remove('hidden');
        // Clear fields for visual feedback
        setTimeout(() => {
            document.getElementById('briefForm').reset();
            successMsg.classList.add('hidden');
        }, 3000);
    }
}
