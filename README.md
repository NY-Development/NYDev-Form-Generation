# NYDev-Form-Generator

Form builder platform with an org admin dashboard, template library, integrations, and a public registration flow.

## Project Structure

```
backend/
  src/
    app.js
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
frontend/
  src/
    components/
    pages/
    router/
    services/
    utils/
```

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

## Getting Started

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

The frontend defaults to the Vite dev server. If you use a different backend port, update the frontend API base URL in the service layer.

## Environment Variables

Create your own `.env` files in each package root as needed.

### backend/.env (example)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nydev
JWT_SECRET=replace_me
GOOGLE_CLIENT_ID=replace_me
GOOGLE_CLIENT_SECRET=replace_me
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
```

### frontend/.env (example)

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Scripts

### Backend

- `npm run dev` - start API server with reload
- `npm start` - start API server

### Frontend

- `npm run dev` - start Vite dev server
- `npm run build` - build production assets
- `npm run preview` - preview production build

## Notes

- Routes are protected by role-based guards on the frontend.
- The form builder is split into steps under `/builder/step-*`.
- Org admin pages live under `/org/*` routes.
