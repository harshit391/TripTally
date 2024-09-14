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
        <h1 class='heading'>Welcome to Trip Tally</h1>
        <div class='list-titles'>
            <div class='title1'>Going on Trip</div>
            <div class='title2'>Coming from Trip</div>
        </div>
        <div class='main-container'>
            <div class='form-container'>
                <form class='form-going'>
                    <input type='text' class='input' placeholder='Going on Trip Items'>
                    <button class='btn'>Add Item</button>
                </form>
                <div class='going-list'></div>
            </div>
            <div class='form-container'>
                <form class='form-coming'>
                    <input type='text' class='input' placeholder='Coming from Trip Items'>
                    <button class='btn'>Add Item</button>
                </form>
                <div class='coming-list'></div>
            </div>
        </div>
    `;

    loadData();

    const ttl1 = document.querySelector(".title1");
    const ttl2 = document.querySelector(".title2");

    const listcoming = document.querySelectorAll(".form-container")[1];
    const listgoing = document.querySelectorAll(".form-container")[0];

    ttl1.addEventListener('click', () =>
    {
        ttl1.classList.add("selected");
        listcoming.style.display = "none";
        listgoing.style.display = "flex";
        ttl2.classList.remove("selected");
    });

    ttl2.addEventListener('click', () =>
    {
        ttl2.classList.add("selected");
        listcoming.style.display = "flex";
        listgoing.style.display = "none";
        ttl1.classList.remove("selected");
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
