// Add a per-resort Google Maps directions link beneath the selected resort's forecast.
document.addEventListener('DOMContentLoaded', () => {
  const panel = document.querySelector('#resort-panel');
  if (!panel) return;

  const style = document.createElement('style');
  style.textContent = `
    .current-location-directions{display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-top:14px;padding:12px 18px;border:0;border-radius:4px 12px 4px 12px;background:#244a3d;color:#fff;font:600 11px/1.2 inherit;letter-spacing:.06em;text-decoration:none;cursor:pointer;box-shadow:0 4px 12px #16332f24}
    .current-location-directions:hover,.current-location-directions:focus-visible{background:#315e4b;color:#fff;outline:2px solid #df8057;outline-offset:3px}
    .current-location-directions[hidden]{display:none}
  `;
  document.head.append(style);

  const addDirectionsLink = () => {
    const footer = panel.querySelector('.detail-footer');
    const heading = panel.querySelector('.detail-header h3');
    const links = panel.querySelector('.detail-links');
    if (!footer || !heading || !links || links.querySelector('.current-location-directions')) return;

    const resortName = heading.textContent.trim();
    const location = panel.querySelector('.detail-subtitle')?.textContent.trim() || 'Colorado';
    const destination = encodeURIComponent(`${resortName}, ${location}`);
    const link = document.createElement('a');
    link.className = 'current-location-directions';
    link.href = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'GET DIRECTIONS FROM MY LOCATION ↗';
    link.setAttribute('aria-label', `Open driving directions from your current location to ${resortName}`);
    links.append(link);
  };

  new MutationObserver(addDirectionsLink).observe(panel, { childList: true, subtree: true });
  addDirectionsLink();
});

// Request location automatically for the route estimates when supported; the map link itself
// lets Google Maps use the device's current location as the starting point.
document.addEventListener('DOMContentLoaded', () => {
  const locationButton = document.querySelector('#use-location');
  if (locationButton && 'geolocation' in navigator) locationButton.click();
});
