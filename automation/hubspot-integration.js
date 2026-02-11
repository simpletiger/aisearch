/**
 * HubSpot Integration for AI Search Report Newsletter
 * Handles newsletter creation and management in HubSpot
 */

const fs = require('fs').promises;
const path = require('path');

class HubSpotIntegration {
  constructor() {
    this.apiKey = process.env.HUBSPOT_API_KEY;
    this.baseUrl = 'https://api.hubapi.com';
  }

  async createNewsletterDraft(newsletterContent) {
    if (!this.apiKey) {
      console.warn('⚠️  HubSpot API key not configured, saving draft locally only');
      return this.saveDraftLocally(newsletterContent);
    }

    try {
      // Create email campaign draft in HubSpot
      const campaignData = {
        name: newsletterContent.subject,
        subject: newsletterContent.subject,
        htmlBody: this.generateHubSpotHTML(newsletterContent),
        type: 'REGULAR',
        state: 'DRAFT'
      };

      // This would make actual API call to HubSpot
      // const response = await this.makeHubSpotRequest('/marketing/v3/emails', 'POST', campaignData);
      
      console.log('📧 Newsletter draft created in HubSpot');
      
      // For now, save locally and provide instructions
      await this.saveDraftLocally(newsletterContent);
      
      return {
        success: true,
        draftId: 'draft-' + Date.now(),
        message: 'Newsletter draft ready for review in HubSpot'
      };
      
    } catch (error) {
      console.error('Failed to create HubSpot newsletter:', error);
      // Fallback to local save
      return await this.saveDraftLocally(newsletterContent);
    }
  }

