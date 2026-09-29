// shared timeline helper for the hero direction mockups: play(steps) runs [ms, fn] pairs and loops;
// restarts on load and on { deck: 'play', at: 'land' } from the deck or the picker page
window.heroTimeline = (reset, steps, loopMs) => {
  const timers = [];
  const play = () => {
    timers.splice(0).forEach(clearTimeout);
    reset();
    steps.forEach(([ms, fn]) => timers.push(setTimeout(fn, ms)));
    timers.push(setTimeout(play, loopMs));
  };
  addEventListener('message', e => { if (e.data && e.data.deck === 'play' && e.data.at === 'land') play(); });
  play();
};
window.$ = id => document.getElementById(id);
