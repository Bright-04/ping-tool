# Ping Tool

A dual-interface ping service for keeping Render.com deployments awake by pinging them at regular intervals.

## Features

### Desktop Application (Electron)
- ✅ Cross-platform desktop GUI with system tray support
- ✅ Real-time ping monitoring with visual feedback
- ✅ Configurable ping intervals and timeouts
- ✅ Background operation when minimized to tray
- ✅ Live logging with timestamps and response times

### Command Line Interface  
- ✅ Lightweight CLI service for server deployments
- ✅ Configurable via environment variables
- ✅ Colored console output with status indicators
- ✅ Graceful shutdown handling
- ✅ Process monitoring and error handling

## Requirements
- Node.js 16.x or higher
- npm (Node Package Manager)

## Installation

```bash
# Install all dependencies
npm install
```

## Usage

### Desktop Application (GUI)
```bash
# Start Electron desktop app
npm start

# Development mode with auto-restart
npm run dev
```

### Command Line Interface
```bash
# Run CLI service
npm run cli

# CLI development mode
npm run cli:dev
```

## Configuration

### Desktop Application
Configure through the GUI interface:
- **URL to Ping**: The Render deployment URL
- **Interval (ms)**: Time between pings (default: 60000ms)  
- **Timeout (ms)**: Request timeout (default: 5000ms)

### CLI Service
Create a `.env` file in the project root:
```bash
# Required
URL_TO_PING=https://your-app.onrender.com

# Optional
PING_INTERVAL=60000
TIMEOUT=5000
```

## Project Structure
```
ping-tool/
├── main.js           # Electron main process
├── index.html        # GUI interface  
├── renderer.js       # Electron renderer process
├── index.js          # CLI implementation
├── ping.js           # Shared ping logic for GUI
└── package.json      # Dependencies and scripts
```

## Scripts
- `npm start` - Launch Electron desktop application
- `npm run dev` - Development mode for Electron app
- `npm run cli` - Run CLI service
- `npm run cli:dev` - CLI development mode with auto-restart

## Environment Variables (CLI)
- `URL_TO_PING`: The URL to ping (required for CLI)
- `PING_INTERVAL`: Interval between pings in milliseconds (default: 60000)
- `TIMEOUT`: Request timeout in milliseconds (default: 5000)

## License
MIT License - see [LICENSE](LICENSE) file for details

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both GUI and CLI interfaces
5. Submit a pull request