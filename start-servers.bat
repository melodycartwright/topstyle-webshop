@echo off
echo Starting TopStyle Webshop servers...

echo Starting backend server...
cd backend
start "Backend Server" cmd /k "npm start"

echo Starting frontend server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Close the individual terminal windows to stop each server.
pause