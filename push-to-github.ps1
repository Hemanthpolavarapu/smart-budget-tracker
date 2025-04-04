Write-Host "Smart Budget Tracker - GitHub Upload Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will help you push your project to GitHub." -ForegroundColor White
Write-Host ""

$username = Read-Host "GitHub Username"
$secureToken = Read-Host "GitHub Personal Access Token" -AsSecureString
$token = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken))

# Save current directory
$currentDir = Get-Location

# Configure git
git config --local credential.helper ""
git remote set-url origin "https://$username`:$token@github.com/Hemanthpolavarapu/smart-budget-tracker.git"

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

# Reset the remote URL to remove the token
git remote set-url origin "https://github.com/Hemanthpolavarapu/smart-budget-tracker.git"

Write-Host "`nDone!" -ForegroundColor Green
Write-Host "Check your repository at: https://github.com/Hemanthpolavarapu/smart-budget-tracker" -ForegroundColor White

Pause 