# Antigravity 2.23.1+ 완전 자동 한글 패치 & 상단 바 실시간 Quota 위젯 v4.2

[![Release](https://img.shields.io/github/v/release/Ming-Nine/Antigravity-Korean-Patch?color=blue&label=Latest%20Release)](https://github.com/Ming-Nine/Antigravity-Korean-Patch/releases/latest)
[![Download ZIP](https://img.shields.io/badge/Download-ZIP%20Package-success?style=flat&logo=github)](https://github.com/Ming-Nine/Antigravity-Korean-Patch/releases/latest/download/Antigravity_Korean_Patch_v4.2.zip)
[![Platform](https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011-0078D6?logo=windows)](https://github.com/Ming-Nine/Antigravity-Korean-Patch)
[![Antigravity](https://img.shields.io/badge/Antigravity-2.23.1%2B%20Compatible-4285F4?logo=google)](https://github.com/Ming-Nine/Antigravity-Korean-Patch)
[![Gemini Quota](https://img.shields.io/badge/Gemini%20Quota-Realtime%20Widget-8E75B2)](https://github.com/Ming-Nine/Antigravity-Korean-Patch)
[![Claude Quota](https://img.shields.io/badge/Claude%2FGPT%20Quota-Realtime%20Widget-D97706)](https://github.com/Ming-Nine/Antigravity-Korean-Patch)

Antigravity의 내부 UI 및 Electron 번들을 분석하여, **수동 단어장 없이 버전 업데이트에도 100% 자동으로 대응하는 지능형 한글화 엔진**과 **상단 메뉴바 실시간 모델 한도(Gemini, Claude, GPT) 위젯**을 원클릭으로 주입해주는 배포용 패키지입니다.

> 📥 **[최신 원클릭 배포판 다운로드 (Antigravity_Korean_Patch_v4.2.zip)](https://github.com/Ming-Nine/Antigravity-Korean-Patch/releases/latest/download/Antigravity_Korean_Patch_v4.2.zip)**

---

## 🚀 핵심 기능 및 아키텍처 (v4.2)

1. **원클릭 실행 및 순정 롤백 (Python 설치 불필요)**
   - `Antigravity_KO_Patcher.bat`: 원클릭 자동 패치 및 검증 실행
   - `Rollback_Original.bat`: 최초 1회 생성된 순정 원본(`app.asar.original`)으로 100% 안전 복원

2. **3단계 범용 경로 탐색기 (타인 PC 완벽 호환)**
   - **1차 탐색:** 환경변수 (`%LOCALAPPDATA%`, `%PROGRAMFILES%` 등)
   - **2차 탐색:** Windows 레지스트리(Uninstall) 및 바로가기(`.lnk`) 역추적
   - **3차 탐색:** 특이 경로 설치 시 직관적인 폴더 선택 창(GUI) 자동 팝업

3. **인라인 태그(`<a>`, `<code>`, `<strong>` 등) 무손실 재조립 번역**
   - 문장 중간에 코드 블록(`<code>/</code>`, `<code>plan</code>`), 링크(`<a>Google Chrome</a>`), 굵은 글씨(`<strong>Turbo mode</strong>`)가 섞여 있어도 `{0}`, `{1}` 플레이스홀더로 직렬화하여 자연스럽게 번역
   - 번역 완료 후 원래 DOM 요소를 한국어 어순에 맞게 무손실 재조립하여 스타일, 이벤트 리스너, 상호작용 100% 유지
   - 메인 채팅 입력창의 `placeholder` 및 `title`, `aria-label` 속성 자동 번역

4. **무인증 실시간 자동 번역 파이프라인 + 로컬 영구 캐시**
   - 별도의 API 키나 과금 없이 `Google Translate Chrome API` 연동
   - 정적 사전에 없는 새로운 영문이나 React Portal(모달, 드롭다운 메뉴, 툴팁, Virtual DOM)이 렌더링될 때 즉시 감지하여 번역
   - 청크(Chunk, 8개 단위) 분할 멀티 쿼리로 Google 429(Rate Limit)을 원천 차단
   - 한 번 번역된 문구는 `localStorage`(`agy_ko_auto_cache_v4`)에 영구 보관되어 다음 실행 시 **0ms 속도로 즉시 표시**

5. **상단 메뉴바 '실시간 모델 한도(Quota) 위젯' & 무음 백그라운드 자동 갱신**
   - 상단 메뉴바 우측에 알약(Pill) 배지로 잔여 쿼터 실시간 표시:
     - `[Gemini: 주간 96% · 5시간 85%] [Claude·GPT: 주간 0% · 5시간 0%] ↻`
   - **정확한 `%` 기호 기반 구조적 파싱:** 설명문의 날짜/시간(6일, 9시간 등)을 절대 오인하지 않고, 숫자 뒤에 `%`가 붙은 수치만 카드별로 분리 파싱
   - **Gemini 고유명사 보호:** `Gemini`가 `쌍둥이자리`로 번역되지 않도록 고유명사 예외 처리
   - **백그라운드 무음 스캔 (Silent Probe):** 설정 창을 직접 열지 않아도, 화면에 전혀 보이지 않는 완전 투명(`ag-silent-probe`) 모드로 백그라운드에서 최신 사용량을 자동 조회 후 닫음 (깜빡임 0%)
   - **4단계 자동 새로고침 트리거:**
     1. 앱 최초 로드 2초 후 자동 1회 실행
     2. 채팅창에서 AI 응답 스트리밍이 종료될 때마다 자동 1회 실행
     3. 3분(180초) 주기 백그라운드 정기 갱신
     4. 사용자가 설정 -> 모델 창을 열었을 때 실시간 갱신
   - **수동 새로고침(`↻`) 버튼 탑재:** 위젯 우측의 새로고침 버튼을 누르면 부드러운 회전 애니메이션(`@keyframes ag-spin`)과 함께 즉각 갱신
   - **State Persistence (상태 보존):** 설정 창을 닫아도 가짜 `100%`나 빈 값으로 리셋되지 않고, 마지막으로 확인된 실제 사용량 영구 유지
   - **우측 창 버튼 간섭 방지:** `margin-right: 180px`를 주어 윈도우 조절 버튼(`- □ ×`)과의 겹침 완벽 차단

6. **블랙 스크린(Crash) 방지 5대 안전 설계**
   - **Tail Injection 방식:** 원본 난독화 JS 번들을 직접 치환하지 않고, `preload.js` 맨 끝에 독립 격리 스크립트로 주입
   - **TrustedTypes/CSP 준수:** `innerHTML` 0건 사용, 오직 `createElement` / `createTextNode`만 사용
   - **Safe Delayed Boot (2.5초):** React 초기 하이드레이션 완료 후 안전 가동

---

## 📦 파일 구성

```
Antigravity_Korean_Patch/
├── Antigravity_KO_Patcher.bat   # 배포용 원클릭 패치 실행기
├── Rollback_Original.bat         # 원클릭 순정 복구 실행기
├── patch_engine.ps1              # 핵심 패치 엔진 (경로 탐색, asar 추출/패킹, Tail Injection)
├── rollback_engine.ps1           # 핵심 복구 엔진 (경로 탐색, 원본 복원)
├── quota_widget_inject.js        # 렌더러 주입용 위젯 + 실시간 한글화 스크립트 v4.2
├── ko_dictionary.json            # 기본 baseline 어휘 및 정규식 규칙
└── README.md                     # 사용 안내서
```

---

## 🛠️ 사용 방법

1. [최신 릴리즈](https://github.com/Ming-Nine/Antigravity-Korean-Patch/releases/latest)에서 **`Antigravity_Korean_Patch_v4.2.zip`**을 다운로드하고 압축을 풉니다.
2. 실행 중인 Antigravity 프로그램을 정상 종료합니다.
3. **`Antigravity_KO_Patcher.bat`**을 더블 클릭하여 실행합니다.
4. 자동으로 5대 무결성 검증, 원본 백업, 한글화 및 위젯 주입이 완료됩니다.
5. Antigravity를 실행하면 부팅 후 한글 UI와 우측 상단 쿼터 위젯이 실시간으로 동기화됩니다!

*순정 상태로 복원이 필요할 때는 언제든지 `Rollback_Original.bat`을 실행하세요.*

---

## 🔍 태그 및 검색 키워드 (Search Tags & Keywords)

본 프로젝트는 GitHub 및 검색 엔진에서 Antigravity 한글화와 쿼터 모니터링 관련 키워드로 검색이 용이하도록 색인 최적화(SEO)되어 있습니다.

### 🇰🇷 주요 한국어 검색어
- **한글 패치 및 번역**: 안티그래비티 한글 패치, 안티그래비티 한국어 패치, 안티그래비티 한글화, 안티그래비티 2.23.1, 안티그래비티 최신버전 한글, 안티그래비티 한국어 번역, 구글 안티그래비티 한글, Antigravity 한글 패치, Antigravity 한국어, Antigravity 한글화, Antigravity Hangul
- **모델 쿼터 및 실시간 위젯**: 안티그래비티 쿼터 위젯, 안티그래비티 사용량 위젯, 안티그래비티 모델 한도, 안티그래비티 실시간 쿼터, 제미나이 쿼터 확인, 클로드 사용량 확인, GPT 잔여 한도 위젯, 안티그래비티 상단 바 위젯, 안티그래비티 Quota Bar, Gemini Quota, Claude Quota
- **도구 및 실행기**: 안티그래비티 원클릭 패치, 안티그래비티 패처, asar 패치, Electron 한글 패치, Antigravity Patcher, Windows 원클릭 패치

### 🌐 English Keywords
- **Localization & Language**: Antigravity Korean Patch, Antigravity Korean Language, Antigravity Hangul Patch, Antigravity Localization, Google Antigravity Korean, Antigravity IDE Translation, Antigravity Korean Translation Pack, Auto Translation Pipeline
- **Quota & Monitoring**: Antigravity Quota Widget, Antigravity Model Usage Bar, Antigravity Gemini Quota, Antigravity Claude Quota, Antigravity Real-time Quota Monitor, Silent Background Quota Probe, Live Quota Pill Badge
- **Platform & Architecture**: Electron asar patch, Safe Tail Injection, React Portal Translation, MutationObserver Auto Translate, Google Translate Chrome API, Zero innerHTML, TrustedTypes Compatible
