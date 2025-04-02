TopStyle Webshop
TopStyle is a fullstack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). The project was created as part of a course assignment to demonstrate skills in fullstack development, authentication, state management, and user interaction.

Features
User registration and login with JWT authentication

Browse all products on the Home page

Product detail page with "Add to Cart" functionality

Shopping cart with quantity updates and total cost

Place orders as a logged-in user

View your past orders

Update your account information

Category filtering and clean, responsive design

Custom styling with a soft, elegant beige color palette

Images served statically from the backend

Tech Stack
Frontend: React (with Vite), Redux Toolkit, React Router

Backend: Node.js, Express

Database: MongoDB

Styling: CSS modules (per component)

Authentication: JWT tokens with protected routes

Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/topstyle-webshop.git
cd topstyle-webshop
2. Install dependencies
For the backend:
bash
Copy
Edit
cd backend
npm install
For the frontend:
bash
Copy
Edit
cd frontend
npm install
3. Setup environment variables
Create a .env file inside the backend folder with:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
4. Seed the database
Run this from the backend folder to load sample products:

arduino
Copy
Edit
npm run data:import
5. Start the servers
Backend:
arduino
Copy
Edit
npm run dev
Frontend:
arduino
Copy
Edit
npm run dev
Now the app should be running at http://localhost:5173 for the frontend and http://localhost:5000 for the backend.

Folder Structure
bash
Copy
Edit
/backend
  /models
  /routes
  /controllers
  /public/images
/frontend
  /pages
  /components
  /features (Redux slices)
Contact
This project was built by Melody Cartwright as part of a fullstack course project. If you'd like to learn more or have questions, feel free to reach out.

