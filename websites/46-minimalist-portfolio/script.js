function toggleFaq(id) {
            const content = document.getElementById('content-' + id);
            const icon = document.getElementById('icon-' + id);
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.add('rotate-45');
            } else {
                content.classList.add('hidden');
                icon.classList.remove('rotate-45');
            }
        }
