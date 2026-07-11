# Prepzy

Prepzy is a collaborative coding platform built for live pair programming, interview practice, and technical collaboration. It combines real-time video, chat, a shared code editor, and coding problem workflows into a single experience.

## Project structure

- `backend/` - Express API server, database models, authentication, real-time integration with Stream and Clerk, and Inngest functions.
- `frontend/` - React + Vite UI with Clerk auth, React Router, React Query, Monaco editor, and session / problem pages.
- `vercel.json` - Vercel rewrite configuration for SPA routing.
- `package.json` - root scripts to install and build both backend and frontend.

## Tech stack

- Backend
  - Node.js
  - Express
  - MongoDB / Mongoose
  - Clerk for authentication
  - Stream Chat + Stream Video SDK for live communication
  - Inngest for event handling
  - dotenv for environment configuration
  - cors for cross-origin support
- Frontend
  - React
  - Vite
  - Tailwind CSS + DaisyUI
  - Clerk React
  - React Router v7
  - React Query
  - Monaco Editor via `@monaco-editor/react`
  - Stream Video React SDK
  - Axios for HTTP requests
  - canvas-confetti for success feedback

## Services used

- Clerk: user authentication and session management.
- Stream: real-time chat and video call service.
- MongoDB: persistent session and user storage.
- Inngest: event-driven user sync on Clerk events.
- Judge0 (client integration): runs code execution from the browser.

## Features

- User authentication with Clerk.
- Live session creation with a selected coding problem and difficulty.
- Real-time video call and chat powered by Stream.
- Shared code editor with live updates across collaborators.
- Code execution and result display from the frontend.
- Active session discovery and session join-by-code.
- Host-controlled session ending and completed session cleanup.
- Recent sessions history for each authenticated user.
- Problem library and practice page with code editor and test feedback.

## Backend routes

### `/api/inngest`
- Managed by Inngest Express middleware.
- Handles Clerk event webhooks for user creation and deletion.
- Keeps the backend user database and Stream user profile in sync.

### `/api/chat/token`
- Method: `GET`
- Protected route.
- Returns a Stream token for the authenticated user.
- Response includes `token`, `userId`, `userName`, and `userImage`.

### `/api/sessions`
- `POST /api/sessions`
  - Create a new live session.
  - Requires `problem` and `difficulty` in the request body.
  - Creates a Stream video call and chat channel.
- `GET /api/sessions/active`
  - Returns all currently active sessions.
- `GET /api/sessions/my-active`
  - Returns active sessions for the current authenticated user.
- `GET /api/sessions/my-recent`
  - Returns completed sessions for the current authenticated user.
- `POST /api/sessions/join-by-code`
  - Join an active session using a shareable session code (`callId`).
- `POST /api/sessions/:id/join`
  - Join an active session by database session ID.
- `POST /api/sessions/:id/leave`
  - Leave a session as a participant.
- `POST /api/sessions/:id/end`
  - End a live session as the host.
  - Deletes Stream call and channel resources.
- `GET /api/sessions/:id`
  - Get details for a single session by ID.
- `DELETE /api/sessions/:id`
  - Delete a completed/past session record.

### Health check
- `GET /health`
  - Returns a JSON status message when the API is running.

## Frontend pages and routes

- `/`
  - Public landing page with product introduction and sign-in CTA.
- `/dashboard`
  - Authenticated user dashboard.
  - Displays active sessions, recent sessions, and session creation modal.
- `/problems`
  - Problem library page.
  - Lists available coding problems with categories and difficulty badges.
- `/problem/:id`
  - Problem detail page.
  - Includes full problem description, Monaco code editor, run button, and output panel.
- `/session/:id`
  - Real-time collaborative session page.
  - Contains video call UI, chat panel, shared code editor, and runtime output.

## Key frontend features

- `DashboardPage.jsx`
  - Creates sessions.
  - Shows live sessions and recent sessions.
  - Uses `useSessions` hooks for API access.
- `ProblemPage.jsx`
  - Code editor and problem walkthrough experience.
  - Saves code to local storage and allows run/test interactions.
- `SessionPage.jsx`
  - Loads session metadata, connects to Stream, and initializes live collaboration.
  - Supports host/participant join logic and session end flows.
- `Navbar.jsx`
  - Shared navigation with Clerk `UserButton` and route links.
- `CreateSessionModal.jsx`
  - Let users choose a problem and difficulty before creating a session.
- `ActiveSessions.jsx`
  - Displays active real-time sessions.
  - Supports join-by-code and direct session join.
- `VideoCallUI.jsx`
  - Stream video call interface with participant count and chat toggle.

## Data and models

- `backend/src/models/User.js`
  - Stores Clerk user metadata and editor preferences.
- `backend/src/models/Session.js`
  - Stores problem, difficulty, host, participant, status, and Stream `callId`.

## Environment variables

### Required backend variables

- `PORT`
- `DB_URL`
- `NODE_ENV`
- `CLIENT_URL`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`
- `STREAM_API_KEY`
- `STREAM_API_SECRET`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

### Required frontend variables

- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_API_URL` (optional, defaults to `/api`)

## Local development

1. Install dependencies
   - `npm install`
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
2. Start backend
   - `npm run dev --prefix backend`
3. Start frontend
   - `npm run dev --prefix frontend`
4. Open the frontend at `http://localhost:5173`

## Production build

- `npm run build`
  - Installs backend and frontend dependencies and builds the frontend.
- `npm run start`
  - Starts the backend server from `backend/src/server.js`.

## Notes

- The frontend uses Clerk-based protected routing so users must be signed in to access `/dashboard`, `/problems`, `/problem/:id`, and `/session/:id`.
- Live collaboration is implemented using Stream video and messaging; session state is persisted in MongoDB.
- Session codes are generated from `callId` and can be shared for direct join access.
- Inngest handles Clerk user lifecycle events and automatically syncs user records when new users are created or deleted.
