# Hospital Appointment System

A complete full-stack MERN application for hospital appointment management. Users can register as patients or doctors, log in, browse providers, book or cancel appointments, and review appointment status.

## Project Overview

- Frontend: React, React Router DOM, Axios, Bootstrap
- Backend: Node.js, Express, MongoDB, Mongoose, JWT Authentication, bcryptjs
- Features: user registration, login, role management, doctor listing, appointment booking, cancellation, and dashboard views.

## Folder Structure

```
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  server.js
  package.json
  .env.example
frontend/
  src/
    components/
    context/
    pages/
    services/
    App.jsx
    main.jsx
    index.css
  package.json
  vite.config.js
  index.html
  .env.example
.gitignore
README.md
```

## Installation

### Backend Setup

1. Open a terminal and navigate to `backend/`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file from `.env.example` and set values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the backend server:

```bash
npm run dev
```

### Frontend Setup

1. Open a separate terminal and navigate to `frontend/`.
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Create a `.env` file from `.env.example` if you want to customize the API URL.

4. Start the frontend app:

```bash
npm run dev
```

## Environment Variables

### Backend

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret used for signing JWT tokens

### Frontend

- `VITE_API_URL` - API base URL for requests (default set to `http://localhost:5000/api`)

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register a doctor or patient
- `POST /api/auth/login` - Log in and receive a JWT token

### User Routes

- `GET /api/users/doctors` - Fetch all doctors
- `GET /api/users/patients` - Fetch all patients

### Appointment Routes

- `POST /api/appointments/book` - Book an appointment
- `PUT /api/appointments/cancel/:id` - Cancel an appointment
- `GET /api/appointments` - List all appointments

## Notes

- JWT tokens are stored in `localStorage` and sent automatically with API requests.
- Private routes are protected using authentication middleware and frontend route guards.
- Passwords are hashed with `bcryptjs` and sensitive data is never exposed.

## Screenshots

Add screenshots here after running the application locally.

## Run Locally

1. Start MongoDB or configure a hosted MongoDB Atlas instance.
2. Start the backend and frontend servers as described above.
3. Open the Vite frontend URL in your browser.

---

This repository provides a production-ready base for hospital appointment booking with clean architecture, authentication, and responsive UI.
