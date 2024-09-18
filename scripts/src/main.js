const body = document.getElementsByClassName("mybody")[0];
const mainBody = document.querySelector("body");

const load = () =>
{
    const theme = localStorage.getItem('theme');

    if(theme)
    {
        mainBody.classList.add("dark");
    }
    else
    {
        mainBody.classList.remove("dark");
    }

    body.innerHTML = `
        <div class='cont1'>
            ${profile}
            ${lists}
            ${testBtn}
        </div>
    `;

    loadData();

    eleFunc();

    checkAuth();

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

    const goingForm = document.querySelector('.form-going');
    const comingForm = document.querySelector('.form-coming');
    
    goingForm.addEventListener('submit', addItems);
    comingForm.addEventListener('submit', addItems);
}

document.addEventListener('DOMContentLoaded', () => {
    giveItems();
    load();
})
