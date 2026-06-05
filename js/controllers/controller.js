// ── CONTROLLER — EVENT HANDLING & COORDINATION ─────────────────────────────

const Controller = (() => {
  const root = document.getElementById('app');

  const $ = id => document.getElementById(id);

  function update() {
    const s = GameState.getState();
    const t = TRANSLATIONS[s.lang];
    root.innerHTML = Renderer.render(s, t);
    bindEvents(s);
  }

  function bindEvents(s) {
    // const $ = id => document.getElementById(id);

    $('langSelect')   ?.addEventListener('change', (event) => { GameState.setLang(event.target.value); update(); });
    $('startBtn')     ?.addEventListener('click', () => { GameState.startGame();  update(); });
    $('homeBtn')      ?.addEventListener('click', () => { GameState.goHome();     update(); });
    $('nextBtn')      ?.addEventListener('click', () => { GameState.next();       update(); });
    $('playAgainBtn') ?.addEventListener('click', () => { GameState.startGame();  update(); });
    $('homeResultBtn')?.addEventListener('click', () => { GameState.goHome();     update(); });

    if (s.screen === 'game' && !s.answered) {
      document.querySelectorAll('.bin-tile').forEach(tile => {
        tile.addEventListener('click', () => {
          GameState.answer(tile.dataset.bin);
          update();
        });
      });
    }
  }

//Global keyboard listener
document.addEventListener('keydown', (event) => {
  const s = GameState.getState();

  // Language toggle with L key
  if (event.key === 'l' || event.key === 'L') {
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      event.preventDefault();
      GameState.toggleLang();
      update();
      return;
    }
  }

  if (s.screen === 'start') {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      GameState.startGame();
      update();
    }
  } else if (s.screen === 'game') {
    if (!s.answered) {
      if (['1', '2', '3', '4', '5'].includes(event.key)) {
        event.preventDefault();
        const index = parseInt(event.key, 10) - 1;
        if (index >= 0 && index < BINS.length) {
          GameState.answer(BINS[index].key);
          update();
        }
      }
    } else {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        GameState.next();
        update();
      }
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      GameState.goHome();
      update();
    }
  } else if (s.screen === 'result') {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      GameState.startGame();
      update();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      GameState.goHome();
      update();
    }
  }
});

  return { update };
})();
