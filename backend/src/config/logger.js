import { createLogger, format, transports } from 'winston';

// Determine if we are running in a development environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Check if running in a serverless environment (like AWS Lambda, Vercel, etc.)
const isServerless = !!process.env.LAMBDA_TASK_ROOT || !!process.env.VERCEL;

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
    // Always log to the console in production/serverless so CloudWatch/Vercel captures it
    new transports.Console({
      format: isDevelopment ? consoleFormat : customFormat,
    })
  ],
});

// File system writing is strictly reserved for local development environments
if (isDevelopment && !isServerless) {
  // Standard error output file tracking
  logger.add(new transports.File({ filename: 'logs/error.log', level: 'error' }));
  
  // Full operational logs capture
  logger.add(new transports.File({ filename: 'logs/combined.log' }));
}