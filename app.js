const resorts = [
  { name: 'Eldora Mountain', short: 'ELDORA', location: 'Nederland, Colorado', elevation: '9,200 ft base', distance: '~65 mi from CSU', driveTime: '~1 hr 30 min', lat: 39.9370, lon: -105.5829, ikon: 'Ikon Pass destination', report: 'https://www.eldora.com/the-mountain/mountain-report', map: 'https://www.google.com/maps/search/?api=1&query=Eldora+Mountain+Colorado' },
  { name: 'Winter Park', short: 'WINTER PARK', location: 'Winter Park, Colorado', elevation: '9,000 ft base', distance: '~100 mi from CSU', driveTime: '~2 hr', lat: 39.8868, lon: -105.7625, ikon: 'Ikon Pass destination', report: 'https://www.winterparkresort.com/the-mountain/mountain-report', map: 'https://www.google.com/maps/search/?api=1&query=Winter+Park+Resort+Colorado' },
  { name: 'Copper Mountain', short: 'COPPER', location: 'Copper Mountain, Colorado', elevation: '9,712 ft base', distance: '~130 mi from CSU', driveTime: '~2 hr 30 min', lat: 39.5022, lon: -106.1511, ikon: 'Ikon Pass destination', report: 'https://www.coppercolorado.com/the-mountain/conditions-weather/snow-report', map: 'https://www.google.com/maps/search/?api=1&query=Copper+Mountain+Colorado' },
  { name: 'Arapahoe Basin', short: 'A-BASIN', location: 'Dillon, Colorado', elevation: '10,780 ft base', distance: '~135 mi from CSU', driveTime: '~2 hr 45 min', lat: 39.6425, lon: -105.8717, ikon: 'Ikon Pass destination', report: 'https://www.arapahoebasin.com/snow-report/#weather-and-conditions', map: 'https://www.google.com/maps/search/?api=1&query=Arapahoe+Basin+Colorado' },
  { name: 'Steamboat', short: 'STEAMBOAT', location: 'Steamboat Springs, Colorado', elevation: '6,900 ft base', distance: '~170 mi from CSU', driveTime: '~3 hr 30 min', lat: 40.4572, lon: -106.8045, ikon: 'Ikon Pass destination', report: 'https://www.steamboat.com/the-mountain/mountain-report', map: 'https://www.google.com/maps/search/?api=1&query=Steamboat+Ski+Resort+Colorado' },
  { name: 'Aspen Snowmass', short: 'ASPEN SNOWMASS', location: 'Aspen / Snowmass Village, Colorado', elevation: '8,104 ft base', distance: '~210 mi from CSU', driveTime: '~4 hr 30 min', lat: 39.2084, lon: -106.9490, ikon: 'Ikon Pass destination · 4 mountains', report: 'https://www.aspensnowmass.com/our-mountains/snow-report', map: 'https://www.google.com/maps/search/?api=1&query=Aspen+Snowmass+Colorado' },
  { name: 'Taos Ski Valley', short: 'TAOS', location: 'Taos Ski Valley, New Mexico', elevation: '9,207 ft base', distance: '~300 mi from CSU', driveTime: '~5 hr', lat: 36.5964, lon: -105.4481, ikon: 'Ikon Pass destination', report: 'https://www.taosski.com/mountain-report/', map: 'https://www.google.com/maps/search/?api=1&query=Taos+Ski+Valley+New+Mexico' },
  { name: 'Jackson Hole Mountain Resort', short: 'JACKSON HOLE', location: 'Teton Village, Wyoming', elevation: '6,311 ft base', distance: '~405 mi from CSU', driveTime: '~6 hr 30 min', lat: 43.5875, lon: -110.8277, ikon: 'Ikon Pass destination', report: 'https://www.jacksonhole.com/mountain-report', map: 'https://www.google.com/maps/search/?api=1&query=Jackson+Hole+Mountain+Resort' },
  { name: 'Snowbasin', short: 'SNOWBASIN', location: 'Huntsville, Utah', elevation: '6,391 ft base', distance: '~480 mi from CSU', driveTime: '~7 hr 30 min', lat: 41.2161, lon: -111.8561, ikon: 'Ikon Pass destination', report: 'https://www.snowbasin.com/mountain-report/', map: 'https://www.google.com/maps/search/?api=1&query=Snowbasin+Utah' },
  { name: 'Solitude Mountain Resort', short: 'SOLITUDE', location: 'Solitude, Utah', elevation: '7,994 ft base', distance: '~490 mi from CSU', driveTime: '~7 hr 45 min', lat: 40.6199, lon: -111.5919, ikon: 'Ikon Pass destination', report: 'https://www.solitudemountain.com/mountain-report', map: 'https://www.google.com/maps/search/?api=1&query=Solitude+Mountain+Resort+Utah' }
];
const DISPLAY_LIMIT = 7;

