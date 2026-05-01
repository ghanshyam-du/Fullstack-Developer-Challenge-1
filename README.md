# Fullstack OTP Verification System

A simple fullstack application to test OTP (One-Time Password) features via Email or Phone.

## Project Structure
- `backend/`: Node.js + Express API
- `frontend/`: React + Vite Frontend

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `backend/` folder (if it doesn't exist) and add:
   ```env
   PORT=5000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## Features
- **OTP Request**: Request an OTP via email or phone.
- **OTP Verification**: 6-digit code verification with attempt limiting.
- **Rate Limiting**: Users are blocked for 10 minutes after 3 failed attempts.
- **Session Persistence**: JWT tokens are stored in `localStorage` to keep you logged in.
- **Responsive UI**: Simple and clean interface for testing.

## API Endpoints
- `POST /auth/request-otp`: Request a new OTP.
- `POST /auth/verify-otp`: Verify the code and receive a token.
- `GET /auth/me`: Get current user info (requires Authorization header).
