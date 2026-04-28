// Initialize application
const server = require('./server');
const apiRoutes = require('./routes/api');
const app = require('../frontend/app');

// Mount API routes
server.use('/api', apiRoutes);

console.log('AI Chatbot System Initialized Successfully!');
console.log('Available endpoints:');
console.log('  GET  /health          - Health check');
console.log('  POST /api/chat        - Chat with AI');
console.log('  POST /api/generate/code - Generate code');
console.log('  POST /api/review/code - Review code');
console.log('  POST /api/fix/code    - Fix code');
console.log('  POST /api/research/search - Research topics');
console.log('  POST /api/filter/analyze - Analyze content');

module.exports = { server, app };
