//Write a JavaScript program to compute the union of two arrays. 
function arrayUnion(arrayParam1, arrayParam2) {

    array = arrayParam1.concat(arrayParam2);

    let uniqueArray = [];
    array.forEach((item) => {

        let itemFound = uniqueArray.findIndex((uniqueItem) => {

            return uniqueItem === item;

        })

        if (itemFound == -1) uniqueArray.push(item);
    })

    return uniqueArray;
}

function arrayUnionDriverFunction() {
    let arrayElement1 = [1, 2, 2, 5, 5, 5, 5, 5, 5, 5, 8, 7, 9, 9, 5, 9, 6];
    let arrayElement2 = [1, 2, 2, 100, 6, 8];

    console.log("arrays are: \n1: " + arrayElement1 + "\n2: " + arrayElement2);
    console.log("array Union is: " + arrayUnion(arrayElement1, arrayElement2));
}

arrayUnionDriverFunction();