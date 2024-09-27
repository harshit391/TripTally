const audioFunction = () =>
{
    const test = document.querySelector('.test');

    let isPlaying = false; 

    let audio = new Audio("/Jhol.mp3");

    const currVolumeByUser = database.volume;

    audio.volume = currVolumeByUser ? currVolumeByUser : 1;

    const durationByUser = database.duration;
    const reminderByUser = Number(database.reminder);

    let defaultDuration = durationByUser ? durationByUser : 10;
    let defaultReminder = reminderByUser ? reminderByUser : 60;

    console.log("Default Reminder ", defaultReminder);

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

    const duration = document.querySelectorAll('.duration-input');

    const minute = duration[0];
    const second = duration[1];

    minute.value = Math.floor(defaultDuration/60);
    second.value = defaultDuration%60;
    uploadDataBase();

    minute.addEventListener('change', () => {
        const value = minute.value;

        if (value < 0)
        {
            defaultDuration = Number(second.value);
            minute.value = 0;
            database.duration = Number(second.value);
            uploadDataBase();
            alert('Duration Should not be Less Than 0');
            return;
        }

        if (value * 60 + Number(second.value) >= database.reminder)
        {
            defaultDuration = database.reminder - 1;
            minute.value = database.reminder - 1;
            database.duration = database.reminder - 1;
            uploadDataBase();
            alert('Duration Should be Less Than Reminder Time');
            return;
        }

        defaultDuration = value * 60 + Number(second.value);
        minute.value = value;
        database.duration = value * 60 + Number(second.value);
        uploadDataBase();
    });

    second.addEventListener('change', () => {
        const value = Number(second.value);

        console.log(value);

        if (value < 0)
        {
            defaultDuration = Number(minute.value) * 60;
            second.value = 0;
            database.duration = Number(minute.value) * 60;
            uploadDataBase();
            alert('Duration Should not be Less Than 0');
            return;
        }
        if (value >= 60)
        {
            defaultDuration = 59 + Number(minute.value) * 60;
            second.value = 59;
            database.duration = 59 + Number(minute.value) * 60;
            uploadDataBase();
            alert('Duration Should not be Greater Than 59 Seconds');
            return;
        }
        if (value + Number(minute.value) * 60 >= database.reminder)
        {
            defaultDuration = database.reminder - 1;
            second.value = database.reminder - 1;
            database.duration = database.reminder - 1;
            uploadDataBase();
            alert('Duration Should be Less Than Reminder Time');
            return;
        }

        defaultDuration = value + Number(minute.value) * 60;
        second.value = value;
        database.duration = value + Number(minute.value) * 60;
        uploadDataBase();
    });

    const reminder = document.querySelectorAll('.reminder-input');

    const minute_input = reminder[0];
    const second_input = reminder[1];

    minute_input.value = Math.floor((reminderByUser/60));
    second_input.value = reminderByUser%60;
    uploadDataBase();

    minute_input.addEventListener('change', () => {
        console.log("Minute Input");
        const value = minute_input.value;

        if (value < 0)
        {
            defaultReminder = Number(second_input.value);
            minute_input.value = 0;
            database.reminder = Number(second_input.value);
            uploadDataBase();
            alert('Interval Time Should not be Less Than 0');
            return;
        }

        if (value <= database.duration)
        {
            defaultReminder = Number(second_input.value) + 1;
            minute_input.value = database.duration + 1;
            database.reminder = Number(second_input.value) + 1;
            uploadDataBase();
            alert('Reminder Time Should be Greater Than Duration');
            return;
        }
        
        defaultReminder = value * 60 + Number(second_input.value);
        minute_input.value = value;
        database.reminder = value * 60 + Number(second_input.value);
        console.log(defaultReminder);
        uploadDataBase();
    });

    second_input.addEventListener('change', () => {
        console.log("Second Input");
        const value = Number(second_input.value);

        if (value < 0)
        {
            defaultReminder = Number(minute_input.value) * 60;
            second_input.value = 0;
            database.reminder = Number(minute_input.value) * 60;
            uploadDataBase();
            alert('Interval Time Should not be Less Than 0');
            return;
        }
        if (value >= 60)
        {
            defaultReminder = 59 + Number(minute_input.value) * 60;
            second_input.value = 59;
            database.reminder = 59 + Number(minute_input.value) * 60;
            uploadDataBase();
            alert('Interval Time Should not be Greater Than 59 Seconds');
            return;
        }
        
        defaultReminder = value + Number(minute_input.value) * 60;
        console.log(defaultReminder);
        second_input.value = value;
        database.reminder = value + Number(minute_input.value) * 60;
        uploadDataBase();
    });
}