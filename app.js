const resorts = [
  { name: 'Arapahoe Basin', short: 'A-BASIN', elevation: '10,780 ft base', lat: 39.6425, lon: -105.8717, ikon: 'Unlimited access', report: 'https://www.arapahoebasin.com/snow-report/', map: 'https://www.google.com/maps/search/?api=1&query=Arapahoe+Basin+Colorado' },
  { name: 'Aspen Snowmass', short: 'ASPEN SNOWMASS', elevation: '8,104 ft base', lat: 39.2084, lon: -106.9490, ikon: 'Limited days · 4 mountains', report: 'https://www.aspensnowmass.com/our-mountains/snow-report', map: 'https://www.google.com/maps/search/?api=1&query=Aspen+Snowmass+Colorado' },
  { name: 'Copper Mountain', short: 'COPPER', elevation: '9,712 ft base', lat: 39.5022, lon: -106.1511, ikon: 'Unlimited access', report: 'https://www.coppercolorado.com/the-mountain/conditions-weather/snow-report', map: 'https://www.google.com/maps/search/?api=1&query=Copper+Mountain+Colorado' },
  { name: 'Eldora Mountain', short: 'ELDORA', elevation: '9,200 ft base', lat: 39.9370, lon: -105.5829, ikon: 'Unlimited access', report: 'https://www.eldora.com/the-mountain/mountain-report', map: 'https://www.google.com/maps/search/?api=1&query=Eldora+Mountain+Colorado' },
  { name: 'Steamboat', short: 'STEAMBOAT', elevation: '6,900 ft base', lat: 40.4572, lon: -106.8045, ikon: 'Limited days', report: 'https://www.steamboat.com/the-mountain/mountain-report', map: 'https://www.google.com/maps/search/?api=1&query=Steamboat+Ski+Resort+Colorado' },
  { name: 'Winter Park', short: 'WINTER PARK', elevation: '9,000 ft base', lat: 39.8868, lon: -105.7625, ikon: 'Unlimited access', report: 'https://www.winterparkresort.com/the-mountain/mountain-report', map: 'https://www.google.com/maps/search/?api=1&query=Winter+Park+Resort+Colorado' }
];

const grid = document.querySelector('#resorts');
const search = document.querySelector('#search');
const updatedAt = document.querySelector('#updated-at');
const formatter = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

function snowInches(cm) {
  return cm == null ? null : (cm / 2.54).toFixed(1);
}

function prettyDate(date) {
  return formatter.format(new Date(`${date}T12:00:00`));
}

function renderCard(resort, weather) {
  const days = weather?.daily?.time || [];
  const snow = weather?.daily?.snowfall_sum || [];
  const weeklyTotal = snow.reduce((sum, amount) => sum + (Number(amount) || 0), 0);
  const currentDepth = weather?.current?.snow_depth;
  const depth = Number.isFinite(currentDepth) && currentDepth > 0 ? snowInches(currentDepth) : null;
  const forecast = days.slice(0, 7).map((day, i) => `
    <div class="forecast-day"><span>${prettyDate(day)}</span><strong>${snowInches(snow[i]) ?? '—'}<small> in</small></strong></div>`).join('');
  const totalText = weather ? `${snowInches(weeklyTotal)}"` : '—';
  const snowDepthText = depth ? `${depth}"` : 'No model reading';

  return `<article class="resort-card">
    <div class="card-top"><span class="resort-tag">${resort.short}</span><span class="pass-tag">${resort.ikon}</span></div>
    <h3>${resort.name}</h3>
    <p class="elevation">${resort.elevation} <span>·</span> Colorado</p>
    <div class="snow-summary"><div><span class="metric-label">NEXT 7 DAYS</span><strong>${totalText}</strong><span class="metric-caption">forecast snowfall</span></div><div class="depth"><span class="metric-label">SNOW DEPTH</span><strong>${snowDepthText}</strong><span class="metric-caption">base-area model estimate</span></div></div>
    <div class="forecast-heading"><span>DAILY SNOWFALL</span><span>INCHES · MODEL</span></div>
    <div class="forecast-list">${forecast || '<div class="forecast-unavailable">Forecast unavailable. Try reloading.</div>'}</div>
    <div class="live-report"><div class="live-heading"><span class="report-dot"></span><span>LIVE MOUNTAIN REPORT</span></div><div class="live-stats"><div><span>OPEN LIFTS</span><strong>See resort</strong></div><div><span>OPEN RUNS</span><strong>See resort</strong></div><div><span>RUNS OPEN</span><strong>See resort</strong></div></div><a class="report-link" href="${resort.report}" target="_blank" rel="noreferrer">OFFICIAL SNOW REPORT <span aria-hidden="true">↗</span></a></div>
    <a class="map-link" href="${resort.map}" target="_blank" rel="noreferrer">VIEW MOUNTAIN ↗</a>
  </article>`;
}

function render(results) {
  const term = search.value.trim().toLowerCase();
  const filtered = results.filter(({ resort }) => resort.name.toLowerCase().includes(term));
  grid.innerHTML = filtered.map(({ resort, weather }) => renderCard(resort, weather)).join('');
  document.querySelector('#resort-count').textContent = `/${String(filtered.length).padStart(2, '0')}`;
  document.querySelector('#empty-state').hidden = filtered.length !== 0;
}

async function getForecast(resort) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: resort.lat,
    longitude: resort.lon,
    current: 'temperature_2m,snow_depth',
    daily: 'snowfall_sum',
    forecast_days: '7',
    temperature_unit: 'fahrenheit',
    timezone: 'auto'
  });
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Forecast request failed (${response.status})`);
    return await response.json();
  } catch (error) {
    console.warn(`Could not load forecast for ${resort.name}`, error);
    return null;
  }
}

async function load() {
  updatedAt.textContent = `· ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  const results = await Promise.all(resorts.map(async (resort) => ({ resort, weather: await getForecast(resort) })));
  grid.setAttribute('aria-busy', 'false');
  render(results);
  search.addEventListener('input', () => render(results));
}

load();
