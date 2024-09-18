const loadConfigAudio = () => 
{
    const mainBody = document.querySelector('.config-audio');

    mainBody.innerHTML = `
        <h1 style='padding: 20px;'>Configure Your Audio</h1>
        ${testBtn}
        ${volumeControl}

    `

    const test = document.querySelector('.test');

    let isPlaying = false; 

    let audio = new Audio("/Jhol.mp3");

    const currVolumeByUser = localStorage.getItem('volume');

    test.addEventListener('click', () => 
    {
        if (!isPlaying) 
        { 
            audio.volume = currVolumeByUser ? currVolumeByUser : 1;
            isPlaying = true; 

            audio.play();
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                isPlaying = false; 
            }, 10000);
        }
    });

    document.querySelector('.testpara').addEventListener('click', () => {
        window.location.href = "https://www.youtube.com/watch?v=-2RAq5o5pwc&pp=ygUEamhvbA%3D%3D";
    });

    const volumeVal = document.querySelector('.volume-value');

    const handleVolumeChange = (e) =>
    {
        console.log(e.target.value);
        const volume = e.target.value;
        audio.volume = volume;
        localStorage.setItem('volume', volume);
        volumeVal.innerHTML = `${(volume * 100).toFixed(0)}%`;
    }

    const plus = document.querySelector('.plus');

    plus.addEventListener('click', () => {
        audio.volume = Math.min(1, audio.volume + 0.01);
        localStorage.setItem('volume', audio.volume);
        volumeVal.innerHTML = `${(audio.volume * 100).toFixed(0)}%`;
    });

    const minus = document.querySelector('.minus');

    minus.addEventListener('click', () => {
        audio.volume = Math.max(0, audio.volume - 0.01);
        localStorage.setItem('volume', audio.volume);
        volumeVal.innerHTML = `${(audio.volume * 100).toFixed(0)}%`;
    });

    const currvolume = document.querySelector('.volume');

    currvolume.value = currVolumeByUser ? currVolumeByUser : 1;
    volumeVal.innerHTML = `${(currvolume.value * 100).toFixed(0)}%`;

    currvolume.addEventListener('change', handleVolumeChange);

}

document.addEventListener('DOMContentLoaded', loadConfigAudio);