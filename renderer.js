const { pingServer } = require('./ping');

let interval;
let isRunning = false;

document.getElementById('toggleBtn').addEventListener('click', () => {
    const button = document.getElementById('toggleBtn');
    const url = document.getElementById('urlInput').value;
    const pingInterval = parseInt(document.getElementById('intervalInput').value);
    const timeout = parseInt(document.getElementById('timeoutInput').value);

    if (!isRunning) {
        startPinging(url, pingInterval, timeout);
        button.textContent = 'Stop';
        isRunning = true;
    } else {
        stopPinging();
        button.textContent = 'Start';
        isRunning = false;
    }
});

function startPinging(url, pingInterval, timeout) {
    pingServer(url, timeout, logMessage);
    interval = setInterval(() => {
        pingServer(url, timeout, logMessage);
    }, pingInterval);
}

function stopPinging() {
    clearInterval(interval);
}

function logMessage(message, type = 'info') {
    const log = document.getElementById('log');
    const entry = document.createElement('div');
    entry.className = type;
    entry.textContent = message;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}