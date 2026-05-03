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

### 4. Fill in backend environment values

Open `backend/.env` and set values for all variables below:

```env
# MongoDB
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/travelnest

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App settings
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Email (Nodemailer)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Admin
ADMIN_EMAIL=admin@travelnest.com
ADMIN_SECRET=your_admin_secret_to_register

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback
```

#### Required backend variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `CLOUDINARY_CLOUD_NAME` — Cloudinary account name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `PORT` — backend port (default `8000`)
- `NODE_ENV` — `development` or `production`
- `CLIENT_URL` — frontend URL for redirects and cookies
- `EMAIL_USER` — SMTP email account for password reset
- `EMAIL_PASS` — SMTP email password/app password
- `ADMIN_EMAIL` — default admin email used in admin creation example
- `ADMIN_SECRET` — admin registration secret

#### Optional backend variables
- `GOOGLE_CLIENT_ID` — Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` — Google OAuth client secret
- `GOOGLE_CALLBACK_URL` — Google callback route

### 5. Fill in frontend environment values

Open `frontend/.env` and set:

```env
VITE_SERVER_URL=http://localhost:8000
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

## Create the first admin user

After the backend is running, send a request to create the first admin:

```http
POST http://localhost:8000/api/admin/create
Content-Type: application/json
```

Request body:

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "yourpassword",
  "adminSecret": "your_admin_secret_to_register"
}
```

## Full environment variable list

### Backend (`backend/.env`)
- `MONGO_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `PORT`
- `NODE_ENV`
- `CLIENT_URL`
- `EMAIL_USER`
- `EMAIL_PASS`
- `ADMIN_EMAIL`
- `ADMIN_SECRET`
- `GOOGLE_CLIENT_ID` (optional)
- `GOOGLE_CLIENT_SECRET` (optional)
- `GOOGLE_CALLBACK_URL` (optional)

### Frontend (`frontend/.env`)
- `VITE_SERVER_URL`

## Project structure

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

```env
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=your_port_or_host_default
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
EMAIL_USER=your_production_email
EMAIL_PASS=your_production_email_password
ADMIN_EMAIL=admin@your-domain.com
ADMIN_SECRET=your_production_admin_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-domain.com/api/auth/google/callback
```

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

```text
mongodb+srv://<username>:<password>@cluster0.mongodb.net/TravelNest?retryWrites=true&w=majority
```

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