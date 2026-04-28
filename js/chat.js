// Chat.js - Frontend chat functionality

let currentSessionId = 'session_' + Date.now();
let isProcessing = false;

function appendMessage(role, content, type = 'text') {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    let formattedContent = content;
    
    if (type === 'code' || (role === 'assistant' && content.includes('```'))) {
        // Format code blocks
        formattedContent = content.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    }
    
    messageDiv.innerHTML = `
        <div class="message-content">
            ${formattedContent}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendSystemMessage(content) {
    appendMessage('system', content);
}

function appendUserMessage(content) {
    appendMessage('user', content);
}

function appendAssistantMessage(content) {
    appendMessage('assistant', content);
}

async function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    
    if (!chatInput || !sendBtn) return;
    
    const message = chatInput.value.trim();
    
    if (!message || isProcessing) return;
    
    // Add user message
    appendUserMessage(message);
    chatInput.value = '';
    autoExpand(chatInput);
    isProcessing = true;
    
    // Disable input while processing
    chatInput.disabled = true;
    sendBtn.disabled = true;
    sendBtn.textContent = 'Processing...';
    
    // Show typing indicator
    appendSystemMessage('🤖 Thinking...');
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                sessionId: currentSessionId,
                options: {
                    enableCodeGeneration: true,
                    enableResearch: true
                }
            })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        const messages = document.getElementById('chat-messages');
        if (messages) {
            const lastMsg = messages.lastElementChild;
            if (lastMsg && lastMsg.querySelector('.message-content')?.textContent === '🤖 Thinking...') {
                lastMsg.remove();
            }
        }
        
        if (data.success === false) {
            appendSystemMessage('⚠️ Message blocked by content filter');
        } else if (data.type === 'code_generation') {
            appendAssistantMessage(`Here's the code you requested:\n\n${data.content}`);
        } else if (data.type === 'research') {
            let researchText = 'Here are the research results:\n\n';
            if (Array.isArray(data.content)) {
                data.content.forEach((item, i) => {
                    researchText += `${i + 1}. ${item.title}\n   ${item.snippet || item.content}\n\n`;
                });
            }
            appendAssistantMessage(researchText);
        } else if (data.type === 'code_review') {
            appendAssistantMessage(`Code Review:\n\n${data.content}`);
        } else {
            appendAssistantMessage(data.text || data.content || 'I apologize, but I could not process your request.');
        }
        
        // Show session stats
        updateSessionStats();
        
    } catch (error) {
        // Remove typing indicator
        const messages = document.getElementById('chat-messages');
        if (messages) {
            const lastMsg = messages.lastElementChild;
            if (lastMsg && lastMsg.querySelector('.message-content')?.textContent === '🤖 Thinking...') {
                lastMsg.remove();
            }
        }
        
        appendSystemMessage('❌ Error: Could not connect to AI service');
        console.error('Chat error:', error);
    } finally {
        isProcessing = false;
        chatInput.disabled = false;
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send';
        chatInput.focus();
    }
}

function updateSessionStats() {
    fetch(`/api/session/${currentSessionId}/stats`)
        .then(res => res.json())
        .then(data => {
            console.log('Session Stats:', data);
        })
        .catch(err => console.error('Failed to get session stats:', err));
}

function newChat() {
    currentSessionId = 'session_' + Date.now();
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = `
            <div class="message system">
                <div class="message-content">
                    <p>New chat session started!</p>
                </div>
            </div>
        `;
    }
}

function exportChat() {
    fetch(`/api/session/${currentSessionId}/stats`)
        .then(res => res.json())
        .then(data => {
            const chatHistory = JSON.stringify(data, null, 2);
            const blob = new Blob([chatHistory], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `chat-session-${currentSessionId}.json`;
            a.click();
            URL.revokeObjectURL(url);
        })
        .catch(err => console.error('Export failed:', err));
}

// Initialize
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sendMessage, updateSessionStats, newChat, exportChat };
}