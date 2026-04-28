const natural = require('natural');
const badWords = require('bad-words');

// Initialize profanity filter
const filter = new badWords();

// Initialize stopword removal
const stopword = require('stopword');

class ContentFilter {
  constructor() {
    this.profanityFilter = filter;
    this.minConfidenceThreshold = parseFloat(process.env.MIN_CONFIDENCE_THRESHOLD) || 0.7;
  }

  /**
   * Check for profanity in text
   * @param {string} text - Input text to check
   * @returns {object} Filter result
   */
  checkProfanity(text) {
    const hasProfanity = this.profanityFilter.isProfane(text);
    const cleaned = this.profanityFilter.clean(text);
    
    return {
      hasProfanity,
      cleaned,
      original: text,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Analyze sentiment of text (simple keyword-based approach)
   * @param {string} text - Input text to analyze
   * @returns {object} Sentiment analysis result
   */
  analyzeSentiment(text) {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'happy', 'joy', 'beautiful', 'perfect', 'awesome', 'brilliant', 'nice', 'best', 'better', 'super', 'cool', 'fun', 'exciting', 'interesting'];
    const negativeWords = ['bad', 'terrible', 'horrible', 'awful', 'hate', 'sad', 'angry', 'worst', 'worse', 'boring', 'ugly', 'painful', 'disgusting', 'stupid', 'dumb', 'lame', 'annoying', 'frustrating'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    const foundPositive = [];
    const foundNegative = [];
    
    words.forEach(word => {
      if (positiveWords.includes(word)) {
        score++;
        foundPositive.push(word);
      }
      if (negativeWords.includes(word)) {
        score--;
        foundNegative.push(word);
      }
    });
    
    const comparative = words.length > 0 ? score / words.length : 0;
    
    return {
      score,
      comparative,
      positive: foundPositive,
      negative: foundNegative,
      classification: this.classifySentiment(score)
    };
  }

  /**
   * Classify sentiment score
   * @param {number} score - Sentiment score
   * @returns {string} Sentiment classification
   */
  classifySentiment(score) {
    if (score > 3) return 'very_positive';
    if (score > 1) return 'positive';
    if (score > -1 && score < 1) return 'neutral';
    if (score > -3) return 'negative';
    return 'very_negative';
  }

  /**
   * Remove stopwords from text
   * @param {string} text - Input text
   * @returns {object} Text with stopwords removed
   */
  removeStopwords(text) {
    const words = text.split(' ');
    const filtered = stopword.removeStopwords(words);
    
    return {
      original: text,
      filtered: filtered.join(' '),
      removed: words.filter(w => !filtered.includes(w)),
      wordCount: words.length,
      filteredWordCount: filtered.length
    };
  }

  /**
   * Comprehensive content analysis
   * @param {string} text - Input text
   * @returns {object} Complete analysis result
   */
  comprehensiveAnalysis(text) {
    return {
      profanity: this.checkProfanity(text),
      sentiment: this.analyzeSentiment(text),
      keywords: this.removeStopwords(text),
      length: {
        characters: text.length,
        words: text.split(' ').length
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Determine if content should be blocked
   * @param {string} text - Input text
   * @returns {object} Moderation decision
   */
  shouldModerate(text) {
    const analysis = this.comprehensiveAnalysis(text);
    
    const issues = [];
    let shouldBlock = false;
    let confidence = 1.0;
    
    if (analysis.profanity.hasProfanity) {
      issues.push('profanity_detected');
      confidence *= 0.8;
    }
    
    if (analysis.sentiment.score < -5) {
      issues.push('extremely_negative_sentiment');
      confidence *= 0.9;
    }
    
    if (analysis.length.words > 2000) {
      issues.push('excessive_length');
      confidence *= 0.95;
    }
    
    if (analysis.length.words < 2) {
      issues.push('insufficient_content');
      confidence *= 0.5;
    }
    
    shouldBlock = confidence < this.minConfidenceThreshold;
    
    return {
      shouldBlock,
      confidence,
      issues,
      analysis,
      action: shouldBlock ? 'block' : 'allow',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = ContentFilter;