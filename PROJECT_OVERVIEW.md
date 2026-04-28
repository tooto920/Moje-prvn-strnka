# AI Chatbot System - Frontend/Backend Architecture

## 🚀 Project Successfully Restructured!

The AI Chatbot has been reorganized into a clean frontend/backend architecture.

### 📂 New Structure

```
ai-chatbot/
├── backend/                  # Backend API Server
│   ├── engine/              # Chatbot core engine
│   │   └── ChatbotEngine.js # Intent detection, session management
│   ├── filters/             # Content filtering
│   │   └── ContentFilter.js # Profanity, sentiment, text analysis
│   ├── generators/          # Code generation
│   │   └── CodeGenerator.js # Code gen, review, fixing, explanation
│   ├── research/            # Research capabilities
│   │   └── ResearchAssistant.js # Web search, extraction, summaries
│   ├── routes/              # API endpoints
│   │   └── api.js           # REST API routes
│   ├── server.js            # Express server configuration
│   └── index.js             # Backend entry point
├── frontend/                 # Frontend Web Interface
│   ├── views/               # EJS templates
│   │   ├── index.ejs        # Home page
│   │   ├── chat.ejs         # Chat interface
│   │   └── docs.ejs         # API documentation
│   ├── public/              # Static assets
│   │   ├── css/style.css    # Modern styling
│   │   └── js/              # Client-side JavaScript
│   │       ├── main.js      # Frontend utilities
│   │       └── chat.js      # Chat interface logic
│   └── app.js               # Frontend Express app
├── .env                     # Environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies & scripts
├── README.md               # Main documentation
└── USAGE.md                # Usage examples
```

## 🎯 Features Overview

### Backend Capabilities

#### 1. Intelligent Chat Engine
- **Intent Detection**: Automatically identifies code, research, and general chat requests
- **Session Management**: Tracks conversation history per session
- **Context-Aware**: Maintains context across multi-turn conversations
- **OpenAI Integration**: Powered by GPT-4

#### 2. Code Generation & Analysis
- **Generate**: Create code in 20+ languages (Python, JavaScript, Java, C++, etc.)
- **Review**: Analyze code for best practices, performance, security
- **Fix**: Automatically fix bugs and suggest improvements
- **Explain**: Break down complex code for different skill levels
- **Refactor**: Improve code for readability and performance

#### 3. Research Assistant
- **Web Search**: Find information on any topic
- **News Search**: Get latest articles (requires NewsAPI key)
- **Content Extraction**: Extract and summarize webpage content
- **API Support**: SerpAPI integration for enhanced search

#### 4. Content Filtering
- **Profanity Detection**: Automatic inappropriate content detection
- **Sentiment Analysis**: Identify positive/negative sentiment
- **Keyword Extraction**: Remove stopwords and extract key terms
- **Confidence Scoring**: Block low-confidence messages

### Frontend Interface

- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Real-Time Chat**: Smooth messaging experience
- **Mode Selection**: Switch between General/Chat/Research/Review modes
- **Syntax Highlighting**: Beautiful code formatting
- **Quick Actions**: Pre-built prompts for common tasks
- **Session Stats**: Track conversation metrics

## 🚀 Running the Application

### Start Full Stack
```bash
npm start
```
Both backend API and frontend interface start on port 3000

### Start Backend Only (API)
```bash
npm run dev  # Development with auto-reload
npm start    # Production mode
```

### Start Frontend Only
```bash
npm run dev:frontend  # Development
npm start:frontend    # Production
```

## 📡 API Endpoints

All API endpoints are available at `http://localhost:3000/api/*`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/chat` | General chat with AI |
| POST | `/api/generate/code` | Generate code |
| POST | `/api/review/code` | Review existing code |
| POST | `/api/fix/code` | Fix buggy code |
| POST | `/api/research/search` | Search for information |
| POST | `/api/filter/analyze` | Analyze content |

### Example: Generate Code
```bash
curl -X POST http://localhost:3000/api/generate/code \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Create a Python function to calculate factorial",
    "options": {
      "language": "python",
      "includeTests": true,
      "includeComments": true
    }
  }'
