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

    $('langBtn')      ?.addEventListener('click', () => { GameState.toggleLang(); update(); });
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
  if (event.key === 'Enter') { 
    const nextBtn = $('nextBtn'); 
    if (nextBtn) {
      event.preventDefault(); 
      GameState.next();
      update();
    }
  }
});

  return { update };
})();
