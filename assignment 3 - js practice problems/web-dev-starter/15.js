//Write a JavaScript program to test whether a string end with "Script".
// The string length must be greater or equal to 6.

function testStringEndsWithScriptDriverFunction() {
    let stringInput = prompt("Enter a string having length 6 or greater");


    if (stringInput != null) {
        stringInput = stringInput.trim();

        stringInput = stringInput.substr(stringInput.length - 6, stringInput.length - 1);

        if (stringInput === 'Script') {

            alert("String Ends With \"Script\"");

        } else {
            alert("String Doesn't End With \"Script\"");
        }

    }
}

testStringEndsWithScriptDriverFunction()