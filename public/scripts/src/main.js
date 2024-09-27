const body = document.getElementsByClassName("mybody")[0];
const mainBody = document.querySelector("body");

const load = () =>
{

    body.innerHTML = `
        <div class='cont1'>
            ${profile}
            ${guide}
            ${lists}
        </div>
    `;

    checkAuthState();

    eleFunc();

    loadTracker();

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
