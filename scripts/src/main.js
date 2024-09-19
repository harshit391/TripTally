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
        </div>
    `;

    checkAuthState();

    eleFunc();

    const goingForm = document.querySelector('.form-going');
    const comingForm = document.querySelector('.form-coming');
    
    goingForm.addEventListener('submit', addItems);
    comingForm.addEventListener('submit', addItems);

    const goingClear = document.querySelector('.clear-going');
    const comingClear = document.querySelector('.clear-coming');

    goingClear.addEventListener('click', clearList);
    comingClear.addEventListener('click', clearList);
}

document.addEventListener('DOMContentLoaded', () => {
    giveItems();
    load();
})
