# Render Ping Service

A robust Node.js service that pings multiple Render deployment URLs at regular intervals to prevent them from sleeping.

## Features
- Supports multiple URLs for concurrent pinging
- Configurable ping intervals per URL
- Detailed logging with timestamp and status
- Docker support for containerized deployment
- Automatic retry on failed requests
- Health check endpoint
- Prometheus metrics support

## Requirements
- Node.js 14.x or higher
- npm (Node Package Manager)
- Docker (optional)

## Installation

### Standard Installation
```bash
npm install
```

### Docker Installation
```bash
docker build -t render-ping-service .
docker run -d -p 3000:3000 render-ping-service
```

## Configuration

### Environment Variables
Create a `.env` file:
```bash
# Required
URLS_TO_PING=["https://app1.render.com","https://app2.render.com"]
PING_INTERVAL=60000

# Optional
PORT=3000
RETRY_ATTEMPTS=3
RETRY_DELAY=5000
METRICS_ENABLED=true
```

## Usage

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker
```bash
docker-compose up
```

## API Endpoints
- `GET /health` - Service health check
- `GET /metrics` - Prometheus metrics
- `GET /status` - Ping status for all URLs

## Scripts
- `npm start` - Production mode
- `npm run dev` - Development mode with hot reload
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run build` - Build for production

## Monitoring
- Built-in Prometheus metrics
- Health check endpoint
- Detailed logging with Winston

## License
MIT License

## Contributing
Contributions welcome! Please read our contributing guidelines first.