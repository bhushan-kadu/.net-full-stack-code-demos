//Write a simple JavaScript program to join all elements of the following array into a string.
function joinArrayElementsIntoString(arrayParam) {
    return arrayParam.join("");
}

function joinArrayElementsIntoStringDriverFunction() {
    let numArray = [1, 2, 3, 4, 5];
    console.log("array is: " + numArray);
    console.log("joined array string: " + joinArrayElementsIntoString(numArray));
}

joinArrayElementsIntoStringDriverFunction();