const tablist = document.querySelector('#resort-tabs');
const panel = document.querySelector('#resort-panel');
const search = document.querySelector('#search');
const updatedAt = document.querySelector('#updated-at');
const originInput = document.querySelector('#origin-input');
const originForm = document.querySelector('#origin-form');
const locationButton = document.querySelector('#use-location');
const originStatus = document.querySelector('#origin-status');
const formatter = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
let results = [];
let selectedName = resorts[0].name;
let routeOrigin = null;
let routeEstimates = new Map();
let routeRequestId = 0;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
function snowInches(cm) { return cm == null ? null : (cm / 2.54).toFixed(1); }
function prettyDate(date) { return formatter.format(new Date(`${date}T12:00:00`)); }
function slug(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function formatDuration(seconds) {
  const minutes = Math.round(seconds / 60), hours = Math.floor(minutes / 60), remaining = minutes % 60;
  if (!hours) return `~${minutes} min`;
  return remaining === 0 ? `~${hours} hr` : `~${hours} hr ${remaining} min`;
}
function formatDistance(meters) { return `~${Math.round(meters / 1609.344)} mi`; }

async function getDrivingRoute(resort, origin) {
  const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${resort.lon},${resort.lat}?overview=false`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Route request failed (${response.status})`);
  const data = await response.json();
  const route = data.routes?.[0];
  if (data.code !== 'Ok' || !route) throw new Error('No driving route found');
  return { distance: formatDistance(route.distance), distanceMeters: route.distance, driveTime: formatDuration(route.duration) };
}

async function updateRoutes(origin, label) {
  const requestId = ++routeRequestId;
  routeOrigin = { ...origin, label };
  routeEstimates = new Map();
  originStatus.textContent = `Calculating driving routes from ${label}…`;
  originStatus.dataset.state = 'loading';
  render();
  const estimates = await Promise.all(resorts.map(async (resort) => {
    try { return [resort.name, await getDrivingRoute(resort, origin)]; }
    catch (error) { console.warn(`Could not calculate route to ${resort.name}`, error); return [resort.name, null]; }
  }));
  if (requestId !== routeRequestId) return;
  routeEstimates = new Map(estimates);
  const successful = estimates.filter(([, estimate]) => estimate).length;
  originStatus.textContent = successful
    ? `Showing the ${Math.min(DISPLAY_LIMIT, successful)} closest routable resorts from ${label}, sorted by estimated driving distance. Routes may vary with traffic and winter road conditions.`
    : 'Could not calculate routes right now. Please try again later.';
  originStatus.dataset.state = successful ? 'success' : 'error';
  render();
}

