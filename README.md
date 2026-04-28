# Frontend Documentation

## 🎨 Frontend Overview

The frontend is a modern web interface for the AI Chatbot system, built with Express.js, EJS templates, and vanilla JavaScript.

## 📁 Structure

```
frontend/
├── views/               # EJS templates
│   ├── index.ejs        # Home/Landing page
│   ├── chat.ejs         # Main chat interface
│   └── docs.ejs         # API documentation
├── public/              # Static assets
│   ├── css/style.css    # All styling
│   └── js/              # Client-side JavaScript
│       ├── main.js      # General utilities
│       └── chat.js      # Chat interface logic
└── app.js               # Frontend Express application
```

## 🚀 Running the Frontend

### Start Standalone
```bash
npm run start:frontend
# or
node frontend/app.js
```

### Start with Auto-Reload (Development)
```bash
npm run dev:frontend
```

The frontend will run on `http://localhost:3000`

## 🌐 Pages

### 1. Home Page (`/`)

Features:
- Project overview
- Feature cards highlighting capabilities
- Quick start section
- Example prompts

### 2. Chat Interface (`/chat`)

Features:
- Real-time chat with AI
- 4 chat modes: General, Code, Research, Review
- Content filter toggle
- Syntax highlighting for code
- Session management
- Quick action buttons

### 3. API Documentation (`/api-docs`)

Features:
- Complete API reference
- Request/response examples
- Endpoint documentation

## 🎨 User Interface

### Chat Interface Features

#### Chat Modes
1. **General Chat** 💬 - Conversational AI
2. **Code Generation** 💻 - Generate code snippets
3. **Research** 🔍 - Search and analyze information
4. **Code Review** 🔧 - Review and improve code

#### Controls
- **Mode Indicator**: Shows current chat mode
- **Filter Toggle**: Enable/disable content filtering
- **Input Area**: Type messages (Enter to send, Shift+Enter for newline)
- **Quick Actions**: Predefined prompts

### Responsive Design

- Mobile-friendly layout
- Adapts to different screen sizes
- Touch-friendly controls

## 🎯 Interactive Features

### Auto-Expanding Textarea
The chat input automatically grows as you type, showing all your text.

### Syntax Highlighting
Code snippets are automatically formatted with syntax highlighting.

### Quick Prompts
Click buttons to load example prompts:
- Generate Python function
- Research AI trends
- Review JavaScript code

### Session Management
Each chat has its own session ID, maintaining context across messages.

## 🎨 Styling

### Design Principles
- Modern gradient backgrounds
- Clean card-based layout
- Responsive typography
- Smooth animations and transitions
- Accessible color contrast

### CSS Features
- Flexbox and Grid layouts
- CSS variables for theming
- Media queries for responsiveness
- CSS animations
- Box shadows and rounded corners

## 🔧 Client-Side JavaScript

### main.js
- Auto-expanding textarea
- Example prompt loader
- Health check integration

### chat.js
- Message sending/receiving
- Session management
- Mode switching
- Content filtering
- History tracking
- Export functionality

## 📡 API Integration

The frontend communicates with the backend via REST API:

```javascript
// Send message
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Your message',
    sessionId: 'session-123'
  })
})
```

## 🎯 Customization

### Adding New Pages

1. Create EJS template in `views/`
2. Add route in `app.js`
3. Update navigation if needed

### Modifying Styles

Edit `public/css/style.css`:
- Colors: Update CSS variables
- Layout: Modify flexbox/grid rules
- Typography: Update font sizes
- Components: Style individual elements

### Adding Features

1. Add UI to EJS template
2. Implement logic in JavaScript
3. Connect to backend API
4. Add styles

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔐 Security

- All inputs sanitized
- CORS configured
- CSRF protection ready
- XSS prevention
- Content Security Policy compatible

## 🚀 Performance

- Minimal JavaScript bundle
- Efficient DOM updates
- Lazy loading ready
- Optimized CSS
- Fast page loads

## 📚 Integration with Backend

The frontend expects the backend to be running on the same origin (localhost:3000 by default).

### Required Backend Endpoints

- `GET /health` - Health check
- `POST /api/chat` - Chat messages
- `POST /api/generate/code` - Code generation
- `POST /api/review/code` - Code review
- `POST /api/fix/code` - Code fixes
- `POST /api/research/search` - Search
- `POST /api/filter/analyze` - Content analysis

## 🎨 Theming

Easily customize the look by editing CSS variables in `style.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📝 Development Tips

### Adding New Features

1. Start with mock data
2. Implement UI
3. Connect to backend
4. Add error handling
5. Test thoroughly

### Debugging

- Use browser DevTools
- Check console for errors
- Inspect network requests
- Monitor API responses

### Testing

- Test on multiple browsers
- Check mobile responsiveness
- Verify API connectivity
- Validate user inputs

## 🚀 Deployment

### Static Hosting

The frontend can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static host

### With Backend

Deploy both frontend and backend together:
1. Deploy backend to server/container
2. Update frontend API URLs
3. Deploy frontend
4. Configure environment variables

## 📈 Future Enhancements

- Dark mode toggle
- User authentication
- Chat history persistence
- File uploads
- Image generation
- Voice input
- Multi-language support
- Real-time collaboration

## 🤝 Contributing

When contributing to the frontend:
1. Follow existing code style
2. Test changes thoroughly
3. Update documentation
4. Ensure responsiveness
5. Maintain accessibility

## 📞 Support

For frontend-specific issues, check:
- Browser console for errors
- Network tab for API issues
- Documentation in `/api-docs`
- USAGE.md for examples