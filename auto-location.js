// Automatically use the visitor's location for route estimates after the browser grants permission.
document.addEventListener('DOMContentLoaded', () => {
  const locationButton = document.querySelector('#use-location');
  if (locationButton && 'geolocation' in navigator) {
    locationButton.click();
  }
});
