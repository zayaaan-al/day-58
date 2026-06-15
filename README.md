# MERN Stack Deployment - Day 58

A full-stack MERN application deployed on Vercel.

## Tech Stack
- **Frontend**: React 18
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Vercel

## Features
- Create and display items
- Real-time API communication
- Responsive design
- Production-optimized build

## Environment Variables
Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/mern-day58
PORT=5000
NODE_ENV=production
```

## Local Development
1. Install dependencies:
```bash
npm install
cd client && npm install
```

2. Start the development server:
```bash
npm run dev
```

## Deployment
This project is configured for Vercel deployment:
- Frontend builds automatically
- Backend API routes are handled via serverless functions
- Environment variables configured in Vercel dashboard

## Live URL
[Deployed on Vercel] - Add your Vercel URL after deployment

## Deployment Status
- ✅ Project configured for Vercel
- ✅ Simplified configuration for automatic detection
- ⏳ Awaiting deployment
