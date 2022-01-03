var itemToEdit;
const btnEdit_click = e => {
    let text = e.target.parentElement.previousElementSibling.innerHTML;
    txtItemName.value = text;
    itemToEdit = e.target.parentElement.previousElementSibling;
    addEditBtn.innerText = "Update";
}