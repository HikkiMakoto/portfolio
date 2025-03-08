# Bohdan Shapovalov Portfolio

A modern, responsive portfolio website built with Next.js, Nest.js, MongoDB, and Tailwind CSS.

## Features

- Modern, responsive design with light/dark mode support
- Animated UI components using Framer Motion
- Full-stack implementation with a RESTful API
- Dynamic content management through admin dashboard
- Sections for developer info, projects, and contact form
- Authentication system for admin access
- MongoDB database integration

## Tech Stack

### Frontend
- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS (styling)
- Framer Motion (animations)
- Axios (HTTP client)
- React Hook Form (form handling)
- Heroicons (icon set)
- Next Themes (theme management)

### Backend
- Nest.js (Node.js framework)
- TypeScript
- MongoDB with Mongoose (database)
- JWT Authentication
- Passport.js (authentication middleware)
- bcrypt (password hashing)

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- MongoDB (local or Atlas)

### Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies for both client and server:
```bash
# Client dependencies
cd client
npm install

# Server dependencies
cd ../server
npm install
```

3. Configure environment variables:
- Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

4. Start the development servers:
```bash
# Start the client (in one terminal)
cd client
npm run dev

# Start the server (in another terminal)
cd server
npm run start:dev
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Admin Dashboard: http://localhost:3000/admin/login

## Project Structure

### Client
- `/src/app`: Next.js pages and layouts
- `/src/components`: Reusable UI components
- `/src/app/admin`: Admin dashboard pages

### Server
- `/src/developer`: Developer information API 
- `/src/project`: Projects API
- `/src/contact`: Contact messages API
- `/src/auth`: Authentication logic

## License

MIT