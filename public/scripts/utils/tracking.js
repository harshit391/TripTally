var reminderTime = 1;
var currentInterval = null;
var reminderTriggered = false;
var audio = null;

const loadTracker = () =>
{
    getDataBase();

    reminderTime = database && database.reminder ? database.reminder : 60;

    const startTrackerButton = document.querySelector('.tracking');

    startTrackerButton.addEventListener('click', () => {

        if (startTrackerButton.classList.contains("selected"))
        {
            const containers = document.querySelectorAll('.form-container');

            const listGoing = containers[0];
            const listComing = containers[1];

            if (listGoing.style.display === 'flex')
            {
                startTracking(false);
            }
            else if (listComing.style.display === 'flex')
            {
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
        currentInterval = setInterval(() => {
            trackList(comingList);
        }, (reminderTime * 1000));
    }

    else
    {
        currentInterval = setInterval(() => {
            trackList(goingList);
        }, (reminderTime * 1000));
    }
}

const playAudio = () =>
{
    audio = new Audio('/Jhol.mp3');
    audio.volume = database.volume;

    audio.play();

    setTimeout(() => {
        if (audio) {
            audio.pause();
        }
        reminderTriggered = false;
    }, database.duration * 1000);
}

const trackList = (listName) =>
{
    var needsReminder = false;

    listName.forEach((item) => {
        if(!item.checked)
        {
            needsReminder = true;
            return;
        }
    });

    if (needsReminder && !reminderTriggered)
    {
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
    if (currentInterval) {
        clearInterval(currentInterval);
        currentInterval = null;
    }
    if (audio) {
        audio.pause();
        audio = null;
    }
}
