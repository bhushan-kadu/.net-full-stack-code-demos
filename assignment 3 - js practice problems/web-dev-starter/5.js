//Write a JavaScript program to check whether two given integer values are in the 
//range 50..99 (inclusive). Return true if either of them are in the said range.  
function checkIfInRange50to99DriverFunction() {
    let numbersInput = prompt("Enter two Integers seperated by a space");

    if (numbersInput != null) {
        numbersInput = numbersInput.trim();
        numbersInput = numbersInput.split(" ");

        let num1 = parseFloat(numbersInput[0]);
        let num2 = parseFloat(numbersInput[1]);

        if ((num1 >= 50 && num1 <= 99) || (num2 >= 50 && num2 <= 99)) {
            alert("true");
        }
    }
}

checkIfInRange50to99DriverFunction()