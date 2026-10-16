@echo off
chcp 65001 > nul
title Antigravity 순정 원본 복구 도구
echo.
echo  ======================================================
echo    Antigravity 순정 원본(app.asar.original) 복원 시작
echo  ======================================================
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0rollback_engine.ps1"
echo.
pause
