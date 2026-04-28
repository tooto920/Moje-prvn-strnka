// Main.js - Frontend utilities

function loadExample(type) {
    const examples = {
        code: 'Write a Python function that calculates the factorial of a number',
        research: 'Research the latest trends in artificial intelligence for 2026',
        review: 'Review this code: function add(a, b) { return a + b; }'
    };
    
    if (examples[type]) {
        window.location.href = '/chat';
        setTimeout(() => {
            document.getElementById('chat-input').value = examples[type];
            setMode(type);
        }, 500);
    }
}

function setMode(mode) {
    const indicator = document.getElementById('modeIndicator');
    const modes = {
        general: 'Mode: General Chat',
        code: 'Mode: Code Generation',
        research: 'Mode: Research',
        review: 'Mode: Code Review'
    };
    
    if (indicator) {
        indicator.textContent = modes[mode] || modes.general;
    }
}

// Auto-expand textarea
function autoExpand(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            autoExpand(this);
        });
        
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});

// Health check
fetch('/health')
    .then(res => res.json())
    .then(data => console.log('System Status:', data))
    .catch(err => console.error('Health check failed:', err));