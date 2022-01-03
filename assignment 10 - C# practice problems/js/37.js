//Write a Bubble Sort algorithm in JavaScript. 
function bubbleSort(arrayParam) {
    let i = 0;
    let j = 0;
    let temp = 0;
    let length = arrayParam.length;

    for (i = 0; i < length; i++) {
        for (j = 0; j < (length - i - 1); j++) {

            if (arrayParam[j] > arrayParam[j + 1]) {
                temp = arrayItemsInput[j];
                arrayParam[j] = arrayParam[j + 1];
                arrayParam[j + 1] = temp;
            }
        }
    }
    return arrayParam;
}

function bubbleSortDriverFunction() {
    let arrayItemsInput = prompt("Enter items of array" +
        "seperated by comma ( , )");
    arrayItemsInput = arrayItemsInput.split(",");

    let numArrayElement = []
    arrayItemsInput.forEach(element => {
        numArrayElement.push(parseInt(element));
    });
    console.log(numArrayElement)
    console.log("before sort: " + numArrayElement);

    console.log("after sort: " + bubbleSort(numArrayElement));
}

bubbleSortDriverFunction();