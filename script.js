const body = document.querySelector('.mybody');

body.innerHTML = `<h1>Location Coordinates and Distance Covered</h1>
<p>Latitude: <span id="latitude"></span></p>
<p>Longitude: <span id="longitude"></span></p>
<p>Distance Covered (m): <span id="distance"></span></p>
<p>You Moved :- <span id="moved"></span></p>`;

const latitudeElement = document.getElementById('latitude');
const longitudeElement = document.getElementById('longitude');
const distanceElement = document.getElementById('distance');
const movedElement = document.getElementById('moved');

if ("vibrate" in navigator) 
{
  navigator.vibrate(500);
  movedElement.textContent = "Vibration API is supported.";
} 
else 
{
  movedElement.textContent = "Vibration API is not supported on this device.";
}

let counter = 0, idx = 1, prevPos = null, totalDis = 0; 


const calculateDistance = (lat1, lon1, lat2, lon2) => 
{
  const R = 6371000; 

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +

    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; 
}

navigator.geolocation.watchPosition(
  
  (position) => 
  {
    const { latitude, longitude } = position.coords;

    latitudeElement.textContent = latitude.toFixed(6);
    longitudeElement.textContent = longitude.toFixed(6);

    if (prevPos) 
    {
      const distance = calculateDistance(
        prevPos.latitude,
        prevPos.longitude,
        latitude,
        longitude
      );

      totalDis += distance;
      distanceElement.textContent = totalDis.toFixed(2); 

      console.log(`Distance covered: ${distance.toFixed(2)} meters`);

      if (totalDis.toFixed(0) > counter) 
      {
        movedElement.textContent = counter;
        navigator.vibrate(1000);
        counter += 50;
      }
    }

    prevPos = { latitude, longitude };

  },
  (error) => 
  {
    console.error(error);
  },
  {
    enableHighAccuracy: true, 
    maximumAge: 500,          
    timeout: 1000            
  }
);
