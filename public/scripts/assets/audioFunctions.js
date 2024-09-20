const audioFunction = () =>
{
    const test = document.querySelector('.test');

    let isPlaying = false; 

    let audio = new Audio("/Jhol.mp3");

    const currVolumeByUser = database.volume;

    audio.volume = currVolumeByUser ? currVolumeByUser : 1;

    const durationByUser = database.duration;
    const reminderByUser = database.reminder;

    let defaultDuration = durationByUser ? durationByUser : 10;
    let defaultReminder = reminderByUser ? reminderByUser : 1;

    let currentTimeOut = null;

    test.addEventListener('click', () => 
    {
        if (!isPlaying) 
        { 
            audio.volume = currVolumeByUser ? currVolumeByUser : 1;
            isPlaying = true; 
            test.innerHTML = "Stop";

            audio.play();
            currentTimeOut = setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                isPlaying = false; 
                test.innerHTML = "Test";
            }, defaultDuration * 1000);
        }
        else 
        { 
            audio.pause();
            audio.currentTime = 0;
            isPlaying = false; 
            clearTimeout(currentTimeOut);
            test.innerHTML = "Test";
        }
    });

    document.querySelector('.testpara').addEventListener('click', () => {
        window.location.href = "https://www.youtube.com/watch?v=-2RAq5o5pwc&t=10s";
    });

    const volumeVal = document.querySelector('.volume-value');

    const handleVolumeChange = (e) =>
    {
        const volume = e.target.value;
        audio.volume = volume;
        database.volume = volume;
        uploadDataBase();
        volumeVal.innerHTML = `${(volume * 100).toFixed(0)}%`;
    }

    const plus = document.querySelector('.plus');

    plus.addEventListener('click', () => {
        audio.volume = Math.min(1, audio.volume + 0.01);
        database.volume = audio.volume;
        uploadDataBase();
        volumeVal.innerHTML = `${(audio.volume * 100).toFixed(0)}%`;
    });

    const minus = document.querySelector('.minus');

    minus.addEventListener('click', () => {
        audio.volume = Math.max(0, audio.volume - 0.01);
        database.volume = audio.volume;
        uploadDataBase();
        volumeVal.innerHTML = `${(audio.volume * 100).toFixed(0)}%`;
    });

    const currvolume = document.querySelector('.volume');

    currvolume.value = currVolumeByUser ? currVolumeByUser : 1;
    volumeVal.innerHTML = `${(currvolume.value * 100).toFixed(0)}%`;

    currvolume.addEventListener('change', handleVolumeChange);

    const duration = document.querySelector('.duration-input');

    duration.value = durationByUser;
    uploadDataBase();

    duration.addEventListener('change', () => {
        const value = duration.value;

        if (value <= 0)
        {
            defaultDuration = 1;
            duration.value = 1;
            database.duration = 1;
            uploadDataBase();
            alert('Duration should be greater than 0');
            return;
        }
        else if (value >= 60)
        {
            defaultDuration = 59;
            duration.value = 59;
            database.duration = 59;
            uploadDataBase();
            alert('Duration should not be greater than 59');
            return;
        }
        
        defaultDuration = value;
        duration.value = value;
        database.duration = value;
        uploadDataBase();
    });

    const reminder = document.querySelector('.reminder-input');

    reminder.value = reminderByUser;
    uploadDataBase();

    reminder.addEventListener('change', () => {
        const value = reminder.value;

        if (value <= 0)
        {
            defaultReminder = 1;
            reminder.value = 1;
            database.reminder = 1;
            uploadDataBase();
            alert('Interval Time Should be Greater Than 0 Minutes');
            return;
        }
        else if (value > 60)
        {
            defaultReminder = 60;
            reminder.value = 60;
            database.reminder = 60;
            uploadDataBase();
            alert('Interval Time Should not be Greater Than 60 Minutes');
            return;
        }
        
        defaultReminder = value;
        reminder.value = value;
        database.reminder = value;
        uploadDataBase();
    });
}