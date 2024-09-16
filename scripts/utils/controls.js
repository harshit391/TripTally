const controls = () => 
{
    const select_control = document.querySelectorAll(".select-control div");

    const homeTrack = select_control[0];
    const tripTrack = select_control[1];

    const homeControls = document.querySelector(".home-controls");
    const tripControls = document.querySelector(".trip-controls");

    const homeStart = document.querySelector(".home-start");
    const homeStop = document.querySelector(".home-stop");

    const tripStart = document.querySelector(".trip-start");
    const tripStop = document.querySelector(".trip-stop");

    const messageWin = document.querySelector(".message");

    const checkLocation = (str) =>
    {
        if (localStorage.getItem(str) == null)
        {
            alert(`Location not set for ${str}`);
            return;
        }
    }

    const selectHome = () =>
    {
        homeTrack.classList.add("selected");
        tripTrack.classList.remove("selected");
        homeControls.style.display = "flex";
        tripControls.style.display = "none";
    }

    const selectTrip = () =>
    {
        tripTrack.classList.add("selected");
        homeTrack.classList.remove("selected");
        tripControls.style.display = "flex";
        homeControls.style.display = "none";
    }

    homeTrack.addEventListener("click", () => {
        localStorage.setItem("defaultloc", "Home");
        checkLocation("Home");
        selectHome();
    })

    tripTrack.addEventListener("click", () => {
        localStorage.setItem("defaultloc", "Trip");
        checkLocation("Trip");
        selectTrip();
    });

    homeStart.addEventListener("click", () => {
        navigator.geolocation.watchPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            messageWin.innerHTML = `Current Latitude :- ${lat} <br> Current Longitude :- ${lon}`;
        })
    })

    homeStop.addEventListener("click", () => {
        messageWin.innerHTML = "";
    })

    tripStart.addEventListener("click", () => {
        navigator.geolocation.watchPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            messageWin.innerHTML = `Current Latitude :- ${lat} <br> Current Longitude :- ${lon}`;
        })
    })

    tripStop.addEventListener("click", () => {
        messageWin.innerHTML = "";
    });

    function Bydefault(val)
    {
        if (val == "Trip")
        {
            selectTrip();
        }
        else
        {
            selectHome();
        }
    }

    return {
        Bydefault
    }; 
}
    