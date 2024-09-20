const loadConfigAudio = () => 
{
    getDataBase();

    const mainBody = document.querySelector('.config-audio');

    mainBody.innerHTML = `
        <h1 style='padding: 20px; text-align: center;'>Configure Your Audio</h1>
        ${testBtn}
        ${volumeControl}
        ${durationControl}

    `

    audioFunction();
}

document.addEventListener('DOMContentLoaded', loadConfigAudio);