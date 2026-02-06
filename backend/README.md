# NYDev Form Generator Backend

Production-grade Node/Express API for multi-tenant form generation, registrations, QR verification, and role-based access.

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- JWT auth
- Google OAuth (Passport)

## Setup
1. Install dependencies:
   npm install
2. Create a local environment file:
   cp .env.example .env
3. Start the API:
   npm run dev

## Environment Variables
- PORT
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRES_IN
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_CALLBACK_URL
- CORS_ORIGIN

## Scripts
- npm run dev
- npm start

## API Overview
- GET /api/auth/me
- GET /api/auth/google
- GET /api/auth/google/callback
- GET /api/forms/:formId
- POST /api/forms
- POST /api/forms/:formId/registrations
- GET /api/forms/:formId/registrations
- POST /api/registrations/:registrationId/verify
- GET /api/superadmin/organizations
- PATCH /api/superadmin/organizations/:orgId/plan