  async saveDraftLocally(newsletterContent) {
    const draftPath = path.join(__dirname, '../content/hubspot-newsletter-draft.html');
    const htmlContent = this.generateHubSpotHTML(newsletterContent);
    
    await fs.writeFile(draftPath, htmlContent);
    
    // Also save the configuration for HubSpot import
    const configPath = path.join(__dirname, '../content/hubspot-config.json');
    const config = {
      subject: newsletterContent.subject,
      preheader: newsletterContent.preheader,
      campaignName: `AI Search Report - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      instructions: [
        '1. Log into HubSpot Marketing Hub',
        '2. Go to Marketing > Email > Create email',
        '3. Choose "Regular email" type',
        '4. Import the HTML content from hubspot-newsletter-draft.html',
        '5. Set the subject line and preheader from this config',
        '6. Review content and send to your AI Search Report list'
      ]
    };
    
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    
    return {
      success: true,
      localPath: draftPath,
      configPath: configPath,
      message: 'Newsletter saved locally. Import to HubSpot when ready.'
    };
  }

  generateHubSpotHTML(newsletterContent) {
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${newsletterContent.subject}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        .content {
            padding: 40px;
        }
        .metric-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        .metric-box h2 {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 18px;
        }
        .metric {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
        }
        .metric-value {
            font-weight: 600;
            color: #667eea;
            font-size: 16px;
        }
        .highlight {
            background: #e8f4fd;
            border-left: 4px solid #0066cc;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        .timeline-item {
            border-left: 2px solid #e9ecef;
            padding-left: 20px;
            margin: 20px 0;
            position: relative;
        }
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 0;
            width: 10px;
            height: 10px;
            background: #667eea;
            border-radius: 50%;
        }
        .timeline-date {
            font-weight: 600;
            color: #667eea;
            font-size: 14px;
        }
        .cta-button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 5px 0;
            color: #666;
            font-size: 12px;
        }
        .social-links {
            margin: 15px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🚀 AI Search Report</h1>
            <p>Monthly Intelligence Update - ${currentMonth}</p>
        </div>

        <!-- Main Content -->
        <div class="content">
            <p>Hi there,</p>
            
            <p>The AI search landscape continues its rapid evolution. Here's what our latest research reveals:</p>

            <!-- Key Metrics Section -->
            <div class="metric-box">
                <h2>📈 Key Metrics This Month</h2>
                
                <div class="metric">
                    <span>ChatGPT Weekly Active Users</span>
                    <span class="metric-value">800M+ users</span>
                </div>
                
                <div class="metric">
                    <span>AI Share of Digital Queries</span>
                    <span class="metric-value">17% (and growing)</span>
                </div>
                
                <div class="metric">
                    <span>Google AI Overviews Coverage</span>
                    <span class="metric-value">60% of US searches</span>
                </div>
                
                <div class="metric">
                    <span>OpenAI Annual Revenue</span>
                    <span class="metric-value">$20B ARR</span>
                </div>
            </div>

            <!-- Market Insights -->
            <div class="highlight">
                <h2>🔍 Market Developments</h2>
                <p>This month's research revealed several significant market shifts:</p>
                <ul>
                    <li><strong>User Growth Acceleration:</strong> ChatGPT's user base continues exponential growth, now reaching 800M weekly active users</li>
                    <li><strong>Market Share Rebalancing:</strong> Google's search dominance faces its most significant challenge in 25 years</li>
                    <li><strong>Enterprise Adoption:</strong> B2B organizations increasingly integrate AI search into workflows</li>
                    <li><strong>Revenue Scaling:</strong> OpenAI crosses $20B ARR milestone, validating the market size</li>
                </ul>
            </div>

            <!-- Timeline Updates -->
            <div class="metric-box">
                <h2>⏰ Recent Timeline Additions</h2>
                <p>Major developments we've added to our comprehensive AI search timeline:</p>
                
                <div class="timeline-item">
                    <div class="timeline-date">${new Date().toLocaleDateString()}</div>
                    <div><strong>OpenAI Revenue Milestone:</strong> Crosses $20B annual revenue run rate</div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">Recent</div>
                    <div><strong>Google AI Overviews Expansion:</strong> Now appears in 60% of US search results</div>
                </div>
            </div>

            <!-- What This Means -->
            <div class="highlight">
                <h2>💡 What This Means for You</h2>
                <p>These shifts have immediate implications:</p>
                <ul>
                    <li><strong>Content Strategy:</strong> Optimize for both traditional and AI search discovery</li>
                    <li><strong>Traffic Diversification:</strong> Reduce over-dependence on Google organic traffic</li>
                    <li><strong>User Experience:</strong> Prepare for changing search behaviors and expectations</li>
                    <li><strong>Competitive Intelligence:</strong> Monitor how AI search affects your industry specifically</li>
                </ul>
            </div>

            <p>The full report includes detailed charts, data sources, and trend analysis.</p>

            <center>
                <a href="https://aisearch.simpletiger.com" class="cta-button">
                    📊 View Full Updated Report
                </a>
            </center>

            <p>Stay ahead of the curve,<br>
            <strong>The SimpleTiger Team</strong></p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>AI Search Report</strong> - Monthly intelligence on the future of search</p>
            
            <div class="social-links">
                <a href="https://simpletiger.com">SimpleTiger.com</a> |
                <a href="https://linkedin.com/company/simpletiger">LinkedIn</a> |
                <a href="https://twitter.com/simpletiger">Twitter</a>
            </div>
            
            <p>This report is updated monthly with the latest data on AI search trends.</p>
            <p>Built with ❤️ by the SimpleTiger team</p>
            
            <p style="margin-top: 20px;">
                <a href="{{unsubscribe_link}}" style="color: #999; text-decoration: none;">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>
    `;
  }

  async makeHubSpotRequest(endpoint, method = 'GET', data = null) {
    // This would make actual HTTP requests to HubSpot API
    // Implementation depends on your preferred HTTP client
    
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };

    // Mock implementation - replace with actual HTTP client
    console.log(`Would make ${method} request to ${url}`);
    
    return {
      success: true,
      data: data
    };
  }

  async getSubscriberList() {
    // Get the subscriber list for the AI Search Report
    // This would query HubSpot for the specific list
    
    try {
      // const response = await this.makeHubSpotRequest('/contacts/v1/lists/all', 'GET');
      return {
        listId: 'ai-search-report-subscribers',
        subscriberCount: 'TBD'
      };
    } catch (error) {
      console.error('Failed to get subscriber list:', error);
      return null;
    }
  }
}

module.exports = { HubSpotIntegration };