class listItem 
{
    constructor(id, value, checked, type)
    {
        this.id = id;
        this.value = value;
        this.checked = checked;
        this.type = type;
    }
}

class UserData
{
    constructor(id)
    {
        this.id = id;
        this.goingList = [];
        this.comingList = [];
        this.durations = 10;
        this.volume = 0.1; 
    }
}

var goingListFromStorage = null;
var comingListFromStorage = null;

const token = Number(document.cookie.split(';')[0].split('=')[1]);

var storage = [];
var database = null;

const getDataBase = () => {

    const dataDB = localStorage.getItem("data");

    if (dataDB)
    {
        storage = JSON.parse(dataDB);

        if (storage.length > 0)
        {
            storage.forEach((ele) => {
                if (ele.id === token) {
                    database = ele;
                }
            });
        }
        else
        {
            database = new UserData(token);
            storage.push(database);
            uploadDataBase();
        }
    }
    else
    {
        database = new UserData(token);
        storage.push(database);
        uploadDataBase();
    }

    console.log(database);
}

const uploadDataBase = () => {
    storage.forEach((ele) => {
        if (ele.id === token) {
            ele = database;
        }
    });

    localStorage.setItem("data", JSON.stringify(storage));
}

const giveItems = () =>
{
    if (!database)
    {
        return;
    }

    const gls = database.goingList || [];
    const cls = database.comingList || [];

    if (gls && gls.length > 0) {
        goingListFromStorage = [...gls];
    }

    if (cls && cls.length > 0) {
        comingListFromStorage = [...cls];
    }
}

const addItems = (e) => 
{
    e.preventDefault();

    const input = e.target.querySelector('.input');
    
    if (input.value) {
        const myList = e.target.parentElement.querySelector('div');

        const id = hashIt(Date.now());
        
        addData(id, myList.className, input.value);

        const currItem = new item(id, input.value, false, myList.className);
        myList.appendChild(currItem);
        input.value = '';
    }
}

const clearList = (e) =>
{
    e.preventDefault();

    const parent = e.target.parentElement;

    const goingList = document.querySelector('.going-list');
    const comingList = document.querySelector('.coming-list');

    if (parent.className === 'form-going')
    {
        goingList.innerHTML = '';
        
        database.goingList = [];
        uploadDataBase();
    }
    else if (parent.className === 'form-coming')
    {
        comingList.innerHTML = '';
        
        database.comingList = [];
        uploadDataBase();
    }
    else
    {
        alert('Invalid List');
    }
}

const loadData = () =>
{
    const goingList = document.querySelector('.going-list');
    const comingList = document.querySelector('.coming-list');

    if (goingListFromStorage) {
        goingListFromStorage.forEach((ele) => {
            const currItem = new item(ele.id, ele.value, ele.checked, ele.type);
            goingList.appendChild(currItem);
        });
    }

    if (comingListFromStorage) {
        comingListFromStorage.forEach((ele) => {
            const currItem = new item(ele.id, ele.value, ele.checked, ele.type);
            comingList.appendChild(currItem);
        });
    }
}

const addData = (id, className, val) =>
{
    if (className === 'going-list') 
    {
        const items = database.goingList;
        var itemsArr = null;

        if (!items) 
        {
            itemsArr = [new listItem(id, val, false, className)];
        }
        else 
        {
            itemsArr = [...items]
            itemsArr.push(new listItem(id, val, false, className));
        }
        
        if (itemsArr)
        {
            database.goingList = itemsArr;
            uploadDataBase();
        }

        else 
        alert('Error in Adding Items in Data Base');
    }
    else if (className === 'coming-list')
    {
        const items = database.comingList;
        var itemsArr = null;

        if (!items || items.length === 0) 
        {
            itemsArr = [new listItem(id, val, false, className)];
        }
        else 
        {
            itemsArr = [...items];
            itemsArr.push(new listItem(id, val, false, className));
        }
        
        if (itemsArr)
        {
            database.comingList = itemsArr;
            uploadDataBase();
        }

        else
        alert('Error in Adding Items in Data Base');
    }
    else
    {
        alert('Invalid List');
    } 
}

const deleteItem = (id, type) =>
{
    if (type === 'going-list')
    {
        const items = database.goingList;

        const itemsArr = [...items];
        
        const newItemsArr = itemsArr.filter((ele) => ele.id !== id);
        
        database.goingList = newItemsArr;

        uploadDataBase();
    }
    else if (type === 'coming-list')
    {
        const items = database.comingList;
        
        const itemsArr = [...items];
        
        const newItemsArr = itemsArr.filter((ele) => ele.id !== id);

        database.comingList = newItemsArr;

        uploadDataBase();
    }
    else
    {
        alert('Invalid List');
    }
}

const updateItem = (id, type, val) =>
{
    if (type === 'going-list')
    {
        const items = database.goingList;
        
        const itemsArr = [...items];
        
        itemsArr.forEach((ele) => {
            if (ele.id === id) {
                ele.checked = val;
            }
        });
        
        database.goingList = itemsArr;

        uploadDataBase();
    }
    else if (type === 'coming-list')
    {
        const items = database.comingList;
        
        const itemsArr = [...items];
        
        itemsArr.forEach((ele) => {
            if (ele.id === id) {
                ele.checked = val;
            }
        });
        
        database.comingList = itemsArr;

        uploadDataBase();
    }
    else
    {
        alert('Invalid List');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getDataBase();
    giveItems();
    loadData();
});