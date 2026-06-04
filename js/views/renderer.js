// ── VIEW — RENDERING FUNCTIONS ─────────────────────────────────────────────

const Renderer = (() => {

  // ── HELPERS ───────────────────────────────────────────────────────────────

  function binLabel(bin, lang) {
    return lang === 'sv' ? bin.labelSv : bin.labelEn;
  }

  // ── HEADER ────────────────────────────────────────────────────────────────

  function renderHeader(lang, t) {
    return `
      <header class="site-header">
        <div class="logo">SortSmart</div>
        <button class="lang-pill" id="langBtn" aria-label="Switch language">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          ${t.langLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </header>`;
  }

  // ── REFERENCE FAB ─────────────────────────────────────────────────────────

  function renderRefFab(t) {
    return `
      <a href="reference.html" class="ref-fab" rel="noopener">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="2" width="16" height="20" rx="2"/>
          <line x1="8" y1="7" x2="16" y2="7"/>
          <line x1="8" y1="11" x2="16" y2="11"/>
          <line x1="8" y1="15" x2="12" y2="15"/>
        </svg>
        <span>${t.reference}</span>
      </a>`;
  }

  // ── START SCREEN ──────────────────────────────────────────────────────────

  function renderBinsIllustration(t) {
  return `
    <div class="illus-oval">
      <img class="bins-illustration"
           src="assets/bins.png"
           alt="${t.illustrationAlt || ''}">
    </div>`;
}

  function renderStart(t) {
  return `
    <main class="screen start-screen">
      ${renderBinsIllustration(t)}
     <h1 class="start-title">${t.welcome}</h1>
      <p class="start-subtitle">${t.subtitle}</p>
      <button class="start-btn" id="startBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        ${t.startBtn}
      </button>
    </main>`;
}


  // ── GAME SCREEN ───────────────────────────────────────────────────────────

  function renderBinTile(bin, s) {
    let badge = '';
    if (s.answered) {
      if (bin.key === s.feedback.correctBin) {
        badge = `<span class="tile-badge badge-correct">✅</span>`;
      } else if (bin.key === s.feedback.selectedBin && !s.feedback.correct) {
        badge = `<span class="tile-badge badge-wrong">❌</span>`;
      }
    }
    const disabledAttr = s.answered ? 'disabled' : '';
    return `
      <button class="bin-tile" style="background:${bin.color}" data-bin="${bin.key}" ${disabledAttr}>
        <span class="tile-icon">${bin.icon}</span>
        <span class="tile-label">${binLabel(bin, s.lang)}</span>
        ${badge}
      </button>`;
  }

  function renderGame(s, t) {
    const q     = s.currentQuestion;
    const total = s.totalQuestions;
    const qNum  = s.questionIndex + 1;
    const progressPct = s.answered
      ? (qNum / total) * 100
      : ((qNum - 1) / total) * 100;

    const statusIcon = s.answered
      ? `<span class="status-icon">${s.feedback.correct ? '✅' : '❌'}</span>`
      : '';

    const itemLabel = s.lang === 'sv' ? q.itemSv : q.itemEn;
    const hint      = s.lang === 'sv' ? q.hintSv : q.hintEn;
    const binsHtml  = BINS.map(bin => renderBinTile(bin, s)).join('');

    return `
      <main class="screen game-screen">
        <nav class="game-nav">
          <button class="home-btn" id="homeBtn">${t.home}</button>
          <div class="progress-wrap">
            <div class="q-label">${t.question} ${qNum}/${total} ${statusIcon}</div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${progressPct}%"></div>
            </div>
          </div>
          <div class="score-display">${t.score}: <strong>${s.score}</strong></div>
        </nav>

        <div class="question-card">
          <p class="question-text">${t.whichBin}</p>
          <img class="item-emoji" src="${q.emoji}" alt="${itemLabel}">
          <div class="item-pill">${itemLabel}</div>
        </div>

        <div class="bins-grid">${binsHtml}</div>

        ${s.answered ? `
          <div class="feedback-bar ${s.feedback.correct ? 'fb-correct' : 'fb-wrong'}">
            ${s.feedback.correct ? '✅' : '❌'} ${hint}
          </div>
          <div class="game-footer">
            <button class="next-btn" id="nextBtn">${t.next}</button>
          </div>` : ''}
      </main>`;
  }

  // ── RESULT SCREEN ─────────────────────────────────────────────────────────

  function renderResult(s, t) {
    const total = s.totalQuestions;
    const pct   = Math.round((s.score / total) * 100);

    let medal = '🥉', msg = t.medals.keep;
    if (pct === 100)     { medal = '🏆'; msg = t.medals.perfect; }
    else if (pct >= 80)  { medal = '🥇'; msg = t.medals.great; }
    else if (pct >= 60)  { medal = '🥈'; msg = t.medals.good; }

    const pips = Array.from({ length: total }, (_, i) =>
      `<div class="score-pip ${i < s.score ? 'pip-filled' : 'pip-empty'}"></div>`
    ).join('');

    return `
      <main class="screen result-screen">
        <div class="result-card">
          <div class="result-medal">${medal}</div>
          <h2 class="result-title">${t.gameComplete}</h2>
          <div class="result-score">${s.score}<span>/${total}</span></div>
          <div class="score-pips">${pips}</div>
          <p class="result-msg">${msg}</p>
        </div>
        <div class="result-actions">
          <button class="start-btn" id="playAgainBtn">${t.playAgain}</button>
          <button class="ghost-btn" id="homeResultBtn">${t.backToStart}</button>
        </div>
      </main>`;
  }

  // ── PUBLIC ────────────────────────────────────────────────────────────────

  function render(s, t) {
    let html = renderHeader(s.lang, t);

    if      (s.screen === 'start')  html += renderStart(t);
    else if (s.screen === 'game')   html += renderGame(s, t);
    else if (s.screen === 'result') html += renderResult(s, t);

    html += renderRefFab(t);
    return html;
  }

  return { render };
})();
