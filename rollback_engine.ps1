#Requires -Version 5.1
<#
.SYNOPSIS
  Antigravity 순정 원본 복구(롤백) 엔진
#>
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Yellow
Write-Host "         Antigravity 순정 원본 롤백(복구) 프로그램                " -ForegroundColor Yellow
Write-Host "==================================================================" -ForegroundColor Yellow
Write-Host ""

function Find-InstallPath {
  # 1차: 환경변수
  $candidates = @(
    "$env:LOCALAPPDATA\Programs\antigravity",
    "$env:LOCALAPPDATA\Programs\Antigravity",
    "$env:PROGRAMFILES\antigravity",
    "$env:PROGRAMFILES\Antigravity",
    "${env:PROGRAMFILES(x86)}\antigravity",
    "${env:PROGRAMFILES(x86)}\Antigravity",
    "$env:APPDATA\Programs\antigravity"
  )
  foreach ($c in $candidates) {
    if ($c -and (Test-Path (Join-Path $c 'Antigravity.exe'))) {
      return $c
    }
  }

  # 2차: 레지스트리
  $regKeys = @(
    'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall',
    'HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall',
    'HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall'
  )
  foreach ($rk in $regKeys) {
    if (Test-Path $rk) {
      $subKeys = Get-ChildItem $rk -ErrorAction SilentlyContinue
      foreach ($sk in $subKeys) {
        $props = Get-ItemProperty $sk.PSPath -ErrorAction SilentlyContinue
        if ($props) {
          $disp = $props.DisplayName
          $loc  = $props.InstallLocation
          if ($disp -like '*antigravity*' -and $loc -and (Test-Path (Join-Path $loc 'Antigravity.exe'))) {
            return $loc
          }
        }
      }
    }
  }

  # 3차: GUI 폴더 선택
  Add-Type -AssemblyName System.Windows.Forms
  $fbd = New-Object System.Windows.Forms.FolderBrowserDialog
  $fbd.Description = "Antigravity가 설치된 폴더를 선택하세요"
  if ($fbd.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
    $sel = $fbd.SelectedPath
    if (Test-Path (Join-Path $sel 'Antigravity.exe')) {
      return $sel
    }
  }
  return $null
}

$installPath = Find-InstallPath
if (-not $installPath) {
  Write-Host "[✗] Antigravity 설치 경로를 찾을 수 없습니다." -ForegroundColor Red
  exit 1
}

$resourcesDir = Join-Path $installPath 'resources'
$targetAsar   = Join-Path $resourcesDir 'app.asar'
$backupAsar   = Join-Path $resourcesDir 'app.asar.original'

Write-Host "[*] 대상 폴더: $installPath" -ForegroundColor Gray

if (-not (Test-Path $backupAsar)) {
  Write-Host "[✗] 순정 원본 백업 파일(app.asar.original)을 찾을 수 없습니다." -ForegroundColor Red
  Write-Host "    이미 순정 상태이거나 백업 파일이 없습니다." -ForegroundColor Yellow
  exit 1
}

try {
  Write-Host "[*] 순정 복원 중 (app.asar.original -> app.asar)..." -ForegroundColor Cyan
  Copy-Item -Path $backupAsar -Destination $targetAsar -Force
  Write-Host ""
  Write-Host "==================================================================" -ForegroundColor Green
  Write-Host "  [✓] 순정 원본 복원이 성공적으로 완료되었습니다!                " -ForegroundColor Green
  Write-Host "==================================================================" -ForegroundColor Green
  Write-Host ""
  Write-Host "Antigravity를 재실행하면 순정 원본 영문 UI로 실행됩니다." -ForegroundColor Gray
} catch {
  Write-Host "[✗] 복원 중 오류 발생: $_" -ForegroundColor Red
  exit 1
}
