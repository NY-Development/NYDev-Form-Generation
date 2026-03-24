const env = require('./config/env');
const app = require('./app');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

const server = app.listen(env.PORT || 5000, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║   NYDev Form Generator API Server            ║
║   Port: ${env.PORT || 5000}                                ║
║   Environment: ${env.NODE_ENV}                ║
║   Status: Running (Local) ✓                  ║
╚══════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
