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
        <div class='locations'>
            ${locationHome}
            ${locationTrip}
            ${startButtons}
        </div>
        <div class='cont1'>
            ${profile}
            ${lists}
        </div>
    `;

    loadData();

    eleFunc();

    locationFunctions();

    checkAuth();

    const val = localStorage.getItem("defaultloc");

    controls().Bydefault(val);

    const goingForm = document.querySelector('.form-going');
    const comingForm = document.querySelector('.form-coming');
    
    goingForm.addEventListener('submit', addItems);
    comingForm.addEventListener('submit', addItems);
}

document.addEventListener('DOMContentLoaded', () => {
    giveItems();
    load();
})
