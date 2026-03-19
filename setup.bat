@echo off
title Playwright Setup

cd /d %~dp0

echo =========================
echo DEBUG START
echo =========================

pause

echo Checking Node.js...
node -v
pause

echo Checking Git...
git --version
pause

echo Init Project...
npm init -y
pause

echo Installing Playwright...
npm install playwright
pause

echo Installing Playwright Extra...
npm install playwright-extra
pause

echo Installing Stealth...
npm install puppeteer-extra-plugin-stealth
pause

echo Installing Chromium...
npx playwright install chromium
pause

echo =========================
echo DONE
echo =========================

pause
