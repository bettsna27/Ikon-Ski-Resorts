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

const tablist = document.querySelector('#resort-tabs');
const panel = document.querySelector('#resort-panel');
const search = document.querySelector('#search');
const updatedAt = document.querySelector('#updated-at');
const formatter = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
let results = [];
let selectedName = resorts[0].name;

function snowInches(cm) {
  return cm == null ? null : (cm / 2.54).toFixed(1);
}

function prettyDate(date) {
  return formatter.format(new Date(`${date}T12:00:00`));
}

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function renderTabs(filtered) {
  tablist.innerHTML = filtered.map(({ resort }) => {
    const active = resort.name === selectedName;
    return `<button class="resort-tab" id="tab-${slug(resort.name)}" type="button" role="tab" aria-selected="${active}" aria-controls="resort-panel" tabindex="${active ? '0' : '-1'}" data-resort="${resort.name}">${resort.name}</button>`;
  }).join('');
  tablist.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener('click', () => selectResort(tab.dataset.resort));
    tab.addEventListener('keydown', onTabKeydown);
  });
}

function renderPanel(resort, weather) {
  const days = weather?.daily?.time || [];
  const snow = weather?.daily?.snowfall_sum || [];
  const weeklyTotal = snow.reduce((sum, amount) => sum + (Number(amount) || 0), 0);
  const currentDepth = weather?.current?.snow_depth;
  const depth = Number.isFinite(currentDepth) && currentDepth > 0 ? snowInches(currentDepth) : null;
  const temperature = weather?.current?.temperature_2m;
  const forecast = days.slice(0, 7).map((day, i) => `
    <div class="detail-forecast-day"><span>${prettyDate(day)}</span><strong>${snowInches(snow[i]) ?? '—'}<small> in</small></strong></div>`).join('');
  const totalText = weather ? `${snowInches(weeklyTotal)}"` : 'Unavailable';
  const depthText = depth && Number(depth) > 1 ? `${depth}"` : '0';
  const temperatureText = Number.isFinite(temperature) ? `${Math.round(temperature)}°F` : 'Unavailable';

  panel.setAttribute('aria-labelledby', `tab-${slug(resort.name)}`);
  panel.innerHTML = `<div class="detail-header">
      <div><span class="resort-tag">${resort.short}</span><h3>${resort.name}</h3><p class="detail-subtitle">${resort.location} · ${resort.elevation}</p></div>
      <span class="detail-pass-tag">${resort.ikon}</span>
    </div>
    <p class="distance-note"><span aria-hidden="true">↗</span> From Colorado State University: <strong>${resort.distance}</strong><span class="distance-separator">·</span><strong>${resort.driveTime}</strong> drive</p>
    <div class="detail-overview">
      <div class="detail-stat"><span class="metric-label">NEXT 7 DAYS</span><strong>${totalText}</strong><span class="metric-caption">forecast snowfall · model estimate</span></div>
      <div class="detail-stat"><span class="metric-label">CURRENT BASE SNOW TOTAL</span><strong>${depthText}</strong><span class="metric-caption">snowpack on ground · model estimate</span></div>
      <div class="detail-stat"><span class="metric-label">CURRENT TEMPERATURE</span><strong>${temperatureText}</strong><span class="metric-caption">base-area model estimate</span></div>
    </div>
    <div class="detail-forecast-heading"><span>SEVEN-DAY SNOWFALL FORECAST</span><span>INCHES · MODEL ESTIMATE</span></div>
    <div class="detail-forecast-list">${forecast || '<p class="forecast-unavailable">Forecast unavailable. Please try reloading.</p>'}</div>
    <div class="detail-footer"><div class="report-copy"><span class="report-dot"></span><div><strong>Mountain operations &amp; conditions</strong><span>Pass access depends on your Ikon pass type. Check the resort's official report for current lift, trail, and on-mountain snow information.</span></div></div><div class="detail-links"><a class="report-link" href="${resort.report}" target="_blank" rel="noreferrer">OFFICIAL MOUNTAIN REPORT <span aria-hidden="true">↗</span></a><a class="map-link" href="${resort.map}" target="_blank" rel="noreferrer">VIEW RESORT MAP ↗</a></div></div>`;
}

function render() {
  const term = search.value.trim().toLowerCase();
  const filtered = results.filter(({ resort }) => resort.name.toLowerCase().includes(term));
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

function selectResort(name) {
  selectedName = name;
  render();
}

function onTabKeydown(event) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const index = tabs.indexOf(event.currentTarget);
  let nextIndex;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
  else if (event.key === 'Home') nextIndex = 0;
  else if (event.key === 'End') nextIndex = tabs.length - 1;
  else return;
  event.preventDefault();
  const next = tabs[nextIndex];
  selectResort(next.dataset.resort);
  tablist.querySelector(`[data-resort="${CSS.escape(next.dataset.resort)}"]`)?.focus();
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
  results = await Promise.all(resorts.map(async (resort) => ({ resort, weather: await getForecast(resort) })));
  panel.setAttribute('aria-busy', 'false');
  render();
  search.addEventListener('input', render);
}

load();
