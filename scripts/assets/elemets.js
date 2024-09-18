const lists = `<div class='lists'>
    <h1 class='heading'> Welcome to Trip Tally </h1>
            <div class='list-titles'>
                <div class='title1'>Going on Trip</div>
                <div class='title2'>Coming from Trip</div>
            </div>
            <div class='title'></div>
            <div class='main-container'>
                <div class='form-container'>
                    <form class='form-going'>
                        <input type='text' class='input' placeholder='Going on Trip Items'>
                        <button class='add-btn'>Add Item</button>
                        <button class='clear-going'>Clear List</button>
                    </form>
                    <div class='going-list'></div>
                </div>
                <div class='form-container'>
                    <form class='form-coming'>
                        <input type='text' class='input' placeholder='Coming from Trip Items'>
                        <button class='add-btn'>Add Item</button>
                        <button class='clear-coming'>Clear</button>
                    </form>
                    <div class='coming-list'></div>
                </div>
            </div>
        </div>`

const locationHome = `<div class='location'>
            <div class='location-title'>Location of Home</div>
                <button class='location-home'>
                    Get Location
                </button>
                <button class='location-home-remove'>
                    Remove Location
                </button>
                <div class='home-cords'></div>
            </div>`

const locationTrip = `<div class='location'>
            <div class='location-title'>Location of Trip</div>
                <button class='location-trip'>
                    Get Location
                </button>
                <button class='location-trip-remove'>
                    Remove Location
                </button>
                <div class='trip-cords'></div>
            </div>`

const startButtons = `
    <div class='controls'>
        <div class='select-control'>
            <div>Track Home</div>
            <div>Track Trip</div>
        </div>
        <div class='home-controls'>
            <button class='home-start'>Start Tracking at Home</button>
            <button class='home-stop'>Stop Tracking at Home</button>
        </div>
        <div class='trip-controls'>
            <button class='trip-start'>Start Tracking at Trip</button>
            <button class='trip-stop'>Stop Tracking at Trip</button>
        </div>
        <div class='message'>
            
        </div>
    </div>
`

const testBtn = `
    <button class='test'>Test</button>
    <p class='testpara' style='padding: 20px;'>Its actually My Favourite Song - Jhol</p>
`

const profile = `
    <div class='nav'>
        <a href='/pages/configure-audio.html' class='profile'>
            <div class='config-audio'>Configure Audio</div>
        </a>
        <a href='/pages/user.html' class='profile'>
            <div class='profile-state'>Login / SignUp</div>
        </a>
    </div>
`

const volumeControl = `
    <div class='control-volume'>
        <input type='range' class='volume' min='0' max='1' step='0.01'>
        <div class='sub-control'>
            <div class='plus'>+</div>
            <div class='minus'>-</div>
        </div>
        <div class='volume-value'></div>
        <div class='duration'>
            <div class='testpara'>Set the Duration in Seconds You want the Song to be Played</div>
            <div class='testpara'>By Default its 10 Seconds</div>
            <input type='number' class='duration-input' placeholder='Duration in Seconds' min='1' max='120'>
        </div>
    </div>
`