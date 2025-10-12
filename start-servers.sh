#!/bin/bash

# Start backend server
echo "Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!

# Start frontend server
echo "Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both servers
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Both servers are running..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop both servers"

# Handle Ctrl+C to kill both processes
trap 'kill $BACKEND_PID $FRONTEND_PID' INT
wait