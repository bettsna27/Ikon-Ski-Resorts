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

function renderDirectory() {
  const query = directorySearch.value.trim().toLocaleLowerCase();
  const destinations = basePassRegions[selectedRegion].filter(([name, location]) => `${name} ${location}`.toLocaleLowerCase().includes(query));
  directoryCount.textContent = `${destinations.length} destinations`;
  directoryEmpty.hidden = destinations.length > 0;
  directory.innerHTML = destinations.map(([name, location, access]) => {
    const mapQuery = encodeURIComponent(`${name} ${location}`);
    return `<article class="ikon-destination"><div class="ikon-destination-main"><h3>${name}</h3><p>${location}</p></div><span class="ikon-access">${access}</span><a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noreferrer" aria-label="Find ${name} on map">MAP ↗</a></article>`;
  }).join('');
}

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
