/**
 * Antigravity 2.23.1+ 완전 자동 한글화 엔진 & 실시간 Quota 위젯 v5.0
 * 
 * [v5.0 업데이트 핵심 내역]
 * 1. 깜빡임 현상 완전 해결: 주기적 백그라운드 모달 자동 트리거 제거 (수동 ↻ 클릭 및 비침습 갱신)
 * 2. 프롬프트 치는 곳(에디터/Lexical/Input) & 채팅 대화 구역 자동 번역 100% 제외
 * 3. 설정 창 내 파일 경로, 와일드카드 규칙(*, * / *), MCP 도구 고유명사(github 등) 번역 제외
 * 4. 원클릭 실행 파일(.exe) 배포 지원
 */
;(function() {
  'use strict';
  try {
    if (window.__AGY_KO_PATCH_V5_LOADED__) return;
    window.__AGY_KO_PATCH_V5_LOADED__ = true;

    // ══════════════════════════════════════════════════════════════════
    // [1] 영구 로컬 캐시 및 번역 제외 스마트 필터
    // ══════════════════════════════════════════════════════════════════
    const BASE_DICTIONARY = {
  "File": "파일",
  "View": "보기",
  "Window": "창",
  "Help": "도움말",
  "Edit": "편집",
  "Zoom In": "확대",
  "Zoom Out": "축소",
  "Reset Zoom": "기본 크기로 재설정",
  "New Window": "새 창",
  "New Conversation": "새 대화",
  "Connect to WSL": "WSL에 연결",
  "Reopen Locally": "로컬에서 다시 열기",
  "Check for Updates": "업데이트 확인",
  "Checking for Updates...": "업데이트 확인 중...",
  "Downloading Update...": "업데이트 다운로드 중...",
  "Restart to Update": "재시작하여 업데이트",
  "Docs": "공식 문서",
  "Conversation History": "대화 기록",
  "Automations": "자동화",
  "Customizations": "사용자 맞춤설정",
  "Projects": "프로젝트",
  "Conversations": "대화 목록",
  "Settings": "설정",
  "Not in Project": "프로젝트 외부",
  "General": "일반",
  "Application": "애플리케이션",
  "Appearance": "화면 테마",
  "Models": "모델",
  "Models & Usage": "모델 및 사용량",
  "Usage": "사용량",
  "Model Quota": "모델 할당량",
  "Configure agent execution, queued message delivery, and permissions.": "에이전트 실행, 대기열 메시지 전달 및 권한을 설정합니다.",
  "Execution": "실행 설정",
  "Queued Messages": "대기열 메시지",
  "Configure when follow-up messages are sent.": "후속 메시지가 전송되는 시점을 구성합니다.",
  "Keyboard shortcuts": "키보드 단축키",
  "Queue": "큐에 대기",
  "Send Immediately": "즉시 전송",
  "Global Permissions": "전역 권한",
  "Security Preset": "보안 프리셋",
  "Controls the actions the agent can take.": "에이전트가 수행할 수 있는 작업을 제어합니다.",
  "Turbo Mode": "터보 모드",
  "Learn more about Turbo mode": "터보 모드 자세히 알아보기",
  "Tool Permissions": "도구 권한",
  "Modify permissions for file, terminal, and MCP tools.": "파일, 터미널 및 MCP 도구 권한을 수정합니다.",
  "Open": "열기",
  "Agent Behavior": "에이전트 동작",
  "Plan Review Policy": "계획 검토 정책",
  "Whether the agent asks you to review its documents.": "에이전트가 문서 검토를 요청할지 여부입니다.",
  "Always Proceed": "항상 자동 진행",
  "Network Permissions": "네트워크 권한",
  "Network Access Rules": "네트워크 접근 규칙",
  "Configure allowed and denied URLs for reading.": "읽기가 허용되거나 거부된 URL을 구성합니다.",
  "Terminal & Tooling Permissions": "터미널 및 도구 권한",
  "Shortcuts": "단축키 안내",
  "Provide Feedback": "피드백 보내기",
  "Refresh": "새로고침",
  "Loading...": "로딩 중...",
  "Loading models...": "모델 목록 불러오는 중...",
  "Send": "전송",
  "Cancel": "취소",
  "Save": "저장",
  "Delete": "삭제",
  "Confirm": "확인",
  "Back": "뒤로",
  "Continue": "계속",
  "Submit": "제출",
  "Close": "닫기",
  "Search": "검색",
  "Filter": "필터",
  "Add": "추가",
  "Remove": "제거",
  "Rename": "이름 변경",
  "Create": "생성",
  "Apply": "적용",
  "Reset": "초기화",
  "Copy code": "코드 복사",
  "Copied!": "복사됨!",
  "Running": "실행 중",
  "Completed": "완료됨",
  "Failed": "실패",
  "Pending": "대기 중",
  "Stopped": "중지됨",
  "Thinking...": "생각 중...",
  "Generating...": "생성 중...",
  "Stop generating": "생성 중지",
  "Regenerate": "재생성",
  "New chat": "새 대화",
  "New Project": "새 프로젝트",
  "Open Folder": "폴더 열기",
  "Close Window": "창 닫기",
  "Sign In": "로그인",
  "Sign Out": "로그아웃",
  "Profile": "프로필",
  "Feedback": "피드백",
  "Background Tasks": "백그라운드 작업",
  "Attach file": "파일 첨부",
  "Add context": "컨텍스트 추가",
  "Plugins": "플러그인",
  "Extensions": "확장",
  "Skills": "스킬",
  "Tools": "도구",
  "Rules": "규칙",
  "Agents": "에이전트",
  "Customize": "사용자 맞춤설정",
  "Daily": "매일",
  "Weekly": "매주",
  "Monthly": "매달",
  "Never": "안 함",
  "5-hour limit": "5시간 한도",
  "Weekly limit": "주간 한도",
  "Ask anything, @ to mention, / for actions": "무엇이든 물어보세요 (@로 멘션, /로 액션)",
  "Too many requests, please try again in a bit!": "요청이 너무 많습니다. 잠시 후 다시 시도해주세요!",
  "What quota or feature is being incorrectly limited": "어떤 할당량 또는 기능이 잘못 제한되고 있나요?",
  "Credits are used when you've exceeded your model quota. Keep track of your current AI Credits in the": "크레딧은 모델 할당량을 초과했을 때 사용됩니다. 현재 AI 크레딧을 확인하세요:",
  "Gemini": "Gemini",
  "Gemini Models": "Gemini 모델",
  "Claude": "Claude",
  "GPT": "GPT",
  "Claude and GPT Models": "Claude 및 GPT 모델",
  "Claude & GPT Models": "Claude 및 GPT 모델",
  "github": "github",
  "GitHub": "GitHub",
  "git": "git",
  "mcp": "mcp",
  "MCP": "MCP",
  "MCP Tools": "MCP 도구"
};

    const REGEX_RULES = [
      { pattern: /You have used some of your 5-hour limit, it will fully refresh in (\d+) hours?, (\d+) minutes?\./i, replacement: "5시간 한도의 일부를 사용했으며, $1시간 $2분 후에 완전히 초기화됩니다." },
      { pattern: /You have used some of your 5-hour limit, it will fully refresh in (\d+) hours?\./i, replacement: "5시간 한도의 일부를 사용했으며, $1시간 후에 완전히 초기화됩니다." },
      { pattern: /You have used some of your 5-hour limit, it will fully refresh in (\d+) minutes?\./i, replacement: "5시간 한도의 일부를 사용했으며, $1분 후에 완전히 초기화됩니다." },
      { pattern: /Your plan's baseline quota will refresh on (.+?)\./i, replacement: "플랜 기본 할당량이 $1에 완전히 초기화됩니다." },
      { pattern: /refreshes? in (\d+) hours? and (\d+) minutes?/i, replacement: "$1시간 $2분 후 초기화" },
      { pattern: /refreshes? in (\d+) hours?/i, replacement: "$1시간 후 초기화" },
      { pattern: /refreshes? in (\d+) minutes?/i, replacement: "$1분 후 초기화" }
    ];

    const CACHE_KEY = 'agy_ko_auto_cache_v5';
    let memoryCache = Object.assign({}, BASE_DICTIONARY);

    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) Object.assign(memoryCache, JSON.parse(raw));
    } catch (e) {}

    // 잘못 번역된 과거 캐시 정리 (github -> 깃허브 등 오역 방지)
    delete memoryCache["github"];
    delete memoryCache["Github"];
    delete memoryCache["GitHub"];
    delete memoryCache["*"];
    delete memoryCache["*/*"];

    function saveCache() {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(memoryCache));
      } catch (e) {}
    }

    // 번역 제외 태그 및 클래스
    const EXCLUDE_TAGS = new Set([
      'SCRIPT', 'STYLE', 'PRE', 'TEXTAREA', 'INPUT', 'SVG', 'MATH', 'CODE', 'KBD', 'SAMP', 'VAR'
    ]);

    // 보호해야 할 인라인 태그 목록 (혼합 문장 처리 시 플레이스홀더 대상)
    const INLINE_TAGS = new Set([
      'A', 'CODE', 'STRONG', 'B', 'I', 'EM', 'KBD', 'SPAN'
    ]);

    // 번역 제외 정규식
    const EXCLUDE_REGEX = [
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,          // 이메일 주소
      /^(?:https?:\/\/|file:\/\/|[A-Za-z]:[\\\/]|\/(?:[\w.-]+\/)+)/,  // URL 및 실제 파일 경로
      /^[\d\s\-_.,:;!@#$%^&*()+=/\\|<>?"'~`{}[\]]+$/,        // 숫자 및 특수기호만으로 구성
      /^[A-Za-z]$/                                                    // 1글자 영문
    ];

    // 프롬프트 입력 영역, 채팅 메시지 구역, 코드/터미널 영역 제외 셀렉터
    const EXCLUDE_CONTAINER_SELECTOR = [
      // 1. 프롬프트 치는 곳 (사용자가 입력하는 중인 에디터 및 입력창 전체)
      '[data-testid="agent-input-box"]',
      '[data-testid*="input-box"]',
      '[data-testid*="prompt"]',
      '[data-testid*="composer"]',
      '[data-lexical-editor="true"]',
      '[contenteditable="true"]',
      '[contenteditable=""]',
      '[contenteditable]',
      '[role="textbox"]',
      '[role="searchbox"]',
      '.ProseMirror',
      '.cm-editor',
      '.cm-content',
      '.monaco-editor',
      '.xterm',
      '.code-block',
      'form',

      // 2. 채팅이 나오는 구역 (AI 응답, 사용자 질문, 도구 실행 로그/결과 등)
      '[data-testid="turn-cards-container"]',
      '[data-testid="user-input-step"]',
      '[data-testid*="-step"]',
      '[data-testid*="message-content"]',
      '[data-testid*="agent-turn"]',
      '[data-testid*="user-turn"]',
      '[data-testid*="chat-stream"]',
      '[data-testid*="chat-message"]',
      '[data-testid*="tool-call"]',
      '[data-testid*="tool-result"]',
      '[data-testid="autoscroll-viewport"]',
      '[role="log"]',
      '[role="feed"]'
    ].join(', ');

    function isElementExcluded(el) {
      if (!el) return false;
      const target = (el.nodeType === 3) ? el.parentElement : el;
      if (!target) return false;

      // 1. 태그명 자체 검사
      if (EXCLUDE_TAGS.has(target.tagName)) return true;

      // 2. 편집 가능 요소 (사용자 입력 중 번역 원천 차단)
      if (target.isContentEditable) return true;
      if (target.getAttribute && (target.getAttribute('contenteditable') === 'true' || target.getAttribute('contenteditable') === '')) return true;
      if (target.getAttribute && target.getAttribute('data-lexical-editor') === 'true') return true;

      // 3. 상위 제외 컨테이너 검사 (프롬프트, 채팅창, 에디터 등)
      if (target.closest) {
        if (target.closest(EXCLUDE_CONTAINER_SELECTOR)) return true;

        // 4. 설정 화면 내의 규칙/경로/도구 목록 행 보호 (수정/삭제 액션 버튼이 딸린 행의 데이터 값)
        const row = target.closest('li, tr, .flex-row, .grid, [class*="row"]');
        if (row && row.querySelector('button[aria-label*="Edit"], button[aria-label*="Delete"], button[aria-label*="수정"], button[aria-label*="삭제"], svg.lucide-pencil, svg.lucide-trash, svg.lucide-x, [data-testid*="delete"], [data-testid*="remove"]')) {
          if (!target.matches('button, select, [role="button"], [role="combobox"]')) {
            const p = target.parentElement;
            if (p && !p.matches('button, select, [role="button"], [role="combobox"]')) {
              return true;
            }
          }
        }
      }

      return false;
    }

    // 보호해야 할 도구, 프레임워크, 서비스 고유명사 (절대 번역 금지)
    const PROTECTED_IDENTIFIERS = new Set([
      'antigravity', 'gemini', 'claude', 'gpt',
      'github', 'gitlab', 'bitbucket', 'git',
      'npm', 'npx', 'node', 'nodejs', 'yarn', 'pnpm', 'bun',
      'python', 'pip', 'docker', 'dockerfile',
      'cargo', 'rust', 'go', 'golang', 'wsl', 'bash', 'zsh', 'sh', 'powershell', 'cmd',
      'vscode', 'cursor', 'chrome', 'chromium', 'brave', 'edge',
      'mcp', 'notion', 'sqlite', 'postgres', 'mysql', 'redis', 'mongodb',
      'react', 'vue', 'angular', 'svelte', 'nextjs', 'tailwind'
    ]);

    function shouldTranslate(text) {
      if (!text || typeof text !== 'string') return false;
      const trimmed = text.trim();
      if (trimmed.length < 2) return false;

      // 1. 보호된 고유명사 / CLI 도구 / 서비스명 보호 (github -> 깃허브 오역 원천 방지)
      if (PROTECTED_IDENTIFIERS.has(trimmed.toLowerCase())) return false;

      // 2. 파일 경로, 디렉토리, URL, 와일드카드 패턴 (*, */*, C:\, /usr/ 등) 보호
      if (/[*\/\\~]/.test(trimmed)) return false;
      if (/^[A-Za-z]:/i.test(trimmed)) return false; // C: D: 드라이브 경로
      if (/^\.[\w.-]+/.test(trimmed)) return false; // .git, .env 등

      // 3. 파일 확장자 보호 (.exe, .js, .json, .py, .ts, .md, .bat 등)
      if (/\.(?:exe|json|js|ts|py|go|rs|md|txt|yaml|yml|toml|lock|bat|cmd|sh|ps1|html|css)$/i.test(trimmed)) return false;

      // 4. 식별자 보호 (공백 없이 _ 또는 - 로 연결된 식별자/변수명/함수명)
      if (!/\s/.test(trimmed) && /[-_]/.test(trimmed)) return false;

      // 5. 카멜케이스(camelCase) 식별자 보호 (예: createOrUpdateFile, apiKey)
      if (!/\s/.test(trimmed) && /^[a-z]+[A-Z]/.test(trimmed)) return false;

      // 6. 한글이 이미 40% 이상이면 번역 불필요
      const koMatches = trimmed.match(/[\uAC00-\uD7AF\u1100-\u11FF]/g);
      if (koMatches && koMatches.length >= trimmed.length * 0.4) return false;

      // 7. 영문 알파벳이 전혀 없으면 스킵
      if (!/[A-Za-z]/.test(trimmed)) return false;

      // 8. 정규식 필터 (이메일, 기호 등)
      for (let i = 0; i < EXCLUDE_REGEX.length; i++) {
        if (EXCLUDE_REGEX[i].test(trimmed)) return false;
      }

      return true;
    }

    // ══════════════════════════════════════════════════════════════════
    // [2] 무인증 실시간 Google 번역 API + 동적 숫자 마스킹
    // ══════════════════════════════════════════════════════════════════
    async function fetchOnlineTranslation(text) {
      try {
        const url = 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=ko&q=' + encodeURIComponent(text);
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        return Array.isArray(data) ? data.join('') : data;
      } catch (err) {
        // 2차 백업: MyMemory
        try {
          const bUrl = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|ko';
          const bRes = await fetch(bUrl);
          const bData = await bRes.json();
          return bData.responseData?.translatedText || text;
        } catch (e2) {
          return text;
        }
      }
    }

    async function translateSingleSmart(rawText) {
      const trimmed = rawText.trim();
      if (!shouldTranslate(trimmed)) return rawText;

      // 1. 캐시 및 정규식 조회
      if (memoryCache[trimmed]) return memoryCache[trimmed];
      for (let r = 0; r < REGEX_RULES.length; r++) {
        const rule = REGEX_RULES[r];
        if (rule.pattern.test(trimmed)) {
          const res = trimmed.replace(rule.pattern, rule.replacement);
          memoryCache[trimmed] = res;
          return res;
        }
      }

      // 2. 가변 숫자 마스킹 ({0}, {1} 등 플레이스홀더 보존)
      const numbers = [];
      const template = trimmed.replace(/\{[0-9]+\}|\b\d+(?:\.\d+)?%?\b/g, (match) => {
        if (match.startsWith('{') && match.endsWith('}')) return match;
        numbers.push(match);
        return '__NUM' + (numbers.length - 1) + '__';
      });

      if (numbers.length > 0) {
        let translatedTemplate;
        if (memoryCache[template]) {
          translatedTemplate = memoryCache[template];
        } else {
          translatedTemplate = await fetchOnlineTranslation(template);
          memoryCache[template] = translatedTemplate;
        }
        let finalStr = translatedTemplate;
        for (let i = 0; i < numbers.length; i++) {
          finalStr = finalStr.replace(new RegExp('__NUM' + i + '__', 'g'), numbers[i]);
        }
        memoryCache[trimmed] = finalStr;
        return finalStr;
      } else {
        const translated = await fetchOnlineTranslation(trimmed);
        if (translated && translated !== trimmed) {
          memoryCache[trimmed] = translated;
        }
        return translated;
      }
    }

    async function translateSmart(rawText) {
      const res = await translateSingleSmart(rawText);
      saveCache();
      return rawText.replace(rawText.trim(), res);
    }

    // ══════════════════════════════════════════════════════════════════
    // [3] 인라인 자식 태그 직렬화 및 DOM 무손실 재조립 (과제 1 해결)
    // ══════════════════════════════════════════════════════════════════
    // 컨테이너 직계 자식들을 {0}, {1} 문장으로 직렬화
    function serializeMixedContainer(container) {
      if (!container || container.nodeType !== 1) return null;
      if (container._agy_mixed_translated || container.getAttribute('_agy_mixed') === '1') return null;

      const children = Array.from(container.childNodes);
      if (children.length < 2) return null;

      let hasDirectTextWithLetters = false;
      let hasInlineElement = false;
      const elements = [];
      let serialized = '';

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.nodeType === 3) { // TEXT_NODE
          const val = child.nodeValue;
          serialized += val;
          if (/[A-Za-z]/.test(val)) {
            hasDirectTextWithLetters = true;
          }
        } else if (child.nodeType === 1 && INLINE_TAGS.has(child.tagName)) {
          // 인라인 자식 요소
          hasInlineElement = true;
          const placeholder = '{' + elements.length + '}';
          elements.push(child);
          serialized += placeholder;
        } else {
          // 블록 요소(DIV, P, UL 등)가 섞여 있으면 복합 문장이 아님!
          return null;
        }
      }

      // 직접적인 텍스트(알파벳 포함)와 인라인 요소가 함께 있고, 인라인 요소가 5개 이하인 경우에만 직렬화
      if (hasDirectTextWithLetters && hasInlineElement && elements.length <= 5) {
        const trimmed = serialized.trim();
        if (shouldTranslate(trimmed)) {
          return { text: trimmed, elements };
        }
      }
      return null;
    }

    function deserializeAndRebuild(container, translatedText, elements) {
      try {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        const regex = /\{\s*(\d+)\s*\}/g;
        const inserted = new Set();
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(translatedText)) !== null) {
          if (match.index > lastIndex) {
            const chunk = translatedText.substring(lastIndex, match.index);
            container.appendChild(document.createTextNode(chunk));
          }
          const elemIdx = parseInt(match[1], 10);
          const elem = elements[elemIdx];
          if (elem) {
            // CODE, KBD 태그는 코드/명령어 원형 유지, 그 외(STRONG, A, B, SPAN 등)는 내부 텍스트 번역 검사
            if (elem.tagName === 'CODE' || elem.tagName === 'KBD') {
              elem._agy_translated = true;
            } else {
              const childWalker = document.createTreeWalker(elem, NodeFilter.SHOW_TEXT);
              let cText;
              while ((cText = childWalker.nextNode())) {
                const cv = cText.nodeValue;
                if (cv && shouldTranslate(cv) && !cText._agy_translated) {
                  queueTranslation({ type: 'text', node: cText, text: cv.trim(), orig: cv });
                }
              }
            }
            container.appendChild(elem);
            inserted.add(elemIdx);
          }
          lastIndex = regex.lastIndex;
        }

        if (lastIndex < translatedText.length) {
          const remaining = translatedText.substring(lastIndex);
          container.appendChild(document.createTextNode(remaining));
        }

        for (let i = 0; i < elements.length; i++) {
          if (!inserted.has(i) && elements[i]) {
            container.appendChild(elements[i]);
          }
        }

        container._agy_mixed_translated = true;
        if (container.setAttribute) container.setAttribute('_agy_mixed', '1');
      } catch (e) {}
    }

    // ══════════════════════════════════════════════════════════════════
    // [4] 비동기 번역 큐 (Batch Queue)
    // ══════════════════════════════════════════════════════════════════
    const pendingItems = new Map(); // text -> Array<{ type, node, elements, attrName, orig }>
    let batchTimer = null;

    function queueTranslation(item) {
      const text = item.text.trim();
      if (!shouldTranslate(text)) return;

      // 1. 이미 캐시에 있으면 즉시 치환 (0ms)
      if (memoryCache[text]) {
        applyTranslationResult(item, memoryCache[text]);
        return;
      }

      if (!pendingItems.has(text)) {
        pendingItems.set(text, []);
      }
      pendingItems.get(text).push(item);

      if (!batchTimer) {
        batchTimer = setTimeout(processBatchQueue, 40);
      }
    }

    function applyTranslationResult(item, translated) {
      try {
        if (!translated || translated === item.text) return; // 미번역/실패 시 플래그 설정하지 않고 재시도 가능하게 유지!

        if (item.type === 'mixed') {
          deserializeAndRebuild(item.node, translated, item.elements);
        } else if (item.type === 'text') {
          if (item.node && item.node.nodeType === 3) {
            item.node.nodeValue = item.orig.replace(item.text, translated);
            item.node._agy_translated = true;
          }
        } else if (item.type === 'attr' && item.node && item.node.setAttribute) {
          item.node.setAttribute(item.attrName, translated);
        }
      } catch (e) {}
    }

    const CHUNK_SIZE = 8; // Google Translate GET 요청 청크 크기 (최대 8개)

    async function translateChunk(chunk) {
      const texts = chunk.map(([text]) => text);
      try {
        const url = 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=ko&' +
                    texts.map(t => 'q=' + encodeURIComponent(t)).join('&');
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (Array.isArray(data) && data.length === texts.length) {
          for (let i = 0; i < texts.length; i++) {
            const origText = texts[i];
            const trans = data[i] || origText;
            if (trans && trans !== origText) {
              memoryCache[origText] = trans;
              chunk[i][1].forEach(it => applyTranslationResult(it, trans));
            }
          }
          saveCache();
          return;
        }
      } catch (err) {
        // 청크 일괄 요청 실패 시 개별 안전 폴백 진행
      }

      // 개별 안전 폴백
      for (let i = 0; i < chunk.length; i++) {
        const [origText, items] = chunk[i];
        try {
          const trans = await translateSingleSmart(origText);
          if (trans && trans !== origText) {
            memoryCache[origText] = trans;
            items.forEach(it => applyTranslationResult(it, trans));
          }
        } catch (e) {}
      }
      saveCache();
    }

    async function processBatchQueue() {
      batchTimer = null;
      if (pendingItems.size === 0) return;

      const allEntries = Array.from(pendingItems.entries());
      pendingItems.clear();

      // 1. 이미 캐시나 정규식에 매칭되는 항목은 즉시 0ms 치환
      const uncached = [];
      for (let i = 0; i < allEntries.length; i++) {
        const [text, items] = allEntries[i];
        if (memoryCache[text]) {
          items.forEach(it => applyTranslationResult(it, memoryCache[text]));
          continue;
        }
        let matchedRegex = false;
        for (let r = 0; r < REGEX_RULES.length; r++) {
          const rule = REGEX_RULES[r];
          if (rule.pattern.test(text)) {
            const res = text.replace(rule.pattern, rule.replacement);
            memoryCache[text] = res;
            items.forEach(it => applyTranslationResult(it, res));
            matchedRegex = true;
            break;
          }
        }
        if (matchedRegex) continue;

        uncached.push(allEntries[i]);
      }

      if (uncached.length === 0) {
        saveCache();
        return;
      }

      // 2. 미캐시 항목을 CHUNK_SIZE(8개)씩 청크 분할하여 순차 요청 (429 Rate Limit 완전 차단)
      for (let i = 0; i < uncached.length; i += CHUNK_SIZE) {
        const chunk = uncached.slice(i, i + CHUNK_SIZE);
        await translateChunk(chunk);
        if (i + CHUNK_SIZE < uncached.length) {
          await new Promise(r => setTimeout(r, 30));
        }
      }
    }

    // ══════════════════════════════════════════════════════════════════
    // [5] DOM 노드 검사 및 순회 엔진 (TreeWalker & Mixed Detector)
    // ══════════════════════════════════════════════════════════════════
    let isPatching = false;

    function inspectAndQueue(node) {
      if (!node) return;
      try {
        // 단일 텍스트 노드
        if (node.nodeType === 3) {
          if (isElementExcluded(node)) return;
          if (!node._agy_translated) {
            const val = node.nodeValue;
            if (val && shouldTranslate(val)) {
              queueTranslation({ type: 'text', node, text: val.trim(), orig: val });
            }
          }
          return;
        }

        if (node.nodeType !== 1) return;

        // 제외 대상 태그 또는 상위 컨테이너(프롬프트, 채팅, 에디터 등) 검사
        if (isElementExcluded(node)) return;

        // 1. 속성 검사 (placeholder, title, aria-label)
        const checkAttr = (el, attr) => {
          if (el.hasAttribute && el.hasAttribute(attr)) {
            const val = el.getAttribute(attr);
            if (val && shouldTranslate(val)) {
              queueTranslation({ type: 'attr', node: el, attrName: attr, text: val.trim(), orig: val });
            }
          }
        };

        ['placeholder', 'title', 'aria-label'].forEach(a => checkAttr(node, a));
        if (node.querySelectorAll) {
          const elsWithAttrs = node.querySelectorAll('[placeholder], [title], [aria-label]');
          for (let i = 0; i < elsWithAttrs.length; i++) {
            const elAttr = elsWithAttrs[i];
            if (!isElementExcluded(elAttr)) {
              ['placeholder', 'title', 'aria-label'].forEach(a => checkAttr(elAttr, a));
            }
          }
        }

        // 2. node 자체가 인라인 혼합 문장 컨테이너인지 확인
        const mixedSelf = serializeMixedContainer(node);
        if (mixedSelf) {
          queueTranslation({
            type: 'mixed',
            node,
            text: mixedSelf.text,
            elements: mixedSelf.elements
          });
          return;
        }

        // 3. node 하위에 인라인 혼합 문장 컨테이너(p, div, li, label, h1-h6 등)가 있는지 확인
        if (node.querySelectorAll) {
          const candidates = node.querySelectorAll('p, div, li, td, th, label, h1, h2, h3, h4, h5, h6');
          for (let i = 0; i < candidates.length; i++) {
            const cand = candidates[i];
            if (!isElementExcluded(cand)) {
              const mixed = serializeMixedContainer(cand);
              if (mixed) {
                queueTranslation({
                  type: 'mixed',
                  node: cand,
                  text: mixed.text,
                  elements: mixed.elements
                });
              }
            }
          }
        }

        // 4. 일반 텍스트 노드 전체 순회 (TreeWalker)
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
          acceptNode: function(tNode) {
            const p = tNode.parentElement;
            if (!p || isElementExcluded(p)) return NodeFilter.FILTER_REJECT;
            if (tNode._agy_translated) return NodeFilter.FILTER_SKIP;
            if (p.closest && p.closest('[_agy_mixed="1"]')) return NodeFilter.FILTER_SKIP;

            const v = tNode.nodeValue;
            if (!v || !/[A-Za-z]/.test(v)) return NodeFilter.FILTER_SKIP;
            return NodeFilter.FILTER_ACCEPT;
          }
        });

        let current;
        while ((current = walker.nextNode())) {
          const val = current.nodeValue;
          if (val && shouldTranslate(val)) {
            queueTranslation({ type: 'text', node: current, text: val.trim(), orig: val });
          }
        }
      } catch (e) {}
    }

    // ══════════════════════════════════════════════════════════════════
    // [6] 실시간 모델 한도(Quota) 위젯 & State Persistence (과제 3 해결)
    // ══════════════════════════════════════════════════════════════════
    const WIDGET_ID = 'antigravity-live-quota-widget';
    const PERSISTENT_QUOTA_KEY = 'agy_quota_data_persistent_v4';

    // State Persistence: 설정 창을 닫아도 절대 100%나 null로 리셋되지 않고 유지!
    let quotaData = {
      gemini: { weekly: null, fiveHour: null, weeklyReset: null, fiveHourReset: null },
      claude: { weekly: null, fiveHour: null, weeklyReset: null, fiveHourReset: null }
    };

    // 로컬 스토리지에서 이전 실제 데이터 복원
    try {
      const saved = localStorage.getItem(PERSISTENT_QUOTA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.gemini || parsed.claude)) {
          quotaData = parsed;
        }
      }
    } catch (e) {}

    function savePersistentQuota() {
      try {
        localStorage.setItem(PERSISTENT_QUOTA_KEY, JSON.stringify(quotaData));
      } catch (e) {}
    }

    // 유효한 수치(0.0 ~ 1.0)만 업데이트하며, 유효하지 않은 값은 기존 수치를 유지!
    function applyQuotaUpdate(targetGroup, weeklyVal, fiveHourVal, weeklyReset, fiveHourReset) {
      let changed = false;
      const target = quotaData[targetGroup];
      if (!target) return;

      if (typeof weeklyVal === 'number' && !isNaN(weeklyVal) && weeklyVal >= 0 && weeklyVal <= 1.0) {
        target.weekly = weeklyVal;
        if (weeklyReset) target.weeklyReset = weeklyReset;
        changed = true;
      }
      if (typeof fiveHourVal === 'number' && !isNaN(fiveHourVal) && fiveHourVal >= 0 && fiveHourVal <= 1.0) {
        target.fiveHour = fiveHourVal;
        if (fiveHourReset) target.fiveHourReset = fiveHourReset;
        changed = true;
      }

      if (changed) {
        savePersistentQuota();
        renderWidget();
      }
    }

    function formatPercent(val) {
      if (val === null || val === undefined || isNaN(val)) return '조회 필요';
      return Math.max(0, Math.min(100, Math.round(val * 100))) + '%';
    }

    function getQuotaColor(val) {
      if (val === null || val === undefined || isNaN(val)) return '#94a3b8'; // 회색 (미수신)
      const p = Math.round(val * 100);
      if (p >= 50) return '#22c55e'; // 초록
      if (p >= 20) return '#eab308'; // 노랑
      return '#ef4444';                // 빨강
    }

    function formatTimeRemaining(timeStr) {
      if (!timeStr) return '안내 없음';
      try {
        const target = new Date(timeStr).getTime();
        const diff = target - Date.now();
        if (diff <= 0) return '곧 초기화';
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        if (h > 24) return `${Math.floor(h / 24)}일 ${h % 24}시간 후 초기화`;
        if (h > 0) return `${h}시간 ${m}분 후 초기화`;
        return `${m}분 후 초기화`;
      } catch (e) {
        return '안내 없음';
      }
    }

    // TrustedTypes 준수: createElement로만 알약(Pill) 생성
    function createPill(label, state) {
      const pill = document.createElement('div');
      pill.className = 'agy-quota-badge';
      pill.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.14);
        padding: 2px 9px;
        border-radius: 9999px;
        font-size: 11px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #e2e8f0;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -webkit-app-region: no-drag;
        pointer-events: auto;
        white-space: nowrap;
        flex-shrink: 0;
        transition: background 0.15s, border-color 0.15s;
      `;

      const hasData = (state.weekly !== null || state.fiveHour !== null);
      const wText = formatPercent(state.weekly);
      const fText = formatPercent(state.fiveHour);

      pill.title = hasData
        ? `${label} 실시간 잔여 한도\n• 주간 한도: ${wText} (${formatTimeRemaining(state.weeklyReset)})\n• 5시간 한도: ${fText} (${formatTimeRemaining(state.fiveHourReset)})\n[클릭 시 모델 및 사용량(Models & Usage) 화면 열기]`
        : `${label}: 실제 사용량이 아직 조회되지 않았습니다.\n[클릭하여 모델 및 사용량 화면 열기]`;

      const labelSpan = document.createElement('span');
      labelSpan.style.cssText = 'font-weight: 600; color: #cbd5e1;';
      labelSpan.textContent = label + ':';
      pill.appendChild(labelSpan);

      // 주간 한도
      const wWrap = document.createElement('span');
      wWrap.style.cssText = 'display: inline-flex; align-items: center; gap: 2px;';
      const wLbl = document.createElement('span');
      wLbl.style.cssText = 'color: #94a3b8; font-size: 10.5px;';
      wLbl.textContent = '주간';
      const wVal = document.createElement('span');
      wVal.style.cssText = `color: ${getQuotaColor(state.weekly)}; font-weight: 700;`;
      wVal.textContent = wText;
      wWrap.appendChild(wLbl);
      wWrap.appendChild(wVal);
      pill.appendChild(wWrap);

      // 구분점
      const dot = document.createElement('span');
      dot.style.cssText = 'color: #64748b; font-size: 9px;';
      dot.textContent = '·';
      pill.appendChild(dot);

      // 5시간 한도
      const fWrap = document.createElement('span');
      fWrap.style.cssText = 'display: inline-flex; align-items: center; gap: 2px;';
      const fLbl = document.createElement('span');
      fLbl.style.cssText = 'color: #94a3b8; font-size: 10.5px;';
      fLbl.textContent = '5시간';
      const fVal = document.createElement('span');
      fVal.style.cssText = `color: ${getQuotaColor(state.fiveHour)}; font-weight: 700;`;
      fVal.textContent = fText;
      fWrap.appendChild(fLbl);
      fWrap.appendChild(fVal);
      pill.appendChild(fWrap);

      pill.onmouseenter = function() {
        pill.style.background = 'rgba(255, 255, 255, 0.13)';
        pill.style.borderColor = 'rgba(255, 255, 255, 0.28)';
      };
      pill.onmouseleave = function() {
        pill.style.background = 'rgba(255, 255, 255, 0.06)';
        pill.style.borderColor = 'rgba(255, 255, 255, 0.14)';
      };
      pill.onclick = function(e) {
        e.stopPropagation();
        triggerOpenModels();
      };

      return pill;
    }

    function ensureSpinAnimation() {
      const SPIN_STYLE_ID = 'ag-spin-anim-style';
      if (!document.getElementById(SPIN_STYLE_ID)) {
        const s = document.createElement('style');
        s.id = SPIN_STYLE_ID;
        s.textContent = '@keyframes ag-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
        document.head.appendChild(s);
      }
    }

    function renderWidget() {
      try {
        const container = document.getElementById(WIDGET_ID);
        if (!container) return;

        ensureSpinAnimation();

        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        const wrap = document.createElement('div');
        wrap.style.cssText = 'display: inline-flex; align-items: center; gap: 6px; -webkit-app-region: no-drag; pointer-events: auto;';

        wrap.appendChild(createPill('Gemini', quotaData.gemini));
        wrap.appendChild(createPill('Claude·GPT', quotaData.claude));

        // 수동 새로고침 버튼 (↻)
        const refreshBtn = document.createElement('button');
        refreshBtn.id = 'ag-quota-refresh-btn';
        refreshBtn.setAttribute('title', '사용량 새로고침');
        refreshBtn.style.cssText = `
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #a1a1aa;
          cursor: pointer;
          padding: 0;
          margin-left: 2px;
          font-size: 13px;
          line-height: 1;
          transition: all 0.2s ease;
          user-select: none;
          -webkit-app-region: no-drag;
          pointer-events: auto;
        `;
        refreshBtn.onmouseenter = () => {
          refreshBtn.style.background = 'rgba(255, 255, 255, 0.16)';
          refreshBtn.style.color = '#ffffff';
        };
        refreshBtn.onmouseleave = () => {
          refreshBtn.style.background = 'rgba(255, 255, 255, 0.08)';
          refreshBtn.style.color = '#a1a1aa';
        };

        const spinSpan = document.createElement('span');
        spinSpan.textContent = '↻';
        spinSpan.style.cssText = 'display: inline-block; transform-origin: center; transition: transform 0.2s;';
        refreshBtn.appendChild(spinSpan);

        refreshBtn.onclick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          spinSpan.style.animation = 'ag-spin 0.6s linear infinite';
          refreshQuotaSilently().finally(() => {
            setTimeout(() => {
              spinSpan.style.animation = 'none';
            }, 400);
          });
        };

        wrap.appendChild(refreshBtn);
        container.appendChild(wrap);
      } catch (e) {}
    }

    function triggerOpenModels() {
      try {
        const settingsBtn = document.querySelector('[data-testid="settings-button"]');
        if (settingsBtn) {
          settingsBtn.click();
          setTimeout(() => {
            const tabs = Array.from(document.querySelectorAll('button, [role="tab"], div'));
            const modelsTab = tabs.find(el => (el.textContent || '').trim() === 'Models' || (el.textContent || '').trim() === '모델');
            if (modelsTab) modelsTab.click();
          }, 200);
          return;
        }
        const moreBtn = document.querySelector('[data-testid="titlebar-more-actions"]');
        if (moreBtn) moreBtn.click();
      } catch (e) {}
    }

    function injectWidget() {
      try {
        if (document.getElementById(WIDGET_ID)) return;

        const menuBar = document.querySelector('[data-testid="title-menu-bar"]');
        const widget = document.createElement('div');
        widget.id = WIDGET_ID;
        widget.style.cssText = `
          display: inline-flex;
          align-items: center;
          margin-left: 14px;
          margin-right: 180px; /* 우측 윈도우 조절 버튼(- □ ×)과의 간섭 완전 방지 */
          -webkit-app-region: no-drag;
          pointer-events: auto;
          flex-shrink: 0;
          z-index: 999;
        `;

        if (menuBar) {
          menuBar.appendChild(widget);
          renderWidget();
        } else {
          widget.style.position = 'fixed';
          widget.style.top = '5px';
          widget.style.right = '180px';
          document.body.appendChild(widget);
          renderWidget();
        }
      } catch (e) {}
    }

    // ══════════════════════════════════════════════════════════════════
    // [7] 안전 네트워크 가로채기 (fetch & XHR Pass-through)
    // ══════════════════════════════════════════════════════════════════
    function parseQuotaPayload(data) {
      if (!data) return;
      const groups = data.groups || data.response?.groups;
      if (!Array.isArray(groups) || groups.length === 0) return;

      groups.forEach(g => {
        const name = (g.displayName || g.modelName || g.model || '').toLowerCase();
        const isGemini = name.includes('gemini') || name.includes('flash') || name.includes('pro');
        const groupKey = isGemini ? 'gemini' : 'claude';

        const buckets = g.buckets || (g.quotaInfo ? [g.quotaInfo] : []);
        buckets.forEach(b => {
          const bName = (b.displayName || b.bucketId || '').toLowerCase();
          const frac = (typeof b.remainingFraction === 'number') ? b.remainingFraction : null;
          const reset = b.resetTimestamp || b.quotaResetUTCTimestamp;
          const isWeekly = bName.includes('weekly') || b.quotaBucketType === 1;

          if (frac !== null) {
            if (isWeekly) {
              applyQuotaUpdate(groupKey, frac, null, reset, null);
            } else {
              applyQuotaUpdate(groupKey, null, frac, null, reset);
            }
          }
        });
      });
    }

    // fetch 안전 가로채기
    const originalFetch = window.fetch;
    if (typeof originalFetch === 'function') {
      window.fetch = async function(...args) {
        const response = await originalFetch.apply(this, args);
        try {
          const url = (typeof args[0] === 'string') ? args[0] : (args[0]?.url || '');
          if (/retrieveUserQuotaSummary|loadCodeAssist|fetchAvailableModels|quota/i.test(url)) {
            setTimeout(() => {
              try {
                const clone = response.clone();
                clone.text().then(text => {
                  try {
                    const json = JSON.parse(text);
                    parseQuotaPayload(json);
                  } catch (e) {}
                }).catch(() => {});
              } catch (e) {}
            }, 0);
          }
        } catch (e) {}
        return response;
      };
    }

    // XHR 안전 가로채기
    const origXhrOpen = XMLHttpRequest.prototype.open;
    const origXhrSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url) {
      this._agy_target_url = url;
      return origXhrOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function() {
      this.addEventListener('load', function() {
        try {
          const url = this._agy_target_url || '';
          if (/retrieveUserQuotaSummary|loadCodeAssist|quota/i.test(url)) {
            const json = JSON.parse(this.responseText);
            parseQuotaPayload(json);
          }
        } catch (e) {}
      });
      return origXhrSend.apply(this, arguments);
    };

    // ══════════════════════════════════════════════════════════════════
    // [7-1] 정확한 % 기호 기반 구조적 쿼터 파서
    // ══════════════════════════════════════════════════════════════════
    function scrapeQuotaFromModal(modal) {
      if (!modal) return null;
      try {
        const modalText = modal.textContent || '';
        if (!modalText.includes('Models') && !modalText.includes('모델') &&
            !modalText.includes('Gemini') && !modalText.includes('쌍둥이자리') && !modalText.includes('Claude')) {
          return null;
        }

        const res = {
          gemini: { weekly: null, fiveHour: null },
          claude: { weekly: null, fiveHour: null }
        };

        // 1. 헤딩 기반 정확한 섹션 분리 매핑
        const allElements = Array.from(modal.querySelectorAll('*'));
        const headings = allElements.filter(el => {
          const t = (el.textContent || '').trim();
          return (t === 'Gemini Models' || t === 'Gemini 모델' || t === '쌍둥이자리 모델' ||
                  t === 'Claude and GPT Models' || t === 'Claude & GPT Models' || t === 'Claude 및 GPT 모델');
        });

        headings.forEach(h => {
          const isGem = /Gemini|쌍둥이자리|제미나이|제미니/i.test(h.textContent);
          const groupKey = isGem ? 'gemini' : 'claude';
          const card = h.closest('.space-y-2') || h.parentElement.parentElement;
          if (!card) return;

          const matches = [];
          const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
          let node;
          while ((node = walker.nextNode())) {
            const m = node.nodeValue.match(/^\s*(\d{1,3})%\s*$/) || node.nodeValue.match(/\b(\d{1,3})\s*%/);
            if (m) matches.push(parseInt(m[1], 10));
          }

          if (matches.length > 0) {
            res[groupKey].weekly = matches[0] / 100;
            if (matches.length > 1) {
              res[groupKey].fiveHour = matches[1] / 100;
            } else if (matches[0] === 0) {
              res[groupKey].fiveHour = 0;
            }
          }
        });

        // 2. 구조적 폴백: 프로그레스 서클 행 순서 기반 파싱
        if (res.gemini.weekly === null && res.claude.weekly === null) {
          const circleRows = Array.from(modal.querySelectorAll('[data-testid="quota-progress-circle"]')).map(c => {
            const row = c.closest('.flex-row') || c.parentElement;
            const textSpan = row ? row.querySelector('span') : null;
            const match = (textSpan ? textSpan.textContent : '').match(/\b(\d{1,3})\s*%/);
            return match ? parseInt(match[1], 10) : null;
          }).filter(v => v !== null);

          if (circleRows.length >= 2) {
            res.gemini.weekly = circleRows[0] / 100;
            res.gemini.fiveHour = circleRows[1] / 100;
            if (circleRows.length >= 3) res.claude.weekly = circleRows[2] / 100;
            if (circleRows.length >= 4) res.claude.fiveHour = circleRows[3] / 100;
            else if (circleRows.length === 3 && circleRows[2] === 0) res.claude.fiveHour = 0;
          }
        }

        // 유효한 수치 업데이트
        if (res.gemini.weekly !== null || res.gemini.fiveHour !== null) {
          applyQuotaUpdate('gemini', res.gemini.weekly, res.gemini.fiveHour, null, null);
        }
        if (res.claude.weekly !== null || res.claude.fiveHour !== null) {
          applyQuotaUpdate('claude', res.claude.weekly, res.claude.fiveHour, null, null);
        }

        return res;
      } catch (e) {
        return null;
      }
    }

    // ══════════════════════════════════════════════════════════════════
    // [7-2] 백그라운드 무음 스캔 (Silent Background Probe)
    // ══════════════════════════════════════════════════════════════════
    let isProbing = false;

    async function refreshQuotaSilently() {
      if (isProbing) return;
      isProbing = true;

      try {
        // 이미 설정 모달이 열려 있는 상태라면 화면 조작 없이 바로 파싱
        const existingModal = document.querySelector('[role="dialog"], [aria-modal="true"], .settings-modal-container');
        if (existingModal && existingModal.offsetParent !== null) {
          scrapeQuotaFromModal(existingModal);
          return;
        }

        // 모달 깜빡임 및 상호작용 차단용 무음 투명 CSS 주입
        const STYLE_ID = 'ag-silent-probe-style';
        let styleEl = document.getElementById(STYLE_ID);
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = STYLE_ID;
          styleEl.textContent = `
            .ag-silent-probe,
            .ag-silent-probe * {
              opacity: 0 !important;
              pointer-events: none !important;
              transition: none !important;
              animation: none !important;
            }
          `;
          document.head.appendChild(styleEl);
        }
        document.documentElement.classList.add('ag-silent-probe');

        const settingsBtn = document.querySelector('[data-testid="settings-button"]');
        if (!settingsBtn) {
          document.documentElement.classList.remove('ag-silent-probe');
          return;
        }
        settingsBtn.click();

        // 모달 생성 및 모델 탭 렌더링 확인 (최대 800ms)
        for (let i = 0; i < 16; i++) {
          await new Promise(r => setTimeout(r, 50));
          const modal = document.querySelector('[role="dialog"], [aria-modal="true"], .fixed.inset-0, .settings-modal-container');
          if (modal) {
            const tabs = Array.from(modal.querySelectorAll('button, div, span'));
            const modelsTab = tabs.find(el => {
              const t = (el.textContent || '').trim();
              return (t === 'Models' || t === '모델') && el.closest('.w-64, [class*="sidebar"], nav, .flex-col');
            });
            if (modelsTab) {
              modelsTab.click();
              modelsTab.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            }

            const parsed = scrapeQuotaFromModal(modal);
            if (parsed && (parsed.gemini.weekly !== null || parsed.claude.weekly !== null)) {
              break;
            }
          }
        }

        // 모달 닫기 (Escape 키 또는 닫기 버튼)
        const closeBtn = document.querySelector('[role="dialog"] button[aria-label*="Close"], [role="dialog"] button[aria-label*="닫기"], [data-testid="close-button"]');
        if (closeBtn) {
          closeBtn.click();
        } else {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
        }

        setTimeout(() => {
          document.documentElement.classList.remove('ag-silent-probe');
          const s = document.getElementById(STYLE_ID);
          if (s) s.remove();
        }, 100);

      } catch (e) {
        document.documentElement.classList.remove('ag-silent-probe');
      } finally {
        isProbing = false;
      }
    }

    // ══════════════════════════════════════════════════════════════════
    // [8] 전체 통합 MutationObserver & 2.5초 안전 지연 부팅
    // ══════════════════════════════════════════════════════════════════
    let wasGenerating = false;
    function checkStreamingEnd() {
      // 깜빡임 방지: 자동 백그라운드 모달 트리거를 완전히 제거하여 타이핑 및 화면 간섭 0% 보장
    }

    let rafId = null;

    function handleDomChanges(mutations) {
      if (isPatching) return;
      isPatching = true;

      try {
        for (let i = 0; i < mutations.length; i++) {
          const m = mutations[i];
          if (m.type === 'childList') {
            for (let j = 0; j < m.addedNodes.length; j++) {
              inspectAndQueue(m.addedNodes[j]);
            }
          } else if (m.type === 'characterData') {
            inspectAndQueue(m.target);
          } else if (m.type === 'attributes') {
            inspectAndQueue(m.target);
          }
        }

        if (!document.getElementById(WIDGET_ID)) {
          injectWidget();
        }

        const modal = document.querySelector('[role="dialog"], [aria-modal="true"], .fixed.inset-0');
        if (modal) scrapeQuotaFromModal(modal);
      } catch (e) {
      } finally {
        isPatching = false;
      }
    }

    function startEngine() {
      setTimeout(() => {
        try {
          // 1. 현재 화면 전체 스캔
          inspectAndQueue(document.body);

          // 2. 위젯 삽입
          injectWidget();

          // 3. MutationObserver 등록 (React Portal, 모달, 드롭다운 완벽 감지)
          const observer = new MutationObserver((mutations) => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => handleDomChanges(mutations));
          });

          observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title', 'aria-label']
          });

          // 4. 주기적 상태 갱신 (10초마다 - 모달이 이미 열려 있을 때만 비침습 스캔)
          setInterval(() => {
            try {
              if (!document.getElementById(WIDGET_ID)) injectWidget();
              const m = document.querySelector('[role="dialog"], [aria-modal="true"], .fixed.inset-0');
              if (m) scrapeQuotaFromModal(m);
            } catch (e) {}
          }, 10000);

          // 5. 모달 및 동적 UI 전용 500ms 감시 (설정 창 오픈 즉시 한글화 및 쿼터 동기화)
          setInterval(() => {
            try {
              const modal = document.querySelector('[role="dialog"], [aria-modal="true"], .fixed.inset-0');
              if (modal) {
                inspectAndQueue(modal);
                scrapeQuotaFromModal(modal);
              }
            } catch (e) {}
          }, 500);

          // [완전 제거] 깜빡임과 포커스 상실을 유발하던 백그라운드 모달 자동 열기(refreshQuotaSilently) 제거!
          // 쿼터는 사용자가 ↻ 버튼을 누르거나, 설정창을 직접 열 때, 또는 네트워크 API 통신 시 100% 안전하게 갱신됩니다.

        } catch (bootErr) {
          console.error('[AGY-KO-PATCH] Boot error:', bootErr);
        }
      }, 2500); // React 마운트 완료를 보장하는 안전 2.5초 지연
    }

    if (document.readyState === 'complete') {
      startEngine();
    } else {
      window.addEventListener('load', startEngine);
    }

  } catch (topCatch) {
    console.error('[AGY-KO-PATCH] Top error:', topCatch);
  }
})();
