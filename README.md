Finance Management Project


Overview

This project is a server-side application built with Node.js and React + Vite that enables users to manage their finances, including user authentication, balance management, and user data handling.

Project Structure

Frontend

Client/
  ├── public/
  └── src/
      ├── assets/
      ├── components/
      ├── App.js
      ├── index.js
      └── ... 
React + Vite frontend.

Client folder contains the frontend code where you can start the development server.
Backend

server/
  ├── node_modules/
  ├── package.json
  ├── package-lock.json
  ├── route/
  │   ├── auth.js
  │   ├── balance.js
  │   └── user.js
  ├── server.js
Node.js & Mongoose backend.

server folder contains the backend code, including authentication, balance, and user routes.

server.js is the entry point to the backend server.

routes contain different route files for handling functionality.

Prerequisites

Node.js installed on your machine.

npm (Node Package Manager) for managing dependencies.

Installation

Clone this repository:

git clone https://github.com/Hanicho0346/Test-Project.git

cd Test-Project

Install dependencies:

Navigate to the server directory
cd server
Run the backend:

Start the server

node server.js

The application should now be running on the default port (usually http://localhost:3000).

Run the frontend:

Navigate to the client directory:
cd client
Start the frontend:
npm run dev

Features

User Authentication: Secure user login using JWT (JSON Web Tokens).
Balance Management: Ability for users to view and update their financial balance.
User Data Handling: Routes to manage user information and account settings.
Role-based Authorization: Admins have access to additional features like user management and deletion.
Real-time Updates: Integration with WebSockets for real-time balance updates.

Improvements Implemented

JWT Authentication: Implemented secure user authentication using JSON Web Tokens.
Password Hashing: User passwords are hashed using bcrypt for better security.
Input Validation: Added input validation for user inputs using the express-validator package.
RESTful API: Reorganized routes to follow RESTful principles.
Role-based Access Control (RBAC): Implemented different user roles to secure sensitive actions like deleting user data.
Error Handling & Logging: Added robust error handling and logging with Winston and Morgan.
Real-time Updates: Integrated Socket.io for real-time updates of balances and notifications.


Database

Database Name: Users
Use Mongoose Compass to manage and interact with the MongoDB database.
License
This project is licensed under the MIT License - see the LICENSE file for details.
