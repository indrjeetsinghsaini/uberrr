# Uberrr: Ride-Sharing Web App

A full-stack ride-sharing app inspired by Uber. Frontend: React. Backend: Node.js/Express with MongoDB.

## Quick Start
1. Clone: `git clone https://github.com/indrjeetsinghsaini/uberrr.git`
2. Install: `npm install` (root), then `cd frontend && npm install` and `cd ../backend && npm install`
3. Env: Copy `.env.example` to `.env` in frontend/backend and fill values (e.g., DB URI).
4. Run Backend: `cd backend && npm start` (http://localhost:5000)
5. Run Frontend: `cd frontend && npm run dev` (http://localhost:3000)
6. Test: Frontend calls backend APIs (e.g., /api/users).

## Tech Stack
- Frontend: React, Axios (for API calls), React Router (routing)
- Backend: Express, Mongoose (MongoDB), JWT (auth), CORS
- DB: MongoDB (use Atlas for free cloud hosting)

## Deployment
- Frontend: Vercel/Netlify (connect GitHub repo, deploy /frontend)
- Backend: Heroku/Railway (deploy /backend, add MongoDB add-on)
- Full Setup: Update frontend API base URL to production backend (e.g., https://your-backend.herokuapp.com)

## Features
- User registration/login
- Ride booking/search
- Real-time maps (integrate Google Maps API)

## Contributing
Fork, PR, follow ESLint rules.

License: MIT
