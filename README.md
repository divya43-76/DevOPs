# PathFinder – Career Guidance Platform

Full-stack MERN application for personalized career guidance for 10th and 12th students, with admin management of courses and government exams.

## Project Structure

```text
pathfinder/
  backend/
    server.js
    config/
      db.js
    models/
      User.js
      Course.js
      GovernmentExam.js
    controllers/
      authController.js
      courseController.js
      examController.js
    routes/
      authRoutes.js
      courseRoutes.js
      examRoutes.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
    seed/
      seedData.js
    .env           (create from .env.example)
    .env.example
    package.json
  frontend/
    index.html
    vite.config.js
    tailwind.config.js
    postcss.config.js
    package.json
    src/
      main.jsx
      App.jsx
      index.css
      api/axios.js
      context/AuthContext.jsx
      components/
        Navbar.jsx
        Sidebar.jsx
        CourseCard.jsx
        ExamCard.jsx
        ProtectedRoute.jsx
      pages/
        Login.jsx
        Register.jsx
        StudentDashboard.jsx
        AdminDashboard.jsx
        CourseDetails.jsx
```

## Installation

Clone the repository (or open the `pathfinder` folder), then:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Backend Setup

### Environment Variables

Create `backend/.env` based on `.env.example`:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/pathfinder_db
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
```

### MongoDB

- Install and run MongoDB locally, or use a cloud MongoDB URI.
- Ensure the URI in `MONGO_URI` is reachable.

### Seeding the Database

From the `backend` folder:

```bash
npm run seed
```

This creates:

- One admin user: `admin@pathfinder.com` / `Admin@123`
- Sample courses: B.Tech CSE, MBBS, B.Com, BA Psychology, BBA, LLB
- Sample government exams: UPSC, SSC, IBPS, NDA, TNPSC

### Running the Backend

From `backend`:

```bash
npm run dev
```

API base URL: `http://localhost:5000/api`

#### Key API Routes

- **Auth**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET  /api/auth/profile` (protected)
- **Courses**
  - `GET    /api/courses` (supports `page`, `limit`, `search`, `category`, `location`, `interest`)
  - `GET    /api/courses/recommend` (protected, uses user interests + AI logic)
  - `POST   /api/courses` (admin)
  - `PUT    /api/courses/:id` (admin)
  - `DELETE /api/courses/:id` (admin)
  - `POST   /api/courses/:id/bookmark` (student bookmark toggle)
- **Exams**
  - `GET    /api/exams` (supports `category` filter)
  - `POST   /api/exams` (admin)
  - `DELETE /api/exams/:id` (admin)

Authentication is JWT-based using the `Authorization: Bearer <token>` header. Role-based guards protect admin routes.

## Frontend Setup

From `frontend`:

```bash
npm run dev
```

Vite dev server runs at `http://localhost:5173`.

### Frontend Configuration

- Axios base URL is configured in `src/api/axios.js` and can be overridden by:

```bash
VITE_API_URL=http://localhost:5000/api
```

### Features

- **Auth**
  - Student/Admin register and login
  - JWT stored in `localStorage` and sent via Axios interceptor
  - Role-based protected routes (`ProtectedRoute`)
- **Student Dashboard**
  - Profile snapshot (class, location, interests)
  - Recommended courses (with AI tips from backend)
  - Full course list with search + pagination
  - Government exam suggestions based on interests
  - Bookmark/unbookmark courses
- **Admin Dashboard**
  - Overview cards and Recharts pie chart of course categories
  - CRUD on courses (create, list, delete; update can be extended)
  - CRUD on exams (create, list, delete)
- **UI/UX**
  - Tailwind-based modern layout
  - Dark mode toggle (persists in `localStorage`)
  - Toast notifications via React Hot Toast
  - Loading spinners for async operations

## Running Full Stack

In two terminals:

```bash
cd backend
npm run dev

cd frontend
npm run dev
```

Open `http://localhost:5173` in the browser.

- Login as admin with: `admin@pathfinder.com` / `Admin@123`
- Register as a student to explore personalized recommendations.

## Deployment Notes

- Set environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`) on the server.
- Build frontend with `npm run build` in `frontend` and deploy the static `dist` to a CDN or static host.
- Optionally configure a reverse proxy (Nginx/Apache) so the frontend and backend share the same domain, and adjust `VITE_API_URL` accordingly.

