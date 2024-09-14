var body = document.getElementsByClassName("mybody")[0];

function item(text) {
    this.text = text;
    this.element = document.createElement('div');
    this.element.classList.add('item');
    this.element.innerHTML = `
    <input type='checkbox' class='check'>
    <div>
        <p class='item-text'>${this.text}</p>
        <button class='btn'>Delete</button>
    </div>
    `;

    const deleteButton = this.element.querySelector('.btn');
    deleteButton.addEventListener('click', () => {
        this.element.remove();
    });

    const checkBox = this.element.querySelector('.check');
    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            this.element.classList.add('checked');
        } else {
            this.element.classList.remove('checked');
        }
    });
    
    return this.element;
}

const addItems = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('.input');
    if (input.value) {
        const goingList = e.target.parentElement.querySelector('div');
        const currItem = new item(input.value);
        goingList.appendChild(currItem);
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
    `

    const goingForm = document.querySelector('.form-going');
    const comingForm = document.querySelector('.form-coming');
    
    goingForm.addEventListener('submit', addItems);
    comingForm.addEventListener('submit', addItems);
}

load();