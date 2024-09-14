class listItem 
{
    constructor(value, checked, type)
    {
        this.id = Date.now();
        this.value = value;
        this.checked = checked;
        this.type = type;
        this.item = new item(this.id, this.value, this.checked, this.type);
    }
}

var goingListFromStorage = null;
var comingListFromStorage = null;

const giveItems = () =>
{
    const gls = localStorage.getItem('goingList');
    const cls = localStorage.getItem('comingList');

    if (gls) {
        goingListFromStorage = JSON.parse(gls);
    }

    if (cls) {
        comingListFromStorage = JSON.parse(cls);
    }
}

const loadData = () =>
{
    const goingList = document.querySelector('.going-list');
    const comingList = document.querySelector('.coming-list');

    if (goingListFromStorage) {
        goingListFromStorage.forEach((ele) => {
            const currItem = new listItem(ele.value, ele.checked, ele.type);
            goingList.appendChild(currItem.item);
        });
    }

    if (comingListFromStorage) {
        comingListFromStorage.forEach((ele) => {
            const currItem = new listItem(ele.value, ele.checked, ele.type);
            comingList.appendChild(currItem.item);
        });
    }
}

const addData = (className, val) =>
{
    if (className === 'going-list') 
    {
        const items = localStorage.getItem('goingList');
        var itemsArr = null;

        if (!items) 
        {
            itemsArr = [new listItem(val, false, className)];
        }
        else 
        {
            itemsArr = JSON.parse(items);
            itemsArr.push(new listItem(val, false, className));
        }
        
        if (itemsArr)
        localStorage.setItem('goingList', JSON.stringify(itemsArr));

        else 
        alert('Error in Adding Items in Data Base');
    }
    else if (className === 'coming-list')
    {
        const items = localStorage.getItem('comingList');
        var itemsArr = null;

        if (!items) 
        {
            itemsArr = [new listItem(val, false, className)];
        }
        else 
        {
            itemsArr = JSON.parse(items);
            itemsArr.push(new listItem(val, false, className));
        }
        
        localStorage.setItem('comingList', JSON.stringify(itemsArr));
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
        const items = localStorage.getItem('goingList');

        const itemsArr = JSON.parse(items);
        
        const newItemsArr = itemsArr.filter((ele) => ele.id !== id);
        
        localStorage.setItem('goingList', JSON.stringify(newItemsArr));
    }
    else if (type === 'coming-list')
    {
        const items = localStorage.getItem('comingList');
        
        const itemsArr = JSON.parse(items);
        
        const newItemsArr = itemsArr.filter((ele) => ele.id !== id);
        
        localStorage.setItem('comingList', JSON.stringify(newItemsArr));
    }
    else
    {
        alert('Invalid List');
    }
}

const updateItem = (id, type, val) =>
{
    console.log('updateItem', id, type, val);
    if (type === 'going-list')
    {
        const items = localStorage.getItem('goingList');
        
        const itemsArr = JSON.parse(items);
        
        itemsArr.forEach((ele) => {
            if (ele.id === id) {
                ele.checked = val;
            }
        });

        console.log(itemsArr);
        
        localStorage.setItem('goingList', JSON.stringify(itemsArr));
    }
    else if (type === 'coming-list')
    {
        const items = localStorage.getItem('comingList');
        
        const itemsArr = JSON.parse(items);
        
        itemsArr.forEach((ele) => {
            if (ele.id === id) {
                ele.checked = val;
            }
        });
        
        localStorage.setItem('comingList', JSON.stringify(itemsArr));
    }
    else
    {
        alert('Invalid List');
    }
}