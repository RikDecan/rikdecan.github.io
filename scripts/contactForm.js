// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const messageDiv = document.getElementById('form-message');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        
        // Basic validation
        const email = formData.get('email');
        const name = formData.get('name');
        const message = formData.get('message');
        
        if (!email || !name || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Message length validation
        if (message.length < 10) {
            showMessage('Please enter a message with at least 10 characters.', 'error');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // Add timeout to the fetch request
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                form.reset();
            } else {
                console.error('Form submission error:', data);
                if (data.message && data.message.includes('spam')) {
                    showMessage('Message flagged as spam. Please try rewording your message or contact me directly via email.', 'error');
                } else {
                    showMessage('Sorry, there was an issue sending your message. Please try again or contact me directly via email.', 'error');
                }
            }
        } catch (error) {
            console.error('Network/Fetch error:', error);
            
            if (error.name === 'AbortError') {
                showMessage('Request timed out. Please check your connection and try again.', 'error');
            } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                // Fallback to standard form submission
                showMessage('Using fallback submission method...', 'info');
                setTimeout(() => {
                    form.submit();
                }, 1000);
            } else {
                showMessage('Network error. Please try again or contact me directly via email.', 'error');
            }
        } finally {
            setLoadingState(false);
        }
    });
    
    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }
    
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#26a641';
            messageDiv.style.color = '#ffffff';
        } else if (type === 'info') {
            messageDiv.style.backgroundColor = '#397c99';
            messageDiv.style.color = '#ffffff';
        } else {
            messageDiv.style.backgroundColor = '#fa5255';
            messageDiv.style.color = '#ffffff';
        }
        
        // Hide message after 5 seconds (except for fallback info messages)
        if (type !== 'info') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
    
    // Add real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            field.style.borderColor = '#fa5255';
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.style.borderColor = '#fa5255';
                return false;
            }
        }
        
        field.style.borderColor = '#26a641';
        return true;
    }
});