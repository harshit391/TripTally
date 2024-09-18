const loadConfigAudio = () => 
{
    const mainBody = document.querySelector('.config-audio');

    mainBody.innerHTML = `
        <h1 style='padding: 20px;'>Configure Your Audio</h1>
        ${testBtn}
    `

    const test = document.querySelector('.test');

    test.addEventListener('click', () => {
        const audio = new Audio("/Jhol.mp3");
        audio.volume = 0.02;
        audio.play();
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0; // Reset audio to the start
          }, 10000);
    });

    document.querySelector('.testpara').addEventListener('click', () => {
        window.location.href = "https://www.youtube.com/watch?v=-2RAq5o5pwc&pp=ygUEamhvbA%3D%3D";
    });

}

document.addEventListener('DOMContentLoaded', loadConfigAudio);