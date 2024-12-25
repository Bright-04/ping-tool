require('dotenv').config();
const fetch = require('node-fetch');
const chalk = require('chalk');

// Configuration with fallbacks
const URL_TO_PING = process.env.URL_TO_PING || 'https://dhlqs-020-034-052-065-067.onrender.com';
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
            headers: { 'User-Agent': 'Render-Ping-Service/1.0' }
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

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log(chalk.yellow('\nGracefully shutting down...'));
    isShuttingDown = true;
    process.exit(0);
});

// Initial ping
console.log(chalk.cyan(`Starting ping service for ${URL_TO_PING}`));
console.log(chalk.cyan(`Ping interval: ${PING_INTERVAL}ms`));
pingServer();

// Schedule regular pings
const interval = setInterval(() => {
    if (!isShuttingDown) {
        pingServer();
    } else {
        clearInterval(interval);
    }
}, PING_INTERVAL);