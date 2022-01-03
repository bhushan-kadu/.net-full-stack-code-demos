//Write a JavaScript program to convert the letters of a given 
//stringInputing in alphabetical order.
function stringInAscendingOrderDriverFunction() {
    let stringInput = prompt("Enter a stringInputing");

    if (stringInput != null) {
        stringInput = stringInput.split("");

        stringInput.sort();

        alert(stringInput.join(""));
    }
}

stringInAscendingOrderDriverFunction()