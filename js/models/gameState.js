// ── MODEL — GAME STATE & LOGIC ─────────────────────────────────────────────

const GameState = (() => {
  const LANG_STORAGE_KEY = 'sortsmart-lang';
  const SUPPORTED_LANGS = ['en', 'sv'];

  function readStoredLang() {
    try {
      const storedLang = window.localStorage?.getItem(LANG_STORAGE_KEY);
      return SUPPORTED_LANGS.includes(storedLang) ? storedLang : 'en';
    } catch {
      return 'en';
    }
  }

  let lang = readStoredLang();
  document.documentElement.lang = lang;

  let state = {
    screen:         'start',  // 'start' | 'game' | 'result'
    questionIndex:  0,
    score:          0,
    answered:       false,
    selectedBinKey: null,
    feedback:       null      // { correct, selectedBin, correctBin }
  };

  let questionOrder = [];

  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getLang() {
    return lang;
  }

  function setLang(nextLang) {
    if (!SUPPORTED_LANGS.includes(nextLang) || nextLang === lang) return;
    lang = nextLang;
    document.documentElement.lang = lang;
    try {
      window.localStorage?.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage failures; the in-memory language state still updates.
    }
  }

  function toggleLang() {
    setLang(lang === 'en' ? 'sv' : 'en');
  }

  function getState() {
    return {
      ...state,
      lang,
      currentQuestion: questionOrder[state.questionIndex] ?? null,
      totalQuestions:  questionOrder.length
    };
  }

  function startGame() {
    questionOrder = _shuffle(QUESTIONS).slice(0, 5);
    state = {
      screen:         'game',
      questionIndex:  0,
      score:          0,
      answered:       false,
      selectedBinKey: null,
      feedback:       null
    };
  }

  function goHome() {
    state = {
      screen:         'start',
      questionIndex:  0,
      score:          0,
      answered:       false,
      selectedBinKey: null,
      feedback:       null
    };
    questionOrder = [];
  }

  function answer(binKey) {
    if (state.answered || state.screen !== 'game') return;
    const q = questionOrder[state.questionIndex];
    if (!q) return;
    const correct = binKey === q.correctBin;
    if (correct) state.score++;
    state.answered      = true;
    state.selectedBinKey = binKey;
    state.feedback = {
      correct,
      selectedBin: binKey,
      correctBin:  q.correctBin
    };
  }

  function next() {
    if (!state.answered) return;
    const nextIndex = state.questionIndex + 1;
    if (nextIndex < questionOrder.length) {
      state.questionIndex  = nextIndex;
      state.answered       = false;
      state.selectedBinKey = null;
      state.feedback       = null;
    } else {
      state.screen = 'result';
    }
  }

  return { getLang, setLang, toggleLang, getState, startGame, goHome, answer, next };
})();
