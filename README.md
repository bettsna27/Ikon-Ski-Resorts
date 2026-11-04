# Colorado Ikon Conditions

A responsive, dependency-free resort conditions dashboard for six Colorado Ikon Pass destinations: Arapahoe Basin, Aspen Snowmass, Copper Mountain, Eldora, Steamboat, and Winter Park.

## Run locally

Open `index.html` in a browser, or serve the project with any static web server (for example, `python -m http.server`). The page fetches a fresh seven-day forecast from the Open-Meteo API on every page load. No API key or build step is required. Internet access is needed for weather data and Google Fonts.

## Data notes

- Forecast snowfall and current snow depth come from Open-Meteo's weather model at each resort's base-area coordinates. They are estimates, not official mountain measurements; depth is shown only when the model returns a positive value.
- There is no shared, supported public feed for current lift counts, open runs, and trail-opening percentages across these resorts. The dashboard links to each resort's official report rather than inventing live figures. Check those reports for the verified numbers, which may change during the day.
- Resorts and pass-access labels are a simple season-specific list in `app.js`; update it when Ikon access changes. Confirm official report URLs if a resort changes its site.

## Files

- `index.html` — page structure and explanatory notes
- `styles.css` — responsive visual design
- `app.js` — resort list, live forecast requests, and rendering
