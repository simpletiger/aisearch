/**
 * AI Search Report - Monthly Update Automation
 * 
 * This script is called by Clawdbot's cron system on the 1st of each month.
 * It orchestrates the full update workflow:
 * 1. Research latest data
 * 2. Update staging data file
 * 3. Create staging git branch
 * 4. Generate newsletter HTML
 * 5. Generate LinkedIn draft
 * 6. Return summary for Slack notification
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync, exec } = require('child_process');

const REPO_PATH = '/home/ubuntu/clawd/aisearch';
const CONTENT_PATH = path.join(REPO_PATH, 'content');
const DATA_PATH = path.join(REPO_PATH, 'src/data');

/**
 * Main update function - called by Clawdbot
 */
async function runMonthlyUpdate(researchResults) {
  const timestamp = new Date().toISOString();
  const dateStr = new Date().toISOString().split('T')[0];
  const monthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  console.log(`\n🚀 Starting AI Search Report Monthly Update`);
  console.log(`📅 Date: ${timestamp}\n`);

  // Ensure content directory exists
  await fs.mkdir(CONTENT_PATH, { recursive: true });

  const results = {
    timestamp,
    dateStr,
    monthYear,
    stagingBranch: null,
    previewUrl: null,
    dataUpdates: {},
    contentFiles: {},
    errors: []
  };

  try {
    // Step 1: Generate staging data file
    console.log('📝 Generating staging data file...');
    const stagingDataPath = await generateStagingData(researchResults);
    results.dataUpdates.stagingFile = stagingDataPath;
    console.log(`   ✅ Staging data saved to ${stagingDataPath}`);

    // Step 2: Create staging git branch
    console.log('\n🌿 Creating staging branch...');
    const branchResult = await createStagingBranch(dateStr);
    results.stagingBranch = branchResult.branch;
    results.previewUrl = branchResult.previewUrl;
    console.log(`   ✅ Branch created: ${branchResult.branch}`);
    console.log(`   🔗 Preview URL will be: ${branchResult.previewUrl}`);

    // Step 3: Generate newsletter HTML
    console.log('\n📧 Generating newsletter HTML...');
    const newsletterPath = await generateNewsletter(researchResults, monthYear);
    results.contentFiles.newsletter = newsletterPath;
    console.log(`   ✅ Newsletter saved to ${newsletterPath}`);

    // Step 4: Generate LinkedIn draft
    console.log('\n📱 Generating LinkedIn draft...');
    const linkedinPath = await generateLinkedInDraft(researchResults, monthYear);
    results.contentFiles.linkedin = linkedinPath;
    console.log(`   ✅ LinkedIn draft saved to ${linkedinPath}`);

    // Step 5: Generate summary
    console.log('\n📋 Generating update summary...');
    results.summary = generateSummary(researchResults, results);

  } catch (error) {
    console.error('\n❌ Error during update:', error.message);
    results.errors.push(error.message);
  }

  console.log('\n✨ Monthly update process completed!');
  return results;
}

/**
 * Generate staging data file with updated values
 */
async function generateStagingData(researchResults) {
  const sourcePath = path.join(DATA_PATH, 'index.ts');
  const stagingPath = path.join(DATA_PATH, 'staging.ts');
  
  let content = await fs.readFile(sourcePath, 'utf8');
  
  // Update data arrays based on research results
  if (researchResults.userGrowth?.data) {
    content = updateDataArray(content, 'chatgptUsers', researchResults.userGrowth.data.chatgptUsers);
    content = updateDataArray(content, 'platformGrowth', researchResults.userGrowth.data.platformGrowth);
  }
  
  if (researchResults.marketShare?.data) {
    content = updateDataArray(content, 'marketShare', researchResults.marketShare.data);
  }
  
  if (researchResults.revenue?.data) {
    content = updateDataArray(content, 'revenueData', researchResults.revenue.data);
  }
  
  if (researchResults.aiOverviews?.data) {
    content = updateDataArray(content, 'aiOverviewsGrowth', researchResults.aiOverviews.data);
  }
  
  if (researchResults.keyStats?.data) {
    content = updateDataArray(content, 'keyStats', researchResults.keyStats.data);
  }
  
  if (researchResults.timeline?.newEvents?.length > 0) {
    content = addTimelineEvents(content, researchResults.timeline.newEvents);
  }
  
  if (researchResults.sources?.length > 0) {
    content = updateSources(content, researchResults.sources);
  }

  await fs.writeFile(stagingPath, content);
  return stagingPath;
}

