const express = require('express');
const router = express.Router();
const ChatbotEngine = require('../engine/ChatbotEngine');
const ContentFilter = require('../filters/ContentFilter');

const chatbot = new ChatbotEngine();
const contentFilter = new ContentFilter();

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    features: {
      code_generation: true,
      research: true,
      code_review: true,
      content_filter: true
    }
  });
});

/**
 * Chat endpoint
 */
router.post('/chat', async (req, res) => {
  const {
    message,
    sessionId = 'default',
    options = {}
  } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Message is required and must be a string'
    });
  }

  try {
    const response = await chatbot.processMessage(sessionId, message, options);
    
    if (response.success === false) {
      return res.status(403).json(response);
    }

    res.json(response);
  } catch (error) {
    console.error('Chat processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

/**
 * Code generation endpoint
 */
router.post('/generate/code', async (req, res) => {
  const { description, options = {} } = req.body;

  if (!description) {
    return res.status(400).json({
      success: false,
      error: 'Description is required'
    });
  }

  try {
    const { CodeGenerator } = require('../generators/CodeGenerator');
    const generator = new CodeGenerator();
    const result = await generator.generateCode(description, options);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Code review endpoint
 */
router.post('/review/code', async (req, res) => {
  const { code, options = {} } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      error: 'Code is required'
    });
  }

  try {
    const { CodeGenerator } = require('../generators/CodeGenerator');
    const generator = new CodeGenerator();
    const result = await generator.reviewCode(code, options);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Code fix endpoint
 */
router.post('/fix/code', async (req, res) => {
  const { code, error, options = {} } = req.body;

  if (!code || !error) {
    return res.status(400).json({
      success: false,
      error: 'Code and error description are required'
    });
  }

  try {
    const { CodeGenerator } = require('../generators/CodeGenerator');
    const generator = new CodeGenerator();
    const result = await generator.fixCode(code, error);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Research/search endpoint
 */
router.post('/research/search', async (req, res) => {
  const { query, options = {} } = req.body;

  if (!query) {
    return res.status(400).json({
      success: false,
      error: 'Query is required'
    });
  }

  try {
    const { ResearchAssistant } = require('../research/ResearchAssistant');
    const assistant = new ResearchAssistant();
    const result = await assistant.searchWeb(query, options);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Content filter endpoint
 */
router.post('/filter/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      error: 'Text is required'
    });
  }

  try {
    const result = contentFilter.comprehensiveAnalysis(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Session stats endpoint
 */
router.get('/session/:sessionId/stats', (req, res) => {
  const stats = chatbot.getSessionStats(req.params.sessionId);
  
  if (!stats) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }

  res.json(stats);
});

module.exports = router;