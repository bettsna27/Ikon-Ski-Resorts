const DISPLAY_LIMIT = 7;
const CSU_ORIGIN = { latitude: 40.5734, longitude: -105.0865, label: 'Colorado State University' };
// Base Pass destinations only; separate Bonus Mountains and resorts without Base Pass access are omitted.
// Coordinates target the resort/base-area road destination for route estimation.
const resorts = [
  ['Arapahoe Basin','Dillon, Colorado',39.6425,-105.8717,'Colorado','Unlimited'],
  ['Aspen Snowmass — Snowmass','Snowmass Village, Colorado',39.2084,-106.9490,'Colorado','5 days; blackouts apply'],
  ['Copper Mountain','Copper Mountain, Colorado',39.5022,-106.1511,'Colorado','Unlimited'],
  ['Eldora Mountain','Nederland, Colorado',39.9370,-105.5829,'Colorado','Unlimited'],
  ['Steamboat','Steamboat Springs, Colorado',40.4572,-106.8045,'Colorado','5 days; blackouts apply'],
  ['Winter Park','Winter Park, Colorado',39.8868,-105.7625,'Colorado','Unlimited'],
  ['Alyeska Resort','Girdwood, Alaska',60.9708,-149.0997,'North America','5 days; blackouts apply'],
  ['Big Bear Mountain Resort','Big Bear Lake, California',34.2367,-116.8898,'North America','Unlimited'],
  ['Big Sky Resort','Big Sky, Montana',45.2846,-111.4013,'North America','5 days; blackouts apply'],
  ['Blue Mountain','The Blue Mountains, Ontario, Canada',44.ುತ್ತಿರುವ,-80.3125,'North America','Unlimited'],
  ['Boyne Mountain','Boyne Falls, Michigan',45.1656,-84.9317,'North America','5 days; blackouts apply'],
  ['Brighton Resort','Brighton, Utah',40.5980,-111.5832,'North America','5 days; blackouts apply'],
  ['Camelback Resort','Tannersville, Pennsylvania',41.0534,-75.3557,'North America','5 days; blackouts apply'],
  ['Crystal Mountain','Enumclaw, Washington',46.9352,-121.5045,'North America','5 days; blackouts apply'],
  ['Granite Peak','Wausau, Wisconsin',44.9261,-89.6827,'North America','5 days; blackouts apply'],
  ['June Mountain','June Lake, California',37.7672,-119.0895,'North America','5 days; blackouts apply'],
  ['Killington–Pico','Killington, Vermont',43.6045,-72.8201,'North America','5 days; blackouts apply'],
  ['Loon Mountain','Lincoln, New Hampshire',44.0365,-71.6211,'North America','5 days; blackouts apply'],
  ['Lutsen Mountains','Lutsen, Minnesota',47.6642,-90.7135,'North America','5 days; blackouts apply'],
  ['Mammoth Mountain','Mammoth Lakes, California',37.6308,-119.0326,'North America','5 days; blackouts apply'],
  ['Mt. Bachelor','Bend, Oregon',43.9793,-121.6886,'North America','5 days; blackouts apply'],
  ['Palisades Tahoe','Olympic Valley, California',39.1969,-120.2358,'North America','5 days; blackouts apply'],
  ['Schweitzer','Sandpoint, Idaho',48.3683,-116.6222,'North America','5 days; blackouts apply'],
  ['Sierra-at-Tahoe','Twin Bridges, California',38.8003,-120.0808,'North America','5 days; blackouts apply'],
  ['Snow Valley','Running Springs, California',34.2244,-117.0372,'North America','Unlimited'],
  ['Snowbird','Snowbird, Utah',40.5810,-111.6550,'North America','5 days; blackouts apply'],
  ['Snowshoe Mountain','Snowshoe, West Virginia',38.4100,-79.9959,'North America','Unlimited'],
  ['Solitude Mountain Resort','Solitude, Utah',40.6199,-111.5919,'North America','5 days; blackouts apply'],
  ['Stratton','Stratton Mountain, Vermont',43.1134,-72.9081,'North America','Unlimited'],
  ['Sugarbush Resort','Warren, Vermont',44.1359,-72.8977,'North America','Unlimited'],
  ['Sugarloaf','Carrabassett Valley, Maine',45.0310,-70.3131,'North America','5 days; blackouts apply'],
  ['Sunday River','Newry, Maine',44.4734,-70.8562,'North America','5 days; blackouts apply'],
  ['The Highlands','Harbor Springs, Michigan',45.4592,-84.9267,'North America','5 days; blackouts apply'],
  ['The Summit at Snoqualmie','Snoqualmie Pass, Washington',47.4242,-121.4134,'North America','5 days; blackouts apply'],
  ['Taos Ski Valley','Taos Ski Valley, New Mexico',36.5964,-105.4481,'North America','5 days; blackouts apply'],
  ['Tremblant','Mont-Tremblant, Quebec, Canada',46.2094,-74.5857,'North America','Unlimited'],
  ['Cypress Mountain','West Vancouver, British Columbia, Canada',49.3968,-123.2040,'North America','5 days; blackouts apply'],
  ['Le Massif de Charlevoix','Petite-Rivière-Saint-François, Quebec, Canada',47.2785,-70.5888,'North America','5 days; blackouts apply'],
  ['Panorama Mountain Resort','Panorama, British Columbia, Canada',50.4617,-116.2386,'North America','5 days; blackouts apply'],
  ['RED Mountain','Rossland, British Columbia, Canada',49.1042,-117.8198,'North America','5 days; blackouts apply'],
  ['Revelstoke Mountain Resort','Revelstoke, British Columbia, Canada',50.9582,-118.1634,'North America','5 days; blackouts apply'],
  ['SilverStar Mountain Resort','Vernon, British Columbia, Canada',50.3617,-119.0597,'North America','5 days; blackouts apply'],
  ['SkiBig3','Banff, Alberta, Canada',51.1784,-115.5708,'North America','5 shared days across Banff Sunshine, Lake Louise, and Mt. Norquay'],
  ['Sun Peaks Resort','Sun Peaks, British Columbia, Canada',50.8840,-119.8850,'North America','5 days; blackouts apply'],
  ['Chamonix Mont-Blanc Valley','Chamonix, France',45.9237,6.8694,'International','5 days; blackouts apply'],
  ['Dolomiti Superski','Dolomites, Italy',46.5369,11.7542,'International','5 days; blackouts apply'],
  ['Grandvalira Resorts','Andorra',42.5761,1.6677,'International','5 days; blackouts apply'],
  ['Ischgl','Ischgl, Austria',47.0102,10.2885,'International','5 days; blackouts apply'],
  ['Kitzbühel','Kitzbühel, Austria',47.4490,12.3920,'International','5 days; blackouts apply'],
  ['Megève Ski Area','Megève, France',45.8569,6.6178,'International','5 days; blackouts apply'],
  ['St. Moritz','St. Moritz, Switzerland',46.4908,9.8355,'International','5 days; blackouts apply'],
  ['Valle d’Aosta','Aosta Valley, Italy',45.7370,7.3201,'International','5 days; blackouts apply'],
  ['Zermatt Matterhorn','Zermatt, Switzerland',46.0207,7.7491,'International','5 days; blackouts apply'],
  ['Coronet Peak','Queenstown, New Zealand',-44.9267,168.7383,'International','5 days; blackouts apply'],
  ['The Remarkables','Queenstown, New Zealand',-45.0450,168.8130,'International','5 days; blackouts apply'],
  ['Mt Hutt','Methven, New Zealand',-43.4880,171.5360,'International','5 days; blackouts apply'],
  ['Mt Buller','Mansfield, Victoria, Australia',-37.1450,146.4370,'International','5 days; blackouts apply'],
  ['Thredbo','Thredbo, New South Wales, Australia',-36.5050,148.3050,'International','5 days; blackouts apply'],
  ['Arai Mountain Resort','Myōkō, Niigata, Japan',36.9260,138.1880,'International','5 days; blackouts apply'],
  ['APPI Resort','Hachimantai, Iwate, Japan',40.0000,140.9700,'International','5 days; blackouts apply'],
  ['Furano Ski Resort','Furano, Hokkaido, Japan',43.3380,142.3630,'International','5 days; blackouts apply'],
  ['Madarao Mountain Resort','Madarao, Nagano, Japan',36.8490,138.2900,'International','5 days; blackouts apply'],
  ['Mona Yongpyong','Pyeongchang, South Korea',37.6450,128.6800,'International','5 days; blackouts apply'],
  ['Mt.T','Nagano, Japan',36.7000,138.4500,'International','5 days; blackouts apply'],
  ['Nekoma Mountain','Bandai, Fukushima, Japan',37.6300,140.0200,'International','5 days; blackouts apply'],
  ['Niseko United','Niseko, Hokkaido, Japan',42.8600,140.6900,'International','5 days; blackouts apply'],
  ['Shiga Kogen Mountain Resort','Yamanouchi, Nagano, Japan',36.7150,138.5000,'International','5 days; blackouts apply'],
  ['Zao Onsen Ski Resort','Yamagata, Japan',38.1670,140.3980,'International','5 days; blackouts apply'],
  ['Yunding Snow Park','Zhangjiakou, Hebei, China',40.9700,115.4300,'International','5 days; blackouts apply'],
  ['Beidahu Ski Resort','Jilin, China',43.4200,126.6500,'International','5 days; blackouts apply'],
  ['Lake Songhua Resort','Jilin, China',43.7500,127.3500,'International','5 days; blackouts apply'],
  ['Valle Nevado','Santiago Metropolitan Region, Chile',-33.3520,-70.2490,'International','5 days; blackouts apply']
].map(([name, location, lat, lon, region, access]) => ({ name, location, lat, lon, region, access }));

