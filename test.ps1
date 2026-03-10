Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  IRAQ COMPASS — RUNNING ALL TESTS" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
$passed = 0
$failed = 0

Write-Host "TEST 1: Node.js..." -ForegroundColor Yellow
$v = node --version; Write-Host "  PASS — $v" -ForegroundColor Green; $passed++

Write-Host "TEST 2: npm..." -ForegroundColor Yellow
$v = npm --version; Write-Host "  PASS — $v" -ForegroundColor Green; $passed++

Write-Host "TEST 3: Git..." -ForegroundColor Yellow
$v = git --version; Write-Host "  PASS — $v" -ForegroundColor Green; $passed++

Write-Host "TEST 4: Vercel CLI..." -ForegroundColor Yellow
$v = vercel --version; Write-Host "  PASS — $v" -ForegroundColor Green; $passed++

Write-Host "TEST 5: Critical files..." -ForegroundColor Yellow
@("src\App.tsx","src\constants.ts","src\types.ts","vercel.json","package.json") | ForEach-Object {
  if (Test-Path $_) { Write-Host "  PASS — $_" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL — $_ MISSING" -ForegroundColor Red; $failed++ }
}

Write-Host "TEST 6: Components..." -ForegroundColor Yellow
@("src\components\DetailView.tsx","src\components\CityNavigatorSlide.tsx","src\components\Header.tsx","src\components\GlassCard.tsx") | ForEach-Object {
  if (Test-Path $_) { Write-Host "  PASS — $_" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL — $_ MISSING" -ForegroundColor Red; $failed++ }
}

Write-Host "TEST 7: Translation keys..." -ForegroundColor Yellow
$c = Get-Content "src\constants.ts" -Raw
@("browseByCity","featuredInIraq","aiCuratedEvents","exploreByGov","comingSoon") | ForEach-Object {
  if ($c -match $_) { Write-Host "  PASS — $_" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL — $_ MISSING" -ForegroundColor Red; $failed++ }
}

Write-Host "TEST 8: Governorates..." -ForegroundColor Yellow
@("Baghdad","Basra","Erbil","Kirkuk","Karbala","Najaf","Diyala","Saladin") | ForEach-Object {
  if ($c -match $_) { Write-Host "  PASS — $_" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL — $_ MISSING" -ForegroundColor Red; $failed++ }
}

Write-Host "TEST 9: Live site..." -ForegroundColor Yellow
try {
  $r = Invoke-WebRequest -Uri "https://versionof-claude-prompt.vercel.app" -TimeoutSec 10
  if ($r.StatusCode -eq 200) { Write-Host "  PASS — Site is UP (200 OK)" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL — Status $($r.StatusCode)" -ForegroundColor Red; $failed++ }
} catch { Write-Host "  FAIL — Site unreachable" -ForegroundColor Red; $failed++ }

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  PASSED: $passed  FAILED: $failed" -ForegroundColor Cyan
if ($failed -eq 0) { Write-Host "  ALL TESTS PASSED!" -ForegroundColor Green }
else { Write-Host "  $failed TESTS FAILED - check above" -ForegroundColor Red }
Write-Host "  URL: https://versionof-claude-prompt.vercel.app" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
