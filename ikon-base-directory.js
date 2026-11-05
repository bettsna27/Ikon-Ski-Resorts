/* Resort directory for 2026–27 Ikon Base Pass destinations (bonus mountains excluded). */
const basePassRegions = {
  colorado: [
    ['Arapahoe Basin', 'Dillon, Colorado', 'Unlimited access'],
    ['Aspen Snowmass — Snowmass', 'Snowmass Village, Colorado', '5 days; blackouts apply. Base Pass access is at Snowmass only.'],
    ['Copper Mountain', 'Copper Mountain, Colorado', 'Unlimited access'],
    ['Eldora Mountain', 'Nederland, Colorado', 'Unlimited access'],
    ['Steamboat', 'Steamboat Springs, Colorado', '5 days; blackouts apply'],
    ['Winter Park', 'Winter Park, Colorado', 'Unlimited access']
  ],
  northAmerica: [
    ['Alyeska Resort', 'Girdwood, Alaska', '5 days; blackouts apply'],
    ['Big Bear Mountain Resort', 'Big Bear Lake, California', 'Unlimited access'],
    ['Big Sky Resort', 'Big Sky, Montana', '5 days; blackouts apply'],
    ['Blue Mountain', 'The Blue Mountains, Ontario, Canada', 'Unlimited access'],
    ['Boyne Mountain', 'Boyne Falls, Michigan', '5 days; blackouts apply'],
    ['Brighton Resort', 'Brighton, Utah', '5 days; blackouts apply'],
    ['Camelback Resort', 'Tannersville, Pennsylvania', '5 days; blackouts apply'],
    ['Crystal Mountain', 'Enumclaw, Washington', '5 days; blackouts apply'],
    ['Granite Peak', 'Wausau, Wisconsin', '5 days; blackouts apply'],
    ['June Mountain', 'June Lake, California', '5 days; blackouts apply'],
    ['Killington–Pico', 'Killington, Vermont', '5 days; blackouts apply'],
    ['Loon Mountain', 'Lincoln, New Hampshire', '5 days; blackouts apply'],
    ['Lutsen Mountains', 'Lutsen, Minnesota', '5 days; blackouts apply'],
    ['Mammoth Mountain', 'Mammoth Lakes, California', '5 days; blackouts apply'],
    ['Mt. Bachelor', 'Bend, Oregon', '5 days; blackouts apply'],
    ['Palisades Tahoe', 'Olympic Valley, California', '5 days; blackouts apply'],
    ['Schweitzer', 'Sandpoint, Idaho', '5 days; blackouts apply'],
    ['Sierra-at-Tahoe', 'Twin Bridges, California', '5 days; blackouts apply'],
    ['Snow Valley', 'Running Springs, California', 'Unlimited access'],
    ['Snowbird', 'Snowbird, Utah', '5 days; blackouts apply'],
    ['Snowshoe Mountain', 'Snowshoe, West Virginia', 'Unlimited access'],
    ['Solitude Mountain Resort', 'Solitude, Utah', '5 days; blackouts apply'],
    ['Stratton', 'Stratton Mountain, Vermont', 'Unlimited access'],
    ['Sugarbush Resort', 'Warren, Vermont', 'Unlimited access'],
    ['Sugarloaf', 'Carrabassett Valley, Maine', '5 days; blackouts apply'],
    ['Sunday River', 'Newry, Maine', '5 days; blackouts apply'],
    ['The Highlands', 'Harbor Springs, Michigan', '5 days; blackouts apply'],
    ['The Summit at Snoqualmie', 'Snoqualmie Pass, Washington', '5 days; blackouts apply'],
    ['Taos Ski Valley', 'Taos Ski Valley, New Mexico', '5 days; blackouts apply'],
    ['Tremblant', 'Mont-Tremblant, Quebec, Canada', 'Unlimited access'],
    ['Cypress Mountain', 'West Vancouver, British Columbia, Canada', '5 days; blackouts apply'],
    ['Le Massif de Charlevoix', 'Petite-Rivière-Saint-François, Quebec, Canada', '5 days; blackouts apply'],
    ['Panorama Mountain Resort', 'Panorama, British Columbia, Canada', '5 days; blackouts apply'],
    ['RED Mountain', 'Rossland, British Columbia, Canada', '5 days; blackouts apply'],
    ['Revelstoke Mountain Resort', 'Revelstoke, British Columbia, Canada', '5 days; blackouts apply'],
    ['SilverStar Mountain Resort', 'Vernon, British Columbia, Canada', '5 days; blackouts apply'],
    ['SkiBig3', 'Banff, Alberta, Canada', '5 shared days across Banff Sunshine, Lake Louise, and Mt. Norquay'],
    ['Sun Peaks Resort', 'Sun Peaks, British Columbia, Canada', '5 days; blackouts apply']
  ],
  international: [
    ['Chamonix Mont-Blanc Valley', 'Chamonix, France', '5 days; blackouts apply'],
    ['Dolomiti Superski', 'Dolomites, Italy', '5 days; blackouts apply'],
    ['Grandvalira Resorts', 'Andorra', '5 days; blackouts apply'],
    ['Ischgl', 'Ischgl, Austria', '5 days; blackouts apply'],
    ['Kitzbühel', 'Kitzbühel, Austria', '5 days; blackouts apply'],
    ['Megève Ski Area', 'Megève, France', '5 days; blackouts apply'],
    ['St. Moritz', 'St. Moritz, Switzerland', '5 days; blackouts apply'],
    ['Valle d’Aosta', 'Aosta Valley, Italy', '5 days; blackouts apply'],
    ['Zermatt Matterhorn', 'Zermatt, Switzerland', '5 days; blackouts apply'],
    ['Coronet Peak', 'Queenstown, New Zealand', '5 days; blackouts apply'],
    ['The Remarkables', 'Queenstown, New Zealand', '5 days; blackouts apply'],
    ['Mt Hutt', 'Methven, New Zealand', '5 days; blackouts apply'],
    ['Mt Buller', 'Mansfield, Victoria, Australia', '5 days; blackouts apply'],
    ['Thredbo', 'Thredbo, New South Wales, Australia', '5 days; blackouts apply'],
    ['Arai Mountain Resort', 'Myōkō, Niigata, Japan', '5 days; blackouts apply'],
    ['APPI Resort', 'Hachimantai, Iwate, Japan', '5 days; blackouts apply'],
    ['Furano Ski Resort', 'Furano, Hokkaido, Japan', '5 days; blackouts apply'],
    ['Madarao Mountain Resort', 'Madarao, Nagano, Japan', '5 days; blackouts apply'],
    ['Mona Yongpyong', 'Pyeongchang, South Korea', '5 days; blackouts apply'],
    ['Mt.T', 'Nagano, Japan', '5 days; blackouts apply'],
    ['Nekoma Mountain', 'Bandai, Fukushima, Japan', '5 days; blackouts apply'],
    ['Niseko United', 'Niseko, Hokkaido, Japan', '5 days; blackouts apply'],
    ['Shiga Kogen Mountain Resort', 'Yamanouchi, Nagano, Japan', '5 days; blackouts apply'],
    ['Zao Onsen Ski Resort', 'Yamagata, Japan', '5 days; blackouts apply'],
    ['Yunding Snow Park', 'Zhangjiakou, Hebei, China', '5 days; blackouts apply'],
    ['Beidahu Ski Resort', 'Jilin, China', '5 days; blackouts apply'],
    ['Lake Songhua Resort', 'Jilin, China', '5 days; blackouts apply'],
    ['Valle Nevado', 'Santiago Metropolitan Region, Chile', '5 days; blackouts apply']
  ]
};

