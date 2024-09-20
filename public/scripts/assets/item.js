function item(id, text, checked = false, type) 
{
    this.text = text;

    this.checked = checked;

    this.type = type;

    this.id = id;

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
        deleteItem(this.id, this.type);
    });

    const checkBox = this.element.querySelector('.check');

    if (this.checked) {
        checkBox.checked = true;
        this.element.classList.add('checked');
    }
    
    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            updateItem(id, type, true);
            this.element.classList.add('checked');
        } else {
            updateItem(id, type, false);
            this.element.classList.remove('checked');
        }
    });
    
    return this.element;
}