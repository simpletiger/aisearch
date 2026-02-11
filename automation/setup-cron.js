/**
 * Setup Script for Monthly AI Search Report Updates
 * Configures cron job to run on the 1st of every month
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class CronSetup {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
  }

  async install() {
    console.log('🚀 Setting up AI Search Report monthly automation...\n');

    try {
      // 1. Create necessary directories
      await this.createDirectories();

      // 2. Install dependencies
      await this.installDependencies();

      // 3. Setup environment variables
      await this.setupEnvironmentTemplate();

      // 4. Create staging environment configuration
      await this.setupStagingEnvironment();

      // 5. Setup cron job
      await this.setupCronJob();

      // 6. Create manual run script
      await this.createRunScript();

      // 7. Create monitoring script
      await this.createMonitoringScript();

      console.log('✅ Setup completed successfully!\n');
      console.log('📋 Next steps:');
      console.log('1. Configure your environment variables in .env');
      console.log('2. Set up staging subdomain (optional)');
      console.log('3. Test manual run: npm run update-report');
      console.log('4. Cron job will run automatically on 1st of each month at 9:00 AM');

    } catch (error) {
      console.error('❌ Setup failed:', error);
      throw error;
    }
  }

  async createDirectories() {
    console.log('📁 Creating directory structure...');
    
    const directories = [
      'automation',
      'content',
      'logs',
      'staging'
    ];

    for (const dir of directories) {
      const dirPath = path.join(this.projectRoot, dir);
      try {
        await fs.mkdir(dirPath, { recursive: true });
        console.log(`   ✓ Created ${dir}/`);
      } catch (error) {
        if (error.code !== 'EEXIST') {
          throw error;
        }
      }
    }
  }

  async installDependencies() {
    console.log('\n📦 Installing required dependencies...');
    
    const dependencies = [
      'node-cron',
      'axios',
      'cheerio',
      'dotenv'
    ];

    try {
      // Check if package.json exists and update it
      const packagePath = path.join(this.projectRoot, 'package.json');
      const packageData = JSON.parse(await fs.readFile(packagePath, 'utf8'));
      
      // Add new dependencies
      packageData.dependencies = {
        ...packageData.dependencies,
        'node-cron': '^3.0.0',
        'axios': '^1.6.0',
        'cheerio': '^1.0.0',
        'dotenv': '^16.0.0'
      };

      // Add scripts
      packageData.scripts = {
        ...packageData.scripts,
        'update-report': 'node automation/cron-job.js',
        'setup-cron': 'node automation/setup-cron.js',
        'monitor-cron': 'node automation/monitor.js'
      };

      await fs.writeFile(packagePath, JSON.stringify(packageData, null, 2));
      console.log('   ✓ Updated package.json');

      // Install dependencies
      await execAsync('npm install', { cwd: this.projectRoot });
      console.log('   ✓ Dependencies installed');

    } catch (error) {
      console.error('   ❌ Failed to install dependencies:', error.message);
      throw error;
    }
  }

  async setupEnvironmentTemplate() {
    console.log('\n🔧 Setting up environment configuration...');
    
    const envTemplate = `# AI Search Report Automation Configuration

# HubSpot Integration (Optional - for newsletter automation)
HUBSPOT_API_KEY=your_hubspot_api_key_here

# Slack Notifications (Optional)
SLACK_WEBHOOK_URL=your_slack_webhook_url_here

# Research Sources (Optional - API keys for better data collection)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Staging Environment
STAGING_SUBDOMAIN=aisearch-staging
VERCEL_TOKEN=your_vercel_token_here

# Notification Settings
NOTIFICATION_EMAIL=your_email@example.com
ENABLE_SLACK_NOTIFICATIONS=false
ENABLE_EMAIL_NOTIFICATIONS=true

# Cron Settings
CRON_TIMEZONE=America/New_York
AUTO_DEPLOY_TO_STAGING=true
AUTO_SEND_NEWSLETTER=false
`;

    const envPath = path.join(this.projectRoot, '.env.template');
    await fs.writeFile(envPath, envTemplate);
    console.log('   ✓ Created .env.template');

    // Create actual .env if it doesn't exist
    const actualEnvPath = path.join(this.projectRoot, '.env');
    try {
      await fs.access(actualEnvPath);
      console.log('   ✓ .env already exists');
    } catch {
      await fs.copyFile(envPath, actualEnvPath);
      console.log('   ✓ Created .env (please configure your API keys)');
    }
  }

  async setupStagingEnvironment() {
    console.log('\n🎭 Setting up staging environment...');
    
    // Create staging configuration
    const stagingConfig = {
      name: "ai-search-staging",
      description: "Staging environment for AI Search Report updates",
      vercelProject: "aisearch-staging",
      githubBranch: "staging",
      autoPreview: true,
      instructions: [
        "1. Create a staging subdomain in Vercel (e.g., aisearch-staging.simpletiger.com)",
        "2. Configure it to auto-deploy from staging branches",
        "3. Set up branch protection rules to prevent direct commits to main",
        "4. The automation will create staging branches for each monthly update"
      ]
    };

    await fs.writeFile(
      path.join(this.projectRoot, 'staging/config.json'),
      JSON.stringify(stagingConfig, null, 2)
    );

    // Create staging deployment script
    const deployScript = `#!/bin/bash
# Staging deployment script for AI Search Report

echo "🎭 Deploying to staging environment..."

# Create staging branch with current date
BRANCH_NAME="staging-$(date +%Y-%m-%d)"

# Create and switch to staging branch
git checkout -b $BRANCH_NAME

# Copy staging data to main data file
cp src/data/staging.ts src/data/index.ts

# Commit changes
git add .
git commit -m "Monthly update staging - $(date +%Y-%m-%d)"

# Push to remote
git push origin $BRANCH_NAME

echo "✅ Staging branch $BRANCH_NAME created and pushed"
echo "🌐 Preview will be available at: https://aisearch-staging.simpletiger.com"
`;

    await fs.writeFile(
      path.join(this.projectRoot, 'staging/deploy.sh'),
      deployScript
    );

    // Make script executable
    try {
      await execAsync('chmod +x staging/deploy.sh', { cwd: this.projectRoot });
    } catch (error) {
      // Windows doesn't need chmod
    }

    console.log('   ✓ Staging environment configured');
  }

  async setupCronJob() {
    console.log('\n⏰ Setting up cron job...');

    const cronScript = `const cron = require('node-cron');
const { MonthlyUpdateCron } = require('./cron-job');

console.log('🚀 AI Search Report cron service starting...');

// Run on the 1st of every month at 9:00 AM
cron.schedule('0 9 1 * *', async () => {
  console.log('⏰ Monthly update cron job triggered');
  
  try {
    const updater = new MonthlyUpdateCron();
    await updater.execute();
  } catch (error) {
    console.error('❌ Monthly update failed:', error);
  }
}, {
  scheduled: true,
  timezone: process.env.CRON_TIMEZONE || 'America/New_York'
});

// Health check endpoint (runs every 24 hours)
cron.schedule('0 0 * * *', () => {
  console.log('💓 Cron service health check - running normally');
}, {
  scheduled: true,
  timezone: process.env.CRON_TIMEZONE || 'America/New_York'
});

console.log('✅ Cron jobs scheduled successfully');
console.log('📅 Next run: 1st of next month at 9:00 AM');

// Keep the process running
process.on('SIGTERM', () => {
  console.log('📤 Cron service shutting down gracefully...');
  process.exit(0);
});
`;

    await fs.writeFile(
      path.join(this.projectRoot, 'automation/cron-service.js'),
      cronScript
    );

    console.log('   ✓ Cron job configuration created');
    console.log('   ✓ Scheduled for 1st of every month at 9:00 AM EST');
  }

  async createRunScript() {
    console.log('\n📝 Creating manual run script...');

    const runScript = `#!/usr/bin/env node
/**
 * Manual run script for AI Search Report updates
 * Usage: npm run update-report
 */