const regionTabs = [...document.querySelectorAll('[data-region-tab]')];
const directory = document.querySelector('#ikon-directory');
const directorySearch = document.querySelector('#directory-search');
const directoryCount = document.querySelector('#directory-count');
const directoryEmpty = document.querySelector('#directory-empty');
let selectedRegion = 'colorado';
const coordinateCache = new Map();
const forecastCache = new Map();
const numberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
function inches(cm) { return Number.isFinite(cm) ? numberFormat.format(cm / 2.54) : '—'; }
function resortId(name) { return `forecast-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`; }

async function getCoordinates(name, location) {
  const key = `${name}|${location}`;
  if (coordinateCache.has(key)) return coordinateCache.get(key);

  // Search for the resort and its location together, rather than passing this long
  // phrase to Open-Meteo's place-name-only geocoder (which often returns no match).
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.search = new URLSearchParams({ q: `${name}, ${location}`, format: 'jsonv2', limit: '1' });
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Could not look up this resort location. Please try again.');
  const places = await response.json();
  const place = places[0];
  if (!place) throw new Error('Could not find a location for this resort. Try again later.');
  const coordinates = { latitude: Number(place.lat), longitude: Number(place.lon) };
  if (!Number.isFinite(coordinates.latitude) || !Number.isFinite(coordinates.longitude)) {
    throw new Error('The resort location could not be read. Please try again.');
  }
  coordinateCache.set(key, coordinates);
  return coordinates;
}

