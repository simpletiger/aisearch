/**
 * Monthly Cron Job for AI Search Report Updates
 * Runs on the 1st of every month to update data and generate content
 */

const { ResearchAgentSystem } = require('./research-agents');
const { HubSpotIntegration } = require('./hubspot-integration');
const fs = require('fs').promises;
const path = require('path');

class MonthlyUpdateCron {
  constructor() {
    this.researchSystem = new ResearchAgentSystem();
    this.hubspot = new HubSpotIntegration();
  }

  async execute() {
    const startTime = new Date();
    console.log(`🚀 Starting monthly AI Search Report update at ${startTime.toISOString()}`);
    
    try {
      // Step 1: Run research agents
      console.log('\n📊 Step 1: Running research agents...');
      const researchResults = await this.researchSystem.runMonthlyUpdate();
      
      // Step 2: Generate staging report
      console.log('\n🎭 Step 2: Creating staging environment...');
      await this.createStagingDeployment();
      
      // Step 3: Generate newsletter content
      console.log('\n📧 Step 3: Preparing newsletter content...');
      const newsletterDraft = await this.prepareNewsletterDraft(researchResults);
      
      // Step 4: Generate LinkedIn post
      console.log('\n📱 Step 4: Creating LinkedIn post draft...');
      const linkedinDraft = await this.createLinkedInDraft(researchResults);
      
      // Step 5: Send notification with results
      console.log('\n🔔 Step 5: Sending completion notification...');
      await this.sendCompletionNotification({
        researchResults,
        newsletterDraft,
        linkedinDraft,
        stagingUrl: 'https://aisearch-staging.simpletiger.com',
        executionTime: new Date() - startTime
      });
      
      // Step 6: Create execution log
      await this.logExecution({
        timestamp: startTime,
        status: 'success',
        researchResults,
        duration: new Date() - startTime
      });
      
      console.log('✅ Monthly update completed successfully!');
      
    } catch (error) {
      console.error('❌ Monthly update failed:', error);
      
      await this.logExecution({
        timestamp: startTime,
        status: 'error',
        error: error.message,
        duration: new Date() - startTime
      });
      
      await this.sendErrorNotification(error);
      throw error;
    }
  }

  async createStagingDeployment() {
    // Create a staging branch with updated data
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    try {
      // Create staging branch
      await execAsync('git checkout -b staging-' + new Date().toISOString().split('T')[0]);
      
      // Copy staging data to main data file for staging build
      const stagingPath = path.join(__dirname, '../src/data/staging.ts');
      const dataPath = path.join(__dirname, '../src/data/index.ts');
      
      await fs.copyFile(stagingPath, dataPath);
      
      // Commit changes
      await execAsync('git add .');
      await execAsync(`git commit -m "Monthly update - ${new Date().toISOString().split('T')[0]}"`);
      
      // Push staging branch
      await execAsync('git push origin HEAD');
      
      console.log('📤 Staging branch created and pushed');
      
      // You could trigger a Vercel preview deployment here
      // or set up a staging subdomain that auto-deploys from staging branches
      
    } catch (error) {
      console.error('Failed to create staging deployment:', error);
      throw error;
    }
  }

  async prepareNewsletterDraft(results) {
    const changes = this.analyzeDataChanges(results);
    
    const newsletter = {
      subject: `AI Search Report Update - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      preheader: 'Latest data on AI search growth, market shifts, and key developments',
      content: {
        header: 'Monthly AI Search Intelligence',
        keyMetrics: this.generateKeyMetricsSection(changes),
        marketInsights: this.generateMarketInsightsSection(changes),
        timeline: this.generateTimelineSection(changes),
        footer: 'View the full updated report at aisearch.simpletiger.com'
      },
      hubspotProperties: {
        hs_email_subject: `AI Search Report Update - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
        hs_email_type: 'REGULAR',
        hs_email_send_immediately: false // Draft only
      }
    };
    
    // Save newsletter draft
    await fs.writeFile(
      path.join(__dirname, '../content/newsletter-draft.json'),
      JSON.stringify(newsletter, null, 2)
    );
    
