# Render Ping CLI

A standalone CLI tool for keeping Render.com deployments awake by pinging them at regular intervals.

## Installation

```bash
npm install
```

## Usage

```bash
# Run with default settings
npm start

# Run in development mode with auto-restart
npm run dev
```

## Configuration

Create a `.env` file in this directory:

```bash
URL_TO_PING=https://your-app.onrender.com
PING_INTERVAL=60000
TIMEOUT=5000
```

## Environment Variables

- `URL_TO_PING`: The URL to ping (required)
- `PING_INTERVAL`: Interval between pings in milliseconds (default: 60000)
- `TIMEOUT`: Request timeout in milliseconds (default: 5000)
