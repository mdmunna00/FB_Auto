@echo off
title Playwright Setup

:: Fix working directory
cd /d %~dp0

echo =========================
echo Checking Node.js
echo =========================

node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
echo ❌ Node.js not installed!
pause
exit /b
) ELSE (
echo ✅ Node.js OK
)

echo.
echo =========================
echo Checking Git
echo =========================

git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
echo ❌ Git not installed!
pause
exit /b
) ELSE (
echo ✅ Git OK
)

echo.
echo =========================
echo Init Project
echo =========================

npm init -y
IF %ERRORLEVEL% NEQ 0 (
echo ❌ npm init failed!
pause
exit /b
)

echo.
echo =========================
echo Installing Playwright
echo =========================

npm install playwright
IF %ERRORLEVEL% NEQ 0 (
echo ❌ Playwright install failed!
pause
exit /b
)

echo.
echo =========================
echo Installing Playwright Extra
echo =========================

npm install playwright-extra
IF %ERRORLEVEL% NEQ 0 (
echo ❌ Playwright Extra install failed!
pause
exit /b
)

echo.
echo =========================
echo Installing Stealth Plugin
echo =========================

npm install puppeteer-extra-plugin-stealth
IF %ERRORLEVEL% NEQ 0 (
echo ❌ Stealth plugin install failed!
pause
exit /b
)

echo.
echo =========================
echo Installing Chromium
echo =========================

npx playwright install chromium
IF %ERRORLEVEL% NEQ 0 (
echo ❌ Chromium install failed!
pause
exit /b
)

echo.
echo =========================
echo ✅ Setup Finished Successfully
echo =========================

pause
