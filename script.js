const body = document.querySelector('.mybody');

body.innerHTML = `
  <h1>Location Coordinates and Distance Covered</h1>
  <p>Latitude: <span id="latitude"></span></p>
  <p>Longitude: <span id="longitude"></span></p>
  <p>Distance Covered (m): <span id="distance"></span></p>
  <p>You Moved: <span id="moved"></span></p>
  <button id="vibrate-test">Test Vibration</button>
`;

const latitudeElement = document.getElementById('latitude');
const longitudeElement = document.getElementById('longitude');
const distanceElement = document.getElementById('distance');
const movedElement = document.getElementById('moved');
const vibrateTestButton = document.getElementById('vibrate-test');

vibrateTestButton.addEventListener('click', () => 
{
  if ("vibrate" in navigator) {
    navigator.vibrate(500);
    movedElement.textContent = "Vibration test initiated.";
  } else {
    movedElement.textContent = "Vibration API is not supported on this device.";
  }
});

let counter = 0, prevPos = null, totalDis = 0;

const positionQueue = [];

const QUEUE_SIZE = 5;

const MOVEMENT_THRESHOLD = 5; // A Threshold unless It updates the position even if you are not moving

const calculateDistance = (lat1, lon1, lat2, lon2) => 
{
  const R = 6371000;
  
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

const getAveragePosition = () => 
{
  if (positionQueue.length === 0) return null;
  
  const sum = positionQueue.reduce((acc, pos) => ({
    latitude: acc.latitude + pos.latitude,
    longitude: acc.longitude + pos.longitude
  }), { latitude: 0, longitude: 0 });
  
  return {
    latitude: sum.latitude / positionQueue.length,
    longitude: sum.longitude / positionQueue.length
  };
};

navigator.geolocation.watchPosition(
  (position) => 
  {
    const { latitude, longitude } = position.coords;

    positionQueue.push({ latitude, longitude });

    if (positionQueue.length > QUEUE_SIZE) 
    {
      positionQueue.shift();
    }

    const avgPosition = getAveragePosition();
    
    if (!avgPosition) return;

    latitudeElement.textContent = avgPosition.latitude.toFixed(6);
    longitudeElement.textContent = avgPosition.longitude.toFixed(6);

    if (prevPos) 
    {
      const distance = calculateDistance(
        prevPos.latitude,
        prevPos.longitude,
        avgPosition.latitude,
        avgPosition.longitude
      );

      if (distance >= MOVEMENT_THRESHOLD) 
      {
        totalDis += distance;
        distanceElement.textContent = totalDis.toFixed(2);
        console.log(`Distance covered: ${distance.toFixed(2)} meters`);

        if (totalDis >= counter) 
        {
          movedElement.textContent = `${counter}m milestone reached!`;

          if ("vibrate" in navigator) 
          {
            navigator.vibrate(1000);
          }
          counter += 50;
        }

        prevPos = avgPosition;
      }
    } else 
    {
      prevPos = avgPosition;
    }
  },
  (error) => 
  {
    console.error(error);
  },
  {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
  }
);