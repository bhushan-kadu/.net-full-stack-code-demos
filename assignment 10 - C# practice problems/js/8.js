//Write a JavaScript program to reverse a given stringInputing. 
function reverseAStringDriverFunction() {
    let stringInput = prompt("Enter a string");

    if (stringInput != null) {
        stringInput = stringInput.split("");
        stringInput = stringInput.reverse();
    }
    alert(stringInput.join(""));
}

reverseAStringDriverFunction()