```

### Example: Chat with AI
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the capital of France?",
    "sessionId": "my-session-123"
  }'
```

## 🔧 Configuration

### Environment Variables (.env)

```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
PORT=3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MIN_CONFIDENCE_THRESHOLD=0.7
```

### Optional API Keys

- `SERPAPI_KEY` - Enhanced Google search
- `NEWSCATCHER_API_KEY` - News article search
- `SUPABASE_URL` - Database storage
- `SUPABASE_ANON_KEY` - Database authentication

## 🎨 Frontend Interface

### Pages

1. **Home (`/`)** - Overview with feature cards
2. **Chat (`/chat`)** - Interactive chat interface
3. **API Docs (`/api-docs`)** - API documentation

### Features

- **4 Chat Modes**: General, Code Generation, Research, Code Review
- **Content Filter Toggle**: Enable/disable moderation
- **Quick Prompts**: Pre-built examples
- **Responsive Design**: Works on mobile and desktop
- **Syntax Highlighting**: Beautiful code display

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured cross-origin access
- **Helmet.js**: Secure HTTP headers
- **Input Validation**: All user inputs sanitized
- **Content Filtering**: Profanity and inappropriate content blocked
- **Session Isolation**: Each session has separate history

## 📚 Documentation

- **README.md**: Main project documentation (this file)
- **USAGE.md**: Detailed usage examples
- **frontend/README.md**: Frontend-specific documentation
- **API Docs**: Available at `/api-docs` when running

## 🔄 Development Workflow

### Backend Development
```bash
cd backend
# Edit files in backend/ folder
# Changes auto-reload with nodemon
```

### Frontend Development
```bash
cd frontend
# Edit files in frontend/ folder
# Changes auto-reload with nodemon
```

### Adding New Features

1. **New API Endpoint**: Add to `backend/routes/api.js`
2. **New Filter**: Add to `backend/filters/ContentFilter.js`
3. **New Generator**: Add to `backend/generators/CodeGenerator.js`
4. **New Page**: Add to `frontend/views/`
5. **New Styles**: Add to `frontend/public/css/style.css`

## 🚀 Quick Start Examples

### Example 1: Generate Python Code
```
User: Write a function to sort an array

AI: Here's a Python bubble sort implementation:

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
```

### Example 2: Research Query
```
User: Research AI trends 2026

AI: Found 5 recent articles about AI trends:

1. Generative AI Revolution
   New breakthroughs in text-to-image generation...

2. AI in Healthcare
   Machine learning improves diagnostic accuracy...
```

### Example 3: Code Review
```
User: Review this JavaScript code

AI: Code Review:

✓ Good: Clean, readable syntax
⚠️ Improve: Add input validation
⚠️ Improve: Consider error handling
📝 Suggest: Add JSDoc comments
```

## 🎯 Use Cases

- **Developers**: Generate boilerplate code, review existing code, fix bugs
- **Students**: Learn programming concepts with AI explanations
- **Researchers**: Quickly gather and summarize information
- **Writers**: Get content suggestions and improvements
- **Businesses**: Automate code generation and documentation

## 📊 Performance

- **Response Time**: < 5 seconds for most requests
- **Concurrent Users**: Supports multiple simultaneous sessions
- **Rate Limits**: 100 requests per 15-minute window
- **Session History**: Stores up to 20 messages per session

## 🤝 Support

For issues, questions, or contributions:
1. Check USAGE.md for common questions
2. Review API docs at `/api-docs`
3. Open an issue on GitHub

## 🔄 Version History

- **v1.0.0** - Initial release with frontend/backend separation
  - Code generation support
  - Research capabilities
  - Content filtering
  - Web interface
  - RESTful API

---

**Built with ❤️ using Node.js, Express, and OpenAI GPT-4**