require('dotenv').config();
const { MonthlyUpdateCron } = require('./automation/cron-job');

async function runUpdate() {
  console.log('🚀 Running manual AI Search Report update...');
  
  try {
    const updater = new MonthlyUpdateCron();
    const result = await updater.execute();
    
    console.log('\\n✅ Update completed successfully!');
    console.log('📁 Check the following locations:');
    console.log('   - Staging data: src/data/staging.ts');
    console.log('   - Newsletter draft: content/newsletter-draft.json');
    console.log('   - LinkedIn draft: content/linkedin-draft.json');
    console.log('   - Execution log: logs/');
    
  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

runUpdate();
`;

    await fs.writeFile(
      path.join(this.projectRoot, 'run-update.js'),
      runScript
    );

    console.log('   ✓ Manual run script created');
    console.log('   ✓ Use "npm run update-report" to run manually');
  }

  async createMonitoringScript() {
    console.log('\n📊 Creating monitoring script...');

    const monitorScript = `#!/usr/bin/env node
/**
 * Monitoring script for AI Search Report automation
 * Checks logs, status, and provides diagnostics
 */

const fs = require('fs').promises;
const path = require('path');

async function checkStatus() {
  console.log('📊 AI Search Report Automation Status\\n');
  
  try {
    // Check if logs directory exists and get recent logs
    const logsDir = path.join(__dirname, 'logs');
    
    try {
      const logFiles = await fs.readdir(logsDir);
      const recentLogs = logFiles.filter(f => f.startsWith('execution-')).sort().slice(-5);
      
      console.log('📋 Recent Executions:');
      for (const logFile of recentLogs) {
        const logContent = await fs.readFile(path.join(logsDir, logFile), 'utf8');
        const log = JSON.parse(logContent);
        const status = log.status === 'success' ? '✅' : '❌';
        const duration = Math.round(log.duration / 1000);
        console.log(\`   \${status} \${log.timestamp.split('T')[0]} - \${log.status} (\${duration}s)\`);
      }
    } catch {
      console.log('📋 No execution logs found yet');
    }
    
    // Check cron service status
    console.log('\\n⏰ Cron Configuration:');
    console.log('   Schedule: 1st of every month at 9:00 AM EST');
    console.log('   Next run: [Check cron-service.js for exact timing]');
    
    // Check environment configuration
    console.log('\\n🔧 Configuration Status:');
    const envExists = await fs.access('.env').then(() => true).catch(() => false);
    console.log(\`   Environment file: \${envExists ? '✅ Found' : '❌ Missing'}\`);
    
    // Check staging setup
    const stagingExists = await fs.access('staging/config.json').then(() => true).catch(() => false);
    console.log(\`   Staging config: \${stagingExists ? '✅ Configured' : '❌ Missing'}\`);
    
    console.log('\\n💡 Commands:');
    console.log('   npm run update-report    - Run manual update');
    console.log('   npm run monitor-cron     - Show this status');
    console.log('   node automation/cron-service.js - Start cron service');
    
  } catch (error) {
    console.error('❌ Status check failed:', error);
  }
}

checkStatus();
`;

    await fs.writeFile(
      path.join(this.projectRoot, 'automation/monitor.js'),
      monitorScript
    );

    console.log('   ✓ Monitoring script created');
    console.log('   ✓ Use "npm run monitor-cron" to check status');
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new CronSetup();
  setup.install().catch(console.error);
}

module.exports = { CronSetup };