# 🤖 AI Chatbot System

A comprehensive AI-powered chatbot with advanced code generation, research capabilities, and intelligent content filtering, organized with frontend/backend separation.

## 📁 Project Structure

```
ai-chatbot/
├── backend/                 # Backend server and API
│   ├── filters/             # Content filtering modules
│   │   └── ContentFilter.js # Profanity, sentiment, text analysis
│   ├── generators/          # Code generation modules
│   │   └── CodeGenerator.js # Code generation, review, and fixing
│   ├── research/            # Research and search modules
│   │   └── ResearchAssistant.js # Web search and analysis
│   ├── engine/              # Chatbot engine
│   │   └── ChatbotEngine.js # Main chat processing logic
│   ├── routes/              # API routes
│   │   └── api.js           # REST API endpoints
│   ├── server.js            # Server configuration
│   └── index.js             # Backend entry point
├── frontend/                # Frontend web interface
│   ├── views/               # EJS templates
│   │   ├── index.ejs        # Home page
│   │   ├── chat.ejs         # Chat interface
│   │   └── docs.ejs         # API documentation
│   ├── public/              # Static assets
│   │   ├── css/style.css    # Styling
│   │   └── js/              # Client-side JavaScript
│   ├── app.js               # Frontend application
│   └── README.md            # Frontend documentation
├── .env                     # Environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone or download the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Edit .env file and add your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
PORT=3000
```

### Running the Application

#### Option 1: Full Stack (Backend + Frontend)
```bash
# Start everything
npm start

# The backend API runs on port 3000
# The frontend interface runs on port 3000
```

#### Option 2: Backend Only (API)
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

#### Option 3: Frontend Only
```bash
# Development mode
npm run dev:frontend

# Production mode
npm start:frontend
```

## 🎯 Features

### Backend API Features

#### Code Generation
- Generate code in 20+ programming languages
- Support for multiple frameworks
- Configurable complexity levels
- Option to include tests and comments
- Automatic documentation generation

#### Code Review
- Best practices analysis
- Performance optimization suggestions
- Security vulnerability detection
- Language-specific recommendations

#### Code Fixing
- Automatic bug detection
- Fix suggestions with explanations
- Error handling improvements

#### Research
- Web search capabilities (with SerpAPI)
- News article search
- Webpage content extraction
- Research summaries

#### Content Filtering
- Profanity detection
- Sentiment analysis (keyword-based)
- Keyword extraction
- Stopword removal
- Confidence-based moderation

### Frontend Features

- Modern, responsive design
- Real-time chat interface
- Mode selection (General/Code/Research/Review)
- Quick action buttons
- Syntax highlighting for code
- Session management
- Content filtering toggle

## 📡 API Endpoints

### Backend API (Port 3000)

#### Health Check
```bash
GET /health
```

#### Chat with AI
```bash
POST /api/chat
Content-Type: application/json

{
  "message": "Write a Python function to calculate factorial",
  "sessionId": "my-session-123",
  "options": {
    "enableCodeGeneration": true,
    "enableResearch": true
  }
}
```

#### Generate Code
```bash
POST /api/generate/code
Content-Type: application/json

{
  "description": "Create a REST API with Express.js",
  "options": {
    "language": "javascript",
    "framework": "express",
    "complexity": "intermediate",
    "includeTests": true,
    "includeComments": true
  }
}
```

#### Review Code
```bash
POST /api/review/code
Content-Type: application/json

{
  "code": "function add(a, b) { return a + b; }",
  "options": {
    "focus": ["best_practices", "performance", "security"],
    "language": "javascript"
  }
}
```

#### Fix Code
```bash
POST /api/fix/code
Content-Type: application/json

{
  "code": "function divide(a, b) { return a / b; }",
  "error": "Division by zero error not handled"
}
```

#### Research Search
```bash
POST /api/research/search
Content-Type: application/json

{
  "query": "Latest trends in artificial intelligence",
  "options": {
    "maxResults": 5
  }
}
```

#### Content Filter Analysis
```bash
POST /api/filter/analyze
Content-Type: application/json

{
  "text": "Sample text to analyze"
}
```

#### Get Session Stats
```bash
GET /api/session/:sessionId/stats
```

### Frontend Interface

- Home: `http://localhost:3000`
- Chat: `http://localhost:3000/chat`
- API Docs: `http://localhost:3000/api-docs`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | (required) |
| `OPENAI_MODEL` | OpenAI model to use | gpt-4 |
| `PORT` | Server port | 3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |
| `MIN_CONFIDENCE_THRESHOLD` | Content filter threshold | 0.7 |

### Optional Services

- **SerpAPI**: Enhanced web search (add `SERPAPI_KEY` to .env)
- **NewsAPI**: News search (add `NEWSCATCHER_API_KEY` to .env)
- **Supabase**: Database storage (add `SUPABASE_URL` and `SUPABASE_ANON_KEY`)

## 🎨 Usage Examples

### Example 1: Generate Code
```
User: Write a Python function to sort an array using bubble sort

AI: Here's the code you requested:

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
```

### Example 2: Research
```
User: Research quantum computing applications

AI: Here are the research results:

1. Quantum Cryptography
   Quantum key distribution provides theoretically unbreakable encryption...

2. Drug Discovery
   Quantum computers can simulate molecular interactions...
```

### Example 3: Code Review
```
User: Review this code: function add(a, b) { return a + b; }

AI: Code Review:

1. Overall Assessment
   The code is functional and concise.

2. Specific Improvements
   - Add input validation
   - Add JSDoc comments
   - Consider TypeScript for type safety
```

## 🛡️ Security

- **Rate Limiting**: Prevents API abuse with configurable limits
- **CORS**: Configured for cross-origin requests
- **Helmet**: Sets secure HTTP headers
- **Input Validation**: All inputs are validated
- **Content Filtering**: Profanity and inappropriate content detection
- **Session Management**: Isolated conversation histories

## 📚 Documentation

- **Frontend README**: See `frontend/README.md`
- **USAGE.md**: Detailed usage examples
- **API Docs**: Available at `/api-docs` when running

## 🔄 Development

### Backend Development
```bash
cd backend
npm run dev  # Auto-reload on changes
```

### Frontend Development
```bash
cd frontend
npm run dev  # Auto-reload on changes
```

## 📝 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🆘 Support

For issues, questions, or contributions, please open an issue on GitHub.