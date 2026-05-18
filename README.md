# TravelNest – Full-Stack Airbnb Clone

TravelNest is a full-stack vacation rental app built with React, Vite, Node.js, Express, and MongoDB. It includes user authentication, listing management, bookings, reviews, wishlist, messaging, and an admin panel.

## Clone, install, and run

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/TravelNest_Complete.git
cd TravelNest_Complete
```

> Replace the GitHub URL with your own repository address.

### 2. Install dependencies

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd ../frontend
npm install
```

### 3. Create environment files

Backend sample file: `backend/.env.example`

Frontend sample file: `frontend/.env.example`

Copy both examples to `.env`:

```bash
cd backend
copy .env.example .env
cd ../frontend
copy .env.example .env
```

On macOS/Linux:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```







This variable is optional. If it is not set, the frontend defaults to `http://localhost:8000`.

### 6. Start the backend

```bash
cd backend
npm run dev
```

Look for:
- `Server started on port 8000`
- `MongoDB connected`

### 7. Start the frontend

```bash
cd ../frontend
npm run dev
```

### 8. Open the app

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`



```
TravelNest_Complete/
  backend/
    config/       # DB, auth, Cloudinary, email, passport
    controllers/  # auth, user, listing, booking, review, admin, message, wishlist
    middleware/   # auth, file uploads, admin checks
    model/        # User, Listing, Booking, Review, Message
    routes/       # Express routes
    .env.example  # backend environment template
    .env          # local backend environment (ignored)
    index.js      # server entrypoint

  frontend/
    src/
      Context/    # Auth and app state contexts
      Component/  # reusable UI components
      pages/      # app views
    .env.example  # frontend environment template
    .env          # local frontend environment (ignored)
    package.json
```

## Deployment

This section explains how to deploy TravelNest for production.

### Recommended production architecture

- Frontend: deploy the built React app to a static hosting provider (Vercel, Netlify, Cloudflare Pages)
- Backend: deploy the Express API to a Node.js host (Render, Railway, Fly, Heroku, DigitalOcean App Platform)
- Database: use a managed MongoDB deployment (MongoDB Atlas, ScaleGrid, or Atlas free tier)
- File storage: use Cloudinary for image uploads
- Email: use a real SMTP provider or Gmail app password for Nodemailer

### Build and deploy frontend

1. From the `frontend` folder, install dependencies:

```bash
cd frontend
npm install
```

2. Build the production app:

```bash
npm run build
```

3. Deploy the generated `dist/` folder to your static host.

4. If your host supports environment variables, set:

```env
VITE_SERVER_URL=https://your-backend-domain.com
```

5. If you deploy to a static host with a custom domain, make sure `CLIENT_URL` in the backend matches the frontend domain.

### Build and deploy backend

1. From the `backend` folder, install dependencies:

```bash
cd backend
npm install
```

2. Set environment variables in your host or `.env` file for production.

3. Start the server with the production command:

```bash
npm start
```

If your host uses a different default port, make sure `PORT` is set accordingly.

### Environment variables for production

The backend requires the same variables as local development, but with production values.



#### Important production notes

- `NODE_ENV` must be `production` for secure cookies and optimized server behavior.
- Use a strong `JWT_SECRET` and do not share it in source control.
- Use a real `EMAIL_PASS` from a trusted SMTP provider.
- `CLIENT_URL` should be the exact URL of your deployed frontend.
- `GOOGLE_CALLBACK_URL` must match the redirect URI configured in your Google Cloud credentials.

### Configure MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Add your app IP address or enable access from anywhere.
3. Create a database user and password.
4. Copy the connection string into `MONGO_URI`.

Example:

``text
mongodb+srv://<username>:<password>@cluster0.mongodb.net/TravelNest?retryWrites=true&w=majority
``

### Configure Cloudinary

1. Sign in to Cloudinary.
2. Create an account and copy the cloud name, API key, and API secret.
3. Add those values to `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

### Configure email for production

- Gmail: use an app password if you have 2FA enabled.
- Alternative providers: SendGrid, Mailgun, SMTP.com.

### Example production deployment flow

1. Deploy backend to a Node.js host.
2. Deploy frontend to static hosting.
3. Set all environment variables in both services.
4. Confirm `VITE_SERVER_URL` points to your backend URL.
5. Confirm backend `CLIENT_URL` matches the frontend URL.
6. Test the app in production mode.

### Optional: single-host deployment

If you want to host both frontend and backend together:

- Build the frontend and serve it from the backend using a static middleware.
- Alternatively, deploy the frontend to a single host that supports both frontend and backend apps.

## Notes

- Do not commit `.env` files to Git. They contain secrets.
- Use `.gitignore` to keep local configs and node_modules out of version control.
- If the backend fails to start, verify `backend/.env` values and MongoDB connection.
- If the frontend cannot reach the backend, make sure the backend is running and `VITE_SERVER_URL` is set correctly.

## Recommended local workflow

- Terminal 1: `cd backend && npm run dev`
- Terminal 2: `cd frontend && npm run dev`

## Future improvements

You can extend TravelNest with:
- Map-based search and location autocomplete
- stripe payment integration
- booking calendar availability and blocked dates
- host earnings dashboard
- review moderation and host responses
- saved searches and recommendations
- improved responsive mobile UI

---

Happy building with TravelNest!
