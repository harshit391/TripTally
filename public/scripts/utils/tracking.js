var reminderTime = 1;
var currentInterval = null;
var reminderTriggered = false;
var audio = null;

const loadTracker = () =>
{
    getDataBase();

    reminderTime = database.reminderTime ? database.reminderTime : 1;

    console.log(reminderTime);

    const startTrackerButton = document.querySelector('.tracking');

    startTrackerButton.addEventListener('click', () => {

        if (startTrackerButton.classList.contains("selected")) 
        {
            const containers = document.querySelectorAll('.form-container');

            const listGoing = containers[0];
            const listComing = containers[1];

            console.log(listGoing);
            console.log(listComing);

            if (listGoing.style.display === 'flex')
            {
                console.log("Going 1");
                startTracking(false);
            }
            else if (listComing.style.display === 'flex')
            {
                console.log("Coming 1");
                startTracking(true);
            }
        }
        else
        {
            stopTracking();
        }
    });
}


const startTracking = (list) =>
{
    const goingList = document.querySelectorAll('.going-list .item input');
    const comingList = document.querySelectorAll('.coming-list .item input');

    if (currentInterval)
    {
        clearInterval(currentInterval);
    }

    if (list) 
    {
        console.log("Coming");
        currentInterval = setInterval(() => {
            console.log("Coming Interval");
            trackList(comingList);
        }, (reminderTime * 1000 * 60));
    }

    else
    {
        console.log("Going");
        currentInterval = setInterval(() => {
            console.log("Going Interval");
            trackList(goingList);
        }, (reminderTime * 1000 * 60));
    }
}

const playAudio = () =>
{
    audio = new Audio('/Jhol.mp3');
    audio.volume = database.volume;

    audio.play();
    
    setTimeout(() => {
        audio.pause();
        reminderTriggered = false;
    }, database.duration * 1000);
}   

const trackList = (listName) =>
{
    console.log("Tracking", listName);
    var needsReminder = false;

    listName.forEach((item) => {
        if(!item.checked)
        {
            needsReminder = true;
            return;
        }
    });

    console.log(needsReminder);

    if (needsReminder && !reminderTriggered)
    {
        console.log("Reminder");
        playAudio();
        reminderTriggered = true;
    }
    else if (!needsReminder)
    {
        reminderTriggered = false;
    }
}

const stopTracking = () =>
{
    console.log("Stopping");
    clearInterval(currentInterval);
    audio.pause();
}