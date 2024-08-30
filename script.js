const body = document.querySelector('.mybody');

if ("vibrate" in navigator) {
    console.log("Vibration API is supported.");
    navigator.vibrate(500); // Example vibration
} else {
    console.log("Vibration API is not supported on this device.");
}

body.innerHTML = `<h1>Location Coordinates and Distance Covered</h1>
<p>Latitude: <span id="latitude"></span></p>
<p>Longitude: <span id="longitude"></span></p>
<p>Distance Covered (m): <span id="distance"></span></p>
<p>You Moved :- <span id="moved"></span></p>`;

const latitudeElement = document.getElementById('latitude');
const longitudeElement = document.getElementById('longitude');
const distanceElement = document.getElementById('distance');
const movedElement = document.getElementById('moved');

let counter = 100.00;
let idx = 1;
let previousPosition = null; // To store the last known position
let totalDistance = 0; // To store the total distance covered

// Function to calculate the distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the Earth in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

// Use watchPosition to continuously monitor location changes
navigator.geolocation.watchPosition(
  (position) => {
    const { latitude, longitude } = position.coords;

    latitudeElement.textContent = latitude.toFixed(6);
    longitudeElement.textContent = longitude.toFixed(6);

    if (previousPosition) {
      const distance = calculateDistance(
        previousPosition.latitude,
        previousPosition.longitude,
        latitude,
        longitude
      );

      totalDistance += distance; // Add to the total distance
      distanceElement.textContent = totalDistance.toFixed(2); // Display distance covered in meters

      console.log(`Distance covered: ${distance.toFixed(2)} meters`);

      if (totalDistance.toFixed(2) >= counter) {
        navigator.vibrate(1000);
      }
    }

    // Update previous position with the current position
    previousPosition = { latitude, longitude };
  },
  (error) => {
    console.error(error);
  },
  {
    enableHighAccuracy: true, // High accuracy mode
    maximumAge: 500,          // Minimum age of cached position
    timeout: 1000            // Timeout for location retrieval
  }
);
