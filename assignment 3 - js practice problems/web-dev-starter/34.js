//Write a JavaScript program to remove duplicate items from an array
function removeDuplicates(arrayParam) {

    let uniqueArray = [];
    arrayParam.forEach((item) => {

        let itemFound = uniqueArray.findIndex((uniqueItem) => {
            return uniqueItem === item;
        })

        if (itemFound == -1) {
            uniqueArray.push(item);
        }
    })

    return uniqueArray;
}

function removeDuplicatesDriverFunction() {
    let arrayElement = [1, 2, 2, 5, 5, 5, 5, 5, 5, 5, 8, 7, 9, 9, 5, 9, 6];
    console.log("array is: " + arrayElement);
    console.log("array after removing duplicate is: " + removeDuplicates(arrayElement));
}

removeDuplicatesDriverFunction();