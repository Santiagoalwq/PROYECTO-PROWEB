@echo off
echo =======================================
echo    TaskFlow - Full Stack Setup
echo =======================================
echo.

echo [Step 1] Installing Backend Dependencies
cd backend
call npm install
echo Done! Backend dependencies installed
echo.

cd ..

echo [Step 2] Installing Frontend Dependencies
cd frontend
call npm install
echo Done! Frontend dependencies installed
echo.

cd ..

echo =======================================
echo Setup Complete!
echo =======================================
echo.
echo To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd backend ^&^& npm run dev
echo   API: http://localhost:5000
echo   Swagger: http://localhost:5000/api-docs
echo.
echo Terminal 2 - Frontend:
echo   cd frontend ^&^& npm run dev
echo   App: http://localhost:3000
echo.
pause
