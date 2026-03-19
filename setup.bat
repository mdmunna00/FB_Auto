@echo off
title Playwright Setup

echo =========================
echo Checking Node.js
echo =========================

node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
echo Node.js not installed!
pause
exit
) ELSE (
echo Node.js OK
)

echo.
echo =========================
echo Checking Git
echo =========================

git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
echo Git not installed!
pause
exit
) ELSE (
echo Git OK
)

echo.
echo =========================
echo Init Project
echo =========================

npm init -y

echo.
echo =========================
echo Installing Packages
echo =========================

npm install playwright playwright-extra puppeteer-extra-plugin-stealth

echo.
echo =========================
echo Installing Chromium
echo =========================

npx playwright install chromium

echo.
echo =========================
echo Setup Finished
echo =========================

pause
