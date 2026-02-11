# AI Search Report - Monthly Automation System

This automation system handles monthly research updates, content generation, and staging deployment for the AI Search Report.

## 🚀 Quick Start

### 1. Install the Automation System

```bash
cd aisearch
node automation/setup-cron.js
npm install
```

### 2. Configure Environment Variables

Copy `.env.template` to `.env` and configure:

```bash
# Required for HubSpot newsletter integration
HUBSPOT_API_KEY=your_hubspot_api_key

# Optional for notifications
SLACK_WEBHOOK_URL=your_slack_webhook_url

# Optional for enhanced research
OPENAI_API_KEY=your_openai_api_key
```

### 3. Set Up Staging Environment (Optional)

Create a staging subdomain in Vercel:
- Subdomain: `aisearch-staging.simpletiger.com`
- Configure to auto-deploy from `staging-*` branches
- The automation will create staging branches for review

### 4. Test Manual Run

```bash
npm run update-report
```

This will:
- Research and update all data points
- Generate staging version at `src/data/staging.ts`
- Create newsletter draft in `content/`
- Create LinkedIn post draft in `content/`
- Create staging Git branch for deployment

## 🔄 How It Works

### Monthly Automation Flow

**Day 1 of Every Month at 9:00 AM EST:**

1. **Research Agents Execute**
   - UserGrowthAgent: ChatGPT, Gemini, Claude user numbers
   - MarketShareAgent: Search market share data
   - RevenueAgent: OpenAI, Anthropic, Perplexity revenue
   - AIOverviewsAgent: Google AI Overviews rollout data
   - TimelineAgent: New milestone events
   - SourcesAgent: Updated references

2. **Data Update**
   - Updates `src/data/staging.ts` with new data
   - Preserves existing data structure
   - Only updates values, not what data is tracked

3. **Content Generation**
   - Creates HubSpot newsletter draft
   - Generates LinkedIn post for review
   - Analyzes changes from previous month

4. **Staging Deployment**
   - Creates staging Git branch
   - Deploys to staging environment
   - Generates preview URL

5. **Notification**
   - Sends completion notification
   - Provides staging URL for review
   - Includes content drafts

### Manual Commands

```bash
# Run full monthly update
npm run update-report

# Check automation status
npm run monitor-cron

# Start cron service (for server deployment)
node automation/cron-service.js
```

## 📊 Data Points Tracked

The system automatically updates these key metrics:

### User Growth
- **ChatGPT Users**: Weekly active users timeline
- **Platform Growth**: Multi-platform comparison (ChatGPT, Gemini, Claude, Perplexity)

### Market Share
- **Search Market Share**: Google vs AI search engines over time

### Revenue Data
- **Company Revenue**: OpenAI, Anthropic, Perplexity ARR data

### AI Integration
- **AI Overviews Growth**: Google AI Overviews percentage in search results
- **CTR Impact**: Click-through rate changes

### User Behavior
- **Intent Data**: Search behavior by query intent
- **Age Demographics**: Usage patterns by age group

### Key Statistics
- All homepage key stats are automatically updated

### Timeline Events
- Automatically adds new milestone events
- Maintains chronological order

## 📧 Newsletter Integration

### HubSpot Setup

1. Configure `HUBSPOT_API_KEY` in `.env`
2. The system creates newsletter drafts in HubSpot
3. Review and send from HubSpot Marketing Hub

### Manual Newsletter Process

If HubSpot integration isn't configured:

1. Newsletter HTML saved to `content/hubspot-newsletter-draft.html`
2. Import to HubSpot manually
3. Configuration details in `content/hubspot-config.json`

## 📱 LinkedIn Content

LinkedIn posts are drafted for review:

- Saved to `content/linkedin-draft.json`
- Includes optimized copy with key highlights
- Hashtags and call-to-action included
- **Not auto-published** - requires manual review

## 🎭 Staging Environment

### Staging Process

1. Automation creates `staging-YYYY-MM-DD` branch
2. Updates data files for staging build
3. Pushes to GitHub for staging deployment
4. Provides preview URL for review

### Staging to Production

After reviewing staging environment:

1. Approve data accuracy
2. Test all charts and components
3. Merge staging branch to main
4. Production deployment happens automatically

