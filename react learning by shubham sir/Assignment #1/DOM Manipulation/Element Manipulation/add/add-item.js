const addEditBtn_click = e => {
    var textToAdd = document.getElementById("txtItemName").value;
    if (e.target.innerText === 'Update') {
        itemToEdit.innerHTML = textToAdd;
        addEditBtn.innerText = "Add Item";
    } else {
        grid.appendChild(createElementToAdd(textToAdd));
    }
    txtItemName.value = "";
}

addEditBtn.addEventListener("click", addEditBtn_click);

const createElementToAdd = itemName => {
    if (itemName.trim() !== "") {
        let itemBlock = createDiv(null, 'data-grid-element-row');
        let item = createDiv(itemName, 'item-name');
        let itemToolbar = createDiv(null, 'actions');
        itemToolbar.appendChild(createDiv('Delete'));
        itemToolbar.appendChild(createDiv('Edit'));
        itemToolbar.appendChild(createDiv('Chnage Color'));

        itemBlock.appendChild(item);
        itemBlock.appendChild(itemToolbar);
        return itemBlock;
    }
}

const createDiv = (text, className) => {
    let div = document.createElement('div')
    if (text !== null) div.innerHTML = text;
    if (className !== undefined) div.setAttribute('class', className)
    if (text === 'Delete') {
        div.addEventListener("click", btnDelete_click);
    }
    if (text === 'Chnage Color') {
        div.addEventListener("click", btnChangeColor_click);
    }
    if (text === 'Edit') {
        div.addEventListener("click", btnEdit_click);
    }
    return div;
}
