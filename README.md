A note-taking application and Google Docs clone built with [Quill]('https://github.com/slab/quill')(rich text editor) to experiment with UI libraries and frameworks.

# Prerequisites
- Node.js
- MongoDB (local or Atlas)

# Tech Stack
**Frontend**
- React 18 + Vite
- React Router v7
- Quill (rich text editor)
- TailwindCSS + DaisyUI
- Axios
- React Hot Toast

**Backend**
- Express.js
- MongoDB (Mongoose)
- Upstash Rate Limiting
- CORS
 
 # Features
- Create, edit, and delete notes
- Rich text editing with Quill
- Clean, modern UI with TailwindCSS + DaisyUI
- Rate limiting protection
- RESTful API
 

# Installation

**Backend**
cd backend
npm install

**Frontend**
cd frontend
npm install

# Environment Variables 
Create .env in backend/:
MONGODB_URI=your_mongodb_uri
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_token
PORT=3000

# Run Backend + Frontend 
cd dir && npm run dev
