// ── MODEL — GAME STATE & LOGIC ─────────────────────────────────────────────

const GameState = (() => {
  let lang = 'en';

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

  function toggleLang() {
    lang = lang === 'en' ? 'sv' : 'en';
    document.documentElement.lang = lang;
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

  return { getLang, toggleLang, getState, startGame, goHome, answer, next };
})();
