const CodeGenerator = require('../generators/CodeGenerator');
const ResearchAssistant = require('../research/ResearchAssistant');
const ContentFilter = require('../filters/ContentFilter');

class ChatbotEngine {
  constructor() {
    this.codeGenerator = new CodeGenerator();
    this.researchAssistant = new ResearchAssistant();
    this.contentFilter = new ContentFilter();
    this.conversationHistory = new Map();
    this.maxHistoryLength = 20;
  }

  /**
   * Initialize chat session
   * @param {string} sessionId - Unique session identifier
   * @returns {object} Session initialization result
   */
  initializeSession(sessionId) {
    this.conversationHistory.set(sessionId, {
      messages: [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      messageCount: 0
    });

    return {
      sessionId,
      status: 'initialized',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Process chat message
   * @param {string} sessionId - Session identifier
   * @param {string} message - User message
   * @param {object} options - Processing options
   * @returns {Promise<object>} Chat response
   */
  async processMessage(sessionId, message, options = {}) {
    const {
      enableResearch = false,
      enableCodeGeneration = false,
      stream = false
    } = options;

    // Initialize session if not exists
    if (!this.conversationHistory.has(sessionId)) {
      this.initializeSession(sessionId);
    }

    const session = this.conversationHistory.get(sessionId);
    
    // Apply content filtering
    const moderation = this.contentFilter.shouldModerate(message);
    
    if (moderation.shouldBlock) {
      return {
        success: false,
        error: 'Message blocked by content filter',
        confidence: moderation.confidence,
        issues: moderation.issues,
        timestamp: new Date().toISOString()
      };
    }

    // Detect message intent
    const intent = this.detectIntent(message);
    
    // Add user message to history
    this.addToHistory(sessionId, 'user', message, intent);
    
    let response;
    
    // Route based on intent
    switch (intent.type) {
      case 'code_generation':
        response = await this.handleCodeGeneration(message, options);
        break;
      case 'research':
        response = await this.handleResearch(message, options);
        break;
      case 'code_review':
        response = await this.handleCodeReview(message, options);
        break;
      case 'code_fix':
        response = await this.handleCodeFix(message, options);
        break;
      default:
        response = await this.handleGeneralChat(message, session, options);
    }

    // Add assistant response to history
    this.addToHistory(sessionId, 'assistant', response.text || response.content, intent.type);
    
    // Update session
    session.lastActivity = new Date().toISOString();
    session.messageCount++;
    
    return {
      ...response,
      sessionId,
      intent,
      moderation,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Detect message intent
   * @param {string} message - User message
   * @returns {object} Intent detection result
   */
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Code generation patterns
    const codePatterns = [
      'write code', 'generate code', 'create a function', 'build a',
      'make me', 'coding', 'program', 'develop'
    ];
    
    // Research patterns
    const researchPatterns = [
      'research', 'find information', 'search for', 'look up',
      'tell me about', 'what is', 'explain'
    ];
    
    // Code review patterns
    const reviewPatterns = [
      'review code', 'check code', 'improve code', 'refactor',
      'optimize', 'debug', 'fix bug'
    ];

    if (codePatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { type: 'code_generation', confidence: 0.8 };
    }
    
    if (researchPatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { type: 'research', confidence: 0.7 };
    }
    
    if (reviewPatterns.some(pattern => lowerMessage.includes(pattern))) {
      return { type: 'code_review', confidence: 0.75 };
    }
    
    return { type: 'general', confidence: 0.5 };
  }

  /**
   * Handle code generation request
   * @param {string} message - User request
   * @param {object} options - Generation options
   * @returns {Promise<object>} Generation result
   */
  async handleCodeGeneration(message, options) {
    const result = await this.codeGenerator.generateCode(message, options);
    
    return {
      type: 'code_generation',
      content: result.code,
      language: result.language,
      framework: result.framework,
      success: result.success
    };
  }

  /**
   * Handle research request
   * @param {string} message - Research query
   * @param {object} options - Research options
   * @returns {Promise<object>} Research result
   */
  async handleResearch(message, options) {
    const searchResults = await this.researchAssistant.searchWeb(message, {
      maxResults: options.maxResults || 5
    });
    
    return {
      type: 'research',
      content: searchResults.results,
      success: searchResults.success,
      summary: this.researchAssistant.generateResearchSummary(
        searchResults.results || [],
        message
      )
    };
  }

  /**
   * Handle code review request
   * @param {string} message - Code to review
   * @param {object} options - Review options
   * @returns {Promise<object>} Review result
   */
  async handleCodeReview(message, options) {
    const result = await this.codeGenerator.reviewCode(message, options);
    
    return {
      type: 'code_review',
      content: result.review,
      focusAreas: result.focusAreas,
      success: result.success
    };
  }

  /**
   * Handle code fix request
   * @param {string} message - Bug report
   * @param {object} options - Fix options
   * @returns {Promise<object>} Fix result
   */
  async handleCodeFix(message, options) {
    // Extract code and error from message
    const result = await this.codeGenerator.fixCode(
      options.code || '',
      message
    );
    
    return {
      type: 'code_fix',
      content: result.fixedCode,
      originalCode: result.originalCode,
      success: result.success
    };
  }

  /**
   * Handle general chat
   * @param {string} message - User message
   * @param {object} session - Chat session
   * @param {object} options - Chat options
   * @returns {Promise<object>} Chat response
   */
  async handleGeneralChat(message, session, options) {
    const { OpenAI } = require('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const history = this.getSessionHistory(options.sessionId);
    
    try {
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant with expertise in coding, research, and problem-solving.'
          },
          ...history.slice(-10),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      return {
        type: 'general',
        text: completion.choices[0].message.content,
        success: true
      };
    } catch (error) {
      return {
        type: 'general',
        text: 'I apologize, but I encountered an error processing your request.',
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Add message to session history
   * @param {string} sessionId - Session identifier
   * @param {string} role - Message role (user/assistant)
   * @param {string} content - Message content
   * @param {string} intent - Message intent
   */
  addToHistory(sessionId, role, content, intent) {
    const session = this.conversationHistory.get(sessionId);
    if (!session) return;

    session.messages.push({
      role,
      content,
      intent,
      timestamp: new Date().toISOString()
    });

    // Trim history if too long
    if (session.messages.length > this.maxHistoryLength) {
      session.messages = session.messages.slice(-this.maxHistoryLength);
    }
  }

  /**
   * Get session history formatted for OpenAI
   * @param {string} sessionId - Session identifier
   * @returns {array} Formatted history
   */
  getSessionHistory(sessionId) {
    const session = this.conversationHistory.get(sessionId);
    if (!session) return [];

    return session.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  /**
   * Get session statistics
   * @param {string} sessionId - Session identifier
   * @returns {object} Session statistics
   */
  getSessionStats(sessionId) {
    const session = this.conversationHistory.get(sessionId);
    if (!session) return null;

    return {
      sessionId,
      messageCount: session.messageCount,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity,
      historyLength: session.messages.length
    };
  }
}

module.exports = ChatbotEngine;