async function geocodePlace(place) {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.search = new URLSearchParams({ q: place, format: 'jsonv2', limit: '1' });
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Location search failed (${response.status})`);
  const places = await response.json();
  if (!places.length) throw new Error('Location not found. Try a city, address, or ZIP code.');
  return { latitude: Number(places[0].lat), longitude: Number(places[0].lon), label: places[0].display_name.split(',').slice(0, 3).join(',') };
}

originForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const place = originInput.value.trim();
  if (!place) return originInput.focus();
  originStatus.textContent = `Finding ${place}…`;
  originStatus.dataset.state = 'loading';
  try { const location = await geocodePlace(place); await updateRoutes(location, location.label); }
  catch (error) { originStatus.textContent = error.message || 'Could not find that location. Please try again.'; originStatus.dataset.state = 'error'; }
});
locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) { originStatus.textContent = 'Your browser does not support location access. Enter a city, address, or ZIP code instead.'; originStatus.dataset.state = 'error'; return; }
  locationButton.disabled = true;
  originStatus.textContent = 'Requesting your location…';
  originStatus.dataset.state = 'loading';
  navigator.geolocation.getCurrentPosition(async ({ coords }) => {
    try { await updateRoutes({ latitude: coords.latitude, longitude: coords.longitude }, 'your current location'); }
    finally { locationButton.disabled = false; }
  }, (error) => {
    locationButton.disabled = false;
    originStatus.textContent = error.code === error.PERMISSION_DENIED ? 'Location access was denied. Enter a city, address, or ZIP code instead.' : 'Could not get your location. Enter a city, address, or ZIP code instead.';
    originStatus.dataset.state = 'error';
  }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
});

function getVisibleResults() {
  const ordered = routeOrigin
    ? [...results].sort((a, b) => (routeEstimates.get(a.resort.name)?.distanceMeters ?? Infinity) - (routeEstimates.get(b.resort.name)?.distanceMeters ?? Infinity))
    : resorts.map((resort) => results.find((result) => result.resort.name === resort.name)).filter(Boolean);
  return ordered.slice(0, DISPLAY_LIMIT);
}
function renderTabs(filtered) {
  tablist.innerHTML = filtered.map(({ resort }) => {
    const active = resort.name === selectedName;
    return `<button class="resort-tab" id="tab-${slug(resort.name)}" type="button" role="tab" aria-selected="${active}" aria-controls="resort-panel" tabindex="${active ? '0' : '-1'}" data-resort="${escapeHTML(resort.name)}">${escapeHTML(resort.name)}</button>`;
  }).join('');
  tablist.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener('click', () => selectResort(tab.dataset.resort));
    tab.addEventListener('keydown', onTabKeydown);
  });
}
function renderPanel(resort, weather) {
  const days = weather?.daily?.time || [], snow = weather?.daily?.snowfall_sum || [];
  const weeklyTotal = snow.reduce((sum, amount) => sum + (Number(amount) || 0), 0);
  const currentDepth = weather?.current?.snow_depth;
  const depth = Number.isFinite(currentDepth) && currentDepth > 0 ? snowInches(currentDepth) : null;
  const temperature = weather?.current?.temperature_2m;
  const forecast = days.slice(0, 7).map((day, i) => `<div class="detail-forecast-day"><span>${prettyDate(day)}</span><strong>${snowInches(snow[i]) ?? '—'}<small> in</small></strong></div>`).join('');
  const estimate = routeEstimates.get(resort.name);
  const distanceText = routeOrigin ? (estimate?.distance || 'Unavailable') : resort.distance;
  const driveTimeText = routeOrigin ? (estimate?.driveTime || 'Unavailable') : resort.driveTime;
  const originText = escapeHTML(routeOrigin?.label || 'Colorado State University');
  const resortName = escapeHTML(resort.name), resortLocation = escapeHTML(resort.location), resortShort = escapeHTML(resort.short), resortElevation = escapeHTML(resort.elevation), ikonAccess = escapeHTML(resort.ikon);
  panel.setAttribute('aria-labelledby', `tab-${slug(resort.name)}`);
  panel.innerHTML = `<div class="detail-header"><div><span class="resort-tag">${resortShort}</span><h3>${resortName}</h3><p class="detail-subtitle">${resortLocation} · ${resortElevation}</p></div><span class="detail-pass-tag">${ikonAccess}</span></div>
    <p class="distance-note"><span aria-hidden="true">↗</span> From ${originText}: <strong>${distanceText}</strong><span class="distance-separator">·</span><strong>${driveTimeText}</strong> drive</p>
    <div class="detail-overview"><div class="detail-stat"><span class="metric-label">NEXT 7 DAYS</span><strong>${weather ? `${snowInches(weeklyTotal)}"` : 'Unavailable'}</strong><span class="metric-caption">forecast snowfall · model estimate</span></div><div class="detail-stat"><span class="metric-label">CURRENT BASE SNOW TOTAL</span><strong>${depth && Number(depth) > 1 ? `${depth}"` : '0'}</strong><span class="metric-caption">snowpack on ground · model estimate</span></div><div class="detail-stat"><span class="metric-label">CURRENT TEMPERATURE</span><strong>${Number.isFinite(temperature) ? `${Math.round(temperature)}°F` : 'Unavailable'}</strong><span class="metric-caption">base-area model estimate</span></div></div>
    <div class="detail-forecast-heading"><span>SEVEN-DAY SNOWFALL FORECAST</span><span>INCHES · MODEL ESTIMATE</span></div><div class="detail-forecast-list">${forecast || '<p class="forecast-unavailable">Forecast unavailable. Please try reloading.</p>'}</div>
    <div class="detail-footer"><div class="report-copy"><span class="report-dot"></span><div><strong>Mountain operations &amp; conditions</strong><span>Pass access depends on your Ikon pass type. Check the resort's official report for current lift, trail, and on-mountain snow information.</span></div></div><div class="detail-links"><a class="report-link" href="${resort.report}" target="_blank" rel="noreferrer">OFFICIAL MOUNTAIN REPORT <span aria-hidden="true">↗</span></a><a class="map-link" href="${resort.map}" target="_blank" rel="noreferrer">VIEW RESORT MAP ↗</a></div></div>`;
}
function render() {
  const visible = getVisibleResults(), term = search.value.trim().toLowerCase();
  const filtered = visible.filter(({ resort }) => resort.name.toLowerCase().includes(term));
  document.querySelector('#resort-count').textContent = `/${String(filtered.length).padStart(2, '0')}`;
  document.querySelector('#empty-state').hidden = filtered.length !== 0;
  tablist.hidden = filtered.length === 0;
  panel.hidden = filtered.length === 0;
  if (!filtered.length) return;
  if (!filtered.some(({ resort }) => resort.name === selectedName)) selectedName = filtered[0].resort.name;
  renderTabs(filtered);
  const selected = filtered.find(({ resort }) => resort.name === selectedName);
  renderPanel(selected.resort, selected.weather);
}
function selectResort(name) { selectedName = name; render(); }
function onTabKeydown(event) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')], index = tabs.indexOf(event.currentTarget);
  let nextIndex;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
  else if (event.key === 'Home') nextIndex = 0;
  else if (event.key === 'End') nextIndex = tabs.length - 1;
  else return;
  event.preventDefault(); const next = tabs[nextIndex]; selectResort(next.dataset.resort); tablist.querySelector(`[data-resort="${CSS.escape(next.dataset.resort)}"]`)?.focus();
}
async function getForecast(resort) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({ latitude: resort.lat, longitude: resort.lon, current: 'temperature_2m,snow_depth', daily: 'snowfall_sum', forecast_days: '7', temperature_unit: 'fahrenheit', timezone: 'auto' });
  try { const response = await fetch(url); if (!response.ok) throw new Error(`Forecast request failed (${response.status})`); return await response.json(); }
  catch (error) { console.warn(`Could not load forecast for ${resort.name}`, error); return null; }
}
async function load() {
  updatedAt.textContent = `· ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  document.querySelector('#local-conditions-heading').textContent = `Top ${DISPLAY_LIMIT} closest resort forecasts`;
  document.querySelector('.resort-explorer').setAttribute('aria-label', `Top ${DISPLAY_LIMIT} closest resort conditions`);
  tablist.setAttribute('aria-label', `Top ${DISPLAY_LIMIT} closest resorts`);
  results = await Promise.all(resorts.map(async (resort) => ({ resort, weather: await getForecast(resort) })));
  panel.setAttribute('aria-busy', 'false');
  render();
  search.addEventListener('input', render);
}
load();
