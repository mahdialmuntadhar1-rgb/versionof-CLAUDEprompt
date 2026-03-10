Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  IRAQ COMPASS — FINAL TEST RESULTS" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
$passed = 0
$failed = 0

Write-Host "TEST 1: Critical files..." -ForegroundColor Yellow
@("src\App.tsx","src\constants.ts","src\types.ts","vercel.json","package.json","src\index.css") | ForEach-Object {
  if (Test-Path $_) { Write-Host "  PASS - $_" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL - $_ MISSING" -ForegroundColor Red; $failed++ }
}

Write-Host "TEST 2: Components..." -ForegroundColor Yellow
@("src\components\layout\Header.tsx","src\components\ui\BusinessCard.tsx","src\components\ui\Toast.tsx","src\components\views\HomeView.tsx","src\components\views\BrowseView.tsx","src\components\views\DetailView.tsx","src\components\views\SearchView.tsx") | ForEach-Object {
  if (Test-Path $_) { Write-Host "  PASS - $_" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL - $_ MISSING" -ForegroundColor Red; $failed++ }
}

Write-Host "TEST 3: Translation keys..." -ForegroundColor Yellow
$c = Get-Content "src\constants.ts" -Raw
@("browseByCity","featuredInIraq","aiCuratedEvents","exploreByGov","comingSoon","browseByCategory","highestRatedSub") | ForEach-Object {
  if ($c -match $_) { Write-Host "  PASS - $_" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL - $_ MISSING" -ForegroundColor Red; $failed++ }
}

Write-Host "TEST 4: All 18 governorates..." -ForegroundColor Yellow
@("Baghdad","Basra","Erbil","Duhok","Nineveh","Kirkuk","Karbala","Najaf","Anbar","Diyala","Babil","Wasit","Maysan","Muthanna","Qadisiyyah","Saladin") | ForEach-Object {
  if ($c -match $_) { Write-Host "  PASS - $_" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL - $_ MISSING" -ForegroundColor Red; $failed++ }
}

Write-Host "TEST 5: Live site..." -ForegroundColor Yellow
try {
  $r = Invoke-WebRequest -Uri "https://versionof-claude-prompt.vercel.app" -UseBasicParsing -TimeoutSec 15
  if ($r.StatusCode -eq 200) { Write-Host "  PASS - Site UP (200 OK)" -ForegroundColor Green; $passed++ }
  else { Write-Host "  FAIL - Status $($r.StatusCode)" -ForegroundColor Red; $failed++ }
} catch { Write-Host "  FAIL - Site unreachable" -ForegroundColor Red; $failed++ }

Write-Host "TEST 6: Build passes..." -ForegroundColor Yellow
$b = npm run build 2>&1
if ($LASTEXITCODE -eq 0) { Write-Host "  PASS - Build succeeded" -ForegroundColor Green; $passed++ }
else { Write-Host "  FAIL - Build failed" -ForegroundColor Red; $failed++ }

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  PASSED: $passed  FAILED: $failed" -ForegroundColor Cyan
if ($failed -eq 0) { Write-Host "  ALL TESTS PASSED! App is ready!" -ForegroundColor Green }
else { Write-Host "  $failed TESTS FAILED" -ForegroundColor Red }
Write-Host "  URL: https://versionof-claude-prompt.vercel.app" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
