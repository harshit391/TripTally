const lists = `<div class='lists'>
        <div>
            <h1 class='welcome'></h1>
            <h1 class='heading'> Welcome to Trip Tally </h1>
            <p class='mypara'>A Simple Way to Keep Track of Items You Need to Take on a Trip and Items You Need to Bring Back</p>
            <p class='mypara'>Just Add the Items You Need to Take on a Trip and the Items You Need to Bring Back</p>
            <div class='list-titles'>
                <div class='title1'>Going on Trip</div>
                <div class='title2'>Coming from Trip</div>
            </div>
            <div class='title'></div>
            <div class='tracking'>Start Tracking</div>
        </div>
        <div>
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
                        <button class='clear-coming'>Clear List</button>
                    </form>
                    <div class='coming-list'></div>
                </div>
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
    <div class='test-controls'>
        <button class='test'>Test</button>
        <p class='testpara'>Its actually My Favourite Song - Jhol</p>
    </div>
`

const profile = `
    <div class='nav'>
        <a href='/pages/configure-audio.html' class='profile'>
            <div class='config-audio'>Configure Audio System</div>
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
    </div>
`

const durationControl = `
    <div class='user-input'>
        <div class='duration'>
            <input type='number' class='duration-input' placeholder='Duration in Seconds' min='1' max='59'>
            <div class='testpara'>Set the Duration in Seconds For the Song You want to be Played</div>
            <div class='testpara'>By Default its 10 Seconds</div>
            <div class='testpara'>Maximum 59 Seconds</div>
        </div>
        <div class='reminder'>
            <input type='number' class='reminder-input' placeholder='Reminder in Minutes' min='1' max='60'>
            <div class='testpara'>Set the Interval Time in Minutes for Reminder of Left Items</div>
            <div class='testpara'>By Default its 1 Minute</div>
            <div class='testpara'>Maximum 60 Minutes</div>
        </div>
    </div>
`