async function getForecast(name, location) {
  const key = `${name}|${location}`;
  if (forecastCache.has(key)) return forecastCache.get(key);
  const coordinates = await getCoordinates(name, location);
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    current: 'temperature_2m,snow_depth',
    daily: 'snowfall_sum,temperature_2m_max,temperature_2m_min',
    forecast_days: '7',
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch',
    timezone: 'auto'
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error('The weather service is temporarily unavailable. Please try again.');
  const data = await response.json();
  forecastCache.set(key, data);
  return data;
}

function renderForecast(data) {
  const days = data.daily?.time || [];
  const snowfall = data.daily?.snowfall_sum || [];
  const highs = data.daily?.temperature_2m_max || [];
  const lows = data.daily?.temperature_2m_min || [];
  const currentTemp = data.current?.temperature_2m;
  const currentSnowDepth = data.current?.snow_depth;
  const dailyRows = days.map((date, index) => {
    const day = new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    return `<div class="destination-forecast-day"><span>${escapeHTML(day)}</span><strong>${inches(snowfall[index])}<small> in snow</small></strong><span>${Number.isFinite(lows[index]) ? Math.round(lows[index]) : '—'}° / ${Number.isFinite(highs[index]) ? Math.round(highs[index]) : '—'}°F</span></div>`;
  }).join('');
  const current = Number.isFinite(currentTemp) ? `Now ${Math.round(currentTemp)}°F` : 'Current temperature unavailable';
  const depth = Number.isFinite(currentSnowDepth) ? `${inches(currentSnowDepth)} in current snow depth` : '';
  return `<div class="destination-forecast-current"><strong>${escapeHTML(current)}</strong>${depth ? `<span>${escapeHTML(depth)}</span>` : ''}</div><div class="destination-forecast-days">${dailyRows || '<p>Forecast data is not available.</p>'}</div><p class="destination-forecast-note">Seven-day model estimate for the nearby resort area; check the resort for official mountain conditions.</p>`;
}

async function loadForecast(button, name, location) {
  const details = document.getElementById(button.getAttribute('aria-controls'));
  if (!details) return;
  button.setAttribute('aria-expanded', 'true');
  details.hidden = false;
  if (details.dataset.loaded === 'true' || details.dataset.loading === 'true') return;
  details.dataset.loading = 'true';
  details.innerHTML = '<p class="destination-forecast-status" role="status">Loading seven-day forecast…</p>';
  try {
    const forecast = await getForecast(name, location);
    details.innerHTML = renderForecast(forecast);
    details.dataset.loaded = 'true';
  } catch (error) {
    details.innerHTML = `<p class="destination-forecast-status" role="status">${escapeHTML(error.message || 'Forecast unavailable. Please try again.')}</p>`;
  } finally {
    delete details.dataset.loading;
  }
}

function renderDirectory() {
  const query = directorySearch.value.trim().toLocaleLowerCase();
  const destinations = basePassRegions[selectedRegion].filter(([name, location]) => `${name} ${location}`.toLocaleLowerCase().includes(query));
  directoryCount.textContent = `${destinations.length} destinations`;
  directoryEmpty.hidden = destinations.length > 0;
  directory.innerHTML = destinations.map(([name, location, access]) => {
    const id = resortId(name);
    const mapQuery = encodeURIComponent(`${name} ${location}`);
    return `<article class="ikon-destination"><div class="ikon-destination-main"><h3>${escapeHTML(name)}</h3><p>${escapeHTML(location)}</p></div><span class="ikon-access">${escapeHTML(access)}</span><a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noreferrer">VIEW MAP ↗</a><button class="destination-forecast-toggle" type="button" aria-expanded="false" aria-controls="${id}">SHOW 7-DAY WEATHER FORECAST</button><div class="destination-forecast" id="${id}" hidden></div></article>`;
  }).join('');
}

directory.addEventListener('click', (event) => {
  const button = event.target.closest('.destination-forecast-toggle');
  if (!button) return;
  const card = button.closest('.ikon-destination');
  const name = card.querySelector('h3').textContent;
  const location = card.querySelector('.ikon-destination-main p').textContent;
  if (button.getAttribute('aria-expanded') === 'true') {
    button.setAttribute('aria-expanded', 'false');
    button.textContent = 'SHOW 7-DAY WEATHER FORECAST';
    document.getElementById(button.getAttribute('aria-controls')).hidden = true;
    return;
  }
  button.textContent = 'HIDE 7-DAY WEATHER FORECAST';
  loadForecast(button, name, location);
});

regionTabs.forEach((tab) => tab.addEventListener('click', () => {
  selectedRegion = tab.dataset.regionTab;
  regionTabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  renderDirectory();
}));

directorySearch.addEventListener('input', renderDirectory);
renderDirectory();
