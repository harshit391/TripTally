var body = document.getElementsByClassName("mybody")[0];

const addItems = (e) => 
{
    e.preventDefault();

    const input = e.target.querySelector('.input');
    
    if (input.value) {
        const myList = e.target.parentElement.querySelector('div');

        const id = Date.now();
        
        addData(id, myList.className, input.value);

        const currItem = new item(id, input.value, false, myList.className);
        myList.appendChild(currItem);
        input.value = '';
    }
}

const load = () =>
{
    body.innerHTML = `
        <h1 class='heading'>Welcome to Trip Tally</h1>
        <div class='main-container'>
            <div class='form-container'>
                <h2>Going on Trip Items</h2>
                <form class='form-going'>
                    <input type='text' class='input' placeholder='Going on Trip Items'>
                    <button class='btn'>Add Item</button>
                </form>
                <div class='going-list'></div>
            </div>
            <div class='form-container'>
            <h2>Coming Back from Trip Items</h2>
                <form class='form-coming'>
                    <input type='text' class='input' placeholder='Coming Back from Trip Items'>
                    <button class='btn'>Add Item</button>
                </form>
                <div class='coming-list'></div>
            </div>
        </div>
    `;

    loadData();

    const goingForm = document.querySelector('.form-going');
    const comingForm = document.querySelector('.form-coming');
    
    goingForm.addEventListener('submit', addItems);
    comingForm.addEventListener('submit', addItems);
}

document.addEventListener('DOMContentLoaded', () => {
    giveItems();
    load();
})
