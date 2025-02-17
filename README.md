##           EdTech Platform

##  Project Overview

This project is a full-stack EdTech platform with features like Application Tracking, AI Profile Matcher, and Scholarship Finder. It includes authentication and role-based access for Students, Agents, and Admins.

##   Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT-based authentication

Deployment: Netlify (Frontend), Render/Heroku (Backend)

##  Folder Structure

EdTech-Platform/
│── backend/                   # Node.js backend
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Auth middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── server.js              # Entry point
│   ├── .env                   # Environment variables
│
│── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Pages (Login, Dashboard, etc.)
│   │   ├── App.js             # Main application file
│   │   ├── api.js             # API calls
│
│── .gitignore                 # Ignore unnecessary files
│── README.md                  # Project documentation

## Setup Instructions

1️⃣ Clone the Repository
``````````````````
git clone https://github.com/ansarialiakbar/EdTech-Platform.git
`````````````````````````````````
cd EdTech-Platform
```````````````````````
2️⃣ Backend Setup

`````````````
cd backend
npm install
```````````````
cp .env.example .env  # Add MongoDB & JWT secrets
npm start

3️⃣ Frontend Setup
```````````````````
cd frontend
npm install
npm start
````````````````````
🔑 Environment Variables

Create a .env file in the backend directory with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

📌 Features

User Authentication: Login & Register

Role-Based Access: Student, Agent, Admin

Application Tracking: Track user applications

Scholarship Finder: Fetch scholarship data

AI Profile Matcher: Matches student profiles with best courses

🔗 Deployment Links

Frontend (Netlify): Live Demo

Backend (Render/Heroku): API Endpoint

📖 API Endpoints

Method

Endpoint

Description

POST

/api/auth/register

Register new user

POST

/api/auth/login

User login

GET

/api/user/profile

Get user profile

GET

/api/scholarships

Fetch scholarships

🤝 Contributing

Fork the repository

Create a feature branch (git checkout -b feature-x)

Commit your changes (git commit -m "feat: Added feature X")

Push to the branch (git push origin feature-x)

Open a pull request

📜 License

This project is MIT Licensed.