### Staging URL Structure

- Production: `aisearch.simpletiger.com`
- Staging: `aisearch-staging.simpletiger.com` (optional)
- Preview: Vercel preview URLs for staging branches

## 📋 Review Process

### Monthly Review Checklist

**Data Accuracy:**
- [ ] User growth numbers look reasonable
- [ ] Market share changes make sense
- [ ] Revenue figures match public sources
- [ ] Timeline events are accurate
- [ ] Key stats updated correctly

**Content Quality:**
- [ ] Newsletter highlights key changes
- [ ] LinkedIn post is engaging and accurate
- [ ] Sources list updated with new references
- [ ] Charts render correctly in staging

**Technical:**
- [ ] Staging environment loads properly
- [ ] All data visualizations working
- [ ] Mobile responsiveness maintained
- [ ] Performance remains good

### Approval Workflow

1. **Staging Review**: Check staging URL for data accuracy
2. **Content Review**: Review newsletter and LinkedIn drafts
3. **Deploy to Production**: Merge staging branch when ready
4. **Send Newsletter**: Publish from HubSpot
5. **Post LinkedIn**: Publish after review

## 🛠 Troubleshooting

### Common Issues

**"No data updates found"**
- Check internet connection for research agents
- Verify API keys in `.env` file
- Check logs in `logs/` directory

**"Staging deployment failed"**
- Ensure Git is configured properly
- Check GitHub permissions
- Verify Vercel integration

**"Newsletter creation failed"**
- Check HubSpot API key
- Verify HubSpot permissions
- Fallback: Manual import from HTML file

### Monitoring

Check automation health:

```bash
npm run monitor-cron
```

This shows:
- Recent execution logs
- Configuration status
- Next scheduled run
- Available commands

### Log Files

- `logs/execution-YYYY-MM-DD.json`: Daily execution logs
- `logs/completion-notification.json`: Latest completion details
- `logs/error-notification.json`: Error details if failures occur

## 🔧 Configuration Options

### Environment Variables

```bash
# HubSpot Integration
HUBSPOT_API_KEY=your_key                    # Required for newsletter automation

# Notifications  
SLACK_WEBHOOK_URL=your_webhook               # Optional Slack notifications
NOTIFICATION_EMAIL=your@email.com           # Optional email notifications

# Research Enhancement
OPENAI_API_KEY=your_key                     # Optional for better research
ANTHROPIC_API_KEY=your_key                  # Optional for enhanced data

# Staging
VERCEL_TOKEN=your_token                     # Optional for API deployments
STAGING_SUBDOMAIN=aisearch-staging          # Optional custom staging domain

# Timing
CRON_TIMEZONE=America/New_York              # Cron job timezone
AUTO_DEPLOY_TO_STAGING=true                 # Auto-create staging branches
AUTO_SEND_NEWSLETTER=false                  # Manual newsletter review (recommended)
```

### Cron Schedule

Default: `0 9 1 * *` (9:00 AM EST on 1st of every month)

To modify, edit `automation/cron-service.js`

## 📈 Future Enhancements

### Planned Features

- **AI-Enhanced Research**: Use LLMs to analyze earnings calls and reports
- **Automated Source Verification**: Cross-check data across multiple sources  
- **Trend Analysis**: Identify and highlight emerging patterns
- **Competitive Intelligence**: Track new players and product launches
- **Performance Monitoring**: Track report engagement and traffic

### Integration Possibilities

- **Google Analytics**: Track report performance metrics
- **SEO Tools**: Monitor search rankings for AI search keywords  
- **Social Media**: Auto-post to Twitter, LinkedIn company page
- **CRM**: Track subscriber engagement and growth

## 🆘 Support

### Getting Help

1. **Check Logs**: `npm run monitor-cron` for status
2. **Test Manual Run**: `npm run update-report` to debug
3. **Review Configuration**: Verify `.env` settings
4. **Check GitHub Issues**: Look for known problems

### Emergency Manual Override

If automation fails, you can manually:

1. Research latest data points
2. Update `src/data/index.ts` directly
3. Create newsletter content manually
4. Deploy normally through Git

The automation is designed to be helpful but not critical - all processes can be done manually if needed.

---

**Built with ❤️ for the SimpleTiger AI Search Report**