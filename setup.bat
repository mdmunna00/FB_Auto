@echo off
title Playwright Setup

echo =========================
echo Checking Node.js
echo =========================

node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
echo Node.js not installed!
echo Install Node.js from https://nodejs.org
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
echo Install Git from https://git-scm.com
pause
exit
) ELSE (
echo Git OK
)

echo.
echo =========================
echo Installing Packages
echo =========================

npm install playwright
npm install playwright-extra
npm install puppeteer-extra-plugin-stealth

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