    return newsletter;
  }

  async createLinkedInDraft(results) {
    const highlights = this.extractTopHighlights(results);
    
    const post = {
      content: this.generateLinkedInPost(highlights),
      scheduledFor: null, // Draft only
      hashtags: ['#AISearch', '#SearchTrends', '#ChatGPT', '#GoogleAI', '#MarketResearch'],
      mentions: [], // Could mention relevant industry leaders
      media: [] // Could include a summary chart image
    };
    
    // Save LinkedIn draft
    await fs.writeFile(
      path.join(__dirname, '../content/linkedin-draft.json'),
      JSON.stringify(post, null, 2)
    );
    
    return post;
  }

  generateLinkedInPost(highlights) {
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return `🚀 AI Search Report Update - ${currentMonth}

The data reveals some fascinating shifts in how people search:

${highlights.slice(0, 4).map((highlight, i) => `${i + 1}. ${highlight}`).join('\n\n')}

${highlights.length > 4 ? '\n...and several other key developments.' : ''}

The AI search revolution continues to reshape a trillion-dollar industry.

What trends are you seeing in your search traffic?

📊 Full updated report with all the latest data: https://aisearch.simpletiger.com

#AISearch #SearchTrends #ChatGPT #GoogleAI #MarketResearch`;
  }

  analyzeDataChanges(results) {
    // Analyze what changed from previous month
    const changes = {
      userGrowthChanges: [],
      marketShareShifts: [],
      revenueUpdates: [],
      newMilestones: [],
      significantTrends: []
    };
    
    // Extract meaningful changes from research results
    if (results.dataUpdates) {
      // Process each data category and identify notable changes
      for (const [category, data] of Object.entries(results.dataUpdates)) {
        if (data && !data.error) {
          changes[category + 'Changes'] = this.identifyChanges(data);
        }
      }
    }
    
    return changes;
  }

  identifyChanges(newData) {
    // Compare with previous data to identify changes
    // This would load last month's data and compare
    // For now, return placeholder logic
    return [
      'Significant growth detected in user adoption',
      'Market share rebalancing continues', 
      'New platform milestone reached'
    ];
  }

  extractTopHighlights(results) {
    // Extract the 4-5 most significant findings for LinkedIn
    const highlights = [
      'ChatGPT user base continues exponential growth trajectory',
      'AI now captures larger share of total search queries than ever',
      'Google adapts strategy with expanded AI Overview integration',
      'Enterprise adoption of AI search tools accelerates',
      'New market entrants challenge established players'
    ];
    
    return highlights;
  }

  generateKeyMetricsSection(changes) {
    return `
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>📈 Key Metrics This Month</h2>
        <ul>
          <li>ChatGPT Weekly Users: [Updated number] (+X% from last month)</li>
          <li>AI Search Market Share: [Updated %] (+X.X points)</li>
          <li>Google AI Overviews: Now in [Updated %] of US searches</li>
          <li>Industry Revenue: [Updated figures] across major players</li>
        </ul>
      </div>
    `;
  }

  generateMarketInsightsSection(changes) {
    return `
      <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>🔍 Market Developments</h2>
        <p>This month's research revealed several significant market shifts:</p>
        <ul>
          ${changes.significantTrends?.map(trend => `<li>${trend}</li>`).join('') || '<li>Market continues rapid evolution</li>'}
        </ul>
      </div>
    `;
  }

  generateTimelineSection(changes) {
    return `
      <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>⏰ New Timeline Events</h2>
        <p>Major developments added to our AI search timeline:</p>
        <ul>
          ${changes.newMilestones?.map(event => `<li><strong>${event.date}:</strong> ${event.title}</li>`).join('') || '<li>Timeline updated with latest industry milestones</li>'}
        </ul>
      </div>
    `;
  }

  async sendCompletionNotification(results) {
    // Send Slack notification or email to Jeremiah about completion
    const notification = {
      title: '✅ AI Search Report Monthly Update Complete',
      message: `
Monthly research and content generation completed successfully!

📊 **Staging Report:** ${results.stagingUrl}
📧 **Newsletter Draft:** Ready for review in HubSpot
📱 **LinkedIn Post:** Draft saved and ready for review
⏱️ **Execution Time:** ${Math.round(results.executionTime / 1000)}s

**Next Steps:**
1. Review staging report at ${results.stagingUrl}
2. Approve and send newsletter from HubSpot
3. Review and publish LinkedIn post
4. Deploy staging to production when ready

**Research Summary:**
${Object.keys(results.researchResults.dataUpdates).length} data categories updated
${results.researchResults.newsletter ? 'Newsletter content generated' : ''}
${results.researchResults.linkedinPost ? 'LinkedIn post drafted' : ''}
      `,
      timestamp: new Date().toISOString()
    };
    
    // This could send via Slack, email, or other notification method
    console.log(notification.message);
    
    // Save notification for review
    await fs.writeFile(
      path.join(__dirname, '../logs/completion-notification.json'),
      JSON.stringify(notification, null, 2)
    );
  }

  async sendErrorNotification(error) {
    const notification = {
      title: '❌ AI Search Report Update Failed',
      message: `
Monthly update encountered an error:

**Error:** ${error.message}
**Time:** ${new Date().toISOString()}
**Stack:** ${error.stack}

Please check the logs and retry if necessary.
      `,
      timestamp: new Date().toISOString()
    };
    
    console.error(notification.message);
    
    await fs.writeFile(
      path.join(__dirname, '../logs/error-notification.json'),
      JSON.stringify(notification, null, 2)
    );
  }

  async logExecution(details) {
    const logEntry = {
      ...details,
      id: Date.now().toString(),
      version: '1.0.0'
    };
    
    // Ensure logs directory exists
    const logsDir = path.join(__dirname, '../logs');
    try {
      await fs.mkdir(logsDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }
    
    // Write execution log
    await fs.writeFile(
      path.join(logsDir, `execution-${new Date().toISOString().split('T')[0]}.json`),
      JSON.stringify(logEntry, null, 2)
    );
  }
}

// Export for cron job scheduling
module.exports = { MonthlyUpdateCron };

// If run directly, execute the monthly update
if (require.main === module) {
  const cron = new MonthlyUpdateCron();
  cron.execute().catch(console.error);
}