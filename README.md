# SmartPrep

An AI-powered interview preparation tool that analyzes your resume and job description to generate a personalized interview report — including likely questions, skill gaps, and a day-by-day prep schedule.

## Features

- Upload your resume (PDF) + paste a job description
- AI-generated technical and behavioral questions tailored to the role
- Match score showing how well your profile fits the job
- Skill gap analysis ranked by severity
- Day-by-day preparation schedule
- Dark/light mode
- Secure authentication with JWT

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Axios, React Router

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, pdf-parse

**AI:** Google Gemini 2.5 Flash

**Deployment:** Vercel (frontend) · Render (backend) · MongoDB Atlas (database)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

```bash
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
```

Create a `.env.local` file:

```
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `MONGO_URI` | Backend | MongoDB Atlas connection string |
| `JWT_SECRET` | Backend | Secret key for signing JWTs |
| `GEMINI_API_KEY` | Backend | Google Gemini API key |
| `NODE_ENV` | Backend | Set to `production` when deploying |
| `FRONTEND_URL` | Backend | Your Vercel frontend URL |
| `VITE_API_URL` | Frontend | Your Render backend URL |