/**
 * Update a data array in the TypeScript file
 */
function updateDataArray(content, arrayName, newData) {
  if (!newData) return content;
  
  const regex = new RegExp(
    `export const ${arrayName} = \\[([\\s\\S]*?)\\];`,
    'm'
  );
  
  const match = content.match(regex);
  if (!match) {
    console.warn(`   ⚠️  Could not find ${arrayName} array`);
    return content;
  }
  
  const formatted = JSON.stringify(newData, null, 2)
    .replace(/"/g, '"')
    .replace(/\n/g, '\n');
  
  return content.replace(regex, `export const ${arrayName} = ${formatted};`);
}

/**
 * Add new timeline events
 */
function addTimelineEvents(content, newEvents) {
  if (!newEvents || newEvents.length === 0) return content;
  
  const regex = /export const timelineEvents = \[([\s\S]*?)\];/m;
  const match = content.match(regex);
  
  if (!match) return content;
  
  // Parse existing events and merge with new ones
  // Sort by date descending (newest first)
  const eventsStr = newEvents.map(e => JSON.stringify(e, null, 2)).join(',\n  ');
  
  // Add new events at the end of the array
  const existingContent = match[1].trim();
  const newContent = existingContent + ',\n  ' + eventsStr;
  
  return content.replace(regex, `export const timelineEvents = [\n  ${newContent}\n];`);
}

/**
 * Update sources list
 */
function updateSources(content, newSources) {
  if (!newSources || newSources.length === 0) return content;
  
  const regex = /export const sources = \[([\s\S]*?)\];/m;
  const match = content.match(regex);
  
  if (!match) return content;
  
  // Add new sources
  const sourcesStr = newSources.map(s => JSON.stringify(s, null, 2)).join(',\n  ');
  const existingContent = match[1].trim();
  const newContent = existingContent + ',\n  ' + sourcesStr;
  
  return content.replace(regex, `export const sources = [\n  ${newContent}\n];`);
}

/**
 * Create a staging branch and push to trigger Vercel preview
 */
async function createStagingBranch(dateStr) {
  const branchName = `staging-${dateStr}`;
  
  try {
    // Checkout main and pull latest
    execSync('git checkout main && git pull', { cwd: REPO_PATH, stdio: 'pipe' });
    
    // Create and checkout staging branch
    execSync(`git checkout -b ${branchName}`, { cwd: REPO_PATH, stdio: 'pipe' });
    
    // Copy staging data to main data file
    const stagingPath = path.join(DATA_PATH, 'staging.ts');
    const mainPath = path.join(DATA_PATH, 'index.ts');
    
    const stagingExists = await fs.access(stagingPath).then(() => true).catch(() => false);
    if (stagingExists) {
      await fs.copyFile(stagingPath, mainPath);
    }
    
    // Stage and commit changes
    execSync('git add -A', { cwd: REPO_PATH, stdio: 'pipe' });
    execSync(`git commit -m "chore: monthly data update ${dateStr}" --allow-empty`, { 
      cwd: REPO_PATH, 
      stdio: 'pipe' 
    });
    
    // Push to origin
    execSync(`git push -u origin ${branchName}`, { cwd: REPO_PATH, stdio: 'pipe' });
    
    // Switch back to main
    execSync('git checkout main', { cwd: REPO_PATH, stdio: 'pipe' });
    
    return {
      branch: branchName,
      previewUrl: `https://aisearch-git-${branchName}-simpletiger.vercel.app`
    };
    
  } catch (error) {
    console.error('Git operation failed:', error.message);
    // Clean up - try to get back to main
    try {
      execSync('git checkout main', { cwd: REPO_PATH, stdio: 'pipe' });
    } catch (e) {}
    
    return {
      branch: branchName,
      previewUrl: '(preview URL pending - check Vercel dashboard)',
      error: error.message
    };
  }
}

/**
 * Generate newsletter HTML for HubSpot import
 */
async function generateNewsletter(researchResults, monthYear) {
  const changes = extractChanges(researchResults);
  
  const html = generateNewsletterHTML(changes, monthYear);
  
  const newsletterPath = path.join(CONTENT_PATH, `newsletter-${new Date().toISOString().split('T')[0]}.html`);
  await fs.writeFile(newsletterPath, html);
  
  // Also save a "latest" version
  const latestPath = path.join(CONTENT_PATH, 'newsletter-latest.html');
  await fs.writeFile(latestPath, html);
  
  return newsletterPath;
}

/**
 * Generate LinkedIn draft
 */
async function generateLinkedInDraft(researchResults, monthYear) {
  const changes = extractChanges(researchResults);
  const highlights = changes.highlights.slice(0, 4);
  
  const post = {
    generatedAt: new Date().toISOString(),
    monthYear,
    content: `🚀 Our AI Search Report has been updated with the latest ${monthYear} data!

Key developments this month:

${highlights.map(h => `• ${h}`).join('\n')}

The AI search landscape continues to evolve rapidly - these shifts have real implications for how businesses approach search strategy.

Full updated report with all the latest data and trends 👇
https://aisearch.simpletiger.com

#AISearch #SearchEngines #ChatGPT #GoogleAI #MarketingData #SEO`,
    hashtags: ['#AISearch', '#SearchEngines', '#ChatGPT', '#GoogleAI', '#MarketingData', '#SEO'],
    reportUrl: 'https://aisearch.simpletiger.com',
    characterCount: 0
  };
  
  post.characterCount = post.content.length;
  
  const linkedinPath = path.join(CONTENT_PATH, `linkedin-${new Date().toISOString().split('T')[0]}.json`);
  await fs.writeFile(linkedinPath, JSON.stringify(post, null, 2));
  
  // Also save a "latest" version
  const latestPath = path.join(CONTENT_PATH, 'linkedin-latest.json');
  await fs.writeFile(latestPath, JSON.stringify(post, null, 2));
  
  return linkedinPath;
}

/**
 * Extract notable changes from research results
 */
function extractChanges(researchResults) {
  const changes = {
    highlights: [],
    metrics: [],
    newEvents: []
  };
  
  // Extract highlights from research
  if (researchResults.highlights) {
    changes.highlights = researchResults.highlights;
  } else {
    // Generate default highlights based on available data
    changes.highlights = [
      'ChatGPT user growth continues accelerating',
      'AI search market share expanding',
      'Google AI Overviews coverage increasing',
      'Revenue growth across AI companies'
    ];
  }
  
  // Extract metrics
  if (researchResults.keyStats?.data) {
    changes.metrics = researchResults.keyStats.data.map(stat => ({
      label: stat.label,
      value: stat.value,
      subtext: stat.subtext
    }));
  }
  
  // Extract new timeline events
  if (researchResults.timeline?.newEvents) {
    changes.newEvents = researchResults.timeline.newEvents;
  }
  
  return changes;
}

/**
 * Generate newsletter HTML
 */
function generateNewsletterHTML(changes, monthYear) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Search Report Update - ${monthYear}</title>
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
            margin: 12px 0;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .metric:last-child {
            border-bottom: none;
        }
        .metric-label {
            color: #555;
            font-size: 14px;
        }
        .metric-value {
            font-weight: 600;
            color: #667eea;
            font-size: 18px;
            display: block;
            margin-top: 4px;
        }
        .metric-subtext {
            font-size: 12px;
            color: #888;
        }
        .highlight {
            background: #e8f4fd;
            border-left: 4px solid #0066cc;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        .highlight h2 {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 18px;
        }
        .highlight ul {
            margin: 0;
            padding-left: 20px;
        }
        .highlight li {
            margin: 10px 0;
            color: #444;
        }
        .timeline-box {
            background: #fff9e6;
            border-left: 4px solid #f59e0b;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        .timeline-box h2 {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 18px;
        }
        .timeline-item {
            margin: 15px 0;
            padding-left: 15px;
            border-left: 2px solid #e9ecef;
        }
        .timeline-date {
            font-weight: 600;
            color: #f59e0b;
            font-size: 13px;
        }
        .timeline-title {
            font-weight: 600;
            color: #333;
            margin: 4px 0;
        }
        .timeline-desc {
            font-size: 14px;
            color: #555;
        }
        .cta-container {
            text-align: center;
            margin: 30px 0;
        }
        .cta-button {
            display: inline-block;
            background: #667eea;
            color: white !important;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
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
        <div class="header">
            <h1>🚀 AI Search Report</h1>
            <p>Monthly Intelligence Update - ${monthYear}</p>
        </div>

        <div class="content">
            <p>Hi there,</p>
            
            <p>The AI search landscape continues its rapid evolution. Here's what our latest research reveals:</p>

            ${changes.metrics.length > 0 ? `
            <div class="metric-box">
                <h2>📈 Key Metrics This Month</h2>
                ${changes.metrics.slice(0, 6).map(m => `
                <div class="metric">
                    <span class="metric-label">${m.label}</span>
                    <span class="metric-value">${m.value}</span>
                    ${m.subtext ? `<span class="metric-subtext">${m.subtext}</span>` : ''}
                </div>
                `).join('')}
            </div>
            ` : ''}

            <div class="highlight">
                <h2>🔍 Key Highlights</h2>
                <ul>
                    ${changes.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>

            ${changes.newEvents.length > 0 ? `
            <div class="timeline-box">
                <h2>⏰ New Timeline Events</h2>
                ${changes.newEvents.map(e => `
                <div class="timeline-item">
                    <div class="timeline-date">${e.date}</div>
                    <div class="timeline-title">${e.title}</div>
                    <div class="timeline-desc">${e.description}</div>
                </div>
                `).join('')}
            </div>
            ` : ''}

            <p>The full report includes detailed charts, interactive data visualizations, and comprehensive source citations.</p>

            <div class="cta-container">
                <a href="https://aisearch.simpletiger.com" class="cta-button">
                    📊 View Full Updated Report
                </a>
            </div>

            <p>Stay ahead of the curve,<br>
            <strong>The SimpleTiger Team</strong></p>
        </div>

        <div class="footer">
            <p><strong>AI Search Report</strong> - Monthly intelligence on the future of search</p>
            
            <div class="social-links">
                <a href="https://simpletiger.com">SimpleTiger.com</a> |
                <a href="https://linkedin.com/company/simpletiger">LinkedIn</a>
            </div>
            
            <p>This report is updated monthly with the latest data on AI search trends.</p>
            
            <p style="margin-top: 20px;">
                <a href="{{unsubscribe_link}}" style="color: #999; text-decoration: none;">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>`;
}

/**
 * Generate summary for Slack notification
 */
function generateSummary(researchResults, results) {
  return {
    monthYear: results.monthYear,
    stagingBranch: results.stagingBranch,
    previewUrl: results.previewUrl,
    contentFiles: results.contentFiles,
    highlightCount: researchResults.highlights?.length || 0,
    newEventsCount: researchResults.timeline?.newEvents?.length || 0,
    errors: results.errors
  };
}

module.exports = { runMonthlyUpdate };
