//Write a JavaScript function to clone an array.
function cloneArray(arrayParam) {
    return arrayParam.map((x) => x)
}

function cloneArrayDriverFunction() {
    let numArray = [1, 2, 3, 4, 5];
    let clonedArray = cloneArray(numArray);

    console.log("old array " + numArray);
    console.log("cloned array " + clonedArray);
}

cloneArrayDriverFunction()