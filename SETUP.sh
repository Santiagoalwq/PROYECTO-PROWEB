#!/bin/bash

echo "======================================="
echo "   TaskFlow - Full Stack Setup"
echo "======================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Installing Backend Dependencies${NC}"
cd backend
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
echo ""

cd ..

echo -e "${BLUE}Step 2: Installing Frontend Dependencies${NC}"
cd frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

cd ..

echo "======================================="
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "======================================="
echo ""
echo "To start the application:"
echo ""
echo -e "${BLUE}Terminal 1 - Backend:${NC}"
echo "  cd backend && npm run dev"
echo "  API: http://localhost:5000"
echo "  Swagger: http://localhost:5000/api-docs"
echo ""
echo -e "${BLUE}Terminal 2 - Frontend:${NC}"
echo "  cd frontend && npm run dev"
echo "  App: http://localhost:3000"
echo ""
