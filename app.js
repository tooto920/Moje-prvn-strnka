const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'AI Chatbot',
    features: {
      code_generation: true,
      research: true,
      code_review: true,
      content_filter: true
    }
  });
});

app.get('/chat', (req, res) => {
  res.render('chat', {
    title: 'Chat Interface'
  });
});

app.get('/api-docs', (req, res) => {
  res.render('docs', {
    title: 'API Documentation'
  });
});

app.listen(PORT, () => {
  console.log(`AI Chatbot Interface running on port ${PORT}`);
});

module.exports = app;