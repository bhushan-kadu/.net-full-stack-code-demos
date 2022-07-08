//Write a JavaScript program to add items in an blank array and display the items.
function addItemsToArray(arrayItemsParam) {
    arrayElement.push(arrayItemsParam)
    return arrayElement;
}

function addItemsToArrayDriverFunction() {
    let arrayElement = [];
    let arrayItemsToadd = prompt("array is: [ ]" + arrayElement + "\nEnter items to add in array" +
        "seperated by comma ( , )");

    alert("added item array " + addItemsToArray(arrayItemsToadd.split(",")));
}
addItemsToArrayDriverFunction();