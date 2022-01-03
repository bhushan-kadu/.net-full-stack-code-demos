//Write a JavaScript program to concatenate two strings except their first character.
function stringConcatenateDriverFunction() {
    let stringInput1 = prompt("Enter a string1");
    let stringInput2 = prompt("Enter a string2");

    if (stringInput1 != null && stringInput2 != null) {
        stringInput1 = stringInput1.trim();
        stringInput2 = stringInput2.trim();

        stringInput1 = stringInput1.substr(1, stringInput1.length);
        stringInput2 = stringInput2.substr(1, stringInput2.length);

        alert(stringInput1.concat(stringInput2));
    }
}

stringConcatenateDriverFunction()