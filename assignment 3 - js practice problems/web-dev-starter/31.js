//Write a JavaScript function to get the first element of an array. 
//Passing a parameter 'n' will return the first 'n' elements of the array
function firstNElementsOfArray(firstNNumberParam) {
    return numArray.slice(0, firstNNumberParam);
}

function firstNElementsOfArrayDriverFunction() {

    let numArray = [1, 2, 3, 4, 5];

    let firdtNNumberInput = prompt("array is " + numArray +
        "\n enter number to get first n elements");

    alert("first " + firdtNNumberInput + " numbers of array " +
        firstNElementsOfArray(firdtNNumberInput));
}

firstNElementsOfArrayDriverFunction();