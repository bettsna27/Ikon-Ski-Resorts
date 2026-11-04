// Automatically use the visitor's location for route estimates after the browser grants permission.
document.addEventListener('DOMContentLoaded', () => {
  const locationButton = document.querySelector('#use-location');
  if (locationButton && 'geolocation' in navigator) locationButton.click();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.warn('PWA offline support could not be enabled.', error);
    });
  }
});

// Keep a directions link directly below the resort tabs, updating it for the selected Colorado resort.
document.addEventListener('DOMContentLoaded', () => {
  const explorer = document.querySelector('.resort-explorer');
  const tablist = document.querySelector('#resort-tabs');
  const panel = document.querySelector('#resort-panel');
  if (!explorer || !tablist || !panel) return;

  const resorts = {
    'Eldora Mountain': [39.9370, -105.5829],
    'Winter Park': [39.8868, -105.7625],
    'Copper Mountain': [39.5022, -106.1511],
    'Arapahoe Basin': [39.6425, -105.8717],
    Steamboat: [40.4572, -106.8045],
    'Aspen Snowmass — Snowmass': [39.2084, -106.9490]
  };

  const style = document.createElement('style');
  style.textContent = `.resort-directions-wrap{margin:12px 0 16px}.resort-directions-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:12px 18px;border:0;border-radius:4px 12px 4px 12px;background:#244a3d;color:#fff;font-family:inherit;font-size:11px;font-weight:700;letter-spacing:.06em;text-decoration:none;box-shadow:0 4px 12px #16332f24}.resort-directions-button:hover,.resort-directions-button:focus-visible{background:#315e4b;color:#fff;outline:2px solid #df8057;outline-offset:3px}.resort-directions-button[hidden]{display:none}`;
  document.head.append(style);

  const wrap = document.createElement('div');
  wrap.className = 'resort-directions-wrap';
  const link = document.createElement('a');
  link.className = 'resort-directions-button';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.hidden = true;
  wrap.append(link);
  tablist.insertAdjacentElement('afterend', wrap);

  const updateLink = () => {
    const selectedTab = tablist.querySelector('[role="tab"][aria-selected="true"]');
    const resortName = selectedTab?.dataset.resort;
    const coordinates = resorts[resortName];
    if (!coordinates) {
      link.hidden = true;
      return;
    }
    link.href = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}&travelmode=driving`;
    link.textContent = `GET DIRECTIONS FROM MY LOCATION TO ${resortName.toUpperCase()} ↗`;
    link.setAttribute('aria-label', `Open driving directions from your current location to ${resortName}`);
    link.hidden = false;
  };

  new MutationObserver(updateLink).observe(tablist, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-selected'] });
  new MutationObserver(updateLink).observe(panel, { childList: true, subtree: true });
  updateLink();
});
