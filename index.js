const fetch = require('node-fetch');

const URL_TO_PING = 'https://dhlqs-020-034-052-065-067.onrender.com'; 
const PING_INTERVAL = 1 * 60 * 1000; // 10 minutes in milliseconds

async function pingServer() {
    try {
        const response = await fetch(URL_TO_PING);
        console.log(`[${new Date().toISOString()}] Ping successful! Status: ${response.status}`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Ping failed:`, error.message);
    }
}

// Initial ping
pingServer();

// Schedule regular pings
setInterval(pingServer, PING_INTERVAL);

console.log('Server ping service started...');
