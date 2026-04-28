const { OpenAI } = require('openai');

class CodeGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.model = process.env.OPENAI_MODEL || 'gpt-4';
  }

  /**
   * Generate code from natural language description
   * @param {string} description - Code requirements
   * @param {object} options - Generation options
   * @returns {Promise<object>} Generated code
   */
  async generateCode(description, options = {}) {
    const {
      language = 'javascript',
      framework = 'express',
      complexity = 'intermediate',
      includeTests = false,
      includeComments = true
    } = options;

    const prompt = this.buildCodeGenerationPrompt(description, {
      language,
      framework,
      complexity,
      includeTests,
      includeComments
    });

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{
          role: 'system',
          content: 'You are an expert software engineer and code generator.'
        }, {
          role: 'user',
          content: prompt
        }],
        temperature: 0.7,
        max_tokens: 4000
      });

      const code = completion.choices[0].message.content;
      
      return {
        success: true,
        code,
        language,
        framework,
        description,
        metadata: {
          model: this.model,
          timestamp: new Date().toISOString(),
          options
        }
      };
    } catch (error) {
      console.error('Code generation error:', error);
      return {
        success: false,
        error: error.message,
        description
      };
    }
  }

  /**
   * Fix buggy code
   * @param {string} code - Code with bugs
   * @param {string} error - Error description
   * @returns {Promise<object>} Fixed code
   */
  async fixCode(code, error) {
    const prompt = `You are an expert debugger. Fix the following code:

Error: ${error}

Code:
${code}

Please provide the corrected code with explanations of the fixes made.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{
          role: 'system',
          content: 'You are an expert software engineer and debugger.'
        }, {
          role: 'user',
          content: prompt
        }],
        temperature: 0.3,
        max_tokens: 3000
      });

      return {
        success: true,
        fixedCode: completion.choices[0].message.content,
        originalCode: code,
        error,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Code fix error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Review and improve existing code
   * @param {string} code - Code to review
   * @param {object} options - Review options
   * @returns {Promise<object>} Code review
   */
  async reviewCode(code, options = {}) {
    const {
      focus = ['best_practices', 'performance', 'security'],
      language = 'javascript'
    } = options;

    const prompt = `You are a senior software engineer conducting a code review.

Focus areas: ${focus.join(', ')}
Language: ${language}

Code to review:
${code}

Please provide:
1. Overall assessment
2. Specific improvements
3. Security concerns
4. Performance optimizations
5. Best practice violations`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{
          role: 'system',
          content: 'You are a senior software engineer and code reviewer.'
        }, {
          role: 'user',
          content: prompt
        }],
        temperature: 0.5,
        max_tokens: 3000
      });

      return {
        success: true,
        review: completion.choices[0].message.content,
        focusAreas: focus,
        language,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Code review error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Refactor code for better performance/readability
   * @param {string} code - Code to refactor
   * @param {object} options - Refactoring options
   * @returns {Promise<object>} Refactored code
   */
  async refactorCode(code, options = {}) {
    const {
      goals = ['readability', 'performance'],
      language = 'javascript'
    } = options;

    const prompt = `Refactor the following ${language} code with these goals: ${goals.join(', ')}

${code}

Provide the refactored code with explanations of the changes.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{
          role: 'system',
          content: 'You are an expert software engineer specializing in code refactoring.'
        }, {
          role: 'user',
          content: prompt
        }],
        temperature: 0.4,
        max_tokens: 3000
      });

      return {
        success: true,
        refactoredCode: completion.choices[0].message.content,
        goals,
        originalLanguage: language,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Code refactoring error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Explain code functionality
   * @param {string} code - Code to explain
   * @param {string} audience - Target audience
   * @returns {Promise<object>} Code explanation
   */
  async explainCode(code, audience = 'junior') {
    const prompt = `Explain this code for a ${audience} developer:

${code}

Please provide:
1. High-level overview
2. Key concepts
3. Step-by-step explanation
4. Common use cases`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{
          role: 'system',
          content: 'You are an expert software engineer and educator.'
        }, {
          role: 'user',
          content: prompt
        }],
        temperature: 0.6,
        max_tokens: 3000
      });

      return {
        success: true,
        explanation: completion.choices[0].message.content,
        audience,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Code explanation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Build code generation prompt
   * @param {string} description - Code requirements
   * @param {object} options - Generation options
   * @returns {string} Prompt string
   */
  buildCodeGenerationPrompt(description, options) {
    return `Generate ${options.language} code (${options.framework} framework) with ${options.complexity} complexity.

Requirements:
${description}

${options.includeTests ? 'Include comprehensive unit tests.' : ''}
${options.includeComments ? 'Include detailed comments and documentation.' : ''}

Please provide:
1. Complete, working code
2. Implementation details
3. Usage examples
4. Dependencies required`;
  }
}

module.exports = CodeGenerator;