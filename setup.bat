@echo off
title Automation Setup

echo ===============================
echo Checking Node.js
echo ===============================

node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
echo Node.js not found. Installing Node.js...
powershell -Command "Invoke-WebRequest https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi -OutFile node.msi"
msiexec /i node.msi /quiet /norestart
) ELSE (
echo Node.js already installed
)

echo.
echo ===============================
echo Checking Git
echo ===============================

git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
echo Git not found. Installing Git...
powershell -Command "Invoke-WebRequest https://github.com/git-for-windows/git/releases/latest/download/Git-64-bit.exe -OutFile git.exe"
start /wait git.exe /VERYSILENT
) ELSE (
echo Git already installed
)

echo.
echo ===============================
echo Cloning Project
echo ===============================

IF NOT EXIST project (
git clone https://github.com/username/project.git
)

cd project

echo.
echo ===============================
echo Installing Playwright
echo ===============================

npm install playwright

echo.
echo ===============================
echo Installing Chromium
echo ===============================

npx playwright install chromium

echo.
echo ===============================
echo Starting Automation
echo ===============================

node main.js

pause
