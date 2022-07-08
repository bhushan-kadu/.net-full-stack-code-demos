//Write a JavaScript function to check whether a string is blank or not.
function checkIfStringContainsBlankCharecter() {
    let stringInput = prompt("Enter a string");
    if (stringInput != null) {
        stringInput = stringInput.trim();

        if (stringInput.length === 0) {
            alert("It is a blank String");
        } else {
            alert("It is not a blank String");
        }

    }
}

checkIfStringContainsBlankCharecter();