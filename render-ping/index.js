require('dotenv').config();
const fetch = require('node-fetch');
const chalk = require('chalk');

// Configuration with fallbacks
const URL_TO_PING = process.env.URL_TO_PING || 'https://your-app.onrender.com';
const PING_INTERVAL = parseInt(process.env.PING_INTERVAL || '60000'); // 1 minute in milliseconds
const TIMEOUT = parseInt(process.env.TIMEOUT || '5000'); // 5 seconds timeout

let isShuttingDown = false;

async function pingServer() {
    const startTime = Date.now();
    
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), TIMEOUT);

        const response = await fetch(URL_TO_PING, {
            signal: controller.signal,
            headers: { 'User-Agent': 'Render-Ping-CLI/1.0' }
        });

        clearTimeout(timeout);
        const responseTime = Date.now() - startTime;

        console.log(
            chalk.gray(`[${new Date().toISOString()}]`),
            chalk.green('✓'),
            `Status: ${response.status}`,
            chalk.cyan(`(${responseTime}ms)`)
        );
    } catch (error) {
        const errorMessage = error.name === 'AbortError' 
            ? 'Request timed out' 
            : error.message;

        console.error(
            chalk.gray(`[${new Date().toISOString()}]`),
            chalk.red('✗'),
            chalk.red(errorMessage)
        );
    }
}

// Validate configuration
if (!URL_TO_PING || URL_TO_PING === 'https://your-app.onrender.com') {
    console.error(chalk.red('Error: Please set URL_TO_PING environment variable'));
    console.log(chalk.yellow('Create a .env file with: URL_TO_PING=https://your-app.onrender.com'));
    process.exit(1);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log(chalk.yellow('\nGracefully shutting down...'));
    isShuttingDown = true;
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log(chalk.yellow('\nReceived SIGTERM, shutting down...'));
    isShuttingDown = true;
    process.exit(0);
});

// Initial ping
console.log(chalk.cyan('='.repeat(50)));
console.log(chalk.cyan(`🚀 Starting Render Ping CLI Service`));
console.log(chalk.cyan(`📡 Target URL: ${URL_TO_PING}`));
console.log(chalk.cyan(`⏱️  Ping interval: ${PING_INTERVAL}ms`));
console.log(chalk.cyan(`⏰ Timeout: ${TIMEOUT}ms`));
console.log(chalk.cyan('='.repeat(50)));

pingServer();

// Schedule regular pings
const interval = setInterval(() => {
    if (!isShuttingDown) {
        pingServer();
    } else {
        clearInterval(interval);
    }
}, PING_INTERVAL);
