import { createLogger, format, transports } from 'winston';

// Determine if we are running in a development environment
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Custom log format combining timestamps, colors, and clean error stack traces
 */
const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }), // Automatically captures and prints the full stack trace for errors
  format.splat(),
  format.json()
);

/**
 * Human-readable console format optimized for local debugging
 */
const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] ${level}: ${message}${stack ? `\n${stack}` : ''}`;
  })
);

// Instantiate the application logger framework
export const logger = createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: customFormat,
  defaultMeta: { service: 'nydev-form-service' },
  transports: [
    // Standard error output file tracking
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Full operational logs capture
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Always direct logs directly to the live console during development or container execution
if (isDevelopment || process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: consoleFormat,
    })
  );
}