const tablist = document.querySelector('#resort-tabs');
const panel = document.querySelector('#resort-panel');
const search = document.querySelector('#search');
const updatedAt = document.querySelector('#updated-at');
const originInput = document.querySelector('#origin-input');
const originForm = document.querySelector('#origin-form');
const locationButton = document.querySelector('#use-location');
const originStatus = document.querySelector('#origin-status');
const count = document.querySelector('#resort-count');
const formatter = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
let results = [];
let selectedName = null;
let routeOrigin = CSU_ORIGIN;
let routeEstimates = new Map();
let routeRequestId = 0;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]);
}
function slug(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function snowInches(cm) { return cm == null ? null : (cm / 2.54).toFixed(1); }
function prettyDate(date) { return formatter.format(new Date(`${date}T12:00:00`)); }
function formatDuration(seconds) {
  const minutes = Math.round(seconds / 60), hours = Math.floor(minutes / 60), remainder = minutes % 60;
  if (!hours) return `~${minutes} min`;
  return remainder ? `~${hours} hr ${remainder} min` : `~${hours} hr`;
}
function formatDistance(meters) { return `~${Math.round(meters / 1609.344)} mi`; }

async function getRoutes(origin) {
  // OSRM Table returns driving distances and durations to all destinations in one matrix request.
  const coordinates = [`${origin.longitude},${origin.latitude}`,...resorts.map((resort) => `${resort.lon},${resort.lat}`)].join(';');
  const destinations = resorts.map((_, index) => index + 1).join(';');
  const url = `https://router.project-osrm.org/table/v1/driving/${coordinates}?sources=0&destinations=${destinations}&annotations=distance,duration`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Driving route service returned ${response.status}`);
  const data = await response.json();
  if (data.code !== 'Ok' || !data.distances?.[0] || !data.durations?.[0]) throw new Error('Driving routes are unavailable for this origin.');
  const estimates = new Map();
  resorts.forEach((resort, index) => {
    const meters = data.distances[0][index], seconds = data.durations[0][index];
    if (Number.isFinite(meters) && Number.isFinite(seconds)) estimates.set(resort.name, { meters, seconds, distance: formatDistance(meters), driveTime: formatDuration(seconds) });
  });
  return estimates;
}

async function setOrigin(origin, label) {
  const requestId = ++routeRequestId;
  routeOrigin = { ...origin, label };
  routeEstimates = new Map();
  originStatus.textContent = `Calculating driving routes from ${label} to Base Pass resorts…`;
  originStatus.dataset.state = 'loading';
  render();
  try {
    const estimates = await getRoutes(origin);
    if (requestId !== routeRequestId) return;
    routeEstimates = estimates;
    originStatus.textContent = estimates.size
      ? `Showing the ${Math.min(DISPLAY_LIMIT, estimates.size)} closest road-reachable Base Pass resorts from ${label}, sorted by driving distance. Routes are estimates and may vary with traffic and conditions.`
      : 'No drivable routes were returned for this location.';
    originStatus.dataset.state = estimates.size ? 'success' : 'error';
  } catch (error) {
    if (requestId !== routeRequestId) return;
    console.error(error);
    originStatus.textContent = 'Driving routes are temporarily unavailable. Please try again later.';
    originStatus.dataset.state = 'error';
  }
  render();
}

async function geocodePlace(place) {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.search = new URLSearchParams({ q: place, format: 'jsonv2', limit: '1' });
  const response = await fetch(url);
  if (!response.ok) throw new Error('Location search failed. Please try again.');
  const matches = await response.json();
  if (!matches.length) throw new Error('Location not found. Try a city, address, or ZIP code.');
  return { latitude: Number(matches[0].lat), longitude: Number(matches[0].lon), label: matches[0].display_name.split(',').slice(0, 3).join(',') };
}

originForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const place = originInput.value.trim();
  if (!place) return originInput.focus();
  originStatus.textContent = `Finding ${place}…`;
  originStatus.dataset.state = 'loading';
  try { const origin = await geocodePlace(place); await setOrigin(origin, origin.label); }
  catch (error) { originStatus.textContent = error.message; originStatus.dataset.state = 'error'; }
});
locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) { originStatus.textContent = 'Location is not supported by this browser. Enter a city, address, or ZIP code.'; originStatus.dataset.state = 'error'; return; }
  locationButton.disabled = true;
  navigator.geolocation.getCurrentPosition(async ({ coords }) => {
    try { await setOrigin({ latitude: coords.latitude, longitude: coords.longitude }, 'your current location'); }
    finally { locationButton.disabled = false; }
  }, (error) => {
    locationButton.disabled = false;
    originStatus.textContent = error.code === error.PERMISSION_DENIED ? 'Location access was denied. Enter a city, address, or ZIP code instead.' : 'Could not get your location. Enter a city, address, or ZIP code instead.';
    originStatus.dataset.state = 'error';
  }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
});

function nearestResults() {
  return [...results].filter(({ resort }) => routeEstimates.has(resort.name))
    .sort((a, b) => routeEstimates.get(a.resort.name).meters - routeEstimates.get(b.resort.name).meters)
    .slice(0, DISPLAY_LIMIT);
}
function renderTabs(items) {
  tablist.innerHTML = items.map(({ resort }) => {
    const active = resort.name === selectedName;
    return `<button class="resort-tab" id="tab-${slug(resort.name)}" type="button" role="tab" aria-selected="${active}" aria-controls="resort-panel" tabindex="${active ? '0' : '-1'}" data-resort="${escapeHTML(resort.name)}">${escapeHTML(resort.name)}</button>`;
  }).join('');
  tablist.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener('click', () => { selectedName = tab.dataset.resort; render(); });
    tab.addEventListener('keydown', onTabKeydown);
  });
}
function renderPanel(resort, weather) {
  const days = weather?.daily?.time || [], snow = weather?.daily?.snowfall_sum || [];
  const weeklyTotal = snow.reduce((sum, amount) => sum + (Number(amount) || 0), 0);
  const depth = weather?.current?.snow_depth;
  const temp = weather?.current?.temperature_2m;
  const forecast = days.slice(0,7).map((day,i) => `<div class="detail-forecast-day"><span>${prettyDate(day)}</span><strong>${snowInches(snow[i]) ?? '—'}<small> in</small></strong></div>`).join('');
  const route = routeEstimates.get(resort.name);
  const originLabel = escapeHTML(routeOrigin.label || 'Colorado State University');
  const resortName = escapeHTML(resort.name), location = escapeHTML(resort.location), access = escapeHTML(resort.access);
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${resort.name} ${resort.location}`)}`;
  panel.setAttribute('aria-labelledby', `tab-${slug(resort.name)}`);
  panel.innerHTML = `<div class="detail-header"><div><span class="resort-tag">${escapeHTML(resort.region.toUpperCase())}</span><h3>${resortName}</h3><p class="detail-subtitle">${location}</p></div><span class="detail-pass-tag">Base Pass · ${access}</span></div>
    <p class="distance-note"><span aria-hidden="true">↗</span> From ${originLabel}: <strong>${route?.distance || 'No road route'}</strong><span class="distance-separator">·</span><strong>${route?.driveTime || '—'}</strong> drive</p>
    <div class="detail-overview"><div class="detail-stat"><span class="metric-label">NEXT 7 DAYS</span><strong>${weather ? `${snowInches(weeklyTotal)}"` : 'Unavailable'}</strong><span class="metric-caption">forecast snowfall · model estimate</span></div><div class="detail-stat"><span class="metric-label">CURRENT BASE SNOW TOTAL</span><strong>${Number.isFinite(depth) && depth > 0.01 ? `${snowInches(depth)}"` : '0'}</strong><span class="metric-caption">snowpack on ground · model estimate</span></div><div class="detail-stat"><span class="metric-label">CURRENT TEMPERATURE</span><strong>${Number.isFinite(temp) ? `${Math.round(temp)}°F` : 'Unavailable'}</strong><span class="metric-caption">base-area model estimate</span></div></div>
    <div class="detail-forecast-heading"><span>SEVEN-DAY SNOWFALL FORECAST</span><span>INCHES · MODEL ESTIMATE</span></div><div class="detail-forecast-list">${forecast || '<p class="forecast-unavailable">Forecast unavailable. Please try reloading.</p>'}</div>
    <div class="detail-footer"><div class="report-copy"><span class="report-dot"></span><div><strong>Mountain operations &amp; conditions</strong><span>Base Pass access limits and blackout dates may apply. Check official resort information before travel.</span></div></div><div class="detail-links"><a class="map-link" href="${map}" target="_blank" rel="noreferrer">VIEW RESORT MAP ↗</a></div></div>`;
}
function render() {
  const term = search.value.trim().toLowerCase();
  const nearest = nearestResults();
  const filtered = nearest.filter(({ resort }) => resort.name.toLowerCase().includes(term));
  count.textContent = `/${String(filtered.length).padStart(2,'0')}`;
  document.querySelector('#empty-state').hidden = filtered.length !== 0;
  tablist.hidden = filtered.length === 0;
  panel.hidden = filtered.length === 0;
  if (!filtered.length) { if (results.length) panel.innerHTML = '<div class="loading-card">No road-routable Base Pass resorts found for this location.</div>'; return; }
  if (!filtered.some(({ resort }) => resort.name === selectedName)) selectedName = filtered[0].resort.name;
  renderTabs(filtered);
  const selected = filtered.find(({ resort }) => resort.name === selectedName);
  renderPanel(selected.resort, selected.weather);
}
function onTabKeydown(event) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')], index = tabs.indexOf(event.currentTarget);
  let nextIndex;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
  else if (event.key === 'Home') nextIndex = 0;
  else if (event.key === 'End') nextIndex = tabs.length - 1;
  else return;
  event.preventDefault(); tabs[nextIndex].click(); tabs[nextIndex].focus();
}
async function getForecast(resort) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({ latitude:resort.lat, longitude:resort.lon, current:'temperature_2m,snow_depth', daily:'snowfall_sum', forecast_days:'7', temperature_unit:'fahrenheit', timezone:'auto' });
  try { const response = await fetch(url); if (!response.ok) throw new Error(`Forecast request failed (${response.status})`); return await response.json(); }
  catch (error) { console.warn(`Could not load forecast for ${resort.name}`, error); return null; }
}
async function load() {
  updatedAt.textContent = `· ${new Date().toLocaleTimeString([], { hour:'numeric', minute:'2-digit' })}`;
  document.querySelector('#local-conditions-heading').textContent = `7 closest Ikon Base Pass resorts by driving distance`;
  document.querySelector('.resort-explorer').setAttribute('aria-label','Seven closest road-reachable Ikon Base Pass resorts');
  document.querySelector('#resort-tabs').setAttribute('aria-label','Seven closest road-reachable Ikon Base Pass resorts');
  originStatus.textContent = 'Calculating the 7 closest Base Pass resorts by driving distance from CSU…';
  originStatus.dataset.state = 'loading';
  try {
    routeEstimates = await getRoutes(CSU_ORIGIN);
    routeOrigin = CSU_ORIGIN;
    originStatus.textContent = `Showing the ${Math.min(DISPLAY_LIMIT,routeEstimates.size)} closest road-reachable Base Pass resorts from Colorado State University. Enter a location to recalculate.`;
    originStatus.dataset.state = 'success';
  } catch (error) {
    console.warn(error);
    originStatus.textContent = 'Driving route service is temporarily unavailable; the resort list could not be ranked by road distance.';
    originStatus.dataset.state = 'error';
  }
  const firstSeven = resorts.filter((resort) => routeEstimates.has(resort.name)).sort((a,b) => routeEstimates.get(a.name).meters-routeEstimates.get(b.name).meters).slice(0,DISPLAY_LIMIT);
  results = await Promise.all(firstSeven.map(async (resort) => ({ resort, weather: await getForecast(resort) })));
  panel.setAttribute('aria-busy','false');
  render();
  search.addEventListener('input',render);
}
load();
