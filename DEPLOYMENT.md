# Deployment Instructions - Day 58

## Option 1: Deploy to Vercel (Recommended)

### Prerequisites
- Vercel account (free at vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Initialize Git and Push to GitHub**
```bash
git add .
git commit -m "Initial commit - MERN stack project"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your GitHub repository
- Vercel will automatically detect the project settings

3. **Configure Environment Variables in Vercel**
- In Vercel project settings, go to "Environment Variables"
- Add the following (optional - for MongoDB):
  - `MONGODB_URI`: Your MongoDB connection string
  - `NODE_ENV`: `production`

4. **Deploy**
- Click "Deploy"
- Wait for the build to complete
- Your live URL will be provided

### Vercel Configuration
The project includes `vercel.json` for custom routing:
- API routes (`/api/*`) go to the Express server
- All other routes serve the React app

---

## Option 2: Deploy to Netlify

### Prerequisites
- Netlify account (free at netlify.com)
- Git repository

### Steps

1. **Initialize Git and Push to GitHub**
```bash
git add .
git commit -m "Initial commit - MERN stack project"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect your GitHub repository

3. **Configure Build Settings**
- **Build command**: `npm run build`
- **Publish directory**: `client/build`

4. **Configure Environment Variables**
- In Site settings → Environment variables
- Add `MONGODB_URI` (optional)
- Add `NODE_ENV`: `production`

5. **Deploy**
- Click "Deploy site"
- Your live URL will be provided

### Netlify Configuration
The project includes `netlify.toml` for:
- Build settings
- API route redirects

---

## Environment Variables

### For Production (Vercel/Netlify Dashboard)
- `MONGODB_URI`: MongoDB connection string (optional - uses in-memory storage if not set)
- `NODE_ENV`: `production`
- `PORT`: Automatically set by platform

### For Local Development
Copy `.env.example` to `.env` and configure:
```bash
MONGODB_URI=mongodb://localhost:27017/mern-day58
PORT=5000
NODE_ENV=development
```

---

## Verification

After deployment, verify:
1. ✅ Live URL is accessible
2. ✅ API endpoints work (`/api/health`, `/api/items`)
3. ✅ Can add and view items
4. ✅ No console errors
5. ✅ Responsive design works

---

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed
- Check Node.js version (use Node 18+)
- Verify build command in deployment settings

### API Errors
- Check environment variables are set correctly
- Verify MongoDB URI format (if using MongoDB)
- Check server logs in deployment platform

### Routing Issues
- Ensure `vercel.json` or `netlify.toml` is committed
- Check that static files are in correct directory
- Verify API route patterns

---

## Performance Optimization

The project includes:
- React production build (minified, optimized)
- Express server with proper middleware
- Static file serving
- CORS configuration

For additional optimization:
- Add image optimization
- Implement caching strategies
- Use CDN for static assets
- Enable gzip compression
