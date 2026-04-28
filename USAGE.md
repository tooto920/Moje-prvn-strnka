# AI Chatbot - Usage Examples

## Starting the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### 1. Health Check
```bash
curl http://localhost:3000/health
```

### 2. Chat with AI
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Write a Python function to calculate factorial",
    "sessionId": "my-session-123"
  }'
```

### 3. Generate Code
```bash
curl -X POST http://localhost:3000/api/generate/code \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Create a REST API with Express.js for user management",
    "options": {
      "language": "javascript",
      "framework": "express",
      "complexity": "intermediate",
      "includeTests": true,
      "includeComments": true
    }
  }'
```

### 4. Review Code
```bash
curl -X POST http://localhost:3000/api/review/code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function add(a, b) { return a + b; }",
    "options": {
      "focus": ["best_practices", "performance", "security"],
      "language": "javascript"
    }
  }'
```

### 5. Fix Code
```bash
curl -X POST http://localhost:3000/api/fix/code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function divide(a, b) { return a / b; }",
    "error": "Division by zero error not handled"
  }'
```

### 6. Research
```bash
curl -X POST http://localhost:3000/api/research/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Latest trends in artificial intelligence 2026",
    "options": {
      "maxResults": 5
    }
  }'
```

### 7. Content Filter Analysis
```bash
curl -X POST http://localhost:3000/api/filter/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Sample text to analyze for profanity and sentiment"
  }'
```

### 8. Get Session Stats
```bash
curl http://localhost:3000/api/session/my-session-123/stats
```

## Web Interface

Open your browser and navigate to:
- Main page: http://localhost:3000
- Chat: http://localhost:3000/chat
- API Docs: http://localhost:3000/api-docs

## Features

### Code Generation
- Generate code in multiple languages
- Support for various frameworks
- Configurable complexity levels
- Option to include tests and comments

### Code Review
- Best practices analysis
- Performance optimization suggestions
- Security vulnerability detection
- Language-specific recommendations

### Code Fixing
- Automatic bug detection
- Fix suggestions with explanations
- Error handling improvements

### Research
- Web search capabilities
- News article search
- Webpage content extraction
- Research summaries

### Content Filtering
- Profanity detection
- Sentiment analysis
- Text analysis
- Confidence-based moderation

### Conversation Management
- Session-based chat history
- Context-aware responses
- Intent detection
- Multi-turn conversations