const fetch = require('node-fetch');

async function pingServer(url, timeout, logCallback) {
    const startTime = Date.now();
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            signal: controller.signal,
            headers: { 'User-Agent': 'Render-Ping-Service/1.0' }
        });

        clearTimeout(timeoutId);
        const responseTime = Date.now() - startTime;

        logCallback(`[${new Date().toISOString()}] Status: ${response.status} (${responseTime}ms)`, 'success');
    } catch (error) {
        const errorMessage = error.name === 'AbortError' 
            ? 'Request timed out' 
            : error.message;
        logCallback(`[${new Date().toISOString()}] Error: ${errorMessage}`, 'error');
    }
}

module.exports = { pingServer };
