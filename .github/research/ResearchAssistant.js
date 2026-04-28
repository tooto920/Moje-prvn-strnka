const axios = require('axios');
const cheerio = require('cheerio');

class ResearchAssistant {
  constructor() {
    this.apiKeys = {
      serpapi: process.env.SERPAPI_KEY,
      newsapi: process.env.NEWSCATCHER_API_KEY
    };
  }

  /**
   * Search the web for information
   * @param {string} query - Search query
   * @param {object} options - Search options
   * @returns {Promise<object>} Search results
   */
  async searchWeb(query, options = {}) {
    const {
      maxResults = 5,
      type = 'search',
      includeSnippets = true
    } = options;

    try {
      // Try SerpAPI first if key is available
      if (this.apiKeys.serpapi) {
        return await this.searchWithSerpAPI(query, maxResults);
      }
      
      // Fallback to basic search
      return await this.basicWebSearch(query, maxResults);
    } catch (error) {
      console.error('Search error:', error);
      return {
        success: false,
        error: error.message,
        results: []
      };
    }
  }

  /**
   * Search using SerpAPI
   * @param {string} query - Search query
   * @param {number} maxResults - Maximum results to return
   * @returns {Promise<object>} Search results
   */
  async searchWithSerpAPI(query, maxResults) {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google',
        q: query,
        api_key: this.apiKeys.serpapi,
        num: maxResults
      }
    });

    const results = response.data.organic_results || [];
    
    return {
      success: true,
      engine: 'serpapi',
      results: results.map(r => ({
        title: r.title,
        link: r.link,
        snippet: r.snippet,
        source: r.source
      })),
      totalResults: response.data.search_information?.total_results || 0
    };
  }

  /**
   * Basic web search fallback
   * @param {string} query - Search query
   * @param {number} maxResults - Maximum results to return
   * @returns {Promise<object>} Search results
   */
  async basicWebSearch(query, maxResults) {
    // Simulate search results with available tools
    return {
      success: true,
      engine: 'basic',
      results: [
        {
          title: `Search results for: ${query}`,
          link: '#',
          snippet: 'Search functionality available with API keys',
          source: 'search'
        }
      ],
      note: 'Add SERPAPI_KEY or other search API for full functionality'
    };
  }

  /**
   * Search for recent news articles
   * @param {string} topic - News topic to search
   * @param {object} options - Search options
   * @returns {Promise<object>} News results
   */
  async searchNews(topic, options = {}) {
    const {
      maxResults = 10,
      language = 'en',
      sortBy = 'published_date'
    } = options;

    try {
      if (!this.apiKeys.newsapi) {
        return {
          success: false,
          error: 'News API key not configured',
          results: []
        };
      }

      const response = await axios.get('https://api.newscatcher.com/v1/latest_headlines', {
        params: {
          topic,
          lang: language,
          sort_by: sortBy,
          page_size: maxResults,
          apiKey: this.apiKeys.newsapi
        }
      });

      return {
        success: true,
        results: response.data.articles || [],
        totalResults: response.data.total_hits || 0
      };
    } catch (error) {
      console.error('News search error:', error);
      return {
        success: false,
        error: error.message,
        results: []
      };
    }
  }

  /**
   * Extract and summarize webpage content
   * @param {string} url - URL to extract from
   * @returns {Promise<object>} Extracted content
   */
  async extractWebpageContent(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ResearchBot/1.0'
        }
      });

      const $ = cheerio.load(response.data);
      
      // Remove unwanted elements
      $('script, style, nav, header, footer, aside').remove();
      
      // Extract main content
      const title = $('title').text() || $('h1').first().text();
      const paragraphs = $('p').map((i, el) => $(el).text().trim()).get();
      const cleanContent = paragraphs.filter(p => p.length > 50).join('\n\n');

      return {
        success: true,
        url,
        title,
        content: cleanContent,
        paragraphs: paragraphs.length,
        wordCount: cleanContent.split(' ').length,
        excerpt: cleanContent.substring(0, 500) + '...'
      };
    } catch (error) {
      console.error('Content extraction error:', error);
      return {
        success: false,
        error: error.message,
        url
      };
    }
  }

  /**
   * Generate research summary
   * @param {array} sources - Array of research sources
   * @param {string} topic - Research topic
   * @returns {object} Research summary
   */
  generateResearchSummary(sources, topic) {
    const summary = {
      topic,
      sources: sources.map(s => ({
        title: s.title,
        url: s.link || s.url,
        relevance: s.snippet?.length || 0,
        keyPoints: s.snippet ? [s.snippet] : []
      })),
      totalSources: sources.length,
      generatedAt: new Date().toISOString()
    };

    return summary;
  }
}

module.exports = ResearchAssistant;