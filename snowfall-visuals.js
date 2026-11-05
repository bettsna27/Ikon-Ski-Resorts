// Add a compact seven-day snowfall visualization to forecast panels when snow is forecast.
(() => {
  const daySelectors = '.detail-forecast-day, .destination-forecast-day';
  const groups = '.detail-forecast-list, .destination-forecast-days';

  function renderSnowfallVisual(group) {
    if (!(group instanceof HTMLElement)) return;
    const days = [...group.querySelectorAll(daySelectors)];
    if (!days.length) return;

    const amounts = days.map((day) => {
      const value = Number.parseFloat(day.querySelector('strong')?.textContent || '');
      return Number.isFinite(value) ? Math.max(0, value) : 0;
    });
    const total = amounts.reduce((sum, amount) => sum + amount, 0);
    let visual = group.querySelector(':scope > .snowfall-visual');
    if (total <= 0) {
      visual?.remove();
      return;
    }

    if (!visual) {
      visual = document.createElement('div');
      visual.className = 'snowfall-visual';
      visual.setAttribute('role', 'img');
      group.prepend(visual);
    }

    const max = Math.max(...amounts, 0.1);
    const bars = amounts.map((amount, index) => {
      const dayLabel = days[index].querySelector('span')?.textContent.trim() || `Day ${index + 1}`;
      const shortLabel = dayLabel.split(/[ ,]+/)[0];
      const level = amount > 0 ? Math.max(0.08, amount / max) : 0;
      return `<span class="snowfall-bar-day" data-snow="${amount > 0}" aria-hidden="true" title="${amount.toFixed(1)} inches"><span class="snowfall-flake">${amount > 0 ? '❄' : ''}</span><span class="snowfall-bar" style="--snowfall-level:${level}"></span><span>${shortLabel}</span></span>`;
    }).join('');
    visual.innerHTML = `<span class="snowfall-visual-copy"><strong>❄ Snow in the forecast</strong><span>${total.toFixed(1)} in over ${days.length} days</span></span><span class="snowfall-bars" aria-hidden="true">${bars}</span>`;
    visual.setAttribute('aria-label', `${total.toFixed(1)} inches of forecast snowfall over ${days.length} days`);
  }

  function scan(root = document) {
    if (root instanceof Element && root.matches(groups)) renderSnowfallVisual(root);
    root.querySelectorAll?.(groups).forEach(renderSnowfallVisual);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan());
  else scan();

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.target instanceof Element) scan(mutation.target);
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) scan(node);
      });
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
