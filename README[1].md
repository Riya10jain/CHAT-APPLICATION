# Realtime Chat App (Express + Socket.IO)

## What this is
A minimal real-time chat application with frontend and backend integrated.
- Backend: Node.js + Express + Socket.IO
- Frontend: Static HTML/CSS/JS served from Express

## Run locally
1. Install Node.js (v14+ recommended).
2. Open a terminal, navigate to the project folder and run:
   ```
   npm install
   npm start
   ```
3. Open `http://localhost:3000` in your browser. Open multiple tabs to test real-time chat.

## Notes / Next steps
- This is a simple demo (no database, no authentication).
- To deploy: use services like Heroku, Render, Railway, or a VPS and expose port 3000.
- You can extend it with rooms, message persistence (MongoDB/Postgres), file upload, authentication (JWT, OAuth), and UI improvements.
