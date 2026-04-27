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

        let homeWatchId = null;
        let tripWatchId = null;

        const checkLocation = (str) =>
        {
            if (localStorage.getItem(str) == null)
            {
                alert(`Location not set for ${str}`);
                return false;
            }
            return true;
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
            if (!checkLocation("Home")) return;
            selectHome();
        });

        tripTrack.addEventListener("click", () => {
            localStorage.setItem("defaultloc", "Trip");
            if (!checkLocation("Trip")) return;
            selectTrip();
        });

        const updateMessage = (lat, lon) => {
            messageWin.innerHTML = `Current Latitude :- ${lat} <br> Current Longitude :- ${lon}`;
        }

        const handleError = (error) => {
            messageWin.innerHTML = `Error retrieving location: ${error.message}`;
        };

        homeStart.addEventListener("click", () => {
            homeWatchId = navigator.geolocation.watchPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                updateMessage(lat, lon);
            }, handleError);
        });

        homeStop.addEventListener("click", () => {
            if (homeWatchId) {
                navigator.geolocation.clearWatch(homeWatchId);
                homeWatchId = null;
            }
            messageWin.innerHTML = "";
        });

        tripStart.addEventListener("click", () => {
            tripWatchId = navigator.geolocation.watchPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                updateMessage(lat, lon);
            }, handleError);
        });

        tripStop.addEventListener("click", () => {
            if (tripWatchId) {
                navigator.geolocation.clearWatch(tripWatchId);
                tripWatchId = null;
            }
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
    };
