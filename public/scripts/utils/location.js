const locationFunctions = () =>
{
    const lcHome = document.querySelector(".location-home");
    const lcTrip = document.querySelector(".location-trip");

    const lcHomeRm = document.querySelector(".location-home-remove");
    const lcTripRm = document.querySelector(".location-trip-remove");

    lcHomeRm.addEventListener('click', () => {
        localStorage.removeItem("Home");
        const homeCords = document.querySelector(".home-cords");
        homeCords.innerHTML = "Location Removed";
    })

    lcTripRm.addEventListener('click', () => {
        localStorage.removeItem("Trip");
        const tripCords = document.querySelector(".trip-cords");
        tripCords.innerHTML = "Location Removed";
    }); 

    const getLocation = (type) => 
    {   
        navigator.geolocation.getCurrentPosition((position) => 
        {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            localStorage.setItem(`${type}`, JSON.stringify({lat, lon}));

            if(type === "Home")
            {
                const homeCords = document.querySelector(".home-cords");
                homeCords.innerHTML = `Latitude :- ${lat} <br> Longitude :- ${lon}`;
            }
    
            else
            {
                const tripCords = document.querySelector(".trip-cords");
                tripCords.innerHTML = `Latitude :- ${lat} <br> Longitude :- ${lon}`;
            }
        });
    }

    const addPositions = () =>
    {
        const positionHome = JSON.parse(localStorage.getItem("Home"));
        const positionTrip = JSON.parse(localStorage.getItem("Trip"));

        if(positionHome)
        {
            const homeCords = document.querySelector(".home-cords");
            homeCords.innerHTML = `Latitude :- ${positionHome.lat} <br> Longitude :- ${positionHome.lon}`;
        }
        else 
        {
            const homeCords = document.querySelector(".home-cords");
            homeCords.innerHTML = "Add Location";
        }

        if(positionTrip)
        {
            const tripCords = document.querySelector(".trip-cords");
            tripCords.innerHTML = `Latitude :- ${positionTrip.lat} <br> Longitude :- ${positionTrip.lon}`;
        }
        else
        {
            const tripCords = document.querySelector(".trip-cords");
            tripCords.innerHTML = "Add Location";
        }
    }

    addPositions();

    lcHome.addEventListener('click', () => getLocation("Home"));
    lcTrip.addEventListener('click', () => getLocation("Trip"));
}