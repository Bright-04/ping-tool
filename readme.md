# Render Ping Service

A simple Node.js service that pings a Render deployment URL at regular intervals to prevent it from sleeping.

## Features
- Automatically pings specified URL every minute
- Console logging of ping status with timestamps
- Error handling for failed requests

## Requirements
- Node.js 12.x or higher
- npm (Node Package Manager)

## Installation
1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Configuration
1. Create a `.env` file in the project root:
```bash
URL_TO_PING=your-render-url
PING_INTERVAL=60000
```

2. Configure the environment variables:
- `URL_TO_PING`: The URL of your Render deployment to ping
- `PING_INTERVAL`: Time between pings in milliseconds (default: 60000)

## Usage
Start the service:
```bash
npm start
```

The service will automatically:
- Start pinging the specified URL at the configured interval
- Log successful pings and any errors to the console
- Continue running until stopped with Ctrl+C

## Scripts
- `npm start`: Start the ping service
- `npm run dev`: Run with nodemon for development
- `npm test`: Run tests (if configured)

## Troubleshooting
- Ensure your URL is correctly formatted and accessible
- Check console logs for any error messages
- Verify your environment variables are properly set

## License
MIT License

## Contributing
Pull requests are welcome. For major changes, please open an issue first.