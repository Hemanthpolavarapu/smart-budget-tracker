@echo off
echo Smart Budget Tracker - GitHub Upload Script
echo ===========================================
echo.
echo This script will help you push your project to GitHub.
echo.
echo Please enter your GitHub credentials:
set /p username=GitHub Username: 
set /p token=GitHub Personal Access Token: 

git remote set-url origin https://%username%:%token%@github.com/Hemanthpolavarapu/smart-budget-tracker.git
git push -u origin main

pause 