@echo off
chcp 65001 > nul
title Antigravity 2.23.1+ 한글 패치 및 실시간 Quota 위젯 패처
echo.
echo  ==================================================================
echo     Antigravity 2.23.1+ 자동 한글 패치 & 실시간 Quota 위젯 패처
echo  ==================================================================
echo.
echo  - 파이썬/복잡한 설정 불필요 (PowerShell 자동 연동)
echo  - 버전 업데이트 자동 대응 & 3단계 범용 경로 탐색 지원
echo  - 상단 메뉴바 실시간 모델 한도(Gemini, Claude, GPT) 위젯 주입
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0patch_engine.ps1"
echo